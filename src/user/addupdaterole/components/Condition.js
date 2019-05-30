import React, { Component } from 'react'; // 在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {
    Form,
    Row,
    Col,
    DatePicker,
    Switch,
    Button,
    Checkbox,
    Input,
    Collapse,
    message,
} from 'antd';
import moment from 'moment';
import qs from 'qs';
import { levelOptions } from '../../../util/options';
import * as config from '../../../util/connectConfig';
import { fetchPost } from '../../../util/fetch';
import Permissions from '../../common/permissions/index';
import { getLoginmsg } from '../../../util/baseTool';
import OrganizationStructure from '@/user/common/components/OrganizationStructure';
import { parseLstOwnerInfoData } from '../selectors';
const { TextArea } = Input;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;

class Condition extends Component {
    state={
        data: [],
        keys: [],
        roleId: '',
        isAuthorizablebool: false,
        isActivebool: true,
        targetKeys: [],
        ownerTargetKeys: [],
        selectedKeys: [],
        openkeys: [],
        userRoleList: [],
        userAuthorizableList: [],
        isForeverbool: false,
        adddate: [],
        leftdata: [],
        dised: false,
        shrinkage: true,
        userName: '',
        saveState: false,
    }

    formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 19,
        },
    }

    /**
     *作者: 唐勇
     *功能描述: 角色管理新增页面加载
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    componentDidMount() {
        const locationarr = window.location.href.split('?');
        const roleId = locationarr.length > 1 ? qs.parse(locationarr[1]).roleId ? qs.parse(locationarr[1]).roleId : '' : '';
        this.setState({ userName: getLoginmsg().userName });
        if (roleId) {
            this.setState({ roleId });
            this.props.baseInfoForm({ type: 1 });

            fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/getRoleByRoleId`, {
                roleId,
            }).then((response) => {
                if (response.state === '000001') {
                    if (response.data.isForever) {
                        this.setState({ dised: true });
                    }
                    this.props.basicInformation({
                        data: parseLstOwnerInfoData(response.data),
                        isAuthorizable: response.data.isAuthorizable,
                        isActive: response.data.isActive,
                        isForever: response.data.isForever,
                    });
                }
                return Promise.resolve();
            }).then(() => fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/getUserByRoleId`, {
                roleId,
            }).then((response) => {
                if (response.state === '000001') {
                    const list = [];
                    const etkey = [];
                    const datas = response.data;

                    const { leftdata } = this.state;
                    for (let i = 0; i < datas.length; i++) {
                        leftdata[i] = datas[i].userName;
                        list.push({ userName: datas[i].userName, key: datas[i].userName });
                        etkey.push(datas[i].userName);
                    }
                    this.setState({ targetKeys: etkey });
                    this.props.roleuseraction({ datas: list });
                }
                return Promise.resolve();
            })).then(() => fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/operIsSuperAdmin`)
                .then((response) => {
                    if (response.state === '000001') {
                        let operIssuperAdmin;
                        if (response.data == 1) {
                            operIssuperAdmin = true;
                        } else {
                            operIssuperAdmin = false;
                        }
                        this.props.baseInfoForm({ operIssuperAdmin });
                    }
                    return Promise.resolve();
                }))
                .then(() => fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/getRolePermission`, {
                    lstRoleId: [roleId],
                }).then((response) => {
                    if (response.state === '000001') {
                        const userAuthorizableList = response.data[0];
                        userAuthorizableList.selectedContext = userAuthorizableList.selectedContext.map((val) => {
                            try {
                                val.sysContext = JSON.parse(val.sysContext);
                                return val;
                            } catch (e) {
                                throw e;
                            }
                        });
                        return Promise.resolve(userAuthorizableList);
                    }
                }).then(userAuthorizableList => fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/getUserAuthorizablePermission`)
                    .then((response) => {
                        if (response.state === '000001') {
                            let userRoleList = response.data;
                            userRoleList = userRoleList.map((v) => {
                                try {
                                    v.sysContext = JSON.parse(v.sysContext);
                                    return v;
                                } catch (e) {
                                    throw e;
                                }
                            });
                            this.showTree(userRoleList, userAuthorizableList);
                            this.setState({ adddate: userRoleList });
                        }
                    })));
        } else {
            const userName = getLoginmsg().userName;
            this.props.basicInformation({ data: {
                lstOwner: [userName],
                lstUserName: [],
                createBy: userName,
                lstOwnerInfo: [{userName, personName: getLoginmsg().personName}]
            } });
            fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/getUserAuthorizablePermission`).then((response) => {
                if (response.state === '000001') {
                    let userRoleList = response.data;
                    userRoleList = userRoleList.map((v) => {
                        try {
                            v.sysContext = JSON.parse(v.sysContext);
                            return v;
                        } catch (e) {
                            throw e;
                        }
                    });
                    this.showTree(userRoleList, '');
                    this.setState({ adddate: userRoleList });
                }
                return Promise.resolve();
            }).then(() => fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/operIsSuperAdmin`)
                .then((response) => {
                    if (response.state === '000001') {
                        let operIssuperAdmin;
                        if (response.data == 1) {
                            operIssuperAdmin = true;
                        } else {
                            operIssuperAdmin = false;
                        }
                        this.props.baseInfoForm({ operIssuperAdmin });
                    }
                }));
            this.props.baseInfoForm({ type: 2 });
        }
    }

    componentWillReceiveProps(nextProps) {
        const preBasicInformationmodule = this.props.basicInformationmodule;
        const basicInformationmodule = nextProps.basicInformationmodule;
        if (basicInformationmodule && basicInformationmodule !== preBasicInformationmodule) {
            this.setState({
                targetKeys: basicInformationmodule.data.lstUserName,
                ownerTargetKeys: basicInformationmodule.data.lstOwner,
            });
        }
    }

    /* 授权区域 */
    showTree(userRoleList, userAuthorizableList) {
        let data = userRoleList.map(v => v.sysContext);
        data = this.deepCloneObj(data);
        const fdata = this.format(data);

        if (userAuthorizableList) {
            var defaultKeys = this.getDefault(userAuthorizableList);
            this.setState({
                data: fdata,
                keys: [...defaultKeys.selectedKeys],
                selectedKeys: [...defaultKeys.selectedKeys],
                openkeys: defaultKeys.openkeys,
            });
        } else {
            var defaultKeys = this.getDefault(userAuthorizableList);
            this.setState({
                data: fdata,
                keys: [...defaultKeys.selectedKeys],
                selectedKeys: [...defaultKeys.selectedKeys],
                openkeys: defaultKeys.openkeys,
            });
        }
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
        // var {userRolePermission,userAuthorizablePermission} =this.props
        const adddate = this.state.adddate;
        let data = this.deepCloneObj(adddate);
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

    /* 授权区域end */
    /**
     *作者: 唐勇
     *功能描述: 是否管理员切换
     *参数说明:checked=true||false
     *时间: 2018/7/3 14：00
     */
    isAuthorizableonChange= (checked) => {
        if (this.props.Infos.type == 1) {
            this.props.basicInformation({ isAuthorizable: checked });
        } else {
            this.setState({ isAuthorizablebool: checked });
        }
    }

    /**
     *作者: 唐勇
     *功能描述: 是否启用切换
     *参数说明:checked=true||false
     *时间: 2018/7/3 14：00
     */
    isActiveChange= (checked) => {
        if (this.props.Infos.type == 1) {
            this.props.basicInformation({ isActive: checked });
        } else {
            this.setState({ isActivebool: checked });
        }
    }

    /**
     *作者: 唐勇
     *功能描述: 是否永久有效切换
     *参数说明:checked=true||false
     *时间: 2018/7/3 14：00
     */
    isForevers= (checked) => {
        if (checked.target.checked) {
            this.setState({ dised: true });
        } else {
            this.setState({ dised: false });
        }
        if (this.props.Infos.type == 1) {
            this.props.basicInformation({ isForever: checked.target.checked });
        } else {
            this.setState({ isForeverbool: checked.target.checked });
        }
    }

    onHandleCheck = (arr) => {
        this.setState({
            keys: arr,
        });
    }

    /**
     *作者: 唐勇
     *功能描述: 可分配用户
     *参数说明:checked=true||false
     *时间: 2018/7/3 14：00
     */
    timer=null

    onsearchvalue=(direction, event) => {
        clearTimeout(this.timer);
        const value = event.target.value;
        this.timer = setTimeout(() => { this.sourceuserName(value); }, 500);
        return false;
    }

    filterOption = () => true

    handleChange = (targetName, targetKeys) => {
        const tName = targetName === 'owneruser' ? 'ownerTargetKeys' : 'targetKeys';
        this.setState({ [tName]: targetKeys });
    }

    /**
     *作者: 唐勇
     *功能描述: 可分配用户
     *参数说明:value=name
     *时间: 2018/7/3 14：00
     */
    sourceuserName= (value) => {
        const newobj = {};
        var value = value.replace(/(^\s*)|(\s*$)/g, '');
        if (value == '') {
            return false;
        }
        const { leftdata } = this.state;

        if (leftdata.length > 0) {
            for (let i = 0; i < leftdata.length; i++) {
                if (value == leftdata[i]) {
                    return false;
                }
            }
        }
        const users = {
            userName: value,
        };
        newobj.user = users;

        fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/getUserByUserName`, newobj)
            .then((response) => {
                if (response.state == '000001') {
                    const { datas } = this.props.roleusermodel;
                    const sercedatas = {
                        userName: response.data[0].userName,
                        key: response.data[0].userName,
                    };
                    const data = datas.concat(sercedatas);
                    this.props.roleuseraction({ datas: data });
                    leftdata.push(value);
                } else {
                    message.error(response.msg);
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 取消按钮
     *参数说明:value=name
     *时间: 2018/7/3 14：00
     */
    goback = () => {
        this.props.history.go(-1);
    }

    /**
     *作者: 唐勇
     *功能描述: 提交按钮
     *参数说明:value=name
     *时间: 2018/7/3 14：00
     */
    submits = (e) => {
        const or = typeof e === 'object';
        or && e.preventDefault();
        const newboj = {};
        const roles = {};
        this.setState({saveState: true});
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                roles.isActive = values.isActive;
                roles.isAuthorizable = values.isAuthorizable;
                roles.isForever = values.isForever;
                roles.roleName = values.roleName;
                roles.remark = values.remark;

                const arr = values.orderDate.map((v) => {
                    if (v) {
                        return v.valueOf();
                    }
                });
                roles.effectiveTime = arr[0] ? arr[0] : '';
                roles.expireTime = arr[1] ? arr[1] : '';

                if (this.props.Infos.type == 1) {
                    const { roleId } = this.state;
                    roles.roleId = roleId;
                }
                const { targetKeys, ownerTargetKeys } = this.state;
                const { keys } = this.state;
                let data = this.restore(keys);
                data = data.map((v) => {
                    const obj = {};
                    obj.sysKey = v.system.key;
                    obj.sysContext = JSON.stringify(v);
                    return obj;
                });
                roles.selectedContext = data;
                roles.lstUserName = targetKeys;
                roles.lstOwner = ownerTargetKeys;
                newboj.role = roles;
                fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/addOrUpdateRoleInfo`, newboj)
                    .then((response) => {
                        this.setState({saveState: false});
                        if (response.state == '000001') {
                            message.success(response.msg);
                            if (this.props.Infos.type == 1) {
                                setTimeout(this.props.history.go(-1), 3000);
                            } else {
                                this.props.form.resetFields();
                                this.setState({
                                    data: [],
                                    keys: [],
                                    targetKeys: [],
                                    roleId: '',
                                    isAuthorizablebool: false,
                                    isActivebool: false,
                                    selectedKeys: [],
                                    openkeys: [],
                                    userRoleList: [],
                                    userAuthorizableList: [],
                                    isForeverbool: false,
                                    adddate: [],
                                    ownerTargetKeys: [],
                                });
                                setTimeout(this.props.history.go(-1), 1000);
                            }
                        }
                    });
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 提交按钮
     *参数说明:value=name
     *时间: 2018/7/3 14：00
     */
    fromsubmit= () => {
        document.getElementById('addupdateid').onSubmit = this.submits();
    }

    /**
     *作者: 唐勇
     *功能描述: 角色名触发验证
     *参数说明:value=name
     *时间: 2018/7/3 14：00
     */
    addinputonchange=(rule, value, callback) => {
        if (value) {
            const roleName = value;
            const newboj = {};
            newboj.newRoleName = roleName;
            if (this.props.Infos.type == 1) {
                const roleId = this.state.roleId;
                newboj.roleId = roleId;
            }
            fetchPost(`${config.api_url}/urc/motan/service/api/IUrcService/checkDuplicateRoleName`, newboj)
                .then((response) => {
                    if (response.state == '000001') {
                        if (response.data == 1) {
                            callback('此角色名已存在');
                        } else {
                            callback();
                        }
                    }
                });
        } else {
            callback('请输入角色名称');
        }
    }

    /**
     *作者: 唐勇
     *功能描述: 永久有效和有效期验证
     *参数说明:value=name
     *时间: 2018/7/3 14：00
     */
    orderDaterequird=(rule, value, callback) => {
        if (value[0] == null && value[1] == null) {
            if (this.props.Infos.type == 1) {
                if (this.props.basicInformationmodule.isForever == false) {
                    callback('有效期和永久有效至少有项为必填');
                } else {
                    callback();
                }
            } else if (this.state.isForeverbool == false) {
                callback('有效期和永久有效至少有项为必填');
            } else {
                callback();
            }
        } else {
            callback();
        }
    }

    handleOwnerDelete = (list, index) => {
        const { userName } = list[index];
        if (this.props.basicInformationmodule.data.createBy === userName ) {
            return false;
        }
        return true;
    }

    render() {
        var {
            selectedKeys,
            openkeys,
            data,
            shrinkage,
            userName,
            ownerTargetKeys,
            targetKeys,
        } = this.state;

        const { getFieldDecorator } = this.props.form;
        const header1 = <div className="addupdatetit"><div className="addupdatetitlf" /><div className="addupdatetittxt">基本信息</div></div>;
        const header2 = <div className="addupdatetit"><div className="addupdatetitlf" /><div className="addupdatetittxt">操作权限</div></div>;
        const header3 = <div className="addupdatetit"><div className="addupdatetitlf" /><div className="addupdatetittxt">角色Owner</div></div>;
        const header4 = <div className="addupdatetit"><div className="addupdatetitlf" /><div className="addupdatetittxt">分配用户</div></div>;

        var shrinkage = shrinkage;
        const starttime = this.props.Infos.type == 1 ? this.props.basicInformationmodule.data.effectiveTime ? moment(this.props.basicInformationmodule.data.effectiveTime) : null : null;
        const endtime = this.props.Infos.type == 1 ? this.props.basicInformationmodule.data.expireTime ? moment(this.props.basicInformationmodule.data.expireTime) : null : null;
        return (
            <div className="addupdatetop">
                <div className="addupdatetoplist">
                    <Form layout="inline" id="addupdateid">
                        <Collapse defaultActiveKey={['111', '222']} style={{ position: 'relative' }}>
                            <Panel header={header1} key="111">
                                <div>
                                    <Row>
                                        <Col span={9}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label="角色名称"
                                            >
                                                {getFieldDecorator('roleName', {
                                                    rules: [{ required: true, whitespace: true, validator: this.addinputonchange }], validateTrigger: 'onBlur', initialValue: this.props.Infos.type == 1 ? this.props.basicInformationmodule.data.roleName : null,
                                                })(
                                                    <Input placeholder="请输入角色名称" maxLength={100} />,
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={9}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label="是否管理员"
                                            >
                                                {getFieldDecorator('isAuthorizable', {
                                                    rules: [{ required: false, message: '' }], initialValue: this.props.Infos.type == 1 ? this.props.basicInformationmodule.isAuthorizable : this.state.isAuthorizablebool,
                                                })(
                                                    <Switch disabled={!this.props.Infos.operIssuperAdmin} onChange={this.isAuthorizableonChange} checked={this.props.Infos.type == 1 ? this.props.basicInformationmodule.isAuthorizable : this.state.isAuthorizablebool} />,
                                                )}

                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={9}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label="有效期"
                                            >
                                                {getFieldDecorator('orderDate', {
                                                    rules: [{ required: true, whitespace: true, validator: this.orderDaterequird }],
                                                    initialValue: [starttime, endtime],
                                                })(
                                                    <RangePicker {...levelOptions('pickerConfig')} className="ant-xs-row" disabled={this.state.dised} />,
                                                )}
                                            </FormItem>

                                        </Col>
                                        <Col span={4}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label=""
                                                className="mglf10"
                                            >
                                                {getFieldDecorator('isForever', {
                                                    rules: [{ required: false, message: '' }], initialValue: this.props.Infos.type == 1 ? this.props.basicInformationmodule.isForever : this.state.isForeverbool,
                                                })(

                                                    <Checkbox onChange={this.isForevers} checked={this.props.Infos.type == 1 ? this.props.basicInformationmodule.isForever : this.state.isForeverbool}>永久有效</Checkbox>,
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={9}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label="是否启用"
                                            >
                                                {getFieldDecorator('isActive', {
                                                    rules: [{ required: false, message: '请选择是否启用' }], initialValue: this.props.Infos.type == 1 ? this.props.basicInformationmodule.isActive : this.state.isActivebool,
                                                })(
                                                    <Switch onChange={this.isActiveChange} checked={this.props.Infos.type == 1 ? this.props.basicInformationmodule.isActive : this.state.isActivebool} />,
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row className="mgbt20">
                                        <Col span={9}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label="备注"
                                            >
                                                {getFieldDecorator('remark', {
                                                    rules: [{ required: false, message: '' }], initialValue: this.props.Infos.type == 1 ? this.props.basicInformationmodule.data.remark : '',
                                                })(
                                                    <TextArea rows={3} maxLength={100} placeholder="请简要描述这个内容,最大100个字符" />,
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                            <Panel header={header2} key="222">
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
                            </Panel>
                            <Panel header={header4} key="444">
                                <div className="addupdateuserall">
                                    <OrganizationStructure 
                                        value={this.props.basicInformationmodule.data.lstUser}
                                        onChange={(value) => this.handleChange("usercen", value)}
                                    />
                                </div>
                            </Panel>
                            <Panel header={header3} key="333">
                                <div className="addupdateuserall">
                                    <OrganizationStructure
                                        onDelete={this.handleOwnerDelete}
                                        value={this.props.basicInformationmodule.data.lstOwnerInfo}
                                        onChange={(value) => this.handleChange("owneruser", value)}
                                    />
                                </div>
                            </Panel>
                            
                        </Collapse>
                        
                        <div className={shrinkage ? 'addupdatafootbtn' : 'addupdatafootbtntwo'}>
                            <Row className="exc-detail-footer-content" style={{ textAlign: 'right' }}>
                                <div className="addupdateuserbtn">
                                    <Button type="primary" loading={this.state.saveState} onClick={this.fromsubmit}>确定</Button>
                                    <Button onClick={this.goback} className="margin-md-left">返回</Button>
                                </div>
                            </Row>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Condition;
