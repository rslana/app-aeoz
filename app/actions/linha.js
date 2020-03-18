import localApi from '../localApi';
import api from '../api';
import errorHandler from '../helpers/errorHandler';
import AsyncStorage from '@react-native-community/async-storage';

//LINHAS
const findByIdSuccess = linha => ({
  type: 'FIND_BY_ID_LINHA_SUCCESS',
  linha,
});

const findByStringSearchSuccess = linhas => ({
  type: 'FIND_BY_STRING_SEARCH_LINHAS_SUCCESS',
  linhas,
});

const findAllSuccess = linhas => ({
  type: 'FIND_ALL_LINHAS_SUCCESS',
  linhas,
});

//FAVORITOS
const findFavoritosSuccess = favoritos => ({
  type: 'FIND_FAVORITOS_LINHA_SUCCESS',
  favoritos,
});

const saveFavoritosSuccess = favoritos => ({
  type: 'SAVE_FAVORITOS_LINHA_SUCCESS',
  favoritos,
});

const removeFavoritosSuccess = favoritos => ({
  type: 'REMOVE_FAVORITOS_LINHA_SUCCESS',
  favoritos,
});

// ERROR
const addError = errors => ({
  type: 'ADD_LINHA_ERROR',
  errors,
});

export const findById = number => async dispatch => {
  return localApi.linha
    .findById(number)
    .then(linha => {
      return dispatch(findByIdSuccess(linha));
    })
    .catch(error => {
      dispatch(addError(errorHandler.getError(error)));
    });
};

export const findByStringSearch = strSearch => async dispatch => {
  return localApi.linha
    .findByStringSearch(strSearch)
    .then(linhas => {
      return dispatch(findByStringSearchSuccess(linhas));
    })
    .catch(error => {
      dispatch(findByStringSearchSuccess([]));
      dispatch(addError(errorHandler.getError(error)));
    });
};

export const findAll = () => async dispatch => {
  return api.linha
    .findAll()
    .then(linhas => {
      return dispatch(saveAllToLocalDatabase(linhas));
    })
    .catch(error => {
      dispatch(findAllSuccess([]));
      dispatch(addError(errorHandler.getError(error)));
    });
};

export const findFavoritos = () => async dispatch => {
  try {
    const favoritosString = await AsyncStorage.getItem('@storage_favoritos');
    const favoritos = favoritosString ? JSON.parse(favoritosString) : [];
    return dispatch(findFavoritosSuccess(favoritos));
  } catch (error) {
    dispatch(addError(errorHandler.getError(error)));
  }
};

export const findFavoritoByNumber = number => async dispatch => {
  try {
    const favoritosString = await AsyncStorage.getItem('@storage_favoritos');
    let favorito = null;
    if (favoritosString) {
      const favoritos = JSON.parse(favoritosString);
      favorito = favoritos.find(f => f.number === number);
    }
    return dispatch(findByIdSuccess(favorito));
  } catch (error) {
    dispatch(addError(errorHandler.getError(error)));
  }
};

export const saveFavoritos = linha => async dispatch => {
  try {
    let favoritos = [linha];
    const favoritosString = await AsyncStorage.getItem('@storage_favoritos');
    if (favoritosString) {
      favoritos = JSON.parse(favoritosString);
      favoritos = favoritos.some(fav => fav.number === linha.number)
        ? favoritos
        : [...favoritos, linha];
    }
    await AsyncStorage.setItem('@storage_favoritos', JSON.stringify(favoritos));
    return dispatch(saveFavoritosSuccess(favoritos));
  } catch (error) {
    dispatch(addError(errorHandler.getError(error)));
  }
};

export const removeFavoritos = linha => async dispatch => {
  try {
    let favoritos = [];
    const favoritosString = await AsyncStorage.getItem('@storage_favoritos');
    if (favoritosString) {
      favoritos = JSON.parse(favoritosString);
      favoritos = favoritos.filter(fav => fav.number !== linha.number);
    }
    await AsyncStorage.setItem('@storage_favoritos', JSON.stringify(favoritos));
    return dispatch(removeFavoritosSuccess(favoritos));
  } catch (error) {
    dispatch(addError(errorHandler.getError(error)));
  }
};

export const loadFavorito = linha => async dispatch => {
  return dispatch(findByIdSuccess(linha));
};

export const saveAllToLocalDatabase = linhas => async dispatch => {
  try {
    await AsyncStorage.setItem(
      '@storage_database_linhas',
      JSON.stringify(linhas),
    );
    return dispatch(findAllSuccess(linhas));
  } catch (error) {
    dispatch(addError(errorHandler.getError(error)));
  }
};
