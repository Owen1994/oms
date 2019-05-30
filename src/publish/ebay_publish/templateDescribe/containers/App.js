/**
 * 作者: pzt
 * 描述: 速卖通列表页父组件
 * 时间: 2018/4/18 20:24
 **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions'
import moment from 'moment'
import {
    Form,
    message
} from 'antd'
import App from '../components'

import '../css/css.css'

export default connect(
    (state, own) => ({
        ...state,
        ...own
    }), {
        ...actions
    })(Form.create()(App));
