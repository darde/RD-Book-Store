// Actions
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_FAILED = 'FETCH_BOOKS_FAILED';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const SEARCH_KEYWORD = 'SEARCH_KEYWORD';

// Actions creators
export const fetchBooks = () => ({
  type: FETCH_BOOKS,
});

export const searchKeyword = (keyword, title, author) => ({
  type: SEARCH_KEYWORD,
  keyword,
  title,
  author,
});
