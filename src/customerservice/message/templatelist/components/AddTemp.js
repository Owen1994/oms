import React from 'react';
import {
    Form, Input, Radio, Tabs, message, Select, Button,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { GET_MESSAGE_TEMPDETAIL, GET_LANGUAGES_LIST, GET_VARIAYE_LIST_API } from '../constants';
import { strTrim } from '../../../../util/baseTool';
// import CountArea from '../../../common/components/CountArea';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class AddTemp extends React.Component {
    state = {
        tempDetail: [], // 模板详情请求的数据
        languagesList: [], // 语种列表数据
        // wordLeft: 1000, // 输入文本域字数控制参数
        maxLength: 900,
        textValue: '', // 文本域的输入值
        preActiveKey: '', // 和activeKey均为tabs栏状态控制参数
        activeKey: '',
        variayeList: [], // 变量列表
        sendContentTextArea: {},
    }

    componentDidMount() {
        const { item } = this.props;
        // 判断操作是否为编辑或者新增
        let flag1 = false; let flag2 = false;
        if (item) {
            fetchPost(GET_MESSAGE_TEMPDETAIL, { tempId: item.tempId, type: 2 }, 2)
                .then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({
                            tempDetail: data.data.data,
                        });
                        this.props.editDataAction(data.data.data.languagesContent);
                        flag1 = true;
                        if (flag1 && flag2) {
                            this.setTabsActive();
                        }
                    }
                });
            this.getLanguageList(() => {
                flag2 = true;
                if (flag1 && flag2) {
                    this.setTabsActive();
                }
            });
        } else {
            this.getLanguageList();
        }
        this.getVariayeList();
    }

    componentWillUnmount() {
        this.state.sendContentTextArea = {};
    }

    // 获取动态变量列表
    getVariayeList = () => {
        // const { tempDetail } = this.state;
        const { platformKey } = this.props;
        const { getFieldsValue } = this.props.form;
        let { platformId } = getFieldsValue(['platformId']);
        if (platformId === undefined) {
            platformId = platformKey;
        }
        fetchPost(GET_VARIAYE_LIST_API, { platformId })
            .then((result) => {
                if (result.state === '000001') {
                    const data = (result.data && result.data.list) || [];
                    this.setState({
                        variayeList: data.map(v => ({
                            key: v.name,
                            label: `${v.name}[${v.title}]`,
                            status: v.status,
                        })),
                        isOpen: result.data.isOpen,
                    });
                }
            });
    }

    // 获取语种
    getLanguageList = (callback) => {
        fetchPost(GET_LANGUAGES_LIST, {}, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    const languagesList = data.data.filter(item => item.languagesState === 1);
                    this.setState({
                        languagesList,
                        preActiveKey: `${languagesList[0].languagesId}`,
                        activeKey: `${languagesList[0].languagesId}`,
                    });
                    if (callback) callback();
                }
            });
    }

    // 编辑时设置tabs交互效果的初始化
    setTabsActive = () => {
        const { tempDetail } = this.state;
        tempDetail.languagesContent.forEach((item, index) => {
            // if (item && item.messageTitle && item.messageContent) {
            if (item && item.messageContent) {
                const tabs = document.querySelectorAll('.add-temp-modal .ant-tabs-tab');
                tabs[index].setAttribute('input-complete', '');
            }
        });
    }

    handleKeydown = (e) => {
        if (this.state.textValue.length <= 1000) {
            this.setState({ textValue: e.target.value });
        }
    }

    // handleInputChange = (e) => {
    //     const writeWordLength = e.target.value.length;
    //     const maxLength = 1000;
    //     this.setState({ wordLeft: maxLength - writeWordLength < 0 ? 0 : maxLength - writeWordLength });
    //     if (e.target.value.length > maxLength) {
    //         e.target.value = this.state.textValue;
    //     }
    // }

    // 语言tab切换
    handleLanguageTab = (activeKey) => {
        const { preActiveKey, languagesList } = this.state;
        const { getFieldValue } = this.props.form;
        const val = getFieldValue(`messageInfo${preActiveKey}`);
        // const messageTitle = strTrim(val.messageTitle);
        const messageContent = strTrim(val.messageContent);
        const tabs = document.querySelectorAll('.add-temp-modal .ant-tabs-tab');
        // 语言选择交互效果
        // debugger;
        // if (messageContent === '') {
        //     this.setState({ activeKey: preActiveKey });
        //     message.warning('请填写消息正文');
        // } else
        if (messageContent !== '') {
            const index = languagesList.findIndex(item => `${item.languagesId}` === preActiveKey);
            if (index !== undefined) {
                tabs[index].setAttribute('input-complete', '');
            }
            this.setState({ activeKey, preActiveKey: activeKey });
        } else {
            const index = languagesList.findIndex(item => `${item.languagesId}` === preActiveKey);
            if (index !== undefined) {
                tabs[index].removeAttribute('input-complete', '');
            }
            this.setState({ activeKey, preActiveKey: activeKey });
        }
    }

    // 获取textarea
    getTextArea = (dom, id) => {
        if (!dom) return;
        const { sendContentTextArea } = this.state;
        sendContentTextArea[id] = dom.textAreaRef;
        this.setState({
            sendContentTextArea,
        });
    }

    // 依据光标位置设置值
    setCursorValue = (languagesId) => {
        const { getFieldsValue, setFieldsValue } = this.props.form;
        const messageInfoName = `messageInfo${languagesId}`;
        const { variaye } = getFieldsValue(['variaye']);
        if (!variaye) return message.warning('请选择插入变量');
        const { sendContentTextArea } = this.state;
        const dom = sendContentTextArea[languagesId];
        if (!dom) return;
        const value = dom.value;
        const index = dom.selectionEnd;
        const pre = value.slice(0, index);
        const next = value.slice(index);
        const string = `${pre}{${variaye}}${next}`;
        dom.value = string;
        setFieldsValue({
            [messageInfoName]: {
                languagesId,
                messageContent: string,
            },
        });
        dom.focus();
    }

    // // 语言tab切换
    // handleLanguageTab = (activeKey) => {
    //     const { preActiveKey, languagesList } = this.state;
    //     const { getFieldValue } = this.props.form;
    //     const val = getFieldValue(`messageInfo${preActiveKey}`);
    //     const messageTitle = strTrim(val.messageTitle);
    //     const messageContent = strTrim(val.messageContent);
    //     const tabs = document.querySelectorAll('.add-temp-modal .ant-tabs-tab');
    //     // 语言选择交互效果
    //     if ((messageContent === '' && messageTitle !== '') || (messageContent !== '' && val.messageTitle === '')) {
    //         this.setState({ activeKey: preActiveKey });
    //         message.warning('请填写消息标题或者消息正文');
    //     } else if (messageContent !== '' && messageTitle !== '') {
    //         const index = languagesList.findIndex(item => `${item.languagesId}` === preActiveKey);
    //         if (index !== undefined) {
    //             tabs[index].setAttribute('input-complete', '');
    //         }
    //         this.setState({ activeKey, preActiveKey: activeKey });
    //     } else {
    //         const index = languagesList.findIndex(item => `${item.languagesId}` === preActiveKey);
    //         if (index !== undefined) {
    //             tabs[index].removeAttribute('input-complete', '');
    //         }
    //         this.setState({ activeKey, preActiveKey: activeKey });
    //     }
    // }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };
        const formItemLayout2 = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const { getFieldDecorator } = this.props.form;
        const {
            item, platformLabel, platformKey, tempClass, tempClassId,
        } = this.props;
        const {
            tempDetail, languagesList, activeKey, variayeList, maxLength, sendContentTextArea, isOpen,
        } = this.state;
        if (item && tempDetail.length <= 0) {
            return false;
        }
        const currentDom = sendContentTextArea[activeKey];
        const surplus = currentDom ? maxLength - currentDom.value.length : 0;
        let languageSelect;
        if (languagesList.length > 0) {
            languageSelect = (
                <Tabs
                    type="card"
                    tabBarGutter={0}
                    onChange={this.handleLanguageTab}
                    activeKey={activeKey}
                    className="mt12"
                >
                    {(item ? tempDetail.languagesContent : languagesList).map((ele) => {
                        const languagesId = ele.languagesId;
                        getFieldDecorator(`messageInfo${languagesId}.languagesId`, { initialValue: ele.languagesId });
                        return (
                            <TabPane tab={ele.languagesName} key={ele.languagesId}>
                                {
                                    // <FormItem
                                    //     {...formItemLayout}
                                    //     label="消息标题"
                                    //     style={{ paddingTop: 15 }}
                                    //     className="msg-title-label"
                                    // >
                                    //     {getFieldDecorator(`messageInfo${languagesId}.messageTitle`, {
                                    //         // rules:[{required: true,message: '请输入消息标题'}],
                                    //         initialValue: item ? ele.messageTitle : '',
                                    //     })(
                                    //         <Input placeholder="请输入文字" />,
                                    //     )}
                                    // </FormItem>
                                }
                                <FormItem
                                    {...formItemLayout2}
                                    label="消息正文"
                                    style={{ padding: '22px 0 15px 0' }}
                                    className="msg-content-label"
                                >
                                    {getFieldDecorator(`messageInfo${languagesId}.messageContent`, {
                                        // rules:[{required: true,message: '请输入消息正文'}],
                                        initialValue: item ? ele.messageContent : '',
                                        rules: [
                                            { max: maxLength, message: '字符数量已超出限制，请酌情删减' },
                                        ],
                                    })(
                                        <TextArea
                                            ref={e => this.getTextArea(e, languagesId)}
                                            placeholder={`请将您的回复限制在${maxLength}个字符以内`}
                                            // defaultValue={item ? ele.messageContent : ''}
                                            rows={8}
                                            onKeyDown={this.handleKeydown}
                                        // onChange={this.handleInputChange}
                                        />,
                                    )}
                                    <p className="word-left">还可以输入{surplus}个字</p>
                                </FormItem>
                                {isOpen
                                    ? (
                                        <FormItem
                                            {...formItemLayout2}
                                            label="动态变量"
                                            style={{ margin: '12px 0 15px 0' }}
                                            className="mt12"
                                        >
                                            {getFieldDecorator('variaye', {
                                                // initialValue: item ? ele.messageContent : '',
                                            })(
                                                <Select
                                                    style={{ width: '75%' }}
                                                    placeholder="请选择"
                                                >
                                                    {
                                                        variayeList.map(v => (
                                                            <Option disabled={!v.status} key={v.key} value={v.key}>{v.label}</Option>
                                                        ))
                                                    }
                                                </Select>,
                                            )}
                                            <Button onClick={() => this.setCursorValue(languagesId)} className="margin-sm-left">插入</Button>
                                        </FormItem>
                                    )
                                    : null
                                }
                            </TabPane>
                        );
                    })}
                </Tabs>
            );
        } else {
            languageSelect = (
                <div style={{ marginTop: 16, border: '1px solid #ddd' }}>
                    <p style={{ color: 'red', fontSize: 14, padding: '10px 0px 0px 24px' }}>暂无语种设置，请先设置生效语种</p>
                    {
                        // <FormItem
                        //     {...formItemLayout}
                        //     label="消息标题"
                        //     style={{ paddingTop: 15 }}
                        //     className="msg-title-label"
                        // >
                        //     <Input placeholder="请输入文字" disabled />
                        // </FormItem>
                    }
                    <FormItem
                        {...formItemLayout2}
                        label="消息正文"
                        style={{ margin: '12px 0 15px 0' }}
                        className="msg-content-label mt12"
                    >
                        <TextArea
                            placeholder="请将您的回复限制在1000个字符以内"
                            rows={8}
                            disabled
                        />
                        <p className="word-left">还可以输入{surplus}个字</p>
                    </FormItem>
                    {isOpen
                        ? (
                            <FormItem
                                {...formItemLayout2}
                                label="动态变量"
                                style={{ margin: '12px 0 15px 0' }}
                                className="mt12"
                            >
                                <Select
                                    style={{ width: '75%' }}
                                    placeholder="请选择"
                                    disabled
                                >
                                    {
                                        variayeList.map(v => (
                                            <Option key={v.key} value={v.key}>{v.label}</Option>
                                        ))
                                    }
                                </Select>
                                <Button disabled className="margin-sm-left">插入</Button>
                            </FormItem>
                        ) : null
                    }
                </div>
            );
        }
        return (
            <div className="add-temp-modal">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="模板所属"
                    >
                        {getFieldDecorator('tempType', {
                            rules: [{ required: !item }],
                            initialValue: item ? tempDetail.tempType : 1,
                        })(
                            <RadioGroup disabled={!!item}>
                                <Radio value={1}>公有</Radio>
                                <Radio value={2}>私有</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="平台"
                        className="mt6"
                    >
                        {getFieldDecorator('platformId', {
                            // rules:[{required: true}],
                            initialValue: item ? tempDetail.platform.key : platformKey,
                        })(
                            <div>
                                <Input disabled defaultValue={item ? tempDetail.platform.label : platformLabel} />
                            </div>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模板分类"
                        className="mt12"
                    >
                        <Input
                            disabled
                            defaultValue={item ? tempDetail.tempClass.label : tempClass}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模板名称"
                        className="mt12"
                    >
                        {getFieldDecorator('tempName', {
                            rules: [{ required: true, message: '请输入模板名称' }],
                            initialValue: item ? tempDetail.tempName : '',
                        })(
                            <Input placeholder="请输入模板名称" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('tempClassId', {
                            initialValue: item ? tempDetail.tempClass.key : tempClassId.toString(),
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    {languageSelect}
                </Form>
            </div>
        );
    }
}
export default Form.create()(AddTemp);
