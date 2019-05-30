import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import TableList from './TableList';
import Modal2 from '../../../../components/Modal2';
import LabelMadal from './LabelModal';
import SubLabelMadal from './SubLabelModal';
import SubLabelRuleModal from './SubLabelRuleModal';
import { commonRequest } from '../../../common/request';
import { filterRequest, showConfirm } from '../../../../compliance/utils';
import {
    TAG_TOGGLE, ADD_EDIT_LABEL, ADD_EDIT_SUBLABEL, DELETA_LABEL, POST_SUBLABEL_RULE,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../../constants';
import { strTrim } from '../../../../util/baseTool';

class label extends React.Component {
    state = {
        dataSource: [],
        visible: false,
        subVisible: false,
        ruleVisible: false,
        modalTitle: '',
        optionType: '', // 操作项类型
        tagRecord: {}, // 操作项该项的record
        confirmLoading: false, // 弹出框确定按钮的loading控制参数
        subConfirmLoading: false,
        ruleConfirmLoading: false,
    }

    labelformRef = React.createRef();

    sublabelformRef = React.createRef();

    ruleformRef = React.createRef();

    componentDidMount() {
        this.listFetch();
        this.props.platformList();
    }

    // 请求列表
    listFetch = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.platformId === 'all') {
                    delete values.platformId;
                }
                const filter = filterRequest(values);
                filter.pageNumber = pageNumber || page.defaultCurrent;
                filter.pageData = pageData || page.defaultPageSize;
                this.props.listFetch({ name: 'listData', value: filter });
            }
        });
    }

    /**
     * 操作栏点击选项后的回调
     * @param <String> title 弹出框的标题
     * @param <String> visibleType 各弹框的显示参数
     * @param <String> optionType 操作项的类型
     * @param <String> index 操作项的索引
     */
    handleOperate = (title, visibleType, optionType, index, record) => {
        // 解决编辑后操作项的record传递不正常
        let tagRecord;
        if (record) {
            if (record.parentId) {
                this.props.listReducer.listData.forEach((ele) => {
                    if (ele.tagId === record.parentId) {
                        const target = ele.children.find(item => item.tagId === record.tagId);
                        tagRecord = target;
                    }
                });
            } else {
                const target = this.props.listReducer.listData.find(item => item.tagId === record.tagId);
                tagRecord = target;
            }
        }
        if (optionType === 'deletelabel' || optionType === 'deleteSublabel') {
            showConfirm(
                '提示！',
                '确认要删除该标签',
                () => commonRequest(DELETA_LABEL, { tagId: tagRecord.tagId }, this.listFetch),
            );
        }
        this.setState({
            [visibleType]: true,
            modalTitle: title,
            tagRecord,
            optionType,
        });
    }

    // 重置按钮点击回调
    handleResetClick = () => {
        this.props.form.resetFields();
    }

    // 搜索按钮点击回调
    handleSubmit = (e) => {
        e.preventDefault();
        this.listFetch();
    }

    // 对话框点击取消回调
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }

    // 父标签对话框点击确认回调
    handleOk = () => {
        const { optionType, tagRecord } = this.state;
        this.labelformRef.current.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                fetchPost(ADD_EDIT_LABEL, optionType === 'addlabel' ? values : { tagId: tagRecord.tagId, ...values }, 1).then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({ visible: false });
                        this.listFetch();
                        this.labelformRef.current.resetFields();
                    }
                    this.setState({ confirmLoading: false });
                });
            }
        });
    }

    // 子标签对话框点击确认回调
    handleSubOk = () => {
        const { optionType, tagRecord } = this.state;
        this.sublabelformRef.current.validateFields((err, values) => {
            if (!err) {
                this.setState({ subConfirmLoading: true });
                fetchPost(ADD_EDIT_SUBLABEL,
                    optionType === 'addSublabel'
                        ? { parentId: tagRecord.tagId, ...values }
                        : { parentId: tagRecord.parentId, tagId: tagRecord.tagId, ...values }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.setState({ subVisible: false });
                            this.listFetch();
                            this.sublabelformRef.current.resetFields();
                        }
                        this.setState({ subConfirmLoading: false });
                    });
            }
        });
    }

    // 规则对话框点击确认回调
    handleRuleOk = () => {
        const { tagRecord } = this.state;
        this.ruleformRef.current.validateFields((err, values) => {
            if (!values.keyword.keywordType && values.email.emailType === 0) {
                message.warning('请至少选择一个已选条件输入');
                return;
            } if (values.keyword.keywordType && (!values.keyword.keywordContent || !strTrim(values.keyword.keywordContent))) {
                message.warning('请输入关键词内容');
                return;
            } if (values.email.emailType && (!values.email.emailContent || !strTrim(values.email.emailContent))) {
                message.warning('请输入邮箱信息');
                return;
            }
            if (!err) {
                this.setState({ ruleConfirmLoading: true });
                fetchPost(POST_SUBLABEL_RULE, { ...values, tagId: tagRecord.tagId }, 1).then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({ ruleVisible: false });
                        this.listFetch();
                        this.ruleformRef.current.resetFields();
                    }
                    this.setState({ ruleConfirmLoading: false });
                });
            }
        });
    }

    /*
    *  switch切换
    *  checked: bool
    *  record: 切换时该项的record
    * */
    handleRuleChange = (checked, record) => {
        const { tagId, ruleState } = record;
        const { dataSource } = this.state;
        const messages = checked ? '确认要开启该项' : '确认要关闭该项';
        this.setState({
            dataSource: this.props.listReducer.listData,
        });
        showConfirm(
            '提示！',
            messages,
            () => commonRequest(TAG_TOGGLE, { tagId, ruleState: ruleState === 1 ? 2 : 1 }, () => {
                let subData = [];
                this.state.dataSource.forEach((item) => {
                    subData = item.children ? subData.concat(item.children) : subData;
                });
                const target = subData.find(item => item.tagId === record.tagId);
                if (target) {
                    target.ruleState = target.ruleState === 1 ? 2 : 1;
                    this.setState({ dataSource });
                }
            }),
        );
    }

    render() {
        const {
            visible, subVisible, ruleVisible, modalTitle, tagRecord, optionType, confirmLoading, subConfirmLoading, ruleConfirmLoading,
        } = this.state;
        return (
            <div className="label-control">
                <Search
                    {...this.props}
                    listFetch={this.listFetch}
                    onReset={this.handleResetClick}
                    onSubmit={this.handleSubmit}
                />
                <TableList
                    {...this.props}
                    listFetch={this.listFetch}
                    onRuleChange={this.handleRuleChange}
                    onOperate={this.handleOperate}
                    // dataSource={dataSource}
                />
                {/* 添加标签/编辑标签弹窗 */}
                <Modal2
                    component={
                        (
                            <LabelMadal
                                platformlistReducer={this.props.platformlistReducer}
                                tagRecord={tagRecord}
                                optionType={optionType}
                                ref={this.labelformRef}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={visible}
                    handleOk={this.handleOk}
                    handleCancel={() => this.handleCancel('visible')}
                    confirmLoading={confirmLoading}
                    className="add-label-modal"
                />
                {/* 添加子标签/编辑子标签弹窗 */}
                <Modal2
                    component={(<SubLabelMadal tagRecord={tagRecord} optionType={optionType} ref={this.sublabelformRef} />)}
                    title={modalTitle}
                    visible={subVisible}
                    handleOk={this.handleSubOk}
                    className="add-sub-label-modal"
                    handleCancel={() => this.handleCancel('subVisible')}
                    confirmLoading={subConfirmLoading}
                />
                {/* 规则编辑弹窗 */}
                <Modal2
                    component={(<SubLabelRuleModal tagRecord={tagRecord} optionType={optionType} ref={this.ruleformRef} />)}
                    title={modalTitle}
                    visible={ruleVisible}
                    handleOk={this.handleRuleOk}
                    handleCancel={() => this.handleCancel('ruleVisible')}
                    confirmLoading={ruleConfirmLoading}
                />
            </div>
        );
    }
}
export default Form.create()(label);
