import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Form,
} from 'antd';
import qs from 'qs';

import actions from '../actions';


import '../css/css.css';
// 引入子组件
import Tablelist from '../components/Tablelist';

class UserForm extends Component {

    componentDidMount() {
        let userArr = [];
        const locationarr = window.location.href.split('?');
        const userName = locationarr.length > 1 ? qs.parse(locationarr[1]).userName ? qs.parse(locationarr[1]).userName : '' : ''; // 获取userName
        this.props.baseInfoForm({ userName });
        if (typeof userName === 'string') {
            userArr.push(userName);
        } else if (typeof userName === 'object') {
            userArr = userName;
        }
        if (userArr.length > 0) {
            this.props.fetchPosts({
                key: 'data',
                value: {
                    userName,
                    pageNumber: 1,
                    pageData: 20,
                },
            });
        }
    }

    render() {
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <Tablelist {...this.props} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({ ...state }), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {};
            for (const i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i]);
                }
            }
            return Infos;
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields);
        },
    })(UserForm),
);
