import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../BookListItem/BookListItem';
import Pagination from '../Pagination/Pagination';
import {
  searchBooks as searchByKeyword,
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
    this.items = [];
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    let startIndex,
      endIndex;
    if (this.props.books !== nextProps.books || this.props.currentPage !== nextProps.currentPage) {
      startIndex = (nextProps.currentPage - 1) * nextProps.itemsPerPage;
      endIndex = (startIndex + nextProps.itemsPerPage) - 1;
      this.items = nextProps.books.slice(startIndex, endIndex);
    }
    debugger;
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
    let labelFound,
      startIndex,
      endIndex,
      _of;
    switch (this.props.totalResults) {
      case 0:
        labelFound = 'No results found.';
        break;
      case 1:
        labelFound = '1 result found.';
        break;
      default:
        startIndex =
          (this.props.currentPage * this.props.itemsPerPage) - (this.props.itemsPerPage - 1);
        endIndex = this.props.currentPage * this.props.itemsPerPage;
        _of = endIndex < this.props.totalResults ? endIndex : this.props.totalResults;
        labelFound = `Showing ${startIndex} of ${_of} from ${this.props.totalResults} results found.`;
        break;
    }
    return (
      <div>
        <header>
          <h1>Books</h1>
          <h2>{labelFound}</h2>
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
                this.props.searchBooks(
                  this.input.value,
                  this.state.title,
                  this.state.author,
                  this.state.subject,
                );
              }
            }
          >
            Search
          </button>
        </div>
        {
          this.items.length > 0 ? (
            <div>
              <ul>
                {
                  this.items.map((book, idx) =>
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
              <Pagination />
            </div>
          ) : <div>{this.props.loading}</div>
        }
      </div>
    );
  }
}

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape).isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  searchByAuthor: PropTypes.bool,
  searchByTitle: PropTypes.bool,
  totalResults: PropTypes.number.isRequired,
  searchBooks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
  currentPage: state.pagination.currentPage,
  itemsPerPage: state.pagination.itemsPerPage,
  keyword: state.search.keyword,
  loading: state.search.loading,
  searchByAuthor: state.search.author,
  searchByTitle: state.search.title,
  totalResults: state.pagination.totalResults,
});

const mapDispatchToProps = dispatch => ({
  searchBooks: (keyword, title, author, remoteStartIndex) => {
    dispatch(searchByKeyword(keyword, title, author, remoteStartIndex));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksList);
