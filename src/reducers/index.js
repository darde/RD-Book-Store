import { combineReducers } from 'redux';
import books from './booksList';

const rootReducer = combineReducers({
  books,
});

export default rootReducer;
