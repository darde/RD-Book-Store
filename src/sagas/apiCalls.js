/* eslint-disable no-unused-vars */
// Async calls from Google Books API
import axios from 'axios';
import {
  maxResults,
} from '../actions';

const APIKey = 'AIzaSyBS2e-eu0f30NvhIJUEU8hBKsNc2DmmYB8';
const URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = () =>
  axios.get(URL, {
    params: {
      q: 'inauthor:keyes',
      maxResults,
      key: APIKey,
    },
  })
  .then((response) => {
    let items = [];
    let totalResults = 0;
    if (response.data.totalItems > 0) {
      items = response.data.items.slice();
      totalResults = response.data.totalItems;
    }
    return { items, totalResults };
  })
  .catch(error => error);

export const searchKeyword = (search) => {
  const keyword = search.keyword;
  let query = '';
  if (search.title) {
    query += `intitle:${keyword}`;
  }
  if (search.author) {
    query += query !== '' ? `+inauthor:${keyword}` : `inauthor:${keyword}`;
  }
  if (search.subject) {
    query += query !== '' ? `+subject:${keyword}` : `subject:${keyword}`;
  }
  return axios.get(URL, {
    params: {
      q: query,
      startIndex: 0,
      maxResults,
      key: APIKey,
    },
  })
  .then((response) => {
    let items = [];
    let totalResults = 0;
    if (response.data.totalItems > 0) {
      items = response.data.items.slice();
      totalResults = response.data.totalItems;
    }
    return { items, totalResults };
  })
  .catch(error => error);
};
