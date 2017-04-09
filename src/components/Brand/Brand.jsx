import React, { PropTypes } from 'react';
import './styles/styles.less';

const logo = require('../../img/resultados_digitais.png');
const books = require('../../img/bookstack.png');

const Brand = ({ uiOpacity }) => (
  <div className={uiOpacity > 0 ? 'brand opacity-1' : 'brand'}>
    <figure className='logo'>
      <img src={books} alt='Resultados Digitais Book Store' />
    </figure>
    <div className='lettering'>
      <figure>
        <img src={logo} alt='Logo Resultados Digitais' />
      </figure>
      <header>
        <h1>
          <span className='bold'>Book</span>
          <span className='light'>Store</span>
        </h1>
      </header>
    </div>
  </div>
);

Brand.propTypes = {
  uiOpacity: PropTypes.number.isRequired,
};

export default Brand;
