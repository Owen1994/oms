/**
 * 作者: pzt
 * 描述: 订单导入页面主入口
 * 时间: 2018/4/18 20:32
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'

import {
    Form,
} from 'antd'
import '../css/css.css'

import BatchImport from '../components/BatchImport';
import AddManualOrder from '../components/AddManualOrder';

class UserForm extends Component {

    render() {
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <BatchImport {...this.props} />
                    <AddManualOrder {...this.props} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(Form.create()(UserForm));
