/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--手工分仓--弹窗
 *参数说明:
 *时间: 2018/5/29 15:46
 */
import React, { Component } from 'react'
import { render } from 'react-dom'

import Devanning from './devanning';
import Modalmodel from '../../../components/modalmodel/searchmodel';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import { message, } from 'antd'
import { dataPack, closeCurrentPage } from "../../../util/baseTool";

class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    ModalhandleCancel = (value) => () => {
        this.props.devanningAPPaction({ [value]: false })

        if(this.refs.Devanning){
            var clearArray = this.refs.Devanning.clearArray
            this.reset(clearArray)
        }

    }
    reset = (arr) => {
        var names = arr.splice(0)
        var {setFieldsValue} = this.props.form;
        var params = {}
        names.forEach(v=>{
            params[v] = null
        })
        setFieldsValue(params)
    }
    checkInfo = (list)=>{
        var flag = true;
        for(var i =0,l=list.length;i<l;i++){
            var data = list[i];
            Object.keys(data).forEach(v=>{
                if(v === "separate_goods" ){
                    var num = 0
                    data[v].forEach(val=>{
                        num += Number(val.skuCount)
                    })
                    if(num <=0){
                        flag = false
                    }
                }else if(data[v] === undefined || data[v] === null || data[v] === ""){
                    flag = false
                }
            })
            if(!flag){
                return flag
            }
        }

        return flag
    }
    ModalhandleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const template = {
                    order_separate: [{
                        warehouseCode: '',
                        channelCode: '',
                        result: '',
                        recommend: '',
                        currency: '',
                        freight: '',
                        remoteFee: '',
                        prodCode: '',
                        separate_goods: [{ skuCode: '', skuCount: '', skuAffix: '', skuAffixType: '' }]
                    }],
                }
                let data = dataPack(template, values);
                const oldSeparateGoods = this.props.tablemodel2.upper;
                // const separateGoods = this.props.devanningtable.data;
                data.order_separate = data.order_separate.map((item, k) => {
                    item.recommend = item.recommend ? 1 : 0;
                    item.separate_goods.map((it, i) => {
                        // const sgRecord = separateGoods[k].record ? separateGoods[k].record['separate_goods'][i] : undefined;
                        const sgRecord = oldSeparateGoods[i] ? oldSeparateGoods[i] : undefined;
                        it.skuAffix = sgRecord && sgRecord.skuAffix ? sgRecord.skuAffix : '';
                        it.skuAffixType = sgRecord && (sgRecord.skuAffixType || Number(sgRecord.skuAffixType) === 0) ? sgRecord.skuAffixType : '';
                    })
                    return item;
                })
                data.company_orders_id = this.props.Infos.orderId
                if(!this.checkInfo(data.order_separate)){
                    return message.warning("请核对数据正确性")
                }
                axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/splitOrderToPackage`, data)
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data.state === '000001') {
                                this.props.devanningAPPaction({ visible: false });
                                // message.success(`${response.data.msg}，即将关闭当前页`, 2, () => {  // 延时一秒后关闭当前页
                                //     closeCurrentPage();
                                // });
                            } else {
                                message.error(response.data.msg)
                            }
                        }
                    }).catch(e => {
                        console.log(e);
                    })

            }
        });


    }

    render() {
        const content = <div className="newClue">
            <Devanning ref="Devanning" {...this.props} />
        </div>


        return (

            <Modalmodel  {...{
                ...this.props.devanningAPP,
                visible: this.props.devanningAPP.visible,
                width: 1000,
                title: `${this.props.devanningAPP.title}`,
                ModalContent: content,

            }}
                onOk={this.ModalhandleOk} className={'modalmt10'} destroyOnClose
                confirmLoading={this.props.devanningAPP.confirmLoading}
                onCancel={this.ModalhandleCancel('visible')} />
        );
    }
}

export default UserForm;
