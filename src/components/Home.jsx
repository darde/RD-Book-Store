import React from 'react';
import BooksList from './BooksList/BooksList';
import Brand from './Brand/Brand';
import InputSearch from '../containers/InputSearch';
import BookDetail from './BookDetail/BookDetail';
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
