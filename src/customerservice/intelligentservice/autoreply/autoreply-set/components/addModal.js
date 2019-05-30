import React from 'react';
import {
    Modal,
    Form,
    Radio,
    Input,
    Select,
    Checkbox,
    Row,
    Col,
    Button,
    message,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import {
    GET_AUTOREPLAY_API,
    GET_SENDINFMODE_API,
    GET_PLATFORM_API,
    GET_ADD_RULE_API,
} from '../constants/Api';
// GET_SELLERACCOUNT_API
// import { logisticsPlate } from '../constants/index';
import CSelect from '../../../../../components/cselect';
import Title from '../../common/title';
import Wrap from '../../common/wrap';
import Chunk from '../../common/chunk';
import DelieverTime from '../../common/delieverTime';
import SelectTemp from '../../../../common/components/SelectTemp';
import Modal2 from '@/components/Modal2';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
const confirm = Modal.confirm;


class AddModal extends React.PureComponent {
    state = {
        loading: false,
        selectTempVisible: false,
        selectableList: [],
        selectData: {
            platformId: [],
        },
        defaultList: {
            platformId: [],
            plate: [],
            sendType: [],
        },
        tempName: '',
        variayeList: [],
        maxLengthList: [],
        delieverTime: [],
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    formItemLayout1 = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    componentWillReceiveProps(next) {
        const { visible, record } = next;
        if (visible && !this.props.visible && record && record.ruleId) {
            const { ruleId } = record;
            this.edit(ruleId);
        }
    }

    // 编辑状态初始化
    edit = (ruleId) => {
        const { getDetailAsync } = this.props;
        getDetailAsync({ ruleId })
            .then((result) => {
                const { setFieldsValue } = this.props.form;
                if (!result) return;
                const platformId = result.platform && result.platform.key;
                const plate = result.plate && result.plate.key;
                this.getVariaye(platformId, plate);
                this.getLimit(platformId);
                this.getConfigurationInfo(plate, platformId)
                    .then((configuration) => {
                        const { selectData, selectableList } = configuration;
                        const setValueObj = {
                            platformId: result.platform && result.platform.key,
                            plate: result.plate && result.plate.key,
                            sendType: result.sendType ? result.sendType.key.toString() : '',
                            templateId: result.template && result.template.key,
                            sendContent: result.sendContent,
                            ruleName: result.ruleName,
                            ruleState: result.ruleState,
                        };
                        const condition = result.condition;
                        selectableList.forEach((val) => {
                            const conditionCode = val.condition_code;
                            const data = condition.find(v => v.conditionCode === conditionCode);
                            if (data) {
                                selectData[conditionCode] = data.conditionValue || [];
                                setValueObj[conditionCode] = selectData[conditionCode].map(value => value.key);
                            } else {
                                delete selectData[conditionCode];
                                val.isChecked = false;
                            }
                        });
                        const defaultList = {
                            platformId: [result.platform],
                            plate: [result.plate],
                            sendType: [{
                                key: result.sendType && result.sendType.key.toString(),
                                label: result.sendType && result.sendType.label,
                            }],
                        };
                        setFieldsValue(setValueObj);
                        setFieldsValue({
                            delieverTimeStart: setValueObj.shippingTimeRange[0],
                            delieverTimeEnd: setValueObj.shippingTimeRange[1],
                        });
                        selectData.platformId = [result.platform];
                        this.setState({
                            selectableList,
                            defaultList,
                            selectData,
                            tempName: result.template.label,
                        });
                    });
            });
    }

    // 表单提交
    handleSubmit = () => {
        const { record } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                const keys = Object.keys(err);
                const data = keys && keys[0] && err[keys[0]] && err[keys[0]].errors && err[keys[0]].errors[0] && err[keys[0]].errors[0].message;
                if (data) {
                    message.warning(data);
                }
                return;
            }
            if (!values.sendContent) {
                return message.warning('请填写已选模板');
            }
            const { selectData, selectableList } = this.state;
            for (let i = 0; i < selectableList.length; i++) {
                const v = selectableList[i];
                if (v.isUsing && v.isChecked) {
                    if (!values.condition) {
                        values.condition = [];
                    }
                    const key = v.condition_code;
                    const name = v.condition_name;
                    const list = selectData[key];
                    // 勾选的条件必填
                    if (!list || !list.length) return message.warning(`请选择${name}`);
                    values.condition.push({
                        conditionCode: key,
                        conditionName: name,
                        conditionValue: list,
                    });
                    delete values[key];
                }
            }
            // 可选条件必选一项
            if (!values.condition || !values.condition.length) return message.warning('请选择至少一项可选条件');
            Object.keys(values).forEach((key) => {
                if (values[key] === undefined) {
                    delete values[key];
                }
            });
            delete values.variaye;

            if (record && record.ruleId) {
                values.ruleId = record.ruleId;
            }

            this.setState({ loading: true });
            fetchPost(GET_ADD_RULE_API, values, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.handleCancel();
                        this.props.handleSubmit();
                    }
                })
                .finally(() => {
                    this.setState({ loading: false });
                });
        });
    };

    // 取消
    handleCancel = () => {
        this.setState({
            loading: false,
            selectTempVisible: false,
            selectableList: [],
            tempName: '',
            selectData: {
                platformId: [],
            },
            defaultList: {
                platformId: [],
                plate: [],
                sendType: [],
            },
            variayeList: [],
        });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    changeBoxLabel = (type) => {
        const { setFieldsValue } = this.props.form;
        const { selectableList, selectData } = this.state;
        const data = selectableList.find(v => v.condition_code === type);
        data.isChecked = !data.isChecked;

        if (!data.isChecked) {
            selectData[type] = [];
            setFieldsValue({
                [type]: [],
            });
            // 针对物流发货时间表单清空处理
            if (type === 'shippingTimeRange') {
                this.setState({ delieverTime: [] });
                setFieldsValue({
                    delieverTimeStart: undefined,
                    delieverTimeEnd: undefined,
                });
            }
        }
        this.setState({
            selectData,
            selectableList: [...selectableList],
        });
    }

    getCheckBoxLabel = (type, title, checked, isUsing) => {
        const { changeBoxLabel } = this;
        return (
            <Checkbox
                className="autoreply-set-add-choosable-checkbox"
                checked={checked}
                onChange={isUsing ? () => changeBoxLabel(type) : () => { }}
            >
                {title}
            </Checkbox>
        );
    }

    // 右侧展示项的选中事件
    selectChange = (type, values, options) => {
        const { selectData } = this.state;
        let value = [];
        if (Array.isArray(options)) {
            value = options.map((v) => {
                const obj = {};
                obj.key = v.props.value;
                obj.label = v.props.children;
                return obj;
            });
        } else if (type === 'shippingTimeRange') {
            // 拦截发货时间有一项未填写的情况
            let flag = true;
            for(let i = 0;i < values.length;i++) {
                if (!values[i]) {
                    flag = false;
                    break;
                }
            }
            if (flag && values.length === 2) {
                value = values.map(v => ({
                    key: v,
                    label: v
                }));
            }
        } else {
            value.push({
                key: options.props.value,
                label: options.props.children,
            });
        }
        this.setState({
            selectData: {
                ...selectData,
                [type]: value,
            },
        });
    }

    // 删除选项
    delChunk = (type, key) => {
        const { selectData } = this.state;
        const { getFieldValue, setFieldsValue } = this.props.form;
        const list = selectData[type];
        this.setState({
            selectData: {
                ...selectData,
                [type]: list.filter(v => v.key !== key),
            },

        });
        const data = getFieldValue(type);
        setFieldsValue({
            [type]: data.filter(v => v !== key),
        });
    }

    // 选择模板弹窗显示
    showSelectTemp = () => {
        const { getFieldsValue } = this.props.form;
        const { sendType } = getFieldsValue(['sendType']);
        if (sendType === undefined) {
            return message.warning('请先选择发送方式');
        }
        this.setState({
            selectTempVisible: true,
        });
    }

    // 选择模板弹窗隐藏
    hideSelectTemp = () => {
        this.setState({
            selectTempVisible: false,
        });
    }

    // 选中模板的回调
    handleSelectTemp = (value, record) => {
        const { sendContentTextArea } = this.state;
        const { getFieldsValue, setFieldsValue } = this.props.form;
        const { sendContent } = getFieldsValue(['sendContent', 'templateId']);
        if (!sendContent) {
            this.setState({
                tempName: record.tempName,
            });
            setFieldsValue({
                sendContent: value.messageContent,
                templateId: record.tempId,
            });
            this.hideSelectTemp();
        } else {
            confirm({
                title: '提示',
                content: '是否使用选中的模板替换当前已选模板',
                onOk: () => {
                    setFieldsValue({
                        sendContent: value.messageContent,
                        templateId: record.tempId,
                    });
                    sendContentTextArea.value = value.messageContent;
                    this.setState({
                        tempName: record.tempName,
                    });
                    this.hideSelectTemp();
                },
            });
        }
    }

    // 获取变量列表
    getVariaye = (platformId, plate) => {
        const { getVariayeAsync } = this.props;
        getVariayeAsync({ platformId, plate })
            .then((result) => {
                if (result) {
                    this.setState({
                        variayeList: result.map(val => ({
                            status: val.status,
                            key: val.name,
                            label: `${val.name}[${val.title}]`,
                        })),
                    });
                }
            });
    }

    // 获取可配置信息
    getConfigurationInfo = (plate, platformId) => {
        const { queryConfigurationAsync } = this.props;
        const { getFieldsValue } = this.props.form;
        platformId = platformId || getFieldsValue(['platformId']);
        if (!platformId || !plate) return;
        const { selectData } = this.state;
        this.setState({
            selectableList: [],
            selectData: {
                platformId: selectData.platformId,
            },
        });
        return queryConfigurationAsync({
            platformId,
            plate,
        })
            .then((result) => {
                if (result) {
                    const keys = [];
                    result.forEach((v) => {
                        if (v.isUsing) {
                            keys[v.condition_code] = [];
                        }
                        v.isChecked = !!v.isUsing;
                    });
                    const data = {
                        selectableList: result,
                        selectData: {
                            platformId: selectData.platformId,
                            ...keys,
                        },
                    };
                    this.setState(data);
                    return data;
                }
            });
    }

    // 设置可选条件
    setChoosable = (selectableList) => {
        const arr = [];
        const obj = {};
        selectableList.forEach((v) => {
            if (!obj[v.type_name]) {
                const d = [v];
                d.typeName = v.type_name;
                arr.push(d);
                obj[v.type_name] = d;
            } else {
                obj[v.type_name].push(v);
            }
        });
        return arr;
    }

    // 获取textarea
    getTextArea = (dom) => {
        if (!dom) return;
        this.setState({
            sendContentTextArea: dom.textAreaRef,
        });
    }

    // 依据光标位置设置值
    setCursorValue = () => {
        const { getFieldsValue, setFieldsValue } = this.props.form;
        const { variaye } = getFieldsValue(['variaye']);
        if (!variaye) return message.warning('请选择插入变量');
        const { sendContentTextArea } = this.state;
        const value = sendContentTextArea.value;
        const index = sendContentTextArea.selectionEnd;
        const pre = value.slice(0, index);
        const next = value.slice(index);
        const string = `${pre}{${variaye}}${next}`;
        sendContentTextArea.value = string;
        setFieldsValue({
            sendContent: string,
        });
        sendContentTextArea.focus();
    }

    // 平台切换

    platformSelectChange = (values, options) => {
        const { setFieldsValue } = this.props.form;
        this.getLimit(values);
        // plate sendType templateId variaye sendContent
        setFieldsValue({
            plate: undefined,
            sendType: undefined,
            templateId: undefined,
            variaye: undefined,
            sendContent: undefined,
        });
        this.setState({
            tempName: '',
            selectableList: [],
            selectData: {
                platformId: [{
                    key: options.props.value,
                    label: options.props.children,
                }],
            },
            variayeList: [],
        });
    }

    // 获取字符限制
    getLimit = (platformId) => {
        const { getLimitAsync } = this.props;
        getLimitAsync({ platformId })
            .then((result) => {
                if (result) {
                    this.setState({
                        maxLengthList: result || [],
                    });
                }
            });
    }

    plateChangeHandle = (value) => {
        const { getFieldsValue, setFieldsValue } = this.props.form;
        const { platformId } = getFieldsValue(['platformId', 'plate']);
        setFieldsValue({
            sendType: undefined,
        });
        this.getVariaye(platformId, value);
        this.getConfigurationInfo(value, platformId);
    }

    render() {
        const {
            selectTempVisible,
            selectData,
            selectableList,
            defaultList,
            variayeList,
            maxLengthList,
            delieverTime,
            sendContentTextArea,
        } = this.state;
        const tempName = this.state.tempName || '请选择模板';
        const { visible } = this.props;
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const choosableData = this.setChoosable(selectableList);
        const { getCheckBoxLabel, formItemLayout1 } = this;
        const { platformId, plate, sendType } = getFieldsValue(['platformId', 'plate', 'sendType']);
        const maxLengthData = maxLengthList.find(v => v.key === sendType);
        const maxLength = maxLengthData ? Number(maxLengthData.label) : 0;
        const surplus = sendContentTextArea ? maxLength - sendContentTextArea.value.length : 0;
        getFieldDecorator('templateId');
        return (
            <div>
                <Modal
                    visible={visible}
                    title="新增自动回复"
                    destroyOnClose
                    maskClosable={false}
                    width={1000}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Row className="autoreply-set-add-modal">
                        <Col span={12} style={{ paddingRight: 15 }}>
                            <Title className="margin-ms-bottom" title="基础信息">
                                <FormItem
                                    {...formItemLayout1}
                                    label="平台"
                                >
                                    {
                                        getFieldDecorator('platformId', {
                                            initialValue: defaultList.platformId && defaultList.platformId.length ? defaultList.platformId : undefined,
                                            rules: [{ required: true, message: '平台不能为空' }],
                                        })(
                                            <CSelect
                                                list={defaultList.platformId}
                                                code="key" // 列表编码字段
                                                name="label" // 列表名称字段
                                                url={GET_PLATFORM_API}
                                                params={{ applicableTempId: 0 }} // 搜索参数
                                                apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                                placeholder="请选择"
                                                style={{ width: '100%' }}
                                                onChange={this.platformSelectChange}
                                            />,
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout1}
                                    label="状态"
                                >
                                    {
                                        getFieldDecorator('ruleState', {
                                            initialValue: 1,
                                            rules: [{ required: true, message: '规则状态不能为空' }],
                                        })(
                                            <RadioGroup>
                                                <Radio value={1}>开启</Radio>
                                                <Radio value={0}>关闭</Radio>
                                            </RadioGroup>,
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    style={{ marginBottom: '10px' }}
                                    {...formItemLayout1}
                                    label="名称"
                                >
                                    {
                                        getFieldDecorator('ruleName', {
                                            initialValue: undefined,
                                            rules: [
                                                { required: true, message: '规则名称不能为空' },
                                                { max: 100, message: '规则名称不能超过100字符' },
                                            ],
                                        })(
                                            <Input placeholder="请输入规则名称" />,
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    style={{ marginBottom: '10px' }}
                                    {...formItemLayout1}
                                    label="适用板块"
                                >
                                    {
                                        getFieldDecorator('plate', {
                                            initialValue: defaultList.plate && defaultList.plate.length ? defaultList.plate : undefined,
                                            rules: [{ required: true, message: '适用板块不能为空' }],
                                        })(
                                            <CSelect
                                                list={defaultList.plate}
                                                // list={[]}
                                                code="key" // 列表编码字段
                                                name="label" // 列表名称字段
                                                url={GET_AUTOREPLAY_API}
                                                // mode="multiple" // 是否多选
                                                // maxCount={3} // 最多选择项数量
                                                // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象label
                                                params={{
                                                    platformId,
                                                }} // 搜索参数
                                                placeholder="请选择适用板块"
                                                apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                                disabled={!platformId}
                                                onChange={this.plateChangeHandle}
                                            />,
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    style={{ marginBottom: '10px' }}
                                    {...formItemLayout1}
                                    label="发送方式"
                                >
                                    {
                                        getFieldDecorator('sendType', {
                                            initialValue: defaultList.sendType && defaultList.sendType.length ? defaultList.sendType : undefined,
                                            rules: [{ required: true, message: '发送方式不能为空' }],
                                        })(
                                            <CSelect
                                                list={defaultList.sendType}
                                                // list={[]}
                                                code="key" // 列表编码字段
                                                name="label" // 列表名称字段
                                                url={GET_SENDINFMODE_API}
                                                // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象label
                                                params={{
                                                    platformId,
                                                    applicableTempId: plate,
                                                }} // 搜索参数
                                                placeholder="请选择发送方式"
                                                apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                                disabled={!platformId || !plate}
                                            />,
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout1}
                                    label="发送模板"
                                >
                                    <Button disabled={!platformId} onClick={this.showSelectTemp}>选择模板</Button>
                                    <span className="fsz12 margin-sm-left">{tempName}</span>
                                </FormItem>
                            </Title>
                            <Title title="可选条件">
                                {
                                    choosableData.map((v) => {
                                        const {
                                            typeName,
                                        } = v;
                                        return (
                                            <Wrap key={typeName} className="margin-ms-top" title={typeName}>
                                                {
                                                    v.map((val) => {
                                                        const {
                                                            condition_code,
                                                            condition_name,
                                                            list = [],
                                                            isChecked,
                                                            isUsing,
                                                        } = val;
                                                        let logFormItem;
                                                        if (condition_code === 'shippingTimeRange') {
                                                            logFormItem = (
                                                                <DelieverTime
                                                                    {...this.props}
                                                                    delieverTime={delieverTime}
                                                                    selectChange={this.selectChange}
                                                                    isChecked={isChecked}
                                                                    condition_code={condition_code}
                                                                />
                                                            )
                                                        } else {
                                                            logFormItem = (
                                                                <Select
                                                                    placeholder="请选择"
                                                                    style={{ width: '100%' }}
                                                                    mode="multiple"
                                                                    disabled={!isChecked}
                                                                    onChange={(values, option) => this.selectChange(condition_code, values, option)}
                                                                >
                                                                    {
                                                                        list.map(data => (
                                                                            <Option key={data.key} value={data.key}>{data.label}</Option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            )
                                                        }
                                                        return (
                                                            <FormItem
                                                                {...this.formItemLayout}
                                                                label={getCheckBoxLabel(condition_code, condition_name, isChecked, isUsing)}
                                                                key={condition_code}
                                                            >
                                                                {
                                                                    getFieldDecorator(condition_code, {
                                                                        initialValue: undefined,
                                                                    })(logFormItem)
                                                                }
                                                            </FormItem>
                                                        );
                                                    })
                                                }
                                            </Wrap>
                                        );
                                    })
                                }
                            </Title>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 15 }}>
                            <Title className="margin-ms-bottom" title="已选条件" isImportant>
                                <FormItem
                                    {...this.formItemLayout1}
                                    label="平台"
                                >
                                    <Chunk showIcon={false} content={selectData.platformId} />
                                </FormItem>
                                {
                                    selectableList.map((val) => {
                                        const {
                                            condition_code,
                                            condition_name,
                                            isChecked,
                                        } = val;
                                        if (!isChecked) return null;
                                        return (
                                            <FormItem
                                                key={condition_code}
                                                {...this.formItemLayout1}
                                                label={condition_name}
                                            >
                                                <Chunk isDelieverTime={condition_code === 'shippingTimeRange'} onClick={this.delChunk} content={selectData[condition_code]} type={condition_code} />
                                            </FormItem>
                                        );
                                    })
                                }
                            </Title>
                            <Title title="已选模板（预览）" isImportant>
                                <FormItem
                                    className="autoreply-set-sendContent"
                                >
                                    {
                                        getFieldDecorator('sendContent', {
                                            initialValue: undefined,
                                            rules: [
                                                { max: maxLength, message: sendType === undefined ? '请先选择发送方式' : `当前字符超过${maxLength},请酌情移除` },
                                            ],
                                        })(
                                            <TextArea
                                                ref={this.getTextArea}
                                                autosize={{ minRows: 20, maxRows: 20 }}
                                                placeholder="请填写已选模板"
                                            />,
                                        )
                                    }
                                    <p className="autoreply-set-textarea-suffix">还可以输入{surplus > 0 ? surplus : 0} 个字</p>
                                </FormItem>
                                <FormItem
                                    className="margin-sm-top"
                                    {...{
                                        labelCol: { span: 4 },
                                        wrapperCol: { span: 20 },
                                    }}
                                    label="插入变量"
                                >
                                    {
                                        getFieldDecorator('variaye', {
                                            initialValue: undefined,
                                        })(
                                            <Select
                                                placeholder="请选择插入变量"
                                                style={{ width: '70%' }}
                                            >
                                                {
                                                    variayeList.map(data => (
                                                        <Option disabled={!data.status} key={data.key} value={data.key}>{data.label}</Option>
                                                    ))
                                                }
                                            </Select>,
                                        )
                                    }
                                    <Button onClick={this.setCursorValue} className="margin-sm-left">插入</Button>
                                </FormItem>
                            </Title>
                        </Col>
                    </Row>
                    <Modal2
                        component={
                            (
                                <SelectTemp
                                    handleSelectTemp={this.handleSelectTemp}
                                    platformId={platformId}
                                // handleCancel={() => { }}
                                />
                            )
                        }
                        title="选择模板"
                        visible={selectTempVisible}
                        handleCancel={this.hideSelectTemp}
                        maskClosable={false}
                        width={800}
                    />
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal);
