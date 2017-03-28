import {
  // GET_BOOK_DETAIL,
  SET_ACTIVE_BOOK,
} from '../actions';

const bookDetail = (state = '', action) => {
  switch (action.type) {
    case SET_ACTIVE_BOOK:
      return action.id;
    default:
      return state;
  }
};

export default bookDetail;
