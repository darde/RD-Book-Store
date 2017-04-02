import { combineReducers } from 'redux';
import books from './books';
import search from './search';
import bookDetail from './bookDetail';
import pagination from './pagination';
import ui from './ui';

const rootReducer = combineReducers({
  books,
  search,
  pagination,
  bookDetail,
  ui,
});

export default rootReducer;
