import React from 'react';
import {
    Button,
    message,
} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchPost } from '../../../../util/fetch';

import {
    EDITORIAL_RULES_SAVE,
} from '../constants';
import { getUrlParams, getLoginmsg } from '../../../../util/baseTool';
import Functions from '../../../../components/functions';
/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
 *时间: 2018/10/11 15:55
 */
const finishCondition = {};
let paymentMethodArr = [];
let skuArr;
let supplierArr;
export default class Footerbutton extends React.Component {
    componentDidMount() {
        this.setState({
            key: getUrlParams('').id,
        });
    }

    handleOk = () => {
        const lastModifiedTime = Date.parse(moment().format(''));
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = {};
                const data = { ...values };
                data.lastModifiedPerson = getLoginmsg().personName;
                data.lastModifiedTime = lastModifiedTime;
                data.nonCondition = this.props.condtionsData;
                paymentMethodArr = this.props.finishConditionData.paymentMethod ? this.props.finishConditionData.paymentMethod.map((item) => {
                    item.label = item.label;
                    if (item.key) {
                        item.key = item.key;
                    } else {
                        item.key = item.value;
                    }
                    return item;
                }) : null;
                skuArr = this.props.finishConditionData.sku;
                supplierArr = this.props.finishConditionData.supplier;

                finishCondition.paymentMethod = paymentMethodArr;
                finishCondition.sku = skuArr;
                finishCondition.supplier = supplierArr;

                finishCondition.total = this.props.finishConditionData.total;
                finishCondition.quantityInterval = this.props.finishConditionData.quantityInterval;
                data.finishCondition = finishCondition;
                data.executionAction = this.props.executionData;
                data.key = this.state.key;
                delete data.paymentMethod;
                params.data = data;
                fetchPost(EDITORIAL_RULES_SAVE, params, 2).then((res) => {
                    if (res && res.state === '000001') {
                        message.success('保存成功');
                        setTimeout(() => {
                            window.location.href = '/pms/basicconfig/purchasecheckruleset/';
                        }, 1000);
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className="white text-right margin-ms-top padding-md-bottom padding-md-top">
             <Functions
                {...this.props}
                functionkey="010-000004-000003-000001-002"
              >
                <Button className="margin-ms-right" onClick={this.handleOk}>
                    保存规则
                </Button>
             </Functions>   
                <Button className="margin-ms-right"><Link to="/pms/basicconfig/purchasecheckruleset/">返回</Link></Button>
            </div>
        );
    }
}
