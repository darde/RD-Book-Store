import React from 'react';
import { shallow, mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { search } from '../sagas/search';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import InputSearch from '../components/InputSearch/InputSearch';


const resetSearchMock = jest.fn();
const searchBooksMock = jest.fn();
const toggleResultsOpacityMock = jest.fn();
const muiTheme = getMuiTheme();
const props = {
  keyword: '',
  resetSearch: resetSearchMock,
  searchBooks: searchBooksMock,
  toggleResultsOpacity: toggleResultsOpacityMock,
  firstSearch: true,
};

const setup = () => {
  const wrapper = mount(
    <InputSearch {...props} />,
    {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    }
  );
  
  return {
    props,
    wrapper,
  };
};

const { wrapper } = setup();
const textFieldMUI = wrapper.find(TextField);
const toggleAuthor = wrapper.find(Toggle).find('input#author');
const toggleTitle = wrapper.find(Toggle).find('input#title');
const button = wrapper.find(RaisedButton).find('button');

describe ('Initial test, validate fields', () => {  
  test('TextField component should exists.', () => {
    expect(textFieldMUI).toBeDefined();
  });

  test('Shows an error message when input search is empty and the search button is clicked.', () => {
    const { props } = setup();
    props.keyword = '';
    
    const wrapper = mount(
      <InputSearch {...props} />,
      {
        context: {muiTheme},
        childContextTypes: {muiTheme: React.PropTypes.object}
      }
    );
    
    button.simulate('click');
    expect(textFieldMUI.props().errorText).toEqual('This field is required');
  });

  test('Shows an error message when both "author" and "title" toggles are off and the search button is clicked.', () => {
    toggleTitle.simulate('click');
    button.simulate('click');
    expect(textFieldMUI.props().errorText).toEqual('Select at least one filter (Title or Author)');
  });
  
});
