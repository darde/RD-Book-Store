import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Books = ({ books }) => (
  <div>
    <header>
      <h1>Books</h1>
    </header>
    <ul>
      {
        books.map((book, idx) =>
          <li key={idx}>{book.title}</li>,
        )
      }
    </ul>
  </div>
);

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  })),
};

Books.defaultProps = {
  books: [],
};

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(
  mapStateToProps,
)(Books);
