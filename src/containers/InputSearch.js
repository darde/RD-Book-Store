import { connect } from 'react-redux';
import {
  resetSearch as startNewSearch,
  searchBooks as searchByKeyword,
  toggleResultsOpacity as toggleOpacity,
} from '../actions';
import InputSearch from '../components/InputSearch/InputSearch';

const mapStateToProps = state => ({
  keyword: state.search.keyword,
  firstSearch: state.search.firstSearch,
});

const mapDispatchToProps = dispatch => ({
  searchBooks: (keyword, title, author, remoteStartIndex) => {
    dispatch(searchByKeyword(keyword, title, author, remoteStartIndex));
  },
  resetSearch: () => { dispatch(startNewSearch()); },
  toggleResultsOpacity: () => { dispatch(toggleOpacity()); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSearch);
