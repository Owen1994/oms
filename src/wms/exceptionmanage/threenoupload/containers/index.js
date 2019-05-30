import { connect } from 'react-redux';
import App from '../components';

const mapStateToProps = (state, props) => ({
    ...props,
});

export default connect(
    mapStateToProps,
)(App);
