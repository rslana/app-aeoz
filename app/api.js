import axios from 'axios';

const API_URL = 'http://192.168.0.109:3333';

export default {
  linha: {
    findById: id =>
      axios.get(`${API_URL}/linha/${id}`).then(res => res.data.linha),
    findByStringSearch: strSearch =>
      axios
        .get(`${API_URL}/linhas/search/${strSearch}`)
        .then(res => res.data.linhas),
    findAll: () =>
      axios.get(`${API_URL}/linhas/all`).then(res => res.data.linhas),
  },
};
