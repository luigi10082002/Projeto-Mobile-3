import axios from 'axios';

const api = axios.create({
  baseURL: ""
})

/*
export const apiEmail = axios.create({
    fetch('http://localhost/127.0.0.1:3312/meudb/usuarios', {
method: 'POST',
headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
},

})
})
*/

export default api;
