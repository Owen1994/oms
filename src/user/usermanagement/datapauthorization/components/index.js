// 数据授权
import React from 'react';
import {
    Form,
    Button,
    Input,
    message,
} from 'antd';

import '../css/css.css';
import qs from 'qs';
// 引入子组件
import Userlist from './Userlist'; // 方案简介
import Authorizationdetail from './Authorizationdetail'; // 授权详情
import Authorizationscope from './Authorizationscope'; // 授权范围
import Modalmodel from './Modalmodel';
import PlatformEntrySetModal from '@/user/common/components/PlatformEntrySetModal';
import { post } from '@/util/axios';
import { api_url } from '@/util/connectConfig';
import {
    operValuesArrToCheckArr,
    checkArrToOperValueArr,
    // parselstDataRule,
    // parseSaveParams,
} from '../selectors';
import {
    parselstDataRule,
    parseSaveParams,
} from '@/user/common/selectors/SaveAuthDataParams';
import {
    parseESEntityData,
    parseESEntityCheckArray,
} from '../selectors/commonruledata';
import TablelistModal from './Tablelist';
import StatisticsEntitySetModal from '@/user/common/components/StatisticsEntitySetModal';
import WareModal from '@/user/common/components/WareModal';
import LogisticsEntryModal from '@/user/common/components/LogisticsEntryModal';

// 定义常量
const FormItem = Form.Item;
class UserForm extends React.Component {
    state = {
        userArr: [],
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
        let userArr = [];
        const locationarr = window.location.href.split('?');
        const userNames = locationarr.length > 1 ? qs.parse(locationarr[1]).userName ? qs.parse(locationarr[1]).userName : '' : ''; // 获取userName
        const userName = userNames.split(',');

        if (typeof userName === 'string') {
            userArr.push(userName);
        } else if (typeof userName === 'object') {
            userArr = userName;
        }
        this.props.userlistaction({ userArr });
        this.setState({
            userArr,
        }, function () {
            this.props.loadSysStateArr();
        });
    }

    componentWillReceiveProps(nextProps) {
        const prevSysStateArr = this.props.sysStateArr;
        const sysStateArr = nextProps.sysStateArr;

        if (prevSysStateArr !== sysStateArr && sysStateArr.length > 0) {
            const { sysKey, sysName } = sysStateArr[0];// 数据初始化
            this.props.setTempData({ index: 0, sysKey, sysName });

            const userArr = this.state.userArr;
            if (userArr.length === 1) {
                this.props.loadSysStateRule({ lstUserName: userArr });
            }
        }

        const prevTempdata = this.props.tempdata;
        const tempdata = nextProps.tempdata;
        if (tempdata.selectEntityCode && tempdata.selectEntityCode !== prevTempdata.selectEntityCode) {
            const { selectEntityCode } = tempdata;
            const sysKeyMap = this.props.sysRuleMap.get(tempdata.sysKey);
            const selectEntityCodeDate = sysKeyMap.get(selectEntityCode);
            const operValuesArr = selectEntityCodeDate.operValuesArr;
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
    }

    // 另存方案按钮
    saveScheme = () => {
        this.setState({
            visible: true,
        });
    }

    // 另存方案--弹窗上的确定
    modalOk = () => { // templName
        this.props.form.validateFields((err, fields) => {
            const templName = fields.templName;
            if (!templName) {
                message.error('请填写方案名称!');
                return false;
            }
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
                .then(() => {
                    const { userArr } = this.state;
                    const lstDataRuleSys = parseSaveParams(this.props.sysRuleMap, this.props.sysStateArr);
                    if (userArr.length > 0) {
                        const params = {
                            remark: '',
                            templId: '',
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
                                    this.props.history.push({ pathname: '/user/usermanagementlist/datapermissiontempl/' });
                                } else {
                                    message.error(response.msg);
                                }
                            });
                    } else {
                        message.warn('请完善授权详情!');
                        return false;
                    }
                });
        });
    }

    // 弹窗取消按钮
    ModalhandleCancel = value => () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        });
    }

    // 保存按钮
    saveData = () => {
        const lstDataRule = parselstDataRule(this.state.userArr, this.props.sysRuleMap, this.props.sysStateArr);
        post(`${api_url}/urc/motan/service/api/IUrcService/addOrUpdateDataRule`, lstDataRule)
            .then((response) => {
                if (response.state == '000001') {
                    message.success('成功!');
                    this.props.history.goBack();
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

    modalhandleOk2 = (record) => {
        this.setState({ visible2: false });
        const params = {
            valFlag: 1,
            templId: record.templId,
        };
        this.props.refreshSysStateRule(params);
    }

    // 返回按钮
    returnprev = () => {
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
        const { getFieldDecorator } = this.props.form;
        const { platformMap, selectEntityCode } = this.props.tempdata;
        let rightData = [];
        if (platformMap) {
            try {
                if (selectEntityCode === 'E_CsOrg') {
                    rightData = [];
                } else {
                    rightData = checkArrToOperValueArr(this.state.checkArr, platformMap);
                }
            } catch (err) {
                rightData = [];
            }
        }

        const buttons = (
            <div className="btnBox">
                <Button onClick={this.returnprev}>
                    返回
                </Button>
                <Button className="ml20" onClick={this.saveData} disabled={!this.state.userArr.length}>
                    保存
                </Button>
                <Button type="primary" className="ml20" onClick={this.saveScheme}>
                    另存为方案
                </Button>
            </div>
        );

        const content = (
            <FormItem className="templName" label="方案名称" {...this.formItemLayout}>
                <div className="templValue">
                    {getFieldDecorator('templName', {
                        rules: [{
                            required: true,
                            message: '请填写方案名称',
                        }],
                    })(
                        <Input placeholder="请命名新方案的名称" />,
                    )}
                </div>
            </FormItem>
        );

        const {
            userArr,
            visible,
            checkArr,
            visible2,
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
            <div className="mianBox">
                <div className="subBox">
                    <Userlist {...this.props} />
                    <div className="newClue authorization">
                        <div className="newCluewk">
                            <Authorizationscope
                                {...this.props}
                                showModal={() => this.setState({ visible2: true })}
                            />
                            <Authorizationdetail
                                {...this.props}
                                userArr={userArr}
                            />
                            {buttons}
                        </div>
                    </div>
                </div>
                <Modalmodel
                    {...{
                        ...this.props.modalmodel,
                        visible,
                        ModalText: content,
                        title: '另存为方案',
                    }}
                    width="759px"
                    onOk={this.modalOk}
                    onCancel={this.ModalhandleCancel('visible')}
                />
                <TablelistModal
                    {...this.props}
                    title="选择一个已有方案"
                    visible={visible2}
                    onOk={this.modalhandleOk2}
                    onCancel={() => this.setState({ visible2: false })}
                />
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
                    selectEntityCode={selectEntityCode}
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
