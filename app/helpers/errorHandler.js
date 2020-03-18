const errorHandler = {
  getError: error => {
    if (error.data) {
      if (error.data.error) {
        return error.data.error;
      }
      return error.data.errors;
    }
    if (error.problem === 'NETWORK_ERROR') {
      return 'Não foi possível conectar ao servidor';
    }
    return 'Não foi possível completar essa ação no momento';
  },
};

export default errorHandler;
