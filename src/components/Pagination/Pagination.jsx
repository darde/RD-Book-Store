/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  changePage as callNext,
  pullNewPages as pullNew,
  searchBooks as searchByKeyword,
} from '../../actions';
import './styles/styles.less';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.totalPages = [];   // stores all page numbers
    this.buttonPages = [];  // stores all visible page buttons
    this.buildPageButtons = this.buildPageButtons.bind(this);
    this.changePage = this.changePage.bind(this);
    this.checkPullRequest = this.checkPullRequest.bind(this);
  }

  componentWillMount() {
    if (this.props.totalResults > 0) {
      for (let i = 1; i <= Math.ceil(this.props.totalResults / this.props.itemsPerPage); i += 1) {
        this.totalPages.push(i);
      }
    }
    this.buildPageButtons(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.buildPageButtons(nextProps);
  }

  buildPageButtons(props) {
    let startIndex,
      endIndex;
    this.buttonPages = [];
    if (this.totalPages.length > (2 * props.itemsArround) + 1) {
      if (props.currentPage <= props.itemsArround) {
        startIndex = 1;
        endIndex = (2 * props.itemsArround) + 2;
      } else {
        startIndex = props.currentPage - props.itemsArround;
        endIndex = props.currentPage + props.itemsArround;
      }
    } else {
      startIndex = 1;
      endIndex = this.totalPages.length;
    }
    for (let i = startIndex; i < endIndex; i += 1) {
      this.buttonPages.push(i);
    }
  }

  changePage(page) {
    this.props.changePage(page);
    this.checkPullRequest(this.props, page);
  }

  checkPullRequest(props, _page) {
    const currentPage = _page || props.currentPage;
    const pullRequested =
      (Math.ceil(currentPage / (props.maxResults / props.itemsPerPage))) - 1;
    const hasPull = props.pulls.some((item, idx) => {
      if (idx === pullRequested && item === 1) {
        return true;
      }
      return false;
    });
    // If the page was not pulled yet, call the api...
    if (!hasPull) {
      const remoteStartIndex = pullRequested * props.maxResults;
      props.pullNewPages(remoteStartIndex);
    }
  }

  render() {
    return (
      <div className='pagination'>
        <button>
          Previous
        </button>
        <div className='pages'>
          {
            this.totalPages.length > 0 && (
              <ul>
                {
                  this.totalPages.map((page, idx) =>
                    <li
                      key={idx}
                      className={
                        idx + 1 < this.buttonPages[0] ||
                        idx + 1 > this.buttonPages[this.buttonPages.length - 1] ? 'hidden' : ''
                      }
                    >
                      <button
                        className={this.props.currentPage === idx + 1 ? 'active' : ''}
                        onClick={() => { this.changePage(idx + 1); }}
                        disabled={this.props.currentPage === idx + 1}
                      >
                        {page}
                      </button>
                    </li>,
                  )
                }
              </ul>
            )
          }
        </div>
        <button>
          Next
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsArround: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  maxResults: PropTypes.number.isRequired,
  pulls: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pullNewPages: PropTypes.func.isRequired,
  remoteStartIndex: PropTypes.number.isRequired,
  searchByAuthor: PropTypes.bool.isRequired,
  searchByTitle: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  searchKeyword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentPage: state.pagination.currentPage,
  itemsArround: state.pagination.itemsArround,
  itemsPerPage: state.pagination.itemsPerPage,
  keyword: state.search.keyword,
  maxResults: state.pagination.maxResults,
  pulls: state.pagination.pulls,
  remoteStartIndex: state.search.remoteStartIndex,
  searchByAuthor: state.search.author,
  searchByTitle: state.search.title,
  totalResults: state.pagination.totalResults,
});

const mapDispatchToProps = dispatch => ({
  changePage: (page) => { dispatch(callNext(page)); },
  searchKeyword: (keyword, title, author, remoteStartIndex) => {
    dispatch(searchByKeyword(keyword, title, author, remoteStartIndex));
  },
  pullNewPages: (startIndex) => { dispatch(pullNew(startIndex)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
