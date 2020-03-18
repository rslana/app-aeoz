import AsyncStorage from '@react-native-community/async-storage';

export default {
  linha: {
    findById: async id => {
      const linhas = JSON.parse(
        await AsyncStorage.getItem('@storage_database_linhas'),
      );
      const linha = await linhas.find(l => l._id === id);
      return linha || null;
    },
    findByStringSearch: async strSearch => {
      if (strSearch) {
        const linhas = JSON.parse(
          await AsyncStorage.getItem('@storage_database_linhas'),
        );
        let linhasResult = [];

        if (!isNaN(strSearch)) {
          linhasResult = await linhas.filter(
            linha => linha.number.indexOf(strSearch) >= 0,
          );
        } else {
          linhasResult = await linhas.filter(
            linha =>
              linha.name.toLowerCase().indexOf(strSearch.toLowerCase()) >= 0,
          );
        }
        return linhasResult;
      }
      return [];
    },
  },
};
