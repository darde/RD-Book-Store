/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
/* eslint-disable no-bitwise */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  searchKeyword as searchByKeyword,
} from '../../actions';
import './styles/styles.less';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: false,
      title: true,
    };
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.highlight = this.highlight.bind(this);
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
    }
  }

  highlight(title) {
    let _title = title;
    if (this.props.keyword !== '') {
      const key = this.props.keyword;
      const reg = new RegExp(this.props.keyword, 'ig');
      _title = title.replace(reg, key => `<span style='background: #ff0;'>${key}</span>`);
    }
    return { __html: _title };
  }

  render() {
    return (
      <div>
        <header>
          <h1>Books</h1>
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
                this.props.searchKeyword(this.input.value, this.state.title, this.state.author);
              }
            }
          >
            Search
          </button>
        </div>
        <ul>
          {
            this.props.books.map((book, idx) =>
              <li key={idx}>
                <div dangerouslySetInnerHTML={this.highlight(book.volumeInfo.title)} />
              </li>,
            )
          }
        </ul>
      </div>
    );
  }
}

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
  })),
  keyword: PropTypes.string,
  searchKeyword: PropTypes.func.isRequired,
};

Books.defaultProps = {
  books: [],
  keyword: '',
};

const Highight = ({ text }) => (
  <span>{text}</span>
);

Highight.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
  keyword: state.search.keyword,
});

const mapDispatchToProps = dispatch => ({
  searchKeyword: (keyword, title, author) => {
    dispatch(searchByKeyword(keyword, title, author));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);
