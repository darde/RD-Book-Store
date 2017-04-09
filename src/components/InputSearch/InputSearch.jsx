import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import './styles/styles.less';

const styles = {
  textField: {
    width: 350,
    height: 80,
    marginRight: 20,
  },
  button: {
    marginBottom: 7,
  },
};

class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: true,
      author: false,
      subject: false,
      searchBoxstyle: 'input-search',
      paperStyle: {
        position: 'absolute',
        zIndex: -1,
        width: 600,
        height: 200,
        padding: 20,
        opacity: 1,
        transition: 'opacity 0.5s',
      },
      errorText: '',
    };
    this.input = null;
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.dispatchNewSearch = this.dispatchNewSearch.bind(this);
    this.animateSearch = this.animateSearch.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  validateFields(value) {
    if (value !== '' && (this.state.author || this.state.title)) {
      this.setState({
        errorText: '',
      });
      return true;
    } else if (!this.state.title && !this.state.author) {
      this.setState({
        errorText: 'Select at least one filter (Title or Author)',
      });
    } else {
      this.setState({
        errorText: 'This field is required',
      });
    }
    return false;
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

  dispatchNewSearch(value) {
    if (this.validateFields(value)) {
      this.props.toggleResultsOpacity();
      this.props.resetSearch();
      this.props.searchBooks(
        value,
        this.state.title,
        this.state.author,
        this.state.subject,
      );
    }
  }

  animateSearch(value) {
    if (this.validateFields(value)) {
      this.setState({
        paperStyle: {
          ...this.state.paperStyle,
          opacity: 0,
        },
        errorText: '',
        searchBoxstyle: 'input-search top-position',
      });
      this.dispatchNewSearch(value);
    }
  }

  render() {
    return (
      <div className={this.state.searchBoxstyle}>
        <Paper style={this.state.paperStyle} zDepth={1} />
        <div className='search-container'>
          <h2>Search for <span>books</span> and get a relax reading.</h2>
          <div className='search-field-set'>
            <TextField
              defaultValue={this.props.keyword}
              ref={(input) => { this.input = input; }}
              autoFocus
              hintText='Type a keyword'
              errorText={this.state.errorText}
              floatingLabelText='Search for keyword'
              style={styles.textField}
            />
            <RaisedButton
              label="Search"
              primary
              labelStyle={{ textTransform: 'inherit' }}
              onClick={
                this.props.firstSearch ?
                  () => { this.animateSearch(this.input.getValue()); } :
                  () => { this.dispatchNewSearch(this.input.getValue()); }
              }
              style={styles.button}
            />
          </div>
          <div className='toggle-field-set'>
            <div className='toggle'>
              <Toggle
                id='title'
                label="Search by Title"
                labelPosition="right"
                defaultToggled={this.state.title}
                onClick={this.toggleCheckBox}
              />
            </div>
            <div className='toggle'>
              <Toggle
                id='author'
                label="Search by Author"
                labelPosition="right"
                defaultToggled={this.state.author}
                onClick={this.toggleCheckBox}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InputSearch.propTypes = {
  keyword: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchBooks: PropTypes.func.isRequired,
  toggleResultsOpacity: PropTypes.func.isRequired,
  firstSearch: PropTypes.bool.isRequired,
};

export default InputSearch;
