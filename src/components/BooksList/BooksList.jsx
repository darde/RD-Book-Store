import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../BookListItem/BookListItem';
import {
  searchKeyword as searchByKeyword,
} from '../../actions';
import './styles/styles.less';

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: true,
      author: false,
      subject: false,
    };
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
  }

  toggleCheckBox(e) {
    if (e.target.id === 'title') {
      this.setState({
        title: !this.state.title,
      });
    } else if (e.target.id === 'author') {
      this.setState({
        author: !this.state.author,
      });
    } else if (e.target.id === 'subject') {
      this.setState({
        subject: !this.state.subject,
      });
    }
  }

  render() {
    let labelFound;
    switch (this.props.books.length) {
      case 0:
        labelFound = 'No results.';
        break;
      case 1:
        labelFound = '1 result found.';
        break;
      default:
        labelFound = `${this.props.books.length} results found.`;
        break;
    }
    return (
      <div>
        <header>
          <h1>Books</h1>
          <h2>Total: {labelFound}</h2>
        </header>
        <div className='search-books'>
          <label htmlFor='search'>Search for keyword</label>
          <div className='checkbox'>
            <input
              type='checkbox'
              id='title'
              checked={this.state.title}
              onChange={this.toggleCheckBox}
            />
            <label htmlFor='title'>By Title</label>
          </div>
          <div className='checkbox'>
            <input
              type='checkbox'
              id='author'
              checked={this.state.author}
              onChange={this.toggleCheckBox}
            />
            <label htmlFor='author'>By Author</label>
          </div>
          <input
            type='text'
            placeholder='Type a keyword'
            defaultValue={this.props.keyword}
            ref={(input) => { this.input = input; }}
            autoFocus
          />
          <button
            onClick={
              () => {
                this.props.searchKeyword(
                  this.input.value, this.state.title, this.state.author, this.state.subject);
              }
            }
          >
            Search
          </button>
        </div>
        {
          this.props.books.length > 0 ? (
            <ul>
              {
                this.props.books.map((book, idx) =>
                  <li key={idx}>
                    <BookListItem
                      id={book.id}
                      title={book.volumeInfo.title || ''}
                      smallThumbnail={
                        book.volumeInfo.imageLinks ?
                          book.volumeInfo.imageLinks.smallThumbnail : ''
                      }
                      keyword={this.props.keyword}
                      authors={book.volumeInfo.authors ? book.volumeInfo.authors : []}
                      publishedDate={
                        book.volumeInfo.publishedDate ?
                          book.volumeInfo.publishedDate :
                          'not available'
                      }
                      searchByTitle={this.props.searchByTitle}
                      searchByAuthor={this.props.searchByAuthor}
                    />
                  </li>,
                )
              }
            </ul>
          ) : <div>No results</div>
        }
      </div>
    );
  }
}

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape),
  keyword: PropTypes.string,
  searchByTitle: PropTypes.bool,
  searchByAuthor: PropTypes.bool,
  searchKeyword: PropTypes.func.isRequired,
};

BooksList.defaultProps = {
  books: [],
  keyword: '',
  searchByTitle: false,
  searchByAuthor: false,
};

const mapStateToProps = state => ({
  books: state.books,
  keyword: state.search.keyword,
  searchByTitle: state.search.title,
  searchByAuthor: state.search.author,
});

const mapDispatchToProps = dispatch => ({
  searchKeyword: (keyword, title, author) => {
    dispatch(searchByKeyword(keyword, title, author));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksList);
