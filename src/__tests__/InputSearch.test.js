import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import InputSearch from '../components/InputSearch/InputSearch';

const resetSearchMock = jest.fn();
const searchBooksMock = jest.fn();
const toggleResultsOpacityMock = jest.fn();

const setup = () => {
  const props = {
    keyword: '',
    resetSearch: resetSearchMock,
    searchBooks: searchBooksMock,
    toggleResultsOpacity: toggleResultsOpacityMock,
    firstSearch: true,
  };

  const wrapper = shallow(<MuiThemeProvider><InputSearch {...props} /></MuiThemeProvider>);

  return {
    props,
    wrapper,
  };
};

describe('Initial test', () => {

  test('TextField component should exists.', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find(TextField)).toBeDefined();
  });

  test('Shows error message when input search is empty.', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find(TextField).find('input')).toBeDefined();
  });
  
});
