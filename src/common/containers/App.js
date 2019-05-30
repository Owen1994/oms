/**
 *作者: 任贸华
 *功能描述: 渲染入口文件
 *参数说明:
 *时间: 2018/4/16 10:48
 */
import {connect} from 'react-redux';
import AppComponent from '../components';
import actions from '../actions';

const mapStateToProps = (state, props) => {
    return {
        ...state, 
        ...props,
    }
}

export default connect(
    mapStateToProps, 
    {...actions}
)(AppComponent);
