/* eslint-disable react/no-unused-prop-types */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../BookListItem/BookListItem';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import './styles/styles.less';
import {
  toggleFavorite as toogleFavBook,
} from '../../actions';

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgPaperStyle: 'bg-paper',
    };
    this.items = [];        // stores all books for the current page...
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let startIndex,
      midIndex,
      endIndex;
    let localStorageFavorites = [];
    if (nextProps.uiOpacity > 0) {
      this.setState({
        bgPaperStyle: 'bg-paper opacity-1',
      });
      if (!nextProps.loading) {
        if (window.localStorage.getItem('favorites')) {
          localStorageFavorites = JSON.parse(window.localStorage.getItem('favorites'));
          localStorageFavorites.map((_item) => {
            nextProps.books.map((book) => {
              if (_item === book.id) {
                book.volumeInfo.favorite = true;
              }
            });
          });
        }
        if (
            this.props.books !== nextProps.books ||
            this.props.currentPage !== nextProps.currentPage
          ) {
          startIndex = (nextProps.currentPage - 1) * nextProps.itemsPerPage;
          midIndex = startIndex + (nextProps.itemsPerPage / 2);
          endIndex = midIndex + (nextProps.itemsPerPage / 2);
          this.items[0] = nextProps.books.slice(startIndex, midIndex);
          this.items[1] = nextProps.books.slice(midIndex, endIndex);
        }
      }
    }
  }

  toggleFavorite(_id) {
    const _books = this.props.books.slice();
    _books.some((book) => {
      if (book.id === _id) {
        book.volumeInfo.favorite = !book.volumeInfo.favorite;
        return true;
      }
      return false;
    });
    // add/remove to/from localStorage...
    if (window.localStorage.getItem('favorites')) {
      const localStorageFav = JSON.parse(window.localStorage.getItem('favorites'));
      let newLocalFav = [];
      // if the favorite is already in localStorage, remove it
      if (localStorageFav.filter(item => item === _id).length > 0) {
        newLocalFav = localStorageFav.filter(item => item !== _id);
        window.localStorage.setItem('favorites', JSON.stringify(newLocalFav));
      } else {
        // if the favorite is not in localStorage, add it
        localStorageFav.push(_id);
        window.localStorage.setItem('favorites', JSON.stringify(localStorageFav));
      }
    } else {
      // if localStorage is not set yet...
      window.localStorage.setItem('favorites', JSON.stringify([_id]));
    }
    this.props.toggleFavorite(_books);
  }

  render() {
    let labelFound,
      startIndex,
      endIndex,
      _of;
    switch (this.props.totalResults) {
      case 0:
        labelFound = !this.props.loading && 'No results were found.';
        break;
      case 1:
        labelFound = '1 result found.';
        break;
      default:
        startIndex =
          (this.props.currentPage * this.props.itemsPerPage) - (this.props.itemsPerPage - 1);
        endIndex = this.props.currentPage * this.props.itemsPerPage;
        _of = endIndex < this.props.totalResults ? endIndex : this.props.totalResults;
        labelFound = `Showing ${startIndex} to ${_of} from ${this.props.totalResults} results found.`;
        break;
    }
    return (
      <div className='book-list'>
        <div className={this.state.bgPaperStyle}>
          <header>
            <span className='label-found'>{labelFound}</span>
          </header>
          {
            this.items.length > 0 && !this.props.loading ? (
              <div>
                <div className='list-container'>
                  {
                    this.items.map((_ul, i) =>
                      <ul key={i} className={i === 0 ? 'book-cards' : 'book-cards right'}>
                        {
                          _ul.map((book, idx) =>
                            <li key={idx}>
                              <BookListItem
                                id={book.id}
                                favorite={book.volumeInfo.favorite}
                                title={book.volumeInfo.title || ''}
                                description={
                                  book.volumeInfo.description ?
                                    book.volumeInfo.description : 'Description not available'
                                }
                                smallThumbnail={
                                  book.volumeInfo.imageLinks ?
                                    book.volumeInfo.imageLinks.smallThumbnail : ''
                                }
                                keyword={this.props.keyword}
                                authors={book.volumeInfo.authors ? book.volumeInfo.authors : []}
                                publishedDate={
                                  book.volumeInfo.publishedDate ?
                                    book.volumeInfo.publishedDate :
                                    'Published date not available'
                                }
                                searchByTitle={this.props.searchByTitle}
                                searchByAuthor={this.props.searchByAuthor}
                                toggleFavorite={this.toggleFavorite}
                              />
                            </li>,
                          )
                        }
                      </ul>,
                    )
                  }
                </div>
                <Pagination />
              </div>
            ) : <Spinner />
          }
        </div>
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
  toggleFavorite: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  uiOpacity: PropTypes.number.isRequired,
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
  uiOpacity: state.ui,
});

const mapDispatchToProps = dispatch => ({
  toggleFavorite: (books) => { dispatch(toogleFavBook(books)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksList);
