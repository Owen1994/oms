import React from 'react'
import {
    Modal,
    Form,
    Button,
    message,
    Input,
    Table
} from 'antd'
import { fetchPost } from '@/util/fetch';
import { timestampFromat } from '@/util/baseTool';
import {
    getShopeeAuthLog
} from '../constants/Api'
const FormItem = Form.Item;

class DetailModal extends React.Component {
    state = {
        loading: false,
        list:[]
    };
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    componentWillReceiveProps(next) {
        if (next.visible && next.sellerId && next.sellerId !== this.props.sellerId) {
            this.getDetail(next.sellerId)
        }
    }

    columns = [
        {
            title: '序号',
            key: 'orderNum',
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: '操作属性',
            key: 'operLogger',
            dataIndex: 'operLogger',
            align: 'center',
        },
        {
            title: '描述',
            dataIndex: 'operDesc',
            key: 'operDesc',
            align: 'center',
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            align: 'center',
        },
        {
            title: '时间',
            align: 'center',
            dataIndex: 'operTime',
            key: 'operTime',
            render: (text) => text ? timestampFromat(text, 2) : "--"
        },
    ];
    handleCancel = () => {
        this.setState({
            list:[]
        })
        this.props.closeModal()
    }

    getDetail = (id) => {
        fetchPost(getShopeeAuthLog, { data: { sellerId: id } })
            .then(result => {
                if (result.state === '000001') {
                    let list = result.data && result.data.lst ?
                    result.data.lst.map((v,key)=>{
                        v.key = key
                        return v
                    })
                    : []
                    this.setState({
                        list
                    })
                }
            })
    }

    render() {
        const { loading,list } = this.state;
        const { visible } = this.props;
        return (
            <Modal
                visible={visible}
                title={'操作日志'}
                destroyOnClose={true}
                width={600}
                footer={null}
                onCancel={this.handleCancel}
            >
                <Table
                    bordered
                    size="small"
                    columns={this.columns}
                    dataSource={list}
                    pagination={false}
                />
            </Modal>
        );
    }
}
export default Form.create()(DetailModal)