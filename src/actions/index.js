// Actions
export const BUILD_PAGE = 'BUILD_PAGE';
export const CHANGE_PAGE = 'CHANGE_PAGE';
// export const FETCH_BOOKS = 'FETCH_BOOKS';
export const PULL_NEW_PAGES = 'PULL_NEW_PAGES';
export const RESET_SEARCH = 'RESET_SEARCH';
export const RESULTS_NOT_FOUND = 'RESULTS_NOT_FOUND';
export const SEARCH_BOOKS = 'SEARCH_BOOK';
export const SEARCH_BOOKS_FAILED = 'SEARCH_BOOKS_FAILED';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';
export const SET_ACTIVE_BOOK = 'SET_ACTIVE_BOOK';

// General constants
export const noPhoto = 'https://books.google.com.br/googlebooks/images/no_cover_thumb.gif';

// Pagination constants
export const maxResults = 40;
export const itemsPerPage = 10;
export const itemsArround = 4;

/*
* searchBooks action creator
* dispatches a search action passing the search params
* calls the search reducer.
*/
export const searchBooks = (keyword, title, author, remoteStartIndex) => ({
  type: SEARCH_BOOKS,
  keyword,
  title,
  author,
  remoteStartIndex: Number(remoteStartIndex),
});

/*
* setActiveBook action creator
* dispatches the active book ID for the Book Detail screen,
* calls the bookDetails reducer.
*/
export const setActiveBook = id => ({
  type: SET_ACTIVE_BOOK,
  id,
});

/*
* changePage action creator
* dispatches a change page action
* calls the pagination reducer.
*/
export const changePage = currentPage => ({
  type: CHANGE_PAGE,
  currentPage,
});

/*
* pullNewPages action creator
* dispatches a pull new pages action
* calls the search reducer.
*/
export const pullNewPages = remoteStartIndex => ({
  type: PULL_NEW_PAGES,
  remoteStartIndex,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});
