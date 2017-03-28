import { call, put, select } from 'redux-saga/effects';
import {
  BUILD_PAGE,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILED,
} from '../actions';
import {
  searchBooks as search,
} from './apiCalls';

export function* searchBooks() {
  try {
    debugger;
    const state = yield select();
    const response = yield call(search, state.search);
    const startIndex = state.search.remoteStartIndex;
    const maxResults = state.pagination.maxResults;
    const totalBooksFetched = state.books.concat(response.items);
    const pulls = state.pagination.pulls.slice();
    if (pulls.length === 0) {
      for (let i = 0, l = Math.ceil(response.totalResults / maxResults); i < l; i += 1) {
        pulls.push(0);
      }
    }
    const currentPull = Math.ceil(startIndex / maxResults);
    pulls[currentPull] = 1;
    yield put({
      type: BUILD_PAGE,
      totalResults: response.totalResults,
      currentPull,
      pulls,
      currentPage: state.pagination.currentPage,
    });
    yield put({ type: SEARCH_BOOKS_SUCCESS, books: totalBooksFetched });
  } catch (error) {
    yield put({ type: SEARCH_BOOKS_FAILED });
  }
}
