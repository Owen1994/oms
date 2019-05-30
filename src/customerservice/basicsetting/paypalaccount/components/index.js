import React from 'react';
import { Form, Drawer } from 'antd';
import Search from './Search';
import Table from './Table';
import AddModal from './AddModal';
import OperateLogsModal from './OperateLogsModal';
import UploadAndTablelist from '../../../common/components/UploadAndTablelist';
import Modal2 from '../../../../components/Modal2';

import { filterRequest } from '../../../../compliance/utils';
import { fetchPost } from '../../../../util/fetch';
import { ADD_EDIT_ACCOUNT } from '../constants';
import { page } from '../../../../constants';

class PaypalAccount extends React.Component {
    state = {
    }

    componentDidMount() {
        this.listFetch();
    }

    listFetch = (pageNumber, pageData) => {
        const values = this.props.form.getFieldsValue();
        const filter = filterRequest(values);
        filter.pageNumber = pageNumber || page.defaultCurrent;
        filter.pageData = pageData || page.defaultPageSize;
        this.props.fetchList(filter);
    }

    onReset = () => {
        this.props.form.resetFields();
    }

    /**
     * @param <String> record 点击的该项的数据
     * @param <String> isOperateAccount 新增或编辑账号弹窗触发， 1-新增，2-编辑
     */
    openModal = (visible, record, isOperateAccount) => {
        if (visible === 'editAddVisible'){
            if (isOperateAccount === '1') {
                this.setState({ editOrAddTitle: '新增账号' });
            } else {
                this.setState({ editOrAddTitle: '编辑' });
            }
        }  
        this.setState({
            record,
            [visible]: true
        });
    }

    closeModal = (visible) => {
        this.setState({
            [visible]: false
        });
    }

    // 新增/编辑账号
    editOk = () => {
        this.editRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ editAddLoading: true });
                fetchPost(ADD_EDIT_ACCOUNT, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.listFetch();
                            this.setState({ editAddVisible: false });
                        }
                        this.setState({ editAddLoading: false });
                    });
            }
        })
    }

    render() {
        const {
            record,
            editOrAddTitle,
            editAddVisible,
            editAddLoading,
            operateLogsVisible,
            uploadVisible,
        } = this.state;
        return (
            <div className="papalAccount">
                <Search
                    {...this.props}
                    onReset={this.onReset}
                    listFetch={this.listFetch}
                />
                <Table
                    {...this.props}
                    record={record}
                    openModal={this.openModal}
                    listFetch={this.listFetch}
                />
                {/* 新增/编辑账号弹窗 */}
                <Modal2
                    component={(
                        <AddModal record={record} ref={edit => this.editRef=edit} />
                    )}
                    title={editOrAddTitle}
                    visible={editAddVisible}
                    handleOk={this.editOk}
                    handleCancel={() => this.closeModal('editAddVisible')}
                    confirmLoading={editAddLoading}
                />
                {/* 上传账号弹窗 */}
                <Drawer
                    title="上传账号"
                    placement="right"
                    visible={uploadVisible}
                    onClose={() => this.closeModal('uploadVisible')}
                    width={'80%'}
                >
                    <UploadAndTablelist uploadType={3} visible={uploadVisible} menuInfos={this.props.menuInfos} />
                </Drawer>
                {/* 操作记录弹窗 */}
                <Modal2
                    component={(
                        <OperateLogsModal record={record} />
                    )}
                    title='操作记录'
                    visible={operateLogsVisible}
                    handleCancel={() => this.closeModal('operateLogsVisible')}
                    footer={null}
                    width={800}
                />
            </div>
        )
    }
}
export default Form.create()(PaypalAccount);
