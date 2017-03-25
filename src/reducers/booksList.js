import {
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
  RESULTS_NOT_FOUND,
} from '../actions';

const booksList = (state = [], action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return action.books;
    case FETCH_BOOKS_FAILED:
      return action.error;
    case RESULTS_NOT_FOUND:
      return [];
    default:
      return state;
  }
};

export default booksList;
