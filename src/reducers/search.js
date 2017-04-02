import {
  PULL_NEW_PAGES,
  SEARCH_BOOKS,
  SEARCH_BOOKS_SUCCESS,
} from '../actions';

const search = (
  state = {
    keyword: '',
    remoteStartIndex: 0,
    title: false,
    author: false,
    loading: false,
    error: null,
    firstSearch: true,
  },
  action,
) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return Object.assign({}, state, {
        ...state,
        keyword: action.keyword,
        title: action.title,
        author: action.author,
        loading: true,
        firstSearch: false,
        remoteStartIndex: action.remoteStartIndex,
      });
    case SEARCH_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: null,
      });
    case PULL_NEW_PAGES:
      return Object.assign({}, state, {
        ...state,
        remoteStartIndex: action.remoteStartIndex,
        loading: true,
      });
    default:
      return state;
  }
};

export default search;
