import React from 'react';
import BooksList from '../containers/BooksList';
import Brand from '../containers/Brand';
import InputSearch from '../containers/InputSearch';
import BookDetail from '../containers/BookDetail';
import '../styles/main.less';

const Home = () => (
  <div className='spa'>
    <BookDetail />
    <Brand />
    <InputSearch />
    <BooksList />
  </div>
);

export default Home;
