import {
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
  RESULTS_NOT_FOUND,
} from '../actions';

const booksList = (state = { books: [], totalResults: 0 }, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return Object.assign({
        items: action.books,
        totalResults: action.totalResults,
      });
    case FETCH_BOOKS_FAILED:
      return action.error;
    case RESULTS_NOT_FOUND:
      return state;
    default:
      return state;
  }
};

export default booksList;
