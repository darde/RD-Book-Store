import { combineReducers } from 'redux';
import books from './booksList';
import search from './search';

const rootReducer = combineReducers({
  books,
  search,
});

export default rootReducer;
