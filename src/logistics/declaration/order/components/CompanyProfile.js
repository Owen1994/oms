/**
 *作者: 黄建峰
 *功能描述:  公司资料
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Row, Col } from 'antd';
import EditableItem from '../../../common/components/EditableInput';
import EditableDate from '../../../common/components/EditableDate';
import PropTypes from 'prop-types';


export default class App extends React.Component {

    onChange = (name, value) => {
        const { id, editCustomsDocumentColumn } = this.props;
        editCustomsDocumentColumn({ id: id, name, value,key:'campanyInfo' });
    };
    render(){
        const { campanyInfo, type } = this.props;
        const isEditable = type==='create'?true:false;

        return (
            <div className={"lgt-dlt-order_document_container"}>
                <Row gutter={16} type="flex">
                    <Col span={6}>
                        <EditableDate
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"declareTime"}
                            value={campanyInfo.declareTime} 
                            name={"申报日期"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"contacts"} 
                            value={campanyInfo.contacts} 
                            name={"联系人"}
                            onChange={this.onChange}
                            rows={3}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"contactsPhone"} 
                            value={campanyInfo.contactsPhone} 
                            name={"手机号码"}
                            onChange={this.onChange}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}  type="flex">
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"ticketHolder"} 
                            value={campanyInfo.ticketHolder} 
                            name={"开票方"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"ticketHolderAddress"} 
                            value={campanyInfo.ticketHolderAddress} 
                            name={"公司地址"}
                            onChange={this.onChange}
                            rows={3}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"ticketHolderTel"} 
                            value={campanyInfo.ticketHolderTel} 
                            name={"电话号码"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"ticketHolderEmail"} 
                            value={campanyInfo.ticketHolderEmail} 
                            name={"Email"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}  type="flex">
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"payer"} 
                            value={campanyInfo.payer} 
                            name={"付款方"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"payerAddress"} 
                            value={campanyInfo.payerAddress} 
                            name={"公司地址"}
                            onChange={this.onChange}
                            rows={3}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"payerTel"} 
                            value={campanyInfo.payerTel} 
                            name={"电话号码"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"payerEmail"} 
                            value={campanyInfo.payerEmail} 
                            name={"Email"}
                            onChange={this.onChange}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}  type="flex">
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"consignee"}
                            value={campanyInfo.consignee}
                            name={"境内发货人"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"overseasConsignee"}
                            value={campanyInfo.overseasConsignee}
                            name={"境外收货人"}
                            onChange={this.onChange}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"salesUnit"} 
                            value={campanyInfo.salesUnit} 
                            name={"生产销售单位"}
                            onChange={this.onChange}
                            rows={3}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

App.propTypes = {
    campanyInfo: PropTypes.object.isRequired,
    editCustomsDocumentColumn: PropTypes.func.isRequired,
};