import { connect } from 'react-redux';
import {
  resetActiveBook as resetBook,
} from '../actions';
import BookDetail from '../components/BookDetail/BookDetail';

const mapStateToProps = state => ({
  id: state.bookDetail.id,
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  resetActiveBook: () => { dispatch(resetBook()); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookDetail);
