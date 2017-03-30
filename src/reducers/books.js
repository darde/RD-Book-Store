import {
  RESET_SEARCH,
  RESULTS_NOT_FOUND,
  SEARCH_BOOKS_FAILED,
  SEARCH_BOOKS_SUCCESS,
} from '../actions';

const books = (
  state = [],
  action,
 ) => {
  switch (action.type) {
    case SEARCH_BOOKS_SUCCESS:
      return action.books;
    case RESET_SEARCH:
    case RESULTS_NOT_FOUND:
    case SEARCH_BOOKS_FAILED:
      return [];
    default:
      return state;
  }
};

export default books;
