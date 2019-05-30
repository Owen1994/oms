import React from 'react';
import OrderForm from './OrderForm';
import OrderTable from './OrderTable';
import { Form, Button, Row, Col,message } from 'antd';
import { post } from '../../../../util/axios';
import { APPLY_FIRST_API, GET_PRODUCT_INFO } from '../constants/Api';
import { filterParams, parseNetErrorToMsg } from '../../../../util/baseTool';
import Btnwrap from "../../../common/components/btnwrap/index"

var obj = {};
class App extends React.Component {
    //  新增带下去的数据  SPU 
//     跟踪号：GZ20180809001

// 立项单：LX20180806037 projectCode

// 交接单：JJ20180809006 deliverCode
    uid = 1
    state = {
        list: [],
        site:[],
        resetFields: false
    }
    componentWillMount(){
      var data = JSON.parse(sessionStorage.getItem("npd_track"))      
      this.setState({site: data})
      var idArr = [];
      data.forEach(v=>idArr.push(v.id))
      post(GET_PRODUCT_INFO, {list: idArr}).then(result=>{
          let resultObj = undefined;
          if(result.state === '000001'){
            resultObj = result.data;
          }
          var list = data.map((v, index)=>{
            obj = {};
            let arr = resultObj && resultObj[v.spu];
            if(arr && Array.isArray(arr) && arr.length>0){
                obj = arr[0]
            }
            return {
                procurementPriceCurrency: obj.procurementPriceCurrency,
                sellingPrice: obj.sellingPrice,
                // carriage: obj.carriage,
                lowestCount: obj.lowestCount,
                sellingPriceCurrency: obj.sellingPriceCurrency,
                procurementPrice: obj.procurementPrice,
                deliveryTime: obj.deliveryTime,
                grossMargin: this.computedGrossMargin({procurementPrice: obj.procurementPrice, sellingPrice: obj.sellingPrice, carriage: 0}),
                key:this.uid ++ ,
                spu:v.spu,
                trackingCode:v.trackingCode,
                projectCode:v.projectCode,
                deliverCode:v.deliverCode,
              //   remittanceType:1,
                unit:1,
                carriageCurrency:1,
                sellingPriceCurrency:1,
                primitive:true,
            }
        })
        this.setState({
            list
        })
      })
    
    }

    computedGrossMargin = (item) => {
        // const list = this.state.list
        let procurementPrice=0, sellingPrice=0, carriage=0, result=0;
          procurementPrice = item.procurementPrice || 0; //采购单价
          sellingPrice = item.sellingPrice || 0; //售价
          carriage = item.carriage || 0; //运费
        if(( procurementPrice + carriage) === 0){
            return 0;
        }else{
          return (
            ( sellingPrice - procurementPrice - carriage ) / ( procurementPrice + carriage ) * 100
          );
        }
        
      }
  
    handleResetFields = ()=>{
        var {site} = this.state
        var list = site.map(v=>{
            return {
                key:this.uid ++ ,
                spu:v.spu,
                trackingCode:v.trackingCode,
                projectCode:v.projectCode,
                deliverCode:v.deliverCode,
                grossMargin: this.computedGrossMargin({procurementPrice: obj.procurementPrice, sellingPrice: obj.sellingPrice, carriage: obj.carriage}),
                procurementPriceCurrency: obj.procurementPriceCurrency,
                sellingPrice: obj.sellingPrice,
                carriage: obj.carriage,
                lowestCount: obj.lowestCount,
                sellingPriceCurrency: obj.sellingPriceCurrency,
                procurementPrice: obj.procurementPrice,
                deliveryTime: obj.deliveryTime,

                // remittanceType:1,
                unit:1,
                carriageCurrency:1,
                sellingPriceCurrency:1,
                primitive:true,
            }
        })
        this.setState({
            list
        })
        this.refs.orderForm.setFieldsValue({
            remark:undefined,
            warehouseCode:undefined,
            remittanceType:1,
        })
    }
    handleChange = (index, name, value)=>{
        var {list} = this.state;
        list[index][name] = value
        this.setState({})
    }
    addhandle = (data,index)=>{
        var newObj = {
            key:this.uid ++ ,
            spu:data.spu,
            trackingCode:data.trackingCode,
            projectCode:data.projectCode,
            deliverCode:data.deliverCode,

            
            procurementPriceCurrency: obj.procurementPriceCurrency,
            sellingPrice: obj.sellingPrice,
            carriage: obj.carriage,
            lowestCount: obj.lowestCount,
            sellingPriceCurrency: obj.sellingPriceCurrency,
            procurementPrice: obj.procurementPrice,
            deliveryTime: obj.deliveryTime,
            grossMargin: this.computedGrossMargin({procurementPrice: obj.procurementPrice, sellingPrice: obj.sellingPrice, carriage: obj.carriage}),

            // remittanceType:1,
            unit:1,
            carriageCurrency:1,
            sellingPriceCurrency:1,
        }
        this.state.list.push(newObj)
        this.setState({})
    }
    checkObj = {
        sku:"SKU",
        deliveryTime:"交期",
        firstOrderCount:"首单数量",
        procurementPrice:"采购单价",
        sellingPrice:"售价",
        grossMargin:"毛利率",
    }
    check = ()=>{
        var {list} = this.state ;
        var keys = Object.keys(this.checkObj),
            i = 0,
            len = keys.length,
            l = list.length;
        for(;i<l;i++){
            for(var j=0;j<len;j++ ){
                var d = list[i][keys[j]]
                if(d === undefined || d === "" ){
                    return keys[j]
                }
            }
        }
        return true
    }
    delhandle = (data,index)=>{
        var {list} = this.state
        if(data === list[index]){
            list.splice(index,1)
        }
        this.setState({})
    }
    filterObj = (obj)=>{
        for(var k in obj){
            if(obj[k] === undefined || obj[k] === "") delete obj[k]
        }
    }
    handleSubmit = (type) => {
        var data = this.refs.orderForm.getFieldsValue()
        if(!data.warehouseCode) return message.warning("请选择仓库")
        const list = this.state.list;
        var flag = this.check(list)
        if(flag !== true){
            return message.warning(this.checkObj[flag] + "为必填")
        }
        this.filterObj(data);
        list.forEach(v=>{
            this.filterObj(v);
        })
        const params = {
            list,
            ...data,
            projectFlowCode: this.state.site[0].projectflowInfo
        }
        post(APPLY_FIRST_API, {data: params,type}).then(data => {
            return Promise.resolve(data);
        }).then(data => {
            parseNetErrorToMsg(data);
            if(data.state==='000001'){
                this.props.history.push({pathname: '/npd/pd/fapply/'})
            }
        })
    }
    componentWillUnmount(){
        sessionStorage.removeItem("npd_track")
    }
    render() {
        let {list,site} = this.state
        var data = site[0]
        const resetFields = this.state.resetFields;
        return (
            <div className="mb52">
                <OrderForm
                    ref="orderForm"
                    data = {data}
                    {...this.props} 
                />
                <OrderTable
                    {...this.props}
                    list = {list}
                    addhandle = {this.addhandle}
                    handleChange = {this.handleChange}
                    delhandle = {this.delhandle}
                    onListChange={this.handleListChange}
                    resetFields={resetFields}
                />
                <Btnwrap>
                    <Button className="margin-ms-right" onClick={() => this.props.history.goBack()}>取消</Button>
                    <Button className="margin-ms-right" onClick={this.handleResetFields}>重置</Button>
                    <Button className="margin-ms-right" onClick={() => this.handleSubmit(1)}>保存</Button>
                    <Button type="primary" className="margin-ms-right" onClick={() => this.handleSubmit(2)}>提交</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default App;