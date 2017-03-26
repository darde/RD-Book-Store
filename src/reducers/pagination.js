import {
  CALL_FIRST_PAGE,
  CHANGE_PAGE,
  itemsPerPage,
} from '../actions';

const pagination = (
  state = {
    currentPage: 1,
    itemsPerPage,
    totalFetched: 0,
    totalResults: 0,
    pageItems: [],
    books: [],
  },
  action,
) => {
  switch (action.type) {
    case CALL_FIRST_PAGE:
      debugger;
      return Object.assign({}, state, {
        ...state,
        pageItems: action.pageItems,
        totalFetched: action.totalFetched,
        totalResults: action.totalResults,
        currentPage: 1,
      });
    case CHANGE_PAGE:
      debugger;
      return Object.assign({}, state, {
        ...state,
        pageItems: action.pageItems,
        currentPage: action.currentPage,
      });
    default:
      return state;
  }
};

export default pagination;
