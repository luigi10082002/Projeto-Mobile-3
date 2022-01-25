import axios from 'axios';

const api = axios.create({
  baseURL: ""
})


export const apiEmail = axios.create({
  baseURL: "localhost/PHP/APP/"
})

/*
export const apiEmail = new FormData();

apiEmail.append('produtos', {
  uri: produtos.uri,
  type: 'array', // ou photo.type
  name: 'produtos' // ou photo.name
});

fetch(url, {
  method: 'post',
  body: data
}).then(res => {
  console.log(res)
});
*/


export default api;
