import { connect } from 'react-redux';
import {
  changePage as callNext,
  pullNewPages as pullNew,
} from '../actions';
import Pagination from '../components/Pagination/Pagination';

const mapStateToProps = state => ({
  currentPage: state.pagination.currentPage,
  itemsArround: state.pagination.itemsArround,
  itemsPerPage: state.pagination.itemsPerPage,
  loading: state.search.loading,
  maxResults: state.pagination.maxResults,
  pulls: state.pagination.pulls,
  remoteStartIndex: state.search.remoteStartIndex,
  totalResults: state.pagination.totalResults,
});

const mapDispatchToProps = dispatch => ({
  changePage: (page) => { dispatch(callNext(page)); },
  pullNewPages: (startIndex) => { dispatch(pullNew(startIndex)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
