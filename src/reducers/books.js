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
      debugger;
      return action.books;
    case RESET_SEARCH:
      debugger;
      return [];
    case RESULTS_NOT_FOUND:
    case SEARCH_BOOKS_FAILED:
      debugger;
      return [];
    default:
      return state;
  }
};

export default books;
