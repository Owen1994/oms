import { connect } from 'react-redux';
import WaitingReviewTaskApp from '../components/task/index';
import { queryTaskList } from '../actions/index';
import { parseTasks } from '../selectors/index';

const mapStateToProps = state => ({
    taskData: parseTasks(state),
    loadingTaskObj: state.loadingTaskObj,
});

export default connect(
    mapStateToProps,
    { queryTaskList },
)(WaitingReviewTaskApp);
