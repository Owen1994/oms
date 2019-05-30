import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    message,
} from 'antd';
import actions from '../actions';
import Rolelist from '../components/roleList';
import RoleAlloc from '../components/roleAlloc';
import { getUrlParams } from '../../../util/baseTool';

import '../css/css.css';

class UserForm extends Component {

    componentWillMount() {
        const {
            getRoleUserActionAsync, searchUserByListAsync, saveUserByListAsync, getRoleListAction, setDefaultModel,
        } = this.props;
        let params = this.props.location.search;
        params = getUrlParams(params);
        const roleId = params.roleId && params.roleId.split(',');
        if (!roleId || !roleId.length) {
            message.error('当前参数错误');
            this.props.history.go(-1);
            return;
        }
        getRoleUserActionAsync({
            lstRoleId: roleId,
        }).then((r) => {
            if (r) {
                const list = r.map(v => ({
                    roleName: v.roleName,
                    roleId: v.roleId,
                }));
                getRoleListAction(list);
            }
        });
    }

    clearFn = null

    clear = (c) => {
        this.clearFn = c;
    }

    componentWillUnmount() {
        this.props.clearAllAction();
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Rolelist clear={this.clearFn} {...this.props} />
                <RoleAlloc clear={this.clear} {...this.props} />
            </div>
        );
    }
}

export default connect(state => ({ ...state }), actions)(UserForm);
