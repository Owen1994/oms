import React, { Component } from 'react';

import {
    Icon,
} from 'antd';

class RoleList extends Component {

    delRole = (v) => {
        const { delRoleAction } = this.props;
        delRoleAction(v);
    }

    // toggleRole=(id)=>{
    //     var {getRoleUserActionAsync,clear} = this.props
    //     if(clear){
    //         clear()
    //     }
    //     getRoleUserActionAsync({
    //         lstRoleId:[id]
    //     })
    // }
    render() {
        const { userListModel, userByRoleIdModel } = this.props;
        return (
            <div className="alloc-role-list">
                <div className="alloc-role-list-title position-relative">
                    <span className="longstring">角色</span>

                </div>
                <ul className="alloc-role-list-content">
                    {
                        userListModel.map((v, k) => (
                            <li key={k}>
                                {v.roleName}
                                {
                                    userListModel.length > 2
                                        ? <Icon type="close" onClick={() => this.delRole(v)} className="alloc-role-list-content-close" />
                                        : null
                                }
                            </li>

                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default RoleList;
// <i>重新选择</i>
// <Icon type="close" className="alloc-role-list-content-close"/>
