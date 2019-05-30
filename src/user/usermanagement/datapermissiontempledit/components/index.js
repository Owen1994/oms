// 数据授权
import React from 'react';
import {
    Form,
    Button,
    message,
} from 'antd';

import '../css/css.css';
import qs from 'qs';
import Authorizationdetail from './Authorizationdetail'; // 授权详情
import Authorizationscope from './Authorizationscope'; // 授权范围
import PlatformEntrySetModal from '@/user/common/components/PlatformEntrySetModal';
import { post } from '@/util/axios';
import { api_url } from '@/util/connectConfig';
import Projectintroduct from './Projectintroduct';
import WareModal from '@/user/common/components/WareModal';
import { parseSaveParams } from '@/user/common/selectors/SaveAuthDataParams';

import {
    operValuesArrToCheckArr,
    checkArrToOperValueArr,
} from '../selectors';

import {
    parseESEntityData,
    parseESEntityCheckArray,
} from '../selectors/commonruledata';
import StatisticsEntitySetModal from '@/user/common/components/StatisticsEntitySetModal';
import LogisticsEntryModal from '@/user/common/components/LogisticsEntryModal';

class UserForm extends React.Component {
    state = {
        templId: '',
        tabIndex: 0,
        visible: false,
        visible2: false,
        visible3: false,
        statisticsEntityModalVisible: false,
        wareEntityModalVisible: false,
        lgtEntityModalVisible: false,
        checkArr: [],
        operValuesArr: [],
    }

    formItemLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    }

    componentWillUnmount() {
        this.props.resetData();
    }

    componentDidMount() {
        const locationarr = window.location.href.split('?');
        const templId = locationarr.length > 1 ? qs.parse(locationarr[1]).templId ? qs.parse(locationarr[1]).templId : '' : ''; // 获取userName
        this.props.loadSysStateArr();
        if (templId) {
            this.setState({
                templId,
            }, function () {
                this.props.refreshSysStateRule({ templId });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const prevSysStateArr = this.props.sysStateArr;
        const sysStateArr = nextProps.sysStateArr;

        if (prevSysStateArr !== sysStateArr && sysStateArr.length > 0) {
            const { sysKey, sysName } = sysStateArr[0];// 数据初始化
            this.props.setTempData({ index: 0, sysKey, sysName });
        }

        const prevTempdata = this.props.tempdata;
        const tempdata = nextProps.tempdata;

        if (tempdata !== prevTempdata) {
            if (tempdata.selectEntityCode && tempdata.selectEntityCode !== prevTempdata.selectEntityCode) {
                const { sysKey, selectEntityCode } = tempdata;
                const operValuesArr = this.props.sysRuleMap.get(sysKey).get(selectEntityCode).operValuesArr;
                let checkArr;
                if (selectEntityCode === 'E_CsOrg') {
                    checkArr = parseESEntityCheckArray(operValuesArr);
                    this.setState({ visible3: true, checkArr }); // 选择实体信息
                } else if(selectEntityCode === 'E_StatisticsSystem') {
                    this.setState({ statisticsEntityModalVisible: true, operValuesArr });
                } else if(selectEntityCode === 'E_WarehouseAuthorized') {
                    this.setState({ wareEntityModalVisible: true, operValuesArr });
                } else if (selectEntityCode === 'E_Logistics') {
                    this.setState({ lgtEntityModalVisible: true, operValuesArr });
                } else {
                    checkArr = operValuesArrToCheckArr(operValuesArr);
                    this.setState({ visible3: true, checkArr }); // 选择实体信息
                }
                this.handleObjDetail(selectEntityCode);
            }
            const { setFieldsValue } = nextProps.form;
            if (tempdata.templName) {
                setFieldsValue({
                    templName: tempdata.templName,
                    remark: tempdata.remark,
                });
            }
        }
    }

    // 另存方案--弹窗上的确定
    modalOk = () => { // templName
        const { templId } = this.props.tempdata;
        if (templId) {
            const { templName, remark } = this.props.form.getFieldsValue(['templName', 'remark']);
            return this.handleSavePlan(templId, templName, remark);
        }
        this.props.form.validateFields((err, fields) => {
            if (err) {
                return false;
            }
            const templName = fields.templName;
            const newTemplName = templName;
            post(`${api_url}/urc/motan/service/api/IUrcService/checkDuplicateTemplName`, { newTemplName, templId: '' })
                .then((response) => {
                    if (response.state == '000001') {
                        if (response.data == 1) { // 名称重复
                            message.warning('方案名称重复!');
                            return Promise.reject();
                        }
                        return Promise.resolve();
                    }
                    return Promise.reject();
                })
                .then(() => this.handleSavePlan('', templName, fields.remark));
        });
    }

    handleSavePlan = (templId = '', templName, remark) => {
        const lstDataRuleSys = parseSaveParams(this.props.sysRuleMap, this.props.sysStateArr);
        const params = {
            remark,
            templId,
            templName,
            lstDataRuleSys,
        };
        post('/urc/motan/service/api/IUrcService/addOrUpdateDataRuleTempl', { templ: params })
            .then((response) => {
                this.setState({
                    visible: false,
                });
                if (response.state == '000001') {
                    message.success('保存成功!');
                    this.returnprev();
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 点击平台站点触发
    handleObjDetail = (value) => {
        if (!/(^E_StatisticsSystem$|^E_WarehouseAuthorized$|^E_Logistics$)/.test(value)) {
            this.props.getPlatformShopByEntityCode(value);
        }
    }

    // 增加选择
    handleAddCheckArr = (arr) => {
        this.setState({ checkArr: arr });
    }

    // 返回按钮
    returnprev=() => {
        this.props.history.goBack();
    }

    // 选择完实体对象数据回调
    handleSelectEntityOk = (resultDatas) => {
        this.setState({ 
            visible3: false,
            checkArr: [],
            statisticsEntityModalVisible: false,
            wareEntityModalVisible: false,
            lgtEntityModalVisible: false,
        });
        const {
            sysKey, selectEntityCode, platformMap, datas,
        } = this.props.tempdata;
        if (selectEntityCode === 'E_CsOrg') {
            this.props.updateSysRulel({
                sysKey,
                entityCode: selectEntityCode,
                operValuesArr: parseESEntityData(this.state.checkArr, datas),
            });
        } else if(selectEntityCode === 'E_StatisticsSystem' ||
                  selectEntityCode === 'E_WarehouseAuthorized' ||
                  selectEntityCode === 'E_Logistics'      
            ) {
            this.props.updateSysRulel({
                sysKey,
                entityCode: selectEntityCode,
                operValuesArr: resultDatas,
            });
        } else {
            this.props.updateSysRulel({
                sysKey,
                entityCode: selectEntityCode,
                operValuesArr: checkArrToOperValueArr(this.state.checkArr, platformMap),
            });
        }
        this.props.setTempData({ selectEntityCode: '', platformMap: null, platformList: [] });
    }

    render() {
        const { platformMap } = this.props.tempdata;
        let rightData = [];
        if (platformMap) {
            try {
                rightData = checkArrToOperValueArr(this.state.checkArr, platformMap);
            } catch (err) {
                rightData = [];
            }
        }
        const buttons = (
            <div className="ant-row-flex ant-row-flex-end btnBox">
                <Button onClick={this.returnprev}>
                    返回
                </Button>
                <Button type="primary" className="ml20" onClick={this.modalOk}>
                    保存
                </Button>
            </div>
        );

        const {
            checkArr,
            visible3,
            statisticsEntityModalVisible,
            wareEntityModalVisible,
            lgtEntityModalVisible,
            operValuesArr,
        } = this.state;
        const platformList = this.props.tempdata.platformList || [];
        const sysKey = this.props.tempdata.sysKey;
        const selectValues = this.props.sysRuleMap.get(sysKey);
        return (
            <div className="newClue authorization">
                <div className="newCluewk">
                    <Projectintroduct {...this.props} />
                    <Authorizationscope
                        {...this.props}
                        showModal={() => this.setState({ visible2: true })}
                    />
                    <Authorizationdetail
                        {...this.props}
                    />
                    {buttons}
                </div>
                <PlatformEntrySetModal
                    onOk={this.handleSelectEntityOk}
                    onCancel={() => {
                        this.setState({ visible3: false, checkArr: [] });
                        this.props.setTempData({ selectEntityCode: '' });
                    }}
                    visible={visible3}
                    title="平台 账号 站点 范围选择"
                    checkedKeys={checkArr} // 受控 选择的key
                    rightData={rightData}
                    onCheck={this.handleAddCheckArr}
                    prmissionsData={platformList}
                />
                <WareModal
                    visible={wareEntityModalVisible}
                    onCancel={() => {
                        this.setState({ wareEntityModalVisible: false, });
                        this.props.setTempData({ selectEntityCode: '' });
                    }}
                    onOk={this.handleSelectEntityOk}
                    data={operValuesArr}
                    selectValues={selectValues}
                />
                <StatisticsEntitySetModal
                    visible={statisticsEntityModalVisible}
                    onCancel={() => {
                        this.setState({ statisticsEntityModalVisible: false, });
                        this.props.setTempData({ selectEntityCode: '' });
                    }}
                    onOk={this.handleSelectEntityOk}
                    data={operValuesArr}
                    selectValues={selectValues}
                />
                <LogisticsEntryModal
                    visible={lgtEntityModalVisible}
                    onCancel={() => {
                        this.setState({ lgtEntityModalVisible: false, });
                        this.props.setTempData({ selectEntityCode: '' });
                    }}
                    onOk={this.handleSelectEntityOk}
                    data={operValuesArr}
                    selectValues={selectValues}
                />
            </div>
        );
    }
}

export default Form.create()(UserForm);
