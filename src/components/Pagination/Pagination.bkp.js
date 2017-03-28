/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  changePage as callNext,
  searchKeyword as searchByKeyword,
} from '../../actions';
import './styles/styles.less';

// class Pagination extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       disableNext: true,
//       disablePrev: true,
//     };
//     this.visiblePages = [];
//     this.goNextPage = this.goNextPage.bind(this);
//     this.showHidePageButtons = this.showHidePageButtons.bind(this);
//     this.togglePaginationButtons = this.togglePaginationButtons.bind(this);
//   }

//   componentWillMount() {
//     if (this.props.totalFetched > this.props.pageItems.length) {
//       this.setState({
//         disableNext: false,
//       });
//     }
//     this.showHidePageButtons(this.props);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.totalFetched > nextProps.pageItems.length) {
//       this.setState({
//         disableNext: false,
//       });
//     }
//     if (nextProps.currentPage === this.visiblePages[0]) {
//       this.showHidePageButtons(nextProps);
//     }
//     this.togglePaginationButtons(nextProps.currentPage, nextProps.totalResults);
//     this.showHidePageButtons(nextProps);
//   }

//   showHidePageButtons(props) {
//     debugger;
//     const numButtons = (props.maxResults / props.itemsPerPage) + 1;
//     let startIndex = 0;
//     let endIndex = 0;

//     // check if this is the first pull
//     if (this.visiblePages.length === 0) {
//       debugger;
//       startIndex = 1;
//       endIndex = 9;
//     } else if (props.currentPage > 5) {
//       debugger;
//       this.visiblePages = [];
//       startIndex = props.currentPage - 4;
//       endIndex = props.currentPage + 4;
//     }
//     // check if page number is increasing...
//     // else if (props.currentPage > this.visiblePages[5])
//     // if (
//     //     this.visiblePages.length === 0 ||
//     //     props.currentPage > this.visiblePages[this.visiblePages.length - 1] ||
//     //     props.currentPage < numButtons
//     // ) {
//     //   debugger;
//     //   startIndex = props.pull === 0 ?
//     //   1 : (props.currentPage - numButtons) + 1;
//     //   endIndex = props.pull === 0 ?
//     //   startIndex + numButtons : startIndex + ((numButtons * 2) - 1);
//     // } else {
//     //   debugger;
//     //   startIndex = props.currentPage - (numButtons - 1);
//     //   endIndex = props.currentPage + numButtons;
//     // }
//     // this.visiblePages = [];
//     // for (let i = startIndex; i < endIndex; i += 1) {
//     //   this.visiblePages.push(i);
//     // }
//     for (let i = startIndex; i <= endIndex; i += 1) {
//       this.visiblePages.push(i);
//     }
//     debugger;
//   }

//   /* goNextPage     dispatches an action to change of page
//   *  @param         direction   { 0: next page, -1: previous page, n: nth page }
//   */
//   goNextPage(direction) {
//     let startIndex,
//       endIndex,
//       page;
//     if (direction === 0) {
//       startIndex = this.props.currentPage * this.props.itemsPerPage;
//       endIndex = startIndex + this.props.itemsPerPage;
//       if (startIndex + this.props.itemsPerPage >= this.props.totalFetched) {
//         this.props.searchKeyword(
//           this.props.keyword,
//           this.props.searchByTitle,
//           this.props.searchByAuthor,
//           this.props.totalFetched,
//         );
//       }
//       page = this.props.currentPage + 1;
//     } else if (direction === -1) {
//       startIndex =
//         ((this.props.currentPage - 1) * this.props.itemsPerPage) - this.props.itemsPerPage;
//       endIndex = startIndex + this.props.itemsPerPage;
//       page = this.props.currentPage - 1;
//     } else if (direction >= 1) {
//       startIndex = (direction - 1) * this.props.itemsPerPage;
//       endIndex = startIndex + this.props.itemsPerPage;
//       page = direction;
//       if (startIndex >= this.props.totalFetched) {
//         this.props.searchKeyword(
//           this.props.keyword,
//           this.props.searchByTitle,
//           this.props.searchByAuthor,
//           this.props.totalFetched,
//         );
//       }
//     }
//     const pageItems = this.props.books.slice(startIndex, endIndex);
//     this.props.changePage(pageItems, page);
//     // this.showHidePageButtons(this.props);
//   }

//   togglePaginationButtons(currentPage, totalResults) {
//     const lastPage = Math.ceil(totalResults / this.props.itemsPerPage);
//     if (currentPage === 1) {
//       if (totalResults <= this.props.itemsPerPage) {
//         this.setState({
//           disablePrev: true,
//           disableNext: true,
//         });
//       } else {
//         this.setState({
//           disablePrev: true,
//           disableNext: false,
//         });
//       }
//     } else if (currentPage > 1 && currentPage < lastPage) {
//       this.setState({
//         disablePrev: false,
//         disableNext: false,
//       });
//     } else if (currentPage === lastPage) {
//       this.setState({
//         disablePrev: false,
//         disableNext: true,
//       });
//     }
//   }

//   render() {
//     return (
//       <div className='pagination'>
//         <button
//           disabled={this.state.disablePrev}
//           onClick={() => { this.goNextPage(-1); }}
//           className={this.state.disablePrev ? 'disabled' : 'enabled'}
//         >
//           Previous
//         </button>
//         <div className='pages'>
//           {
//             this.props.books.length > 1 && (
//               <ul>
//                 {
//                   this.props.books.map((page, idx) =>
//                     <li
//                       key={idx}
//                       className={
//                         idx + 1 < this.visiblePages[0] ||
//                         idx + 1 > this.visiblePages[this.visiblePages.length - 1] ? 'hidden' : ''
//                       }
//                     >
//                       <button
//                         onClick={() => { this.goNextPage(idx + 1); }}
//                         className={this.props.currentPage === idx + 1 ? 'active' : ''}
//                         disabled={this.props.currentPage === idx + 1}
//                       >
//                         <span>
//                           {idx + 1}
//                         </span>
//                       </button>
//                     </li>,
//                   )
//                 }
//               </ul>
//             )
//           }
//         </div>
//         <button
//           disabled={this.state.disableNext}
//           onClick={() => { this.goNextPage(0); }}
//           className={this.state.disableNext ? 'disabled' : 'enabled'}
//         >
//           Next
//         </button>
//       </div>
//     );
//   }
// }

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalFetched: PropTypes.number,
  totalResults: PropTypes.number.isRequired,
  maxResults: PropTypes.number.isRequired,
  pageItems: PropTypes.arrayOf(PropTypes.shape),
  pull: PropTypes.number.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape).isRequired,
  currentPage: PropTypes.number,
  searchByTitle: PropTypes.bool,
  remoteStartIndex: PropTypes.number.isRequired,
  searchByAuthor: PropTypes.bool,
  keyword: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired,
  searchKeyword: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  itemsPerPage: 0,
  totalFetched: 0,
  pageItems: [],
  currentPage: 1,
};

const mapStateToProps = state => ({
  books: state.pagination.books,
  itemsPerPage: state.pagination.itemsPerPage,
  totalFetched: state.pagination.totalFetched,
  maxResults: state.pagination.maxResults,
  totalResults: state.pagination.totalResults,
  pageItems: state.pagination.pageItems,
  currentPage: state.pagination.currentPage,
  pull: state.pagination.pull,
  remoteStartIndex: state.search.remoteStartIndex,
  keyword: state.search.keyword,
  searchByTitle: state.search.title,
  searchByAuthor: state.search.author,
});
// const mapStateToProps = (state) => {
//   debugger;
//   return {
//     books: state.pagination.books,
//     itemsPerPage: state.pagination.itemsPerPage,
//     totalFetched: state.pagination.totalFetched,
//     maxResults: state.pagination.maxResults,
//     totalResults: state.pagination.totalResults,
//     pageItems: state.pagination.pageItems,
//     currentPage: state.pagination.currentPage,
//     pull: state.pagination.pull,
//     remoteStartIndex: state.search.remoteStartIndex,
//     keyword: state.search.keyword,
//     searchByTitle: state.search.title,
//     searchByAuthor: state.search.author,
//   };
// };

const mapDispatchToProps = dispatch => ({
  changePage: (pageItems, page) => { dispatch(callNext(pageItems, page)); },
  searchKeyword: (keyword, title, author, remoteStartIndex) => {
    dispatch(searchByKeyword(keyword, title, author, remoteStartIndex));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
