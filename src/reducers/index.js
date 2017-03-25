import { combineReducers } from 'redux';
import books from './booksList';
import search from './search';
import bookDetail from './bookDetail';

const rootReducer = combineReducers({
  books,
  search,
  bookDetail,
});

export default rootReducer;
