import React, { Component } from 'react';
import {
    Button,
    message,
    Row,
} from 'antd';
import Permissions from '../../common/permissions/index';

class RoleAccredit extends Component {

    state = {
        data: [],
        keys: [],
        selectedKeys: [],
        openkeys: [],
    }

    componentWillReceiveProps(next) {
        if (next == this.props) return;
        const { userRolePermission, userAuthorizablePermission } = next;
        if (userRolePermission != this.props.userRolePermission || userAuthorizablePermission != this.props.userAuthorizablePermission) {
            this.showTree(userRolePermission, userAuthorizablePermission);
        }
    }

    showTree(userRoleList, userAuthorizableList) {
        let data = userRoleList.map(v => v.sysContext);
        data = this.deepCloneObj(data);
        const fdata = this.format(data);
        let defaultKeys = { openkeys: [], selectedKeys: [] };
        if (userAuthorizableList && userAuthorizableList.length == 1) {
            defaultKeys = this.getDefault(userAuthorizableList);
        }
        this.setState({
            data: fdata,
            keys: [...defaultKeys.selectedKeys],
            selectedKeys: [...defaultKeys.selectedKeys],
            openkeys: defaultKeys.openkeys,
        });
    }

    // 深度克隆
    deepCloneObj = (obj) => {
        let str; let
            newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return obj;
        } if (window.JSON) {
            str = JSON.stringify(obj), // 序列化对象
            newobj = JSON.parse(str); // 还原
        } else { // 如果不支持以上方法
            for (const i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    };

    // 设置默认值
    getDefault = (data) => {
        data = data[0];
        if (!data || !data.selectedContext || !data.selectedContext.length) {
            return {
                selectedKeys: [],
                openkeys: [],
            };
        }
        data = data.selectedContext.map(v => v.sysContext.menu);
        const arr = [];
        data.forEach((v) => {
            arr.push(...v);
        });
        return this.getDefaultSelectedKeys(arr);
    }

    getDefaultSelectedKeys = (data, arr = [], openkeys = []) => {
        data.forEach((v) => {
            if ((!v.module || !v.module.length) && (!v.function || !v.function.length)) {
                arr.push(v.key);
            } else {
                if (v.module && v.module.length) {
                    if (!openkeys.includes(v.key)) {
                        openkeys.push(v.key);
                    }
                    this.getDefaultSelectedKeys(v.module, arr, openkeys);
                }
                if (v.function && v.function.length) {
                    if (!openkeys.includes(v.key)) {
                        openkeys.push(v.key);
                    }
                    this.getDefaultSelectedKeys(v.function, arr, openkeys);
                }
            }
        });
        return {
            selectedKeys: arr,
            openkeys,
        };
    }

    // 格式化数据，返回 tree 的数据格式
    format = (data) => {
        const arr = [];
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            const obj = {
                key: d.system.key,
                name: d.system.name,
            };
            let children = d.menu;
            if (children && children.length) {
                children = this.formatChildren(children);
            } else {
                children = [];
            }
            obj.children = children;
            arr.push(obj);
        }
        return arr;
    }

    formatChildren = (data) => {
        const arr = [];
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            var children = [];
            const obj = {
                key: d.key,
                name: d.name,
            };
            if (d.function && d.function.length) {
                d.function.forEach((v) => {
                    children.push(v);
                });
            }
            if (d.module && d.module.length) {
                const list = this.formatChildren(d.module);
                children.push(...list);
            }
            obj.children = children;
            arr.push(obj);
        }
        return arr;
    }

    // 依据keys 获取返回数据
    restore = (arr) => {
        const { userRolePermission, userAuthorizablePermission } = this.props;
        let data = this.deepCloneObj(userRolePermission);
        data = data.map(v => v.sysContext);
        const obj = {};
        const returnData = [];
        for (let i = 0; i < data.length; i++) {
            const key = data[i].system.key;
            const reg = new RegExp(`^${key}`, 'i');
            for (let j = 0; j < arr.length; j++) {
                if (reg.test(arr[j])) {
                    if (!obj[key]) {
                        obj[key] = {
                            keys: [],
                            data: data[i],
                        };
                    }
                    obj[key].keys.push(arr[j]);
                }
            }
        }
        for (const k in obj) {
            const menuKey = obj[k].data.system.key;
            const keys = obj[k].keys;
            if (keys.includes(menuKey)) {
                returnData.push(obj[k].data);
            } else {
                this.quickSort(obj[k].keys, 0, obj[k].keys.length - 1);
                const source = obj[k].data.menu;
                this.selectedFunction(keys, source);

                returnData.push(obj[k].data);
            }
        }
        return returnData;
    }

    selectedFunction = (keys, list) => {
        const l = list.length;


        let i = l - 1;
        for (;i >= 0; i--) {
            const key = list[i].key;
            if (keys.includes(key)) continue;
            const reg = new RegExp(`^${key}`, 'i');
            for (var j = 0; j < keys.length; j++) {
                if (reg.test(keys[j])) break;
            }
            if (j >= keys.length) {
                list.splice(i, 1);
            } else {
                if (list[i].function && list[i].function.length) {
                    this.selectedFunction(keys, list[i].function);
                }
                if (list[i].module && list[i].module.length) {
                    this.selectedFunction(keys, list[i].module);
                }
            }
        }
        return list;
    }

    quickSort = (array, left, right) => {
        if (left < right) {
            const x = array[right]; let i = left - 1; let
                temp;
            for (let j = left; j <= right; j++) {
                if (array[j].length <= x.length) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            this.quickSort(array, left, i - 1);
            this.quickSort(array, i + 1, right);
        }
        return array;
    }

    submit =() => {
        const { userInfo, saveUserAuthorizablePermissionAsync, userAuthorizablePermission } = this.props;
        const { keys } = this.state;
        let data = this.restore(keys);
        data = data.map((v) => {
            const obj = {};
            obj.sysKey = v.system.key;
            obj.sysContext = JSON.stringify(v);
            return obj;
        });
        const lstRoles = userAuthorizablePermission.map(v => ({
            ...v,
            selectedContext: data,
        }));
        const params = {
            operator: userInfo.userName,
            lstRole: lstRoles,
        };
        saveUserAuthorizablePermissionAsync(params)
            .then((r) => {
                r && message.success('保存成功');
            });
    }

    onHandleCheck = (arr) => {
        this.setState({
            keys: arr,
        });
    }

    goback = () => {
        this.props.history.go(-1);
    }

    render() {
        const { selectedKeys, openkeys, data } = this.state;
        return (
            <div className="accredit-role-content">
                <div className="accredit-role-content-title position-relative">
                    <span className="longstring">角色授权</span>
                </div>
                {
                    !data || !data.length ? null
                        : (
                            <Permissions
                                defaultValue={selectedKeys}
                                prmissionsData={data}
                                showField="name"
                                defaultExpandedKeys={openkeys}
                                onCheck={this.onHandleCheck}
                            />
                        )

                }
                <div className="addupdatafootbtn">
                    <Row className="exc-detail-footer-content" style={{ textAlign: 'right' }}>
                        <div className="addupdateuserbtn">
                            <Button type="primary" onClick={this.submit}>确定</Button>
                            <Button onClick={this.goback} className="margin-sm-left">返回</Button>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

export default RoleAccredit;
