import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import SuggestionsRooms from '../src/components/PostingLocation/SuggestionsRooms/SuggestionsRooms.jsx';

function setup() {
  const props = {
    userRooms: [],
    fetchUserRooms: () => { return []; },
    loading: true,
  };

  const enzymeWrapper = shallow(<SuggestionsRooms {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Testing SuggestionsRooms component', () => {

  it ('Expect input search placeholder to be equal "Loading...", when loading prop is true:', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('input').props().placeholder).toEqual('Loading...');
  });

  it ('Expect input search placeholder to be equal "Search rooms" when loading prop is false:', () => {
    const { props } = setup();
    props.loading = false;
    const wrapper = shallow(<SuggestionsRooms {...props} />);
    expect(wrapper.find('input').props().placeholder).toEqual('Search rooms');
  });

});


