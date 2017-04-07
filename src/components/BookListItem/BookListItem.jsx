import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {
  setActiveBook as setActive,
} from '../../actions';
import './styles/styles.less';

class BookListItem extends Component {
  constructor(props) {
    super(props);
    this.highlight = this.highlight.bind(this);
  }

  // Applies highlight on the searched term
  highlight(text, keyword) {
    let _text = text;
    if (text.length > 50) {
      _text = `${text.substr(0, 50)}...`;
    }
    if (keyword !== '') {
      const reg = new RegExp(keyword, 'ig');
      _text = _text.replace(reg, keyword => `<span style='background: #ff0;'>${keyword}</span>`);
    }
    return { __html: _text };
  }

  render() {
    const image = this.props.smallThumbnail !== '' ?
                this.props.smallThumbnail :
                  'https://books.google.com.br/googlebooks/images/no_cover_thumb.gif';
    return (
      <Paper className='paper' zDepth={2}>
        <article className='book-list-item'>
          <div className='cover'>
            <div
              className='image'
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          </div>
          <div className='card-content'>
            <header>
              {
                this.props.searchByTitle ?
                  <h1
                    dangerouslySetInnerHTML={this.highlight(this.props.title, this.props.keyword)}
                  /> : <h1>{this.props.title}</h1>
              }
              <div className='favorite'>
                <button
                  onClick={() => { this.props.toggleFavorite(this.props.id); }}
                >
                  {
                    this.props.favorite ?
                      <i className="material-icons">favorite</i> :
                      <i className="material-icons">favorite_border</i>
                  }
                </button>
              </div>
            </header>
            <div className='published-date'>{this.props.publishedDate}</div>
            {
              this.props.authors.length > 0 ? (
                <ul className='authors'>
                  {
                    this.props.authors.map((author, idx) =>
                      (
                        this.props.searchByAuthor ?
                          <li
                            key={idx}
                            dangerouslySetInnerHTML={this.highlight(author, this.props.keyword)}
                          /> :
                          <li key={idx}>{author}</li>
                      ),
                    )
                  }
                </ul>
              ) : <span className='author'>Author not available</span>
            }
            <p className='description'>{this.props.description}</p>
            <RaisedButton
              label='Read more'
              secondary
              labelStyle={{ textTransform: 'inherit' }}
              onClick={() => { this.props.setActiveBook(this.props.id); }}
            />
          </div>
        </article>
      </Paper>
    );
  }
}

BookListItem.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  publishedDate: PropTypes.string,
  searchByAuthor: PropTypes.bool,
  searchByTitle: PropTypes.bool,
  setActiveBook: PropTypes.func.isRequired,
  smallThumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setActiveBook: (id) => { dispatch(setActive(id)); },
});

export default connect(
  null,
  mapDispatchToProps,
)(BookListItem);
