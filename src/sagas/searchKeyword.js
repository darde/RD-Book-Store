import { call, put, select } from 'redux-saga/effects';
import {
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
    const books = yield call(searchByKeyword, search);
    if (books.length > 0) {
      yield put({ type: FETCH_BOOKS_SUCCESS, books });
    } else {
      yield put({ type: RESULTS_NOT_FOUND });
    }
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
