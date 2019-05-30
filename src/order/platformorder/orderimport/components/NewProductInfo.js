/**
 *  作者：陈文春
 *  描述：订单导入页面 - 商品信息组件
 *  时间：2019年2月13日17:05:33
 */
import React from 'react';
import '../css/css.css';
import AddOrEditModal from './AddOrEditModal';
import PopConfirm from '@/common/components/confirm';
import {
    Form, Table, Button, Select,
} from 'antd';

const FormItem = Form.Item
const Option = Select.Option

export default class ProductInfo extends React.Component {
    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        addOrEditModalVisible: false,
        record: '',
        index: '',
    }
    suffixSelect = ['前缀', '无', '后缀'];
    columns = [
        {
            title: '序号',
            dataIndex: 'No',
            width: 50,
            render: (text, record, index) => index + 1,
        }, {
            title: '缩略图',
            dataIndex: 'img',
            width: 120,
        }, {
            title: '规格',
            dataIndex: 'sku',
            align: 'left',
            render: (text, record, index) => {
                return (
                    <div style={{marginLeft: '30%'}}>
                        <p key={1}><span className="orderimport-productinfo-span">SKU编码：</span>{record.skuCode}</p>
                        <p key={2}><span className="orderimport-productinfo-span">商品名称：</span>{record.productsName}</p>
                        <p key={3}><span className="orderimport-productinfo-span">前后缀：</span>{`(${this.suffixSelect[record.skuAffixType]}) ${record.skuAffix ? record.skuAffix : ''}`}</p>
                    </div>
                );
            }
        },
        {
            title: '销售单价',
            dataIndex: 'productSalePrice',
            width: 140,
        },
        {
            title: '销售数量',
            dataIndex: 'productQuantity',
            width: 140,
        },
        {
            title: '销售金额',
            dataIndex: 'price',
            render: (text, record, index) => `${record.productFreightCurrency} ${record.price}`,
            width: 140,

        },
        {
            title: '操作',
            width: 140,
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <a
                            onClick={() => this.toggleModal('addOrEditModalVisible', true, record, index)}
                        >修改</a>
                        <a
                            className="orderimport-table-del"
                            onClick={() => PopConfirm('确认删除', '确认删除该项吗？', () => this.props.deleteTableItem(index))}
                        >删除</a>
                    </div>
                );
            },
        }
    ];

    // 打开/关闭弹窗
    toggleModal = (type, bol, record, index) => {
        if(record){
            this.setState({ record, index, [type]: bol });
        } else {
            this.setState({ record: '', index: '', [type]: bol });
        }
    }

    render(){
        const tableData = this.props.tabledata;
        const columns = this.columns;
        const { record, addOrEditModalVisible, index } = this.state;
        return(
            <div>
                <h3>
                    <span className="orderimport-span-before"></span>
                    商品信息
                    <Button
                        style={{float: 'right'}}
                        onClick={() => this.toggleModal('addOrEditModalVisible', true)}>添加商品</Button>
                </h3>
                <div style={{padding: '10px 40px'}}>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={tableData}
                        bordered
                        footer={null}
                    />
                </div>
                {/*添加/修改商品-弹窗*/}
                <AddOrEditModal
                    visible={addOrEditModalVisible}
                    onCancel={this.toggleModal}
                    addTableItem={this.props.addTableItem}
                    modifyTableItem={this.props.modifyTableItem}
                    changeCurrency={this.props.changeCurrency}
                    tabledata={tableData}
                    record={record}
                    index={index}
                />
            </div>
        );
    }
}