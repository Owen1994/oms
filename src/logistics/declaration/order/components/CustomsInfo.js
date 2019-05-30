/**
 *作者: 黄建峰
 *功能描述:  海关资料
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Row, Col } from 'antd';
import EditableDate from '../../../common/components/EditableDate'
import EditableItem from '../../../common/components/EditableInput';
import SelectItem from '../../../common/components/EditableSelect';
import EditableCountry from '../../../common/selectListModal/containers/EditSelectList';
import {timestampFromat} from '../../../../util/baseTool';
import PropTypes from 'prop-types';
import {
    GET_LEVY_SELECT_LIST,
    GET_EXE_SELECT_LIST,
    GET_EXPORT_SELECT_LIST,
    GET_PACKAGE_SELECT_LIST,
    GET_RGP_SELECT_LIST,
    GET_TSP_SELECT_LIST,
    GET_FPORT_SELECT_LIST
} from "../constants";


export default class App extends React.Component {

    onHandleChange = (name, value, aname) => {
        const { customsInfo } = this.props;
        if (customsInfo[name] !== value) {
            const { id, editCustomsDocumentColumn } = this.props;
            editCustomsDocumentColumn({ id:id, name,aname, value,key:'customsInfo' });
        }
    };
    componentDidMount() {
        this.props.loadSelectList({ url: GET_LEVY_SELECT_LIST, type: 'levy'});// 征免列表
        this.props.loadSelectList({ url: GET_EXE_SELECT_LIST, type: 'exe'});// 征免性质列表
        this.props.loadSelectList({ url: GET_EXPORT_SELECT_LIST, type: 'epr'});// 出口口岸列表
        this.props.loadSelectList({ url: GET_PACKAGE_SELECT_LIST, type: 'pkg'});// 包装类型列表
        this.props.loadSelectList({ url: GET_RGP_SELECT_LIST, type: 'rgp'});// 监管方式列表
        this.props.loadSelectList({ url: GET_TSP_SELECT_LIST, type: 'tsp'});// 运输方式
        this.props.loadSelectList({ url: GET_FPORT_SELECT_LIST, type: 'fpt'});// 指运港列表
    }

    getSelectList = (type) => {
      const selectData = this.props.selectData;
      if (!selectData) {
          return [];
      }
      return selectData[type];
    };

    render(){
        const { customsInfo, type } = this.props;
        const isEditable = type==='create'?true:false;
        const searchCountryInfo = {
                                    title:"国家选择",
                                    type:'single',
                                    url:'/customs/api/common/country/List/list'
                                   };
        return (
            <div className={"lgt-dlt-order_document_container"}>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"preEntryNumber"}
                            value={customsInfo.preEntryNumber}
                            name={"预录入编号"}
                            onChange={this.onHandleChange}
                            />
                    </Col>
                    <Col span={6}>
                        <EditableDate
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"exitTime"}
                            value={customsInfo.exitTime}
                            onChange={this.onHandleChange}
                            name={"出口日期"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"declarationUnit"}
                            value={customsInfo.declarationUnit}
                            onChange={this.onHandleChange}
                            name={"申报单位"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"entryClerk"}
                            value={customsInfo.entryClerk}
                            onChange={this.onHandleChange}
                            name={"录入员"}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"entryUnit"}
                            value={customsInfo.entryUnit}
                            name={"录入单位"}
                            onChange={this.onHandleChange}
                            />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"customsBroker"}
                            onChange={this.onHandleChange}
                            value={customsInfo.customsBroker}
                            name={"报关人员"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"affirm"}
                            onChange={this.onHandleChange}
                            value={customsInfo.affirm}
                            name={"申明"}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"customsNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.customsNumber}
                            name={"海关编号"}/>
                    </Col>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"portExportId"}
                            onChange={this.onHandleChange}
                            holderName="请选择出口口岸"
                            list={this.getSelectList('epr')}
                            value={customsInfo.portExport}
                            name={"出境关别"}
                            id={customsInfo.portExportId}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"contractNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.contractNumber}
                            name={"合同协议号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"ticketNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.ticketNumber}
                            name={"发票号"}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"recordNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.recordNumber}
                            name={"备案号"}/>
                    </Col>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"tpMethodId"}
                            onChange={this.onHandleChange}
                            list={this.getSelectList('tsp')}
                            value={customsInfo.tpMethod}
                            id={customsInfo.tpMethodId}
                            name={"运输方式"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"tpTools"}
                            onChange={this.onHandleChange}
                            value={customsInfo.tpTools}
                            name={"运输工具名称及航次号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"dlyNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.dlyNumber}
                            name={"提运单号"}
                            // isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"contractLocation"}
                            onChange={this.onHandleChange}
                            value={customsInfo.contractLocation}
                            name={"合同签约地点"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"approvalNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.approvalNumber}
                            name={"批准文号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"taxRegistNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.taxRegistNumber}
                            name={"税务登记号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableDate
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"shippingDate"}
                            onChange={this.onHandleChange}
                            value={customsInfo.shippingDate}
                            name={"装运期"}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"containerNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.containerNumber}
                            name={"集装箱号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"titleNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.titleNumber}
                            name={"封号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"licensekey"}
                            onChange={this.onHandleChange}
                            value={customsInfo.licensekey}
                            name={"许可证号"}/>
                    </Col>
                    <Col span={6}>
                        <EditableCountry
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"originalCountryId"}
                            onChange={this.onHandleChange}
                            value={customsInfo.originalCountry}
                            id={customsInfo.originalCountryId}
                            search={searchCountryInfo}
                            name={"原厂国"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableDate
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"contractTime"}
                            onChange={this.onHandleChange}
                            value={timestampFromat(customsInfo.contractTime,2)}
                            name={"合同签约时间"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"spRelationshipCrm"}
                            onChange={this.onHandleChange}
                            value={customsInfo.spRelationshipCrm}
                            name={"特殊关系确认"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"priceImpact"}
                            onChange={this.onHandleChange}
                            value={customsInfo.priceImpact}
                            name={"价格影响确认"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"pryConfirm"}
                            onChange={this.onHandleChange}
                            value={customsInfo.pryConfirm}
                            name={"支付特许权使用费确认"}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"exemptingNatureId"}
                            onChange={this.onHandleChange}
                            list={this.getSelectList('levy')}
                            value={customsInfo.exemptingNature}
                            id={customsInfo.exemptingNatureId}
                            name={"征免"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableCountry
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"ognatingCountryId"}
                            onChange={this.onHandleChange}
                            value={customsInfo.ognatingCountry}
                            id={customsInfo.ognatingCountryId}
                            search={searchCountryInfo}
                            name={"始发国"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"invoiceSource"}
                            onChange={this.onHandleChange}
                            value={customsInfo.invoiceSource}
                            name={"发票来源"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"remarksInfo"}
                            onChange={this.onHandleChange}
                            value={customsInfo.remarksInfo}
                            name={"备注信息"}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableCountry
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"tradingCountryId"}
                            onChange={this.onHandleChange}
                            value={customsInfo.tradingCountry}
                            id={customsInfo.tradingCountryId}
                            search={searchCountryInfo}
                            name={"贸易国"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableCountry
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"destinCountryId"}
                            onChange={this.onHandleChange}
                            search={searchCountryInfo}
                            value={customsInfo.destinCountry}
                            id={customsInfo.destinCountryId}
                            name={"目的国"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"fgPortId"}
                            onChange={this.onHandleChange}
                            list={this.getSelectList('fpt')}
                            value={customsInfo.fgPort}
                            id={customsInfo.fgPortId}
                            name={"指运港"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"domsDelivery"}
                            onChange={this.onHandleChange}
                            value={customsInfo.domsDelivery}
                            name={"境内货源地"}
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
                            columnKey={"currencyValue"}
                            onChange={this.onHandleChange}
                            value={customsInfo.currencyValue}
                            name={"外汇币值"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"manufacturer"}
                            onChange={this.onHandleChange}
                            value={customsInfo.manufacturer}
                            name={"生产厂家"}/>
                    </Col>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"supervisionModeId"}
                            onChange={this.onHandleChange}
                            list={this.getSelectList('rgp')}
                            value={customsInfo.supervisionMode}
                            id={customsInfo.supervisionModeId}
                            name={"监管方式"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"otherFees"}
                            onChange={this.onHandleChange}
                            value={customsInfo.otherFees}
                            name={"杂费"}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"packingTypeId"}
                            onChange={this.onHandleChange}
                            list={this.getSelectList('pkg')}
                            value={customsInfo.packingType}
                            id={customsInfo.packingTypeId}
                            name={"包装种类"}
                            isRequired
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"transactionMethod"}
                            onChange={this.onHandleChange}
                            value={customsInfo.transactionMethod}
                            name={"成交方式"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"freight"}
                            onChange={this.onHandleChange}
                            value={customsInfo.freight}
                            name={"运费"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"insurance"}
                            onChange={this.onHandleChange}
                            value={customsInfo.insurance}
                            name={"保险费"}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"accomTicketNumber"}
                            onChange={this.onHandleChange}
                            value={customsInfo.accomTicketNumber}
                            name={"随附单证号"}
                            isEditable={isEditable?'isEditable':''}
                        />
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"tradeMark"}
                            onChange={this.onHandleChange}
                            value={customsInfo.tradeMark}
                            name={"商标"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"markSkull"}
                            onChange={this.onHandleChange}
                            value={customsInfo.markSkull}
                            name={"标记唛头"}/>
                    </Col>
                    <Col span={6}>
                        <SelectItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"exemptingNatureId"}
                            onChange={this.onHandleChange}
                            list={this.getSelectList('exe')}
                            value={customsInfo.eptNature}
                            id={customsInfo.eptNatureId}
                            name={"征免性质"}
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
                            columnKey={"noteMark"}
                            onChange={this.onHandleChange}
                            value={customsInfo.noteMark}
                            name={"备注"}/>
                    </Col>
                    <Col span={6}>
                        <EditableItem
                            {...this.props}
                            fkey={"002-000001-000001-000001-006"}
                            columnKey={"seleReportingSelfPayment"}
                            onChange={this.onHandleChange}
                            value={customsInfo.seleReportingSelfPayment}
                            name={"自报自缴"}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

App.propTypes = {
    customsInfo: PropTypes.object.isRequired,
    editCustomsDocumentColumn: PropTypes.func.isRequired,
};
