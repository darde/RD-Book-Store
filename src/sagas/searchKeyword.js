import { call, put, select } from 'redux-saga/effects';
import {
  CALL_FIRST_PAGE,
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
  RESULTS_NOT_FOUND,
} from '../actions';
import {
  searchKeyword as searchByKeyword,
} from './apiCalls';

export function* searchKeyword() {
  try {
    const search = yield select(state => state.search);
    const response = yield call(searchByKeyword, search);
    const books = response.items.slice();
    const totalResults = response.totalResults;
    if (books.length > 0) {
      yield put({ type: FETCH_BOOKS_SUCCESS, books, totalResults });
      yield put({
        type: CALL_FIRST_PAGE,
        totalFetched: books.length,
        totalResults,
        pageItems: books.slice(0, 10),
        books,
      });
    } else {
      yield put({ type: RESULTS_NOT_FOUND });
    }
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
