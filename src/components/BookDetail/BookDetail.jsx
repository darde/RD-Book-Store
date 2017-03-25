import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  noPhoto,
} from '../../actions';
import './styles/styles.less';

const BookDetail = ({ id, books }) => {
  const book = books.filter(_book => _book.id === id)[0];
  let authorsLabel;
  if (book.volumeInfo) {
    authorsLabel = book.volumeInfo.authors.length > 1 ? 'Authors' : 'Author';
  }
  return (
    <section className='book-container'>
      {
        book.volumeInfo && (
          <div>
            <header>
              <figure>
                <img
                  src={
                    book.volumeInfo.imageLinks ?
                      book.volumeInfo.imageLinks.thumbnail : noPhoto
                  }
                  alt={book.volumeInfo.title}
                />
                <caption>{book.volumeInfo.title}</caption>
              </figure>
              <h1>{book.volumeInfo.title}</h1>
            </header>
            <div className='content'>
              <h2>Rating: {book.volumeInfo.averageRating}</h2>
              <h3>{authorsLabel}</h3>
              {
                book.volumeInfo.authors.length > 0 && (
                  <ul>
                    {
                      book.volumeInfo.authors.map(
                        (author, idx) =>
                          <li key={idx}>
                            <span>{author}</span>
                          </li>,
                      )
                    }
                  </ul>
                )
              }
              <h4>Pages: {book.volumeInfo.pageCount}</h4>
              <h4>Publisher: {
                book.volumeInfo.publisher ? book.volumeInfo.publisher : 'not available'
              }</h4>
              <h4>Published date: {
                book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'not available'
              }</h4>
              <h4>ISBN: {book.volumeInfo.industryIdentifiers[0].identifier}</h4>
              <h4>Language: {
                book.volumeInfo.language ? book.volumeInfo.language : 'not-available'
              }</h4>
              <a href={book.volumeInfo.previewLink}>Preview</a>
              <p>{book.volumeInfo.description}</p>
            </div>
          </div>
        )
      }
    </section>
  );
};

BookDetail.propTypes = {
  id: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape),
};

BookDetail.defaultProps = {
  id: '',
  books: [],
};

const mapStateToProps = state => ({
  id: state.bookDetail,
  books: state.books,
});

export default connect(
  mapStateToProps,
)(BookDetail);
