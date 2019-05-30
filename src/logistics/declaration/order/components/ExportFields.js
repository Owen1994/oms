/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
    { label: '项号', value: 'sno'},
    { label: 'sku', value: 'skuName'},
    { label: '采购单号', value: 'purchaseOrderNo'},
    { label: 'shipmentid', value: 'shipmentid'},
    { label: '报关品名', value: 'customsName'},
    { label: '报关单位', value: 'customesDecUnit'},
    { label: '采购主体', value: 'company'},
    { label: '数量', value: 'count'},
    { label: '毛重', value: 'grossWeight'},
    // { label: '合并前数量', value: 'preCount'},
    { label: '件数', value: 'num'},
    { label: '体积', value: 'volume'},
    { label: '海关编码', value: 'customesCode'},
    { label: '含税单价RMB', value: 'taxinclusivePrice'},
    { label: '含税总价RMB', value: 'taxTotalPrice'},
    { label: '单价USD', value: 'unitUSD'},
    { label: '总价USD', value: 'totalUSD'},
    { label: '供应商名称', value: 'supplierName'},
    { label: '第一法定单位', value: 'firstStatute'},
    { label: '第二法定单位', value: 'secondStatute'},
    { label: '申报要素', value: 'declaElement'},
    { label: '净重', value: 'weight'},
    { label: '最小包装数量', value: 'minPackage'},
    { label: '国内监管条件', value: 'domesticRegulatoryconditions'},
];
const defaultCheckedList = [];
const allCheckedList = [
    'sno',  'skuName', 'purchaseOrderNo', 'shipmentid',  'customsName',
    'customesDecUnit', 'company', 'count','preNum','grossWeight',
    'preGrossCount','preCount','num', 'volume','preVolume','customesCode',
    'taxinclusivePrice','taxTotalPrice','unitUSD','totalUSD','supplierName',
    'firstStatute','secondStatute','declaElement','weight','minPackage','domesticRegulatoryconditions'
];
export default class App extends React.Component {
    state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
    };
    render() {
        return (
            <div className={"lgt-dlt-order_model_wrap"}>
                <div>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        选择所有字段
                    </Checkbox>
                </div>
                <br />
                <div className={"lgt-dlt-order_label_wrap"}>
                    <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                </div>
            </div>
        );
    }
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < allCheckedList.length),
            checkAll: checkedList.length === allCheckedList.length,
        });
        this.props.onCheckChange(checkedList);
    };
    onCheckAllChange = (e) => {
        const checkedList = e.target.checked ? allCheckedList : [];
        this.setState({
            checkedList,
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.onCheckChange(checkedList);
    }
}
App.propTypes = {
    onCheckChange: PropTypes.func.isRequired
};
