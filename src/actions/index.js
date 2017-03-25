// Actions
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_FAILED = 'FETCH_BOOKS_FAILED';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const RESULTS_NOT_FOUND = 'RESULTS_NOT_FOUND';
export const SEARCH_KEYWORD = 'SEARCH_KEYWORD';
export const SET_ACTIVE_BOOK = 'SET_ACTIVE_BOOK';

// General constants
export const noPhoto = 'https://books.google.com.br/googlebooks/images/no_cover_thumb.gif';
export const maxResults = 40;
export const itemsPerPage = 10;

// Actions creators
export const fetchBooks = () => ({
  type: FETCH_BOOKS,
});

// dispatches a search action passing the search params
export const searchKeyword = (keyword, title, author) => ({
  type: SEARCH_KEYWORD,
  keyword,
  title,
  author,
});

// dispatches the active book ID for the Book Detail screen,
export const setActiveBook = id => ({
  type: SET_ACTIVE_BOOK,
  id,
});
