const initState = {
  linha: {
    _id: '',
    number: '',
    name: '',
    horario: '',
    itinerario: '',
  },
  linhas: [],
  favoritos: [],
  quantidade: 0,
  errors: {},
};

const linha = (state = initState, action = {}) => {
  switch (action.type) {
    case 'FIND_BY_STRING_SEARCH_LINHAS_SUCCESS':
      return {
        ...state,
        linhas: action.linhas,
        quantidade: action.quantidade,
      };
    case 'FIND_BY_ID_LINHA_SUCCESS':
      return {
        ...state,
        linha: action.linha ? action.linha : initState,
      };
    case 'FIND_FAVORITOS_LINHA_SUCCESS':
      return {
        ...state,
        favoritos: action.favoritos,
      };
    case 'SAVE_FAVORITOS_LINHA_SUCCESS':
      return {
        ...state,
        favoritos: action.favoritos,
      };
    case 'REMOVE_FAVORITOS_LINHA_SUCCESS':
      return {
        ...state,
        favoritos: action.favoritos,
      };
    case 'ADD_LINHA_ERROR':
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default linha;
