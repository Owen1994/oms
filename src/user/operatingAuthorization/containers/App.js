import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    message,
} from 'antd';
import actions from '../actions';
import Rolelist from '../components/roleList';
import Roleaccredit from '../components/roleAccredit';
import { getCookie, getUrlParams } from '../../../util/baseTool';

import '../css/css.css';

class OperatingAuthorization extends Component {

    state = {
        userInfo: {},
        roleId: '',
        isMultiple: false,
    }

    componentWillMount() {
        let params = this.props.location.search;
        params = getUrlParams(params);
        const roleId = params.roleId && params.roleId.split(',');
        if (!roleId || !roleId.length) {
            message.error('当前参数错误');
            this.props.history.go(-1);
            return;
        } if (roleId.length > 1) {
            this.setState({
                isMultiple: true,
            });
        }
        try {
            var userInfo = JSON.parse(unescape(getCookie('session')));
            if (!userInfo || !typeof userInfo == 'object') {
                message.warning('用户未登入');
                return;
            }
            this.setState({
                userInfo,
                roleId,
            });
        } catch (e) {
            message.warning(e.message);
        }
        const { getUserRolePermissionAsync, getUserAuthorizablePermissionAsync, getRoleListAction } = this.props;
        getUserRolePermissionAsync({
            lstRoleId: roleId,
        })
            .then((result) => {
                if (result && result.length) {
                    const roleList = result.map(v => ({
                        roleId: v.roleId,
                        roleName: v.roleName,
                    }));
                    getRoleListAction(roleList);
                }
            });
        getUserAuthorizablePermissionAsync({
            operator: userInfo.userName,
        });
    }

    render() {
        const { userInfo, roleId, isMultiple } = this.state;

        return (
            <div style={{ height: '100%' }}>
                <Rolelist {...this.props} userInfo={userInfo} />
                <Roleaccredit {...this.props} userInfo={userInfo} roleId={roleId} isMultiple={isMultiple} />
            </div>
        );
    }
}

const mapStateToProps = function (state, own) {
    return {
        userAuthorizablePermission: state.userAuthorizablePermissionModel,
        userRolePermission: state.userRolePermissionModel,
        roleListModel: state.roleListModel,
    };
};
export default connect(mapStateToProps, actions)(OperatingAuthorization);
