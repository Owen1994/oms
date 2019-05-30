import { connect } from 'react-redux';
import UpdateWeightPage from '../components/updateweight/index';
import { updateWeightPartList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.updateWeightParts,
    loadingState: state.updateWeightLoading,
});
// 更新包裹重量
export default connect(
    mapStateToProps,
    { updateWeightPartList },
)(UpdateWeightPage);
