import React, { Component } from 'react';

import {
    Icon,
} from 'antd';

class RoleList extends Component {

    delRole = (v) => {
        const { delRoleAction } = this.props;
        delRoleAction(v);
    }

    render() {
        const { roleListModel, userAuthorizablePermission } = this.props;
        return (
            <div className="accredit-role-list">
                <div className="accredit-role-list-title position-relative">
                    <span className="longstring">角色</span>

                </div>
                <ul className="accredit-role-list-content">
                    {
                        roleListModel.map((v, k) => (
                            <li key={k}>
                                {v.roleName}
                                {
                                    roleListModel.length > 2
                                        ? <Icon type="close" onClick={() => this.delRole(v)} className="accredit-role-list-content-close" />
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
// <Icon type="close" className="accredit-role-list-content-close"/>
// <li className={v.roleId === userAuthorizablePermission.roleId?"active":""} key={k} onClick={()=>this.toggleRole(v.roleId)}>
//         {v.roleName}
//     </li>
