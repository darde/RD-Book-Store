import {
  UI_TOGGLE_RESULTS_OPACITY,
} from '../actions';

const ui = (state = 0, action) => {
  switch (action.type) {
    case UI_TOGGLE_RESULTS_OPACITY:
      return 1;
    default:
      return state;
  }
};

export default ui;
