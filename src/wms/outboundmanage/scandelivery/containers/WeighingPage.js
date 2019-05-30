import { connect } from 'react-redux';
import WeighingPage from '../components/weighing/index';
import { weighingPartList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.weighingParts,
    loadingState: state.weighingLoading,
});
// 集货称重
export default connect(
    mapStateToProps,
    { weighingPartList },
)(WeighingPage);
