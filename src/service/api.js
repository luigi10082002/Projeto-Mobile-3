import axios from 'axios';

export const api = axios.create({
  baseURL: ""
})

export const apiEmail = axios.create({
  baseURL: fetch('http://127.0.0.1/meudb/usuarios', {
			method: 'post',
    })
})

export default api;
