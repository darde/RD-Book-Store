import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  marginTop: -36,
  marginLeft: -36,
};

const Spinner = () => (
  <div className="spinner" style={styles}>
    <CircularProgress size={80} thickness={7} />
  </div>
);

export default Spinner;
