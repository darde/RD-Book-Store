/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  changePage as callNext,
} from '../../actions';
import './styles/styles.less';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableNext: true,
      disablePrev: true,
    };
    this.pages = [];
    this.goNextPage = this.goNextPage.bind(this);
    this.reducePages = this.reducePages.bind(this);
    this.togglePaginationButtons = this.togglePaginationButtons.bind(this);
  }

  componentWillMount() {
    if (this.props.totalFetched > this.props.pageItems.length) {
      this.setState({
        disableNext: false,
      });
    }
    this.reducePages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalFetched > nextProps.pageItems.length) {
      this.setState({
        disableNext: false,
      });
    }
    this.reducePages(nextProps);
    this.togglePaginationButtons(nextProps.currentPage);
  }

  reducePages(props) {
    this.pages = [];
    for (let i = 0; i < Math.floor(props.totalFetched / props.itemsPerPage); i += 1) {
      this.pages.push(i + 1);
    }
  }

  goNextPage(direction) {
    let startIndex,
      endIndex,
      page;
    if (direction === 1) {
      startIndex = this.props.currentPage * this.props.itemsPerPage;
      endIndex = startIndex + this.props.itemsPerPage;
      page = this.props.currentPage + 1;
    } else if (direction === -1) {
      startIndex =
        ((this.props.currentPage - 1) * this.props.itemsPerPage) - this.props.itemsPerPage;
      endIndex = startIndex + this.props.itemsPerPage;
      page = this.props.currentPage - 1;
    }
    const pageItems = this.props.books.slice(startIndex, endIndex);
    this.props.changePage(pageItems, page);
  }

  togglePaginationButtons(currentPage) {
    const lastPage = Math.floor(this.props.totalResults / this.props.itemsPerPage);
    if (currentPage === 1) {
      this.setState({
        disablePrev: true,
        disableNext: false,
      });
    } else if (currentPage > 1 && currentPage < lastPage) {
      this.setState({
        disablePrev: false,
        disableNext: false,
      });
    } else if (currentPage === lastPage) {
      this.setState({
        disablePrev: false,
        disableNext: true,
      });
    }
  }

  render() {
    return (
      <div className='pagination'>
        <button
          disabled={this.state.disablePrev}
          onClick={() => { this.goNextPage(-1); }}
          className={this.state.disablePrev ? 'disabled' : 'enabled'}
        >
          Previous
        </button>
        <div className='pages'>
          {
            this.pages.length > 1 && (
              <ul>
                {
                  this.pages.map((page, idx) =>
                    <li key={idx}>
                      <button
                        className={this.props.currentPage === idx + 1 ? 'active' : ''}
                      >
                        <span>{page}</span>
                      </button>
                    </li>,
                  )
                }
              </ul>
            )
          }
        </div>
        <button
          disabled={this.state.disableNext}
          onClick={() => { this.goNextPage(1); }}
          className={this.state.disableNext ? 'disabled' : 'enabled'}
        >
          Next
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalFetched: PropTypes.number,
  totalResults: PropTypes.number.isRequired,
  pageItems: PropTypes.arrayOf(PropTypes.shape),
  books: PropTypes.arrayOf(PropTypes.shape),
  currentPage: PropTypes.number,
  changePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  itemsPerPage: 0,
  totalFetched: 0,
  pageItems: [],
  currentPage: 1,
};

const mapStateToProps = state => ({
  books: state.books.items,
  itemsPerPage: state.pagination.itemsPerPage,
  totalFetched: state.pagination.totalFetched,
  totalResults: state.pagination.totalResults,
  pageItems: state.pagination.pageItems,
  currentPage: state.pagination.currentPage,
});
// const mapStateToProps = (state) => {
//   debugger;
//   return {
//     books: state.books,
//     itemsPerPage: state.pagination.itemsPerPage,
//     totalFetched: state.pagination.totalFetched,
//     pageItems: state.pagination.pageItems,
//     currentPage: state.pagination.currentPage,
//   };
// };

const mapDispatchToProps = dispatch => ({
  changePage: (pageItems, page) => { dispatch(callNext(pageItems, page)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
