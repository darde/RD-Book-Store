import { call, put } from 'redux-saga/effects';
import {
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
} from '../actions';
import {
  fetchBooks as fetchBooksList,
} from './apiCalls';

export function* fetchBooks() {
  try {
    const books = yield call(fetchBooksList);
    yield put({ type: FETCH_BOOKS_SUCCESS, books });
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
