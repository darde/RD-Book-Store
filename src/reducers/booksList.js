import {
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
} from '../actions';

const booksList = (state = [], action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return action.books;
    case FETCH_BOOKS_FAILED:
      return action.error;
    default:
      return state;
  }
};

export default booksList;
