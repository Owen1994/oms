/**
 *作者: 黄建峰
 *功能描述:  合同资料
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Row, Col } from 'antd';
import EditableItem from '../../../common/components/EditableInput';
import PropTypes from 'prop-types';


export default class App extends React.Component {

    onChange = (name, value) => {
        const { id, editCustomsDocumentColumn } = this.props;
        editCustomsDocumentColumn({ id, name, value,key:'contractInfo' });
    };

    render(){
        const { contractInfo, type } = this.props;
        const isEditable = type==='create'?true:false;
        return (
            <div className={"lgt-dlt-order_document_container"}>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"qualityStandard"}
                            onChange={this.onChange}
                            value={contractInfo.qualityStandard}
                            name={"Quality standard"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"warranty"}
                            onChange={this.onChange}
                            value={contractInfo.warranty}
                            name={"Warranty"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"paymentTerms"}
                            onChange={this.onChange}
                            value={contractInfo.paymentTerms}
                            name={"Payment terms"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"payment"}
                            onChange={this.onChange}
                            value={contractInfo.payment}
                            name={"Payment"}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"beneficiary"}
                            onChange={this.onChange}
                            value={contractInfo.beneficiary}
                            name={"Beneficiary"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"benefBank"}
                            onChange={this.onChange}
                            value={contractInfo.benefBank}
                            name={"Beneficiary Bank"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"swiftCode"}
                            onChange={this.onChange}
                            value={contractInfo.swiftCode}
                            name={"SWIFT Code"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"accountNo"}
                            onChange={this.onChange}
                            value={contractInfo.accountNo}
                            name={"Account No"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"interBank"}
                            onChange={this.onChange}
                            value={contractInfo.interBank}
                            name={"Intermediary Bank"}
                            // isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"seller"}
                            onChange={this.onChange}
                            value={contractInfo.seller}
                            name={"The Seller"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"buyer"}
                            onChange={this.onChange}
                            value={contractInfo.buyer}
                            name={"The Buyer"}
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
    contractInfo: PropTypes.object.isRequired,
    editCustomsDocumentColumn: PropTypes.func.isRequired,
};
