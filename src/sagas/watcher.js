import { put, takeEvery } from 'redux-saga/effects';
import { searchBooks } from './search';
import {
  PULL_NEW_PAGES,
  SEARCH_BOOKS,
  SEARCH_BOOKS_FAILED,
} from '../actions';

export function* watcher() {
  try {
    yield [
      takeEvery(SEARCH_BOOKS, searchBooks),
      takeEvery(PULL_NEW_PAGES, searchBooks),
    ];
  } catch (error) {
    yield put({ type: SEARCH_BOOKS_FAILED });
  }
}
