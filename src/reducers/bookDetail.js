import {
  RESET_ACTIVE_BOOK,
  SET_ACTIVE_BOOK,
  // TOGGLE_FAVORITE,
} from '../actions';

const bookDetail = (state = { id: '', favorite: false }, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOOK:
      return Object.assign({}, state, {
        ...state,
        id: action.id,
      });
    case RESET_ACTIVE_BOOK:
      return Object.assign({}, state, {
        ...state,
        id: '',
      });
    // case TOGGLE_FAVORITE:
    //   return Object.assign({}, state, {
    //     ...state,
    //     favorite: !state.favorite,
    //   });
    default:
      return state;
  }
};

export default bookDetail;
