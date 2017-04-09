import { connect } from 'react-redux';
import {
  toggleFavorite as toogleFavBook,
} from '../actions';
import BooksList from '../components/BooksList/BooksList';

const mapStateToProps = state => ({
  books: state.books,
  currentPage: state.pagination.currentPage,
  itemsPerPage: state.pagination.itemsPerPage,
  keyword: state.search.keyword,
  loading: state.search.loading,
  searchByAuthor: state.search.author,
  searchByTitle: state.search.title,
  totalResults: state.pagination.totalResults,
  uiOpacity: state.ui,
});

const mapDispatchToProps = dispatch => ({
  toggleFavorite: (books) => { dispatch(toogleFavBook(books)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksList);
