import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import TableList from './TableList';
import Modal2 from '../../../../components/Modal2';
import TemplateModal from './TemplateModal';
import SubTemplateModal from './SubTemplateModal';
import { commonRequest } from '../../../common/request';
import { page } from '../../../../constants';
import PopConfirm from '../../../../common/components/confirm';
import Functions from '../../../../components/functions';

import {
    TEMPLATECLASS_ADD_OR_EDIT,
    SUB_TEMPLATECLASS_ADD_OR_EDIT,
    TEMPLATECLASS_DELETE,
    MESSAGECHECK,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';

class App extends React.Component {
    state = {
        visible: false,
        subVisible: false,
        modalTitle: '',
        optionType: '', // 操作项类型
        tagRecord: {}, // 操作项该项的record
        confirmLoading: false, // 确认框loading
        editable: true,
    }

    labelform = React.createRef()

    sublabelform = React.createRef()

    componentDidMount() {
        this.listFetch();
        this.props.platformList();
    }

    // 请求列表
    listFetch = (pageNumber, pageData) => {
        const { tagValue } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = values;
                filter.pageNumber = pageNumber || page.defaultCurrent;
                filter.pageData = pageData || page.defaultPageSize;
                const filters = { ...tagValue, ...filter };
                this.setState({
                    tagValue: filters,
                });
                this.props.listFetch({ name: 'listData', value: filter });
            }
        });
    }

    /**
     * 操作栏点击选项后的回调
     * @param <String> title 弹出框的标题
     * @param <String> visibleType 各弹框的显示参数
     * @param <String> optionType 操作项的类型
     * @param <String> key 操作项的唯一key值，用于找出这条记录，解决重新编辑数据滞留问题
     */

    handleOperate = (title, visibleType, optionType, record, key) => {
        const data = this.props.listReducer.listData;
        // 遍历找出record
        if (key !== undefined) {
            data.forEach((item) => {
                if (item.key === key) {
                    record = item;
                    return;
                }
                if (item.children) {
                    item.children.forEach((item1) => {
                        if (item1.key === key) {
                            record = item1;
                            return;
                        }
                        if (item1.children) {
                            item1.children.forEach((item2) => {
                                if (item2.key === key) {
                                    record = item2;
                                }
                            });
                        }
                    });
                }
            });
        }
        if (optionType === 'editlabel' && visibleType === 'visible') {
            this.messageCheck(record).then((res) => {
                this.setState({ editable: res });
            });
        }
        if (optionType === 'deletelabel' || optionType === 'deleteSublabel') {
            PopConfirm(
                '提示！',
                '确认要删除该标签',
                () => commonRequest(TEMPLATECLASS_DELETE, { tempClassId: record.key }, this.listFetch),
            );
        }
        this.setState({
            [visibleType]: true,
            modalTitle: title,
            tagRecord: record,
            optionType,
        });
    }

    // 一级分类是否可编辑
    messageCheck = (record) => {
        const idArr = [];
        if (record.children) {
            record.children.forEach((item) => {
                if (item.children) {
                    item.children.forEach((value) => {
                        idArr.push(Number(value.key));
                    });
                }
            });
        }
        return fetchPost(MESSAGECHECK, { templateClassId: idArr }, 2).then((res) => {
            const editable = res.data.data;
            return editable;
        });
    }

    // 重置按钮点击回调
    handleResetClick = () => {
        this.setState({
            tagValue: {
                ruleState: [0],
            },
        });
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
        this.labelform.current.validateFields((err, values) => {
            if (!err) {
                fetchPost(TEMPLATECLASS_ADD_OR_EDIT, optionType === 'addlabel' ? values : { tagId: tagRecord.tagId, ...values }).then((data) => {
                    this.setState({ confirmLoading: true });
                    if (data.state === '000001') {
                        message.success('操作成功');
                        this.setState({ visible: false, confirmLoading: false });
                        this.listFetch();
                        this.labelform.current.resetFields();
                    } else {
                        message.error(data.msg);
                        this.setState({ visible: false, confirmLoading: false });
                    }
                });
            }
        });
    }

    // 子标签对话框点击确认回调
    handleSubOk = () => {
        const { optionType, tagRecord } = this.state;
        this.sublabelform.current.validateFields((err, values) => {
            if (!err) {
                fetchPost(SUB_TEMPLATECLASS_ADD_OR_EDIT, optionType === 'addSublabel'
                    ? { parentId: tagRecord.key, ...values } : { parentId: tagRecord.parentId, ...values })
                    .then((data) => {
                        this.setState({ confirmLoading: true });
                        if (data.state === '000001') {
                            message.success('操作成功');
                            this.setState({ subVisible: false, confirmLoading: false });
                            this.listFetch();
                            this.sublabelform.current.resetFields();
                        } else {
                            message.error(data.msg);
                            this.setState({ subVisible: false, confirmLoading: false });
                        }
                    });
            }
        });
    }

    render() {
        const {
            tagValue, visible, subVisible, modalTitle, tagRecord, optionType, confirmLoading, editable,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="009-000002-000002-001">
                <div className="temp-control">
                    <Search
                        {...this.props}
                        tagValue={tagValue}
                        listFetch={this.listFetch}
                        onReset={this.handleResetClick}
                        onSubmit={this.handleSubmit}
                    />
                    <TableList
                        {...this.props}
                        listFetch={this.listFetch}
                        onRuleChange={this.handleRuleChange}
                        onOperate={this.handleOperate}
                    />
                    <Modal2
                        component={(
                            <TemplateModal
                                platformlistReducer={this.props.platformlistReducer}
                                tagRecord={tagRecord}
                                editable={editable}
                                optionType={optionType}
                                ref={this.labelform}
                            />
                        )}
                        title={modalTitle}
                        visible={visible}
                        handleOk={this.handleOk}
                        handleCancel={() => this.handleCancel('visible')}
                        confirmLoading={confirmLoading}
                    />
                    <Modal2
                        component={(<SubTemplateModal tagRecord={tagRecord} optionType={optionType} ref={this.sublabelform} />)}
                        title={modalTitle}
                        visible={subVisible}
                        handleOk={this.handleSubOk}
                        handleCancel={() => this.handleCancel('subVisible')}
                        confirmLoading={confirmLoading}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
