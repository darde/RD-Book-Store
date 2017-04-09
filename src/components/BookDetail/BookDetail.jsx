import React, { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {
  noPhoto,
} from '../../actions';
import './styles/styles.less';

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      if (nextProps.id !== '') {
        this.setState({
          visible: true,
        });
      }
    }
  }

  render() {
    let book;
    let image = noPhoto;
    const rating = [];
    if (this.props.books) {
      book = this.props.books.filter(_book => _book.id === this.props.id)[0];
      if (book && book.volumeInfo.averageRating) {
        for (let i = 0; i < book.volumeInfo.averageRating; i += 1) {
          rating.push(i);
        }
      }
      if (book && book.volumeInfo.imageLinks) {
        image = book.volumeInfo.imageLinks.thumbnail;
      }
    }
    return (
      <section className={this.state.visible ? 'book-detail visible' : 'book-detail'}>
        <Paper
          className={this.state.visible ? 'paper' : 'paper hidden'}
          zDepth={1}
        >
          {
            book && (
              <div className='detail-container'>
                <div className='btn-close-container'>
                  <FlatButton
                    label="Close"
                    primary
                    className='btn'
                    onClick={
                      () => {
                        this.setState({
                          visible: false,
                        });
                        this.props.resetActiveBook();
                      }
                    }
                  />
                </div>
                <div className='header'>
                  <div className='cover'>
                    <div
                      className='image'
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    />
                  </div>
                  <div className='detail-content'>
                    {
                      book.volumeInfo.previewLink ? (
                        <a href={book.volumeInfo.previewLink} title='Go to preview'>
                          {book.volumeInfo.previewLink}
                        </a>
                      ) : <span>Preview link not available</span>
                    }
                    <h1>{book.volumeInfo.title}</h1>
                    {
                      book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? (
                        <ul className='authors'>
                          {
                            book.volumeInfo.authors.map((author, idx) =>
                              <li key={idx}>{author}</li>,
                            )
                          }
                        </ul>
                      ) : <span className='author'>Author not available</span>
                    }
                    {
                      rating.length > 0 && (
                        <ul className='rating'>
                          {
                            rating.map((item, idx) =>
                              <li key={idx}>
                                <i className="material-icons">star_rate</i>
                              </li>,
                            )
                          }
                        </ul>
                      )
                    }
                    <div className='published-date'>
                      {
                        `Published date: ${book.volumeInfo.publishedDate ?
                          book.volumeInfo.publishedDate :
                            'Published date not available'}`
                      }
                    </div>
                    <div className='publisher'>
                      <i className="material-icons">library_books</i>
                      {
                        `Publisher: ${book.volumeInfo.publisher ?
                          book.volumeInfo.publisher :
                            'not available'}`
                      }
                    </div>
                    <div className='page-count'>Pages: {book.volumeInfo.pageCount}</div>
                    {
                      book.volumeInfo.industryIdentifiers ? (
                        <div className='identifier'>
                          Identifier: {`${book.volumeInfo.industryIdentifiers[0].type}:
                          ${book.volumeInfo.industryIdentifiers[0].identifier}`}
                        </div>
                      ) : <div className='identifier'>Book identifier not available.</div>
                    }
                  </div>
                </div>
                <div className='detail-content-wide'>
                  <h2>Description</h2>
                  <div className='description'>
                    <p>
                      {
                        book.volumeInfo.description ?
                          book.volumeInfo.description :
                            'not available'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )
          }
        </Paper>
      </section>
    );
  }
}

BookDetail.propTypes = {
  id: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape),
  resetActiveBook: PropTypes.func.isRequired,
};

BookDetail.defaultProps = {
  id: '',
  books: [],
};

export default BookDetail;
