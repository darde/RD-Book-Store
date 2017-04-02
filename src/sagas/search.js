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
    const state = yield select();
    const response = yield call(search, state.search);
    const startIndex = state.search.remoteStartIndex;
    const maxResults = state.pagination.maxResults;
    const books = state.books.slice();
    const pulls = state.pagination.pulls;
    /* If the search is reseted, books length equals zero */
    if (books.length === 0) {
      for (let i = 0; i < response.totalResults; i += 1) {
        books.push({});
      }
      for (let i = 0; i < Math.ceil(response.totalResults / maxResults); i += 1) {
        pulls.push(0);
      }
    }
    response.items.map((item, idx) => {
      item.volumeInfo.favorite = false;
      books.splice(startIndex + idx, 1, item);
    });
    const currentPull = Math.ceil(startIndex / maxResults);
    pulls[currentPull] = 1;
    yield put({
      type: BUILD_PAGE,
      totalResults: response.totalResults,
      currentPull,
      pulls,
      currentPage: state.pagination.currentPage,
    });
    yield put({ type: SEARCH_BOOKS_SUCCESS, books });
  } catch (error) {
    yield put({ type: SEARCH_BOOKS_FAILED });
  }
}
