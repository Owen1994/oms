import React from 'react';
import {
    Form,
    Row,
    Col,
} from 'antd'
import {
    popUpImage
} from "../../../../../util/baseTool"
const FormItem = Form.Item
class BasicInfo extends React.Component {
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    render(){
        var {projectInfo} = this.props
        var {basicInfo} = projectInfo
        return (
            <div className="npd-handover-create-info margin-ms-top">
                <div className="npd-handover-create-title">产品基础信息</div>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="SPU"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.spu}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="一级分类"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.classify1}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="二级分类"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.classify2}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="三级分类"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.classify3}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="产品缩略图"  {...this.formItemLayout}
                        >
                            <div onClick={()=>popUpImage(basicInfo.imageUrl && basicInfo.imageUrl.url)} className="npd-handover-litimg">
                                <img src={basicInfo.imageUrl && basicInfo.imageUrl.url} alt=""/>
                            </div>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="供应商编码"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.supplierCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="供应商名称"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.supplierName}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="供应商联系方式"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.supplierPhone}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="产品名称"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.sellPrice}</span> 
                            <span className="padding-xm-left">{basicInfo.chineseName}</span> 
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="开发链接"  {...this.formItemLayout}
                        >
                            <a href={basicInfo.developlinks} target="_blank">打开链接</a> 
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="备货方式"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.prepareGoods}</span> 
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="产品备注"  {...this.formItemLayout}
                        >
                            <span>{basicInfo.productRemark}</span> 
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BasicInfo