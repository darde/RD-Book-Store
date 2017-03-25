/* eslint-disable no-unused-vars */
// Async calls from Google Books API
import axios from 'axios';

// export const fetchBooks = () => ([
//   { title: 'Book One', author: 'Pablo Darde' },
//   { title: 'Book Two', author: 'Rafael Darde' },
// ]);

const APIKey = 'AIzaSyBS2e-eu0f30NvhIJUEU8hBKsNc2DmmYB8';
const URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = () =>
  axios.get(URL, {
    params: {
      q: 'inauthor:keyes',
      key: APIKey,
    },
  })
  .then(response => response.data.items)
  .catch(error => error);

export const searchKeyword = (search) => {
  debugger;
  const keyword = search.keyword;
  let query = '';
  if (search.title) {
    query += `intitle:${keyword}`;
  }
  if (search.author) {
    query += query !== '' ? `+inauthor:${keyword}` : `inauthor:${keyword}`;
  }
  return axios.get(URL, {
    params: {
      q: query,
      key: APIKey,
    },
  })
  .then((response) => {
    debugger;
    return response.data.items;
  })
  .catch((error) => {
    debugger;
    return error;
  });
};
