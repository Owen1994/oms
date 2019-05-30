import React from 'react';
import {
    Form,
    Row,
    Col,
    Table
} from 'antd'
import {currencys,units} from "../json"
import {
    datasaddkey,
    timestampFromat,
    popUpImage
} from "../../../../../util/baseTool"
const FormItem = Form.Item
class Supplier extends React.Component {
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    rowSelection = {}
    columns = [
        {
            title: '序号',
            width:30,
            dataIndex: 'xuhao',
            key: 'xuhao',
            render:(text, record, index)=>{
                return index+1
            }
        }, 
        {
            
            title: '产品信息',
            width:100,
            render:(text, record, index)=>{
                return (<div className="text-left">
                            <p><span>SPU：</span>{record.spu}</p>
                            <p><span>SKU：</span>{record.sku}</p>
                            <p><span>名称：</span>{record.chineseName}</p>
                        </div>)
            }
        },
        {
            title: '产品缩略图',
            width:80,
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render:(text, record, index)=>{
                return  <div  onClick={()=>popUpImage(text && text.path)} className="npd-img-wrap">
                            <img src={text && text.path} alt=""/>
                        </div>
            }
        }, 
        {
            
            title: '分类',
            width:100,
            render:(text, record, index)=>{
                return (<div className="text-left">
                            <p><span>一级：</span>{record.classify1}</p>
                            <p><span>二级：</span>{record.classify2}</p>
                            <p><span>三级：</span>{record.classify3}</p>
                        </div>)
            }
        }, 
        
        {
            
            title: '数量信息',
            width:100,
            render:(text, record, index)=>{
                return (<div className="text-left">
                            <p><span>首单数量：</span>{record.firstOrderCount}</p>
                            <p><span>起订数量：</span>{record.lowestCount}</p>
                            <p><span>预估日均销量：</span>{record.predictSales}</p>
                            <p><span>单位：</span>{units[record.unit]}</p>
                        </div>)
            }
        },
        {
            
            title: '成本信息',
            width:100,
            render:(text, record, index)=>{
                return (<div className="text-left">
                            <p><span>采购价格：</span>{record.procurementPrice}</p>
                            <p><span>运费：</span>{record.carriage}</p>
                            <p><span>币种：</span>{currencys[record.carriageCurrency]}</p>
                        </div>)
            }
        },
        {
            
            title: '售价信息',
            width:100,
            render:(text, record, index)=>{
                return (<div className="text-left">
                            <p><span>售价：</span>{record.procurementPrice}</p>
                            <p><span>销售币种：</span>{currencys[record.sellingPriceCurrency]}</p>
                        </div>)
            }
        },
        {
            title: '毛利率',
            dataIndex: 'grossMargin',
            width:40,
            key: 'grossMargin',
            render:(text, record, index)=>{
                return text + " %"
            }
        }, 
        {
            title: '关联单号',
            dataIndex: 'code',
            width:120,
            key: 'code',
            render:(text, record, index)=>{
                return (
                    <div>
                        <div className="npd-project-tablewrap-code">
                            <label>跟踪单号：</label>
                            <span>{record.trackingCode}</span>
                        </div>
                        <div className="npd-project-tablewrap-code">
                            <label>交接单号：</label>
                            <span>{record.deliverCode}</span>
                        </div>
                        <div className="npd-project-tablewrap-code">
                            <label>立项单号：</label>
                            <span>{record.projectCode}</span>
                        </div>
                    </div>
                )
            }
        }
    ];

    render(){
        var {projectInfo} = this.props
        var {productInfo} = projectInfo
        return (
            <div className="npd-fapply-create-info margin-ms-top">
                <div className="npd-fapply-create-title">产品物流信息</div>
                <Table 
                bordered={true}
                size="small"
                pagination={false}
                dataSource={productInfo} 
                columns={this.columns} />
            </div>
        )
    }
}

export default Supplier