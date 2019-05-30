import React from 'react'
import {
    Modal, Pagination, Spin,
    Table,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { Defective_Product_Details_List_Api } from '../constants/Api';

class HandleDetailModal extends React.Component {
    state = {
        data: [],
        loadingState: false,
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 50,
            render: (text, record, index) => (
                <div style={{textAlign: 'center'}}>
                    {index + 1}
                </div>
            )
        },
        {
            title: '处理方式',
            dataIndex: 'handleWay',
            width: 150,
            render: (text) => (
                <div style={{textAlign: 'center'}}>
                    {text}
                </div>
            )
        },
        {
            title: '数量',
            dataIndex: 'number',
            width: 50,
            render: (text) => (
                <div style={{textAlign: 'center'}}>
                    {text}
                </div>
            )
        },
        {
            title: '采购单',
            dataIndex: 'po',
            width: 150,
            render: (text) => (
                <div style={{textAlign: 'center'}}>
                    {text}
                </div>
            )
        },
        {
            title: '采购处理备注',
            dataIndex: 'note',
            width: 200,
            render: (text) => (
                <div style={{textAlign: 'center'}}>
                    {text}
                </div>
            )
        }
    ];

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        if (visible && !preVisible && nextProps.item) {
            const data = {
                data: {
                    key: nextProps.item['key']
                }
            };
            this.setState({
                loadingState: true,
            });
            fetchPost(Defective_Product_Details_List_Api, data, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            loadingState: false,
                            data: result.data.list,
                        })
                    } else {
                        this.setState({
                            loadingState: false,
                        })
                    }
                })
        }
    }


    /**
     * 表单提交
     */
    handleSubmit = () => {

    };


    /**
     * 取消
     */
    handleCancel = () => {
        this.props.showModal(false, {});
    };

    render() {

        const { visible } = this.props;
        const { data, loadingState} = this.state;
        return (
            <Modal
                visible={visible}
                title={'处理不良品详情'}
                destroyOnClose
                width={800}
                onCancel={this.handleCancel}
                maskClosable={false}
                footer={null}
            >
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        rowKey={record => record.handleWay}
                        size="small"
                        dataSource={data}
                        columns={this.columns}
                        pagination={false}
                    />
                </Spin>
            </Modal>
        );
    }
}
export default HandleDetailModal;
