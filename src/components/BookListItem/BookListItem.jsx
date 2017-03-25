/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  setActiveBook as setActive,
} from '../../actions';
import './styles/styles.less';

// Applies highlight on the searched term
const highlight = (text, keyword) => {
  let _text = text;
  if (keyword !== '') {
    const reg = new RegExp(keyword, 'ig');
    _text = text.replace(reg, keyword => `<span style='background: #ff0;'>${keyword}</span>`);
  }
  return { __html: _text };
};

const BookListItem = ({
  id,
  title,
  authors,
  publishedDate,
  smallThumbnail,
  keyword,
  setActiveBook,
  searchByTitle,
  searchByAuthor,
}) => (
  <article className='book-list-item'>
    <div className='cover'>
      <figure>
        <img
          src={
            smallThumbnail !== '' ?
              smallThumbnail :
              'https://books.google.com.br/googlebooks/images/no_cover_thumb.gif'
          }
          alt={title}
        />
      </figure>
    </div>
    {
      searchByTitle ?
        <h1 dangerouslySetInnerHTML={highlight(title, keyword)} /> :
        <h1>{title}</h1>
    }
    <button
      onClick={
        () => {
          setActiveBook(id);
          hashHistory.push('/book-detail');
        }
      }
    >
      Preview Details
    </button>
    {
      authors.length > 0 && (
        <ul>
          {
            authors.map((author, idx) =>
              (
                searchByAuthor ?
                  <li key={idx} dangerouslySetInnerHTML={highlight(author, keyword)} /> :
                  <li key={idx}>{author}</li>
              ),
            )
          }
        </ul>
      )
    }
    <p>{publishedDate}</p>
    {/*
      searchBySubject ?
        <p dangerouslySetInnerHTML={highlight(description, keyword)} /> :
        <p>{description}</p>
    */}
  </article>
);

BookListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  publishedDate: PropTypes.string,
  smallThumbnail: PropTypes.string,
  keyword: PropTypes.string,
  setActiveBook: PropTypes.func.isRequired,
  searchByTitle: PropTypes.bool,
  searchByAuthor: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  setActiveBook: (id) => { dispatch(setActive(id)); },
});

export default connect(
  null,
  mapDispatchToProps,
)(BookListItem);
