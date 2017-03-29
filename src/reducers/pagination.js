import {
  BUILD_PAGE,
  CHANGE_PAGE,
  RESET_SEARCH,
  RESULTS_NOT_FOUND,
  itemsArround,
  itemsPerPage,
  maxResults,
} from '../actions';

const pagination = (
  state = {
    currentPage: 1,
    currentPull: 0,
    pulls: [],
    maxResults,
    itemsPerPage,
    itemsArround,
    totalResults: 0,
  },
  action,
) => {
  switch (action.type) {
    case BUILD_PAGE:
      debugger;
      return Object.assign({}, state, {
        ...state,
        currentPage: action.currentPage,
        currentPull: action.currentPull,
        pulls: action.pulls,
        totalResults: action.totalResults,
      });
    case CHANGE_PAGE:
      debugger;
      return Object.assign({}, state, {
        ...state,
        currentPage: action.currentPage,
      });
    case RESET_SEARCH:
      debugger;
      return Object.assign({}, state, {
        currentPage: 1,
        currentPull: 0,
        pulls: [],
        maxResults,
        itemsPerPage,
        itemsArround,
        totalResults: 0,
      });
    // case PULL_NEW_PAGES:
    //   return Object.assign({}, state, {
    //     ...state,
    //   });
    case RESULTS_NOT_FOUND:
      return state;
    default:
      return state;
  }
};

export default pagination;
