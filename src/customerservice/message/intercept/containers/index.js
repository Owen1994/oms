import { connect } from 'react-redux';
import App from '../components';
import { queryMessageInterceptList } from '../actions';

const mapStateToProps = state => ({
    data: state,
});

export default connect(
    mapStateToProps,
    { queryMessageInterceptList },
)(App);
