import { connect } from 'react-redux';
import FinishConditionRight from '../components/FinishConditionRight';
import { delCondtion } from '../actions';
import pasrecondtionDatas from '../selectors/FinishConditionRight';

const mapStateToProps = (state, props) => ({
    ...props,
    list: pasrecondtionDatas(state.condtionsData, state.finishConditionData),
    finishConditionData: state.finishConditionData,
});

export default connect(
    mapStateToProps,
    {
        delCondtion,
    },
)(FinishConditionRight);
