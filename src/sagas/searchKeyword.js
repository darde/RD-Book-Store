import { call, put, select } from 'redux-saga/effects';
import {
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
} from '../actions';
import {
  searchKeyword as searchByKeyword,
} from './apiCalls';

export function* searchKeyword() {
  try {
    const search = yield select(state => state.search);
    const books = yield call(searchByKeyword, search);
    yield put({ type: FETCH_BOOKS_SUCCESS, books });
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
