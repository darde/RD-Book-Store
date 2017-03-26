import { call, put } from 'redux-saga/effects';
import {
  CALL_FIRST_PAGE,
  FETCH_BOOKS_FAILED,
  FETCH_BOOKS_SUCCESS,
} from '../actions';
import {
  fetchBooks as fetchBooksList,
} from './apiCalls';

export function* fetchBooks() {
  try {
    const response = yield call(fetchBooksList);
    const books = response.items.slice();
    const totalResults = response.totalResults;
    yield put({ type: FETCH_BOOKS_SUCCESS, books, totalResults });
    yield put({
      type: CALL_FIRST_PAGE,
      totalFetched: books.length,
      totalResults,
      pageItems: books.slice(0, 10),
      books,
    });
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
