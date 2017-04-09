import { connect } from 'react-redux';
import Brand from '../components/Brand/Brand';

const mapStateToProps = state => ({
  uiOpacity: state.ui,
});

export default connect(
  mapStateToProps,
)(Brand);
