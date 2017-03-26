import { combineReducers } from 'redux';
import books from './booksList';
import search from './search';
import bookDetail from './bookDetail';
import pagination from './pagination';

const rootReducer = combineReducers({
  books,
  search,
  pagination,
  bookDetail,
});

export default rootReducer;
