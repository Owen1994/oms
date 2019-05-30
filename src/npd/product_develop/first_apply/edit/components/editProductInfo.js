import React from 'react';
import {
    Form,
    Input,
    InputNumber,
    Table,
    Select
} from 'antd'
import {currencys,currencySelect,unitSelect} from "../../common/json"
import {
    datasaddkey,
    dataPack,
    timestampFromat,
    popUpImage
} from "../../../../../util/baseTool"

const FormItem = Form.Item
const Option = Select.Option
class Supplier extends React.Component {
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    rowSelection = {}
    columns = ()=>{
        var {getFieldDecorator} = this.props.form
        var unitOption = unitSelect.map((v,k)=>{
            return <Option value={v.v} key={k}>{v.n}</Option>
        })
        var currencyOption = currencySelect.map((v,k)=>{
            return <Option value={v.v} key={k}>{v.n}</Option>
        })
        return this.columns =  [
            {
                title: '序号',
                dataIndex: 'id',
                // fixed: 'left' ,
                width:40,
                key: 'id',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('id'+index,{
                            initialValue:text
                        })(
                            <Input type="hidden" style={{width:"100%"}}/>
                        )}
                        {getFieldDecorator('spu'+index,{
                            initialValue:record.spu
                        })(
                            <Input type="hidden" style={{width:"100%"}}/>
                        )}
                        {getFieldDecorator('sku'+index,{
                            initialValue:record.sku
                        })(
                            <Input type="hidden" style={{width:"100%"}}/>
                        )}
                        <span>{index+1}</span>
                    </FormItem>)
                }
            }, 
            {
                title: '产品信息',
                // fixed: 'left' ,
                width:120,
                render:(text, record, index)=>{
                    return (
                        <div className="text-left">
                            <div>
                                <label>SPU：</label>
                                <span>{record.spu}</span>
                            </div>
                            <div>
                                <label>SKU：</label>
                                <span>{record.sku}</span>
                            </div>
                            <div>
                                <label>名称：</label>
                                <span>{record.chineseName}</span>
                            </div>
                        </div>)
                }
            },
            // {
            //     title: 'SPU',
            //     dataIndex: 'spu',
            //     key: 'spu',
            //     width:80,
            // }, 
            // {
            //     title: 'SKU',
            //     dataIndex: 'sku',
            //     width:80,
            //     key: 'sku'
            // }, 
            {
                title: '交期',
                dataIndex: 'deliveryTime',
                width:40,
                key: 'deliveryTime',
                render:(text, record, index)=>{
                    return  <span>{text} 天</span>
                }
            }, 
            // {
            //     title: '产品名称',
            //     dataIndex: 'chineseName',
            //     width:60,
            //     key: 'chineseName'
            // }, 
            {
                title: '产品缩略图',
                dataIndex: 'imageUrl',
                width:80,
                key: 'imageUrl',
                render:(text, record, index)=>{
                    return  <div onClick={()=>popUpImage(text && text.path)} className="npd-img-wrap">
                                <img src={text && text.path} alt=""/>
                            </div>
                }
            }, 
            {
                title: '分类',
                width:150,
                render:(text, record, index)=>{
                    return (
                        <div className="text-left">
                            <div>
                                <label>一级：</label>
                                <span>{record.classify1}</span>
                            </div>
                            <div>
                                <label>二级：</label>
                                <span>{record.classify2}</span>
                            </div>
                            <div>
                                <label>三级：</label>
                                <span>{record.classify3}</span>
                            </div>
                        </div>)
                }
            },
            // {
            //     title: '一级分类',
            //     dataIndex: 'classify1',
            //     width:40,
            //     key: 'classify1'
            // }, 
            // {
            //     title: '二级分类',
            //     dataIndex: 'classify2',
            //     width:40,
            //     key: 'classify2'
            // }, 
            // {
            //     title: '三级分类',
            //     dataIndex: 'classify3',
            //     width:40,
            //     key: 'classify3'
            // }, 
            {
                title: '首单数量',
                dataIndex: 'firstOrderCount',
                width:80,
                key: 'firstOrderCount',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('firstOrderCount'+index,{
                                    initialValue:text
                                })(
                                    <InputNumber min={0} style={{width:"100%"}}/>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '起订数量',
                dataIndex: 'lowestCount',
                width:80,
                key: 'lowestCount',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('lowestCount'+index,{
                                    initialValue:text
                                })(
                                    <InputNumber min={0} style={{width:"100%"}}/>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '预估日均销量',
                dataIndex: 'predictSales',
                width:80,
                key: 'predictSales',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('predictSales'+index,{
                                    initialValue:text
                                })(
                                    <InputNumber min={0} style={{width:"100%"}}/>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '单位',
                dataIndex: 'unit',
                width:100,
                key: 'unit',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('unit'+index,{
                                    initialValue:text
                                })(
                                    <Select 
                                    style={{width:"100%"}}
                                    defaultActiveFirstOption={false}
                                    filterOption = {false}
                                    notFoundContent={null}>
                                        {unitOption}
                                    </Select>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '采购价格',
                dataIndex: 'procurementPrice',
                width:80,
                key: 'procurementPrice',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('procurementPrice'+index,{
                                    initialValue:text
                                })(
                                    <InputNumber precision={2} min={0} style={{width:"100%"}}/>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '运费',
                dataIndex: 'carriage',
                width:80,
                key: 'carriage',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('carriage'+index,{
                                    initialValue:text
                                })(
                                    <InputNumber precision={2} min={0} style={{width:"100%"}}/>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '币种',
                dataIndex: 'carriageCurrency',
                width:100,
                key: 'carriageCurrency',
                render:(text, record, index)=>{
                    return (<FormItem>
                            {getFieldDecorator('carriageCurrency'+index,{
                                initialValue:text
                            })(
                                <Select 
                                style={{width:"100%"}}
                                defaultActiveFirstOption={false}
                                filterOption = {false}
                                notFoundContent={null}>
                                    {currencyOption}
                                </Select>
                            )}
                        </FormItem>)
                }
            }, 
            {
                title: '售价',
                dataIndex: 'sellingPrice',
                width:80,
                key: 'sellingPrice',
                render:(text, record, index)=>{
                    return  (<FormItem>
                                {getFieldDecorator('sellingPrice'+index,{
                                    initialValue:text
                                })(
                                    <InputNumber precision={2} min={0} style={{width:"100%"}}/>
                                )}
                            </FormItem>)
                }
            }, 
            {
                title: '销售币种',
                dataIndex: 'sellingPriceCurrency',
                width:100,
                key: 'sellingPriceCurrency',
                render:(text, record, index)=>{
                    return (<FormItem>
                            {getFieldDecorator('sellingPriceCurrency'+index,{
                                initialValue:text
                            })(
                                <Select 
                                style={{width:"100%"}}
                                defaultActiveFirstOption={false}
                                filterOption = {false}
                                notFoundContent={null}>
                                    {currencyOption}
                                </Select>
                            )}
                        </FormItem>)
                }
            }, 
            {
                title: '毛利率',
                dataIndex: 'grossMargin',
                width:80,
                key: 'grossMargin',
                render:(text, record, index)=>{
                    
                    return  (<FormItem>
                        {getFieldDecorator('grossMargin'+index,{
                            initialValue:text
                        })(
                            <InputNumber 
                            precision={2}
                            formatter={value => `${value}%`}
                            min={0} style={{width:"100%"}}/>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '关联单号',
                dataIndex: 'code',
                width:150,
                key: 'code',
                render:(text, record, index)=>{
                    return (
                        <div className="text-left">
                            <div>
                                <label>跟踪单号：</label>
                                <span>{record.trackingCode}</span>
                            </div>
                            <div>
                                <label>交接单号：</label>
                                <span>{record.deliverCode}</span>
                            </div>
                            <div>
                                <label>立项单号：</label>
                                <span>{record.projectCode}</span>
                            </div>
                        </div>
                    )
                }
            }
        ];
    };

    render(){
        var {projectInfo} = this.props
        var {productInfo} = projectInfo
        var columns = typeof this.columns == "function" ? this.columns():this.columns
        return (
            <div className="npd-fapply-create-info margin-ms-top">
                <div className="npd-fapply-create-title">产品物流信息</div>
                <Table 
                bordered={true}
                size="small"
                scroll={{ x: 1300 }}
                pagination={false}
                dataSource={productInfo} 
                columns={columns} />
            </div>
        )
    }
}

export default Supplier