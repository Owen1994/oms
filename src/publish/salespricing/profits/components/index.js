import React from 'react';
import {Form, message} from 'antd'
import Conditions from './conditions'   // 定价&利润核算条件
import Tablelist from './tablelist'   // 定价&利润核算结果列表
import '../css/css.css'
import {fetchPost} from "../../../../util/fetch";
import {
    SUBMIT_PRICING ,GET_PRICING_RESULT,GET_PRICING_STATE
} from "../constants/api";
import {levelOptions} from '../../../../util/options'
import Functions from '../../../../components/functions'

/**
 *作者: huangjianfeng
 *功能描述: 定价&利润核算
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state={
        total: 0,
        pageNumber: levelOptions('pageInit').pagenum,
        pageData: levelOptions('pageInit').pagedata,
        pricingTaskId: null,
    };
    componentDidMount(){
        this.handlePricingState();
    }
    // 查询定价计算状态
    handlePricingState = (type = 0)=>{
        const {setFieldsValue} = this.props.form;
        fetchPost(GET_PRICING_STATE,{data:{}}).then(res=>{
            if(res && res.state === "000001"){
                // 查询定价状态
                const data = res.data;
                if(data && Object.keys(data).length > 0){
                    this.props.getPricingStateAction(data);
                    setFieldsValue({
                        'data[profitRate]': data.profitRate,
                        'data[skus]': data.skus.join('\n'),
                    });
                    if(data.pricingFinish){
                        const params = {};
                        params["pricingTaskId"] = data.pricingTaskId;
                        params["pageNumber"] = levelOptions("pageInit").pagenum;
                        params["pageData"] = levelOptions("pageInit").pagedata;
                        this.setState({
                            pricingTaskId: data.pricingTaskId
                        });
                        fetchPost(GET_PRICING_RESULT, {data: params}).then(data=>{
                            // 获取定价结果
                            if(data && data.state === "000001"){
                                this.setState({
                                    total: data.data.total,
                                });
                                this.props.getPricingResultAction(data.data.list)
                            }
                        })
                    } else{
                        if(type === 1){
                            return message.info('正在计算定价！请稍后再查询...')
                        }
                    }
                }
            }
        })
    }
    handleSubmit = (e)=>{
        typeof e === "object" && e.preventDefault();
        const {validateFields} = this.props.form;
        validateFields((errors, values)=>{
            if(!errors){
                let skus = values.data.skus.split('\n');
                values.data.skus = skus.filter(v => v);
                if(values.data.skus.length > 500){
                    return message.info("SKU数量不能超过500个！")
                }
                fetchPost(SUBMIT_PRICING, values).then(res=>{
                    if(res && res.state === "000001"){
                        this.handlePricingState();
                    }
                })
            }
        })
    }
    handleReset = ()=>{
        this.props.form.resetFields();
        this.props.resetConditionsAction();
    };
    paginationHandle = (pageNumber, pageData)=>{
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageData
        });
        const params = {};
        params["pricingTaskId"] = this.state.pricingTaskId;
        params["pageNumber"] = pageNumber;
        params["pageData"] = pageData;
        fetchPost(GET_PRICING_RESULT, {data: params}).then(data=>{
            // 获取定价结果
            if(data && data.state === "000001"){
                this.setState({
                    total: data.data.total,
                });
                this.props.getPricingResultAction(data.data.list)
            }
        })
    };
    render(){
        return (
            <Functions {...this.props} isPage={true} functionkey={'008-000005-000001-001'}>
                <div className={"pricing-system_container"}>
                    <div className={"pricing-system_content"}>
                        <Conditions
                            {...this.props}
                            handleSubmit = {this.handleSubmit}
                            handleReset = {this.handleReset}
                        />
                    </div>
                    <div className={"pricing-system_content margin-sm-top"}>
                        <Tablelist
                            {...this.props}
                            paginationHandle = {this.paginationHandle}
                            handlePricingState = {this.handlePricingState}
                            total={this.state.total}
                            pageNumber={this.state.pageNumber}
                            pageData={this.state.pageData}
                        />
                    </div>
                </div>
            </Functions>
        )
    }
}
export default Form.create()(App)