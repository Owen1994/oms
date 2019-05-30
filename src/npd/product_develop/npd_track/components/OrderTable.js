import React from 'react';
import { Table, Input, InputNumber, Select } from 'antd';
import update from 'immutability-helper';
import { PAY_TYPE } from '../../constants'
import { currencySelect,unitSelect } from '../../constants/index'

const Option = Select.Option;

const currencyElements = currencySelect.map(item => 
						  <Option key={item.v} value={item.v}>{item.n}</Option>)
const unitElements = unitSelect.map(item => 
							<Option key={item.v} value={item.v}>{item.n}</Option>)
// const payElements = PAY_TYPE.map(item => 
//                           <Option key={item.key} value={item.key}>{item.name}</Option>)
export default class OrderTable extends React.Component {

    state = {
        data: [],
        grossMargin1: 0,
    }
    
    columns = [{
        title: '序号',
        width:6,
        render: (text, record, index) => <span>{index + 1}</span>,
      }, {
        title: 'SPU',
        width:10,
        dataIndex: 'spu'
        // render: (text, record) => <Input onChange={(e) => this.handleChange(index, 'spu', e.target.value)} />,
      }, {
        title: <p><span className="red">*</span> SKU</p> ,
        dataIndex: 'sku',
        width:10,
        render: (text, record, index) => <Input onChange={(e) => this.handleChange(index, 'sku', e.target.value)} />,
      }, {
        title: <p><span className="red">*</span> 交期</p> ,
        width:10,
        dataIndex: 'deliveryTime',
        render: (text, record, index) => <InputNumber defaultValue={record.deliveryTime} style={{width:"100%"}} min={0} precision={0} onChange={(value) => this.handleChange(index, 'deliveryTime', value)} />,
        // render: (text, record, index) => <DatePicker 
        //                               onChange={(date) => this.handleChange(index, 'deliveryTime', date.valueOf())} 
        //                           />,
      },
      {
        title: <p><span className="red">*</span> 首单数量</p>,
        width:10,
        render: (text, record, index) => <InputNumber style={{width:"100%"}} min={0} precision={0}  onChange={(value) => this.handleChange(index, 'firstOrderCount', value)} />,
      }, {
        title: '起订量',
        width:10,
        dataIndex: 'lowestCount',
        render: (text, record, index) => <InputNumber defaultValue={record.lowestCount} style={{width:"100%"}} min={0} precision={0} onChange={(value) => this.handleChange(index, 'lowestCount', value)} />,
      }, {
        title: '预估日均销量',
        width:10,
        render: (text, record, index) => <InputNumber style={{width:"100%"}} min={0} precision={0} onChange={(value) => this.handleChange(index, 'predictSales', value)} />,
      }, {
        title: '单位',
        width:12,
		// render: (text, record, index) => <Input onChange={(e) => this.handleChange(index, 'unit', e.target.value)} />,
		render: (text, record, index) => <Select 
                                    key={index+"unit"}
                                    onChange={(value) => this.handleChange(index, 'unit', value)}
                                    value={record.unit} 
                                    style={{ width:"100%" }}>
                                    {unitElements}
                                  </Select>
      }, {
        title: <p><span className="red">*</span> 采购单价</p>,
        width:10,
        dataIndex: 'procurementPrice',
        render: (text, record, index) => <InputNumber style={{width:"100%"}} defaultValue={record.procurementPrice} min={0} precision={2} onChange={(value) => this.handleChange(index, 'procurementPrice', value, record.key)} />,        
      }, {
        title: '采购币种',
        width:12,
        dataIndex: 'procurementPriceCurrency',
        render: (text, record, index) => <Select 
                                    key={Date.now()}
                                    onChange={(value) => this.handleChange(index, 'procurementPriceCurrency', value)}
                                    value={record.procurementPriceCurrency} 
                                    style={{ width:"100%" }}>
                                    {currencyElements}
                                  </Select>
      }, 
      {
        title: '运费',
        width:10,
        dataIndex: 'carriage',
        render: (text, record, index) => <InputNumber style={{width:"100%"}} defaultValue={record.carriage} min={0} precision={2} onChange={(value) => this.handleChange(index, 'carriage', value, record.key)} />,        
      }, 
      {
        title: '币种',
        width:12,
        render: (text, record, index) => <Select 
                                    key={Date.now()}
                                    onChange={(value) => this.handleChange(index, 'carriageCurrency', value)}
                                    value={record.carriageCurrency} 
                                    style={{ width:"100%" }}>
                                    {currencyElements}
                                  </Select>
      }, {
        title: <p><span className="red">*</span> 售价</p>,
        width:10,
        dataIndex: 'sellingPrice',
        render: (text, record, index) => <InputNumber style={{width:"100%"}} defaultValue={record.sellingPrice} min={0} precision={2} onChange={(value) => this.handleChange(index, 'sellingPrice', value, record.key)} />,        
      }, {
        title: '销售币种',
        width:12,
        render: (text, record, index) => <Select 
                                    key={Date.now()}
                                    onChange={(value) => this.handleChange(index, 'sellingPriceCurrency', value)}
                                    value={record.sellingPriceCurrency} 
                                    style={{ width:"100%" }}
                                    >
                                    {currencyElements}
                                  </Select>,
      }, {
        title:  <p><span className="red">*</span> 毛利率</p>,
        width:10,       
        dataIndex: 'grossMargin',
        render: (text, record,index) => {
		    return <InputNumber 
				          style={{width:"100%"}}
                  formatter={value => `${value}%`} 
                  parser={value => value.replace('%', '')} 
                  precision={2} 
                  onChange={(value) => this.handleChange(index, 'grossMargin', value)} 
                  value={text}
                  />
                  
        },        
      }, {
        title: '操作',
        width:7,
        render: (text, record,index) => {
          var {addhandle,delhandle} = this.props
            return record.primitive? <a onClick={() => addhandle(record,index)}>添加</a>:
            <a onClick={() => delhandle(record,index)}>删除</a>
        }
      }
    ];

    handleChange = (index, name, value) => {      
      this.props.handleChange(index, name, value);
      let result = 0
      if(name === 'sellingPrice'){
        result = this.changeGrossMargin('sellingPrice', value, index);
      }
      if(name === 'procurementPrice'){
        result = this.changeGrossMargin('procurementPrice', value, index);
      }
      if(name === 'carriage'){
        result = this.changeGrossMargin('carriage', value, index);
      }
      if(name === 'sellingPrice' || name === 'procurementPrice' || name === 'carriage'){
        this.props.handleChange(index, "grossMargin", result);
      }
    }
    changeGrossMargin = (type, value, index) => {
      let procurementPrice, sellingPrice, carriage;

        procurementPrice = this.props.list[index].procurementPrice||0; //采购单价
        sellingPrice = this.props.list[index].sellingPrice||0; //售价
        carriage = this.props.list[index].carriage||0; //运费
      if((procurementPrice + carriage)===0){
        return 0;
      }
        return ( sellingPrice - procurementPrice - carriage ) / ( procurementPrice + carriage ) * 100;
    }
    render(){
        const { list } = this.props;
          return (
            <div className="white margin-ms-top padding-md">
                <div className="npd-track-title">产品信息</div>
                <Table
                    className="margin-ss-top"
                    bordered
                    size="small"
                    pagination={false}
                    columns={this.columns}
                    dataSource={list}
                />
            </div>
        )
    }
}