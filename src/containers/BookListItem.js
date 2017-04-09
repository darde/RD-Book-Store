import { connect } from 'react-redux';
import {
  setActiveBook as setActive,
} from '../actions';
import BookListItem from '../components/BookListItem/BookListItem';

const mapDispatchToProps = dispatch => ({
  setActiveBook: (id) => { dispatch(setActive(id)); },
});

export default connect(
  null,
  mapDispatchToProps,
)(BookListItem);
