import React from 'react';
import {
    Form,
    Row,
    Col,
} from 'antd'
import {currencys} from "../json"
import {
    datasaddkey,
    timestampFromat,
    popUpImage
} from "../../../../../util/baseTool"
const FormItem = Form.Item
class App extends React.Component {
    formItemLayout = {
        labelCol: {span: 11},
        wrapperCol: {span: 11}
    }
    render(){
        var {projectInfo} = this.props
        if(!projectInfo.id) return null
        var {market} = projectInfo
        return (
            <div className="npd-project-create-info margin-ms-top">
                <div className="npd-project-create-title">新品市场分析</div>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="中文名称"  {...this.formItemLayout}
                        >
                            <span>{market.chineseName}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="一级分类"  {...this.formItemLayout}
                        >
                            <span>{market.classify1}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="二级分类"  {...this.formItemLayout}
                        >
                            <span>{market.classify2}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="三级分类"  {...this.formItemLayout}
                        >
                            <span>{market.classify3}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="产品缩略图"  {...this.formItemLayout}
                        >
                            <div onClick={()=>popUpImage(market.imageUrl && market.imageUrl.url)} className="npd-project-create-litimg">
                                <img src={market.imageUrl.url} alt=""/>
                            </div>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="业务综合成本"  {...this.formItemLayout}
                        >
                            <span>{market.costing}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="销量(市场容量)"  {...this.formItemLayout}
                        >
                            <span>{market.sales}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="销售额(市场容量)"  {...this.formItemLayout}
                        >
                            <span>{market.saleroom}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="售价(市场最低价)"  {...this.formItemLayout}
                        >
                            <span>{market.sellPrice}</span> 
                            <span className="padding-xm-left">{currencys[market.sellCurrency]}</span> 
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="链接(市场最低价)"  {...this.formItemLayout}
                        >
                            <a href={market.sellLink} target="_blank">打开链接</a> 
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="售价(热销最低价)"  {...this.formItemLayout}
                        >
                            <span>{market.hotsellPrice}</span> 
                            <span className="padding-xm-left">{currencys[market.hotsellCurrency]}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="链接一(热销最低价)"  {...this.formItemLayout}
                        >
                            <a href={market.hotsellLink1} target="_blank">打开链接</a> 
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="链接二(热销最低价)"  {...this.formItemLayout}
                        >
                            <a href={market.hotsellLink2} target="_blank">打开链接</a> 
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="预估售价(净利售价)"  {...this.formItemLayout}
                        >
                            <span>{market.predictPrice}</span> 
                            <span className="padding-xm-left">{currencys[market.predictCurrency]}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="边际利润率"  {...this.formItemLayout}
                        >
                            <span>{market.margin}</span>
                            <span className="padding-xm-left">%</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="市场最佳销量链接"  {...this.formItemLayout}
                        >
                            <a href={market.sellBestLink} target="_blank">打开链接</a> 
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App