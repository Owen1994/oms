import { connect } from 'react-redux';
import ChannelPage from '../components/channel/index';
import { channelPartList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.channelParts,
    loadingState: state.channelLoading,
});
// 渠道合并
export default connect(
    mapStateToProps,
    { channelPartList },
)(ChannelPage);
