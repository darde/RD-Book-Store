// Actions
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_FAILED = 'FETCH_BOOKS_FAILED';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';

// Actions creators
export const fetchBooks = () => ({
  type: FETCH_BOOKS,
});
