import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Form,
} from 'antd';
import actions from '../actions';


import '../css/css.css';
import Condition from '../components/Condition';

class UserForm extends Component {

    componentWillUnmount() {
        this.props.form.resetFields();
    }

    render() {
        return (
            <div className="newClue">
                <Condition {...this.props} />
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
