import { call, put, select } from 'redux-saga/effects';
import {
  BUILD_PAGE,
  FETCH_BOOKS_FAILED,
  PULL_NEW_PAGES,
  RESULTS_NOT_FOUND,
} from '../actions';
import {
  searchKeyword as searchByKeyword,
} from './apiCalls';

export function* searchKeyword() {
  try {
    const state = yield select();
    const remoteStartIndex = state.search.remoteStartIndex;
    // const remoteStartIndex = Number(search.remoteStartIndex);
    const response = yield call(searchByKeyword, state.search, remoteStartIndex);
    const fetchedBooks = response.items.slice();
    const totalResults = response.totalResults;
    const totalFetched = state.pagination.totalFetched;
    const maxResults = state.pagination.maxResults;
    // debugger;
    if (fetchedBooks.length > 0) {
      // yield put({ type: FETCH_BOOKS_SUCCESS, fetchedBooks, totalResults });
      if (remoteStartIndex >= totalFetched && totalFetched > 0) {
        // debugger;
        const books = state.pagination.books;
        const itemsPerPage = state.pagination.itemsPerPage;
        const totalBooks = books.concat(response.items);
        yield put({
          type: PULL_NEW_PAGES,
          books: totalBooks,
          pageItems: totalBooks.slice(remoteStartIndex, remoteStartIndex + itemsPerPage),
          totalFetched: state.pagination.totalFetched + maxResults,
          currentPage: Math.floor(remoteStartIndex / itemsPerPage),
        });
        // debugger;
        // yield put({ type: FETCH_BOOKS_SUCCESS, fetchedBooks, totalResults });
      } else {
        // debugger;
        // yield put({ type: FETCH_BOOKS_SUCCESS, fetchedBooks, totalResults });
        yield put({
          type: BUILD_PAGE,
          totalFetched: fetchedBooks.length,
          totalResults,
          pageItems: fetchedBooks.slice(0, 10),
          books: fetchedBooks.slice(),
        });
      }
    } else {
      yield put({ type: RESULTS_NOT_FOUND });
    }
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
