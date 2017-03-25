import {
  SEARCH_KEYWORD,
} from '../actions';

const search = (state = '', action) => {
  switch (action.type) {
    case SEARCH_KEYWORD:
      return Object.assign({}, state, {
        keyword: action.keyword,
        title: action.title,
        author: action.author,
      });
    default:
      return state;
  }
};

export default search;
