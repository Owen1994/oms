import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Form,
} from 'antd';
import actions from '../actions';
import '../css/css.css';
import Condition from '../components/Condition';
import axios from '../../../util/axios';
import * as config from '../../../util/connectConfig';

class UserForm extends Component {

    /**
    *作者: 唐勇
    *功能描述: 页面打开加载
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    componentDidMount() {
        const newobj = {};
        newobj.pageData = 20;
        newobj.pageNumber = 1;
        newobj.earchcontent = '';
        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/getRolesByInfo`, newobj)
            .then((response) => {
                if (response.status == 200) {
                    this.props.Paginationmodelaction({ total: response.data.data.total, current: 1 });
                    this.props.roletableaction({ data: response.data.data.lst });
                }
            });
    }

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
