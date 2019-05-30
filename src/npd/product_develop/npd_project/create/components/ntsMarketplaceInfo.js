import React from 'react';
import {
    message,
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Select,
} from 'antd'
import {currencySelect} from "../../common/json"
import { fetchUpload } from '../../../../../util/fetch'
import { UPLOAD_URL } from '../../../../../constants/Api'
const FormItem = Form.Item
const Option = Select.Option;
class App extends React.Component {
    state = {
        isEdit:true,
        sw:389,
        sh:180,
        space:10,
    }
    formItemLayout = {
        labelCol: {span: 11},
        wrapperCol: {span: 12}
    }
    changeOneClassify = (value,option)=>{
        var key = Number(option.key)
        var {classifyInfoAction2,classifyInfoAction3,classify1} = this.props
        var {setFieldsValue} = this.props.form
        var c2 = classify1[key].subCategorys || []
        classifyInfoAction2(c2)
        classifyInfoAction3([])
        setFieldsValue({
            classify2:undefined,
            classify3:undefined,
        })
    }
    changeTwoClassify = (value,option)=>{
        var key = Number(option.key)
        var {classifyInfoAction3,classify2} = this.props
        var {setFieldsValue} = this.props.form
        var c3 = classify2[key].subCategorys || []
        classifyInfoAction3(c3)
        setFieldsValue({
            classify3:undefined,
        })
    }
    imguUpload = (e)=>{
        var { imgInfoAction } =this.props
        var files = e.target.files
        var file = files[0]
        var {type,size} = file
        if(!/image\/(png|jpg|jpeg)/.test(type)) return message.warning("图片格式只支持 PNG，JPG，JPEG")
        if(size > 2 * 1024 *1024) return message.warning("图片大小限制2M以下")
        fetchUpload(UPLOAD_URL, [file])
        .then(result=>{
            if(result.state == "000001" && result.data && result.data.length){
                var data = result.data[0]
                var obj = {
                    name:data.filename,
                    url:data.path
                }
                imgInfoAction(obj)
            }else {
                message.error(result.msg)
                imgInfoAction({})
            }

        })
    }
    imgload = (e)=>{
        var {sw,sh,space} = this.state
        var img = e.target;
        var w =img.naturalWidth || img.width;
        var h =img.naturalHeight || img.height;
        if (!(w + 2 * space <= sw) || !(h + 2 * space <= sh)){
            var wratio = w / sw;
            var hratio = h / sh;
            var obj = {}
            if (hratio > wratio) {
                // 宽
                obj.height = sh - 2 * space
                var actualwidth = Math.floor(w / h * obj.height)
                obj.width = actualwidth
            } else {
                obj.width = sw - 2 * space
                var actualHeight = Math.floor(h / w * obj.width)
                obj.height = actualHeight
            }
            img.width = obj.width
            img.height = obj.height
        }
    }
    
    render(){
        var {getFieldDecorator} = this.props.form
        var {classify1,classify2,classify3,imgData,projectInfo} = this.props
        var isImg = imgData.url
        var {market} = projectInfo
        var {isEdit} = this.state
        var currencyOption = currencySelect.map((v,k)=>{
            return <Option key={k} value={v.v}>{v.n}</Option>
        })
        var c1 = classify1.map((v,k)=>{
            return <Option key={k} value={v.cateNameCn + "//" + v.cateId}>{v.cateNameCn}</Option>
        })
        var c2 = classify2.map((v,k)=>{
            return <Option key={k} value={v.cateNameCn + "//" + v.cateId}>{v.cateNameCn}</Option>
        })
        var c3 = classify3.map((v,k)=>{
            return <Option key={k} value={v.cateNameCn + "//" + v.cateId}>{v.cateNameCn}</Option>
        })
        return (
            <div className="npd-project-create-info margin-ms-top">
                <div className="npd-project-create-title">新品市场分析明细</div>
                <Row>
                    <Col span={ 19}  >
                        <Row >
                            <Col span={ 8}  >
                                <FormItem
                                    label="中文名称"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('chineseName',{
                                        rules: [{required: true, message: '请输入中文名称'}],
                                        initialValue:market.chineseName
                                    })(
                                        <Input placeholder={"中文名称"} maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={ 8}  >
                                <FormItem
                                    label="一级分类"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('classify1', {
                                        rules: [{required: true, message: '请选择一级分类'}],
                                        initialValue:market.classify1?(market.classify1 + "//" + market.classifyCode1):undefined
                                    })(
                                        <Select 
                                        placeholder="请选择"
                                        onSelect={this.changeOneClassify} style={{ width: "100%" }}>
                                            {c1}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}  >
                                <FormItem
                                    label="二级分类"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('classify2', {
                                        rules: [{required: true, message: '请选择二级分类'}],
                                        initialValue:market.classify2?(market.classify2 + "//" + market.classifyCode2):undefined
                                    })(
                                        <Select
                                        placeholder="请选择"
                                        onSelect={this.changeTwoClassify} style={{ width: "100%" }}>
                                            {c2}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={ 8}  >
                                <FormItem
                                    label="三级分类"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('classify3', {
                                        initialValue:market.classify3?(market.classify3 + "//" + market.classifyCode3):undefined
                                    })(
                                        <Select 
                                        placeholder="请选择"
                                        style={{ width: "100%" }}>
                                            {c3}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={ 8}  >
                                <FormItem
                                    label="边际利润率"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('margin', {
                                        rules: [{required: true, message: '请输入利润率'}],
                                        initialValue:market.margin
                                    })(
                                        <InputNumber precision={2} style={{width:"50%"}} maxLength={100}/>
                                    )}
                                    <Input readOnly style={{ width: "48%",marginLeft:"2%" }} value={"%"}/>
                                </FormItem>
                            </Col>
                            <Col span={8}  >
                                <FormItem
                                    label="业务综合成本"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('costing',{
                                        rules: [{required: true, message: '请输入业务综合成本'}],
                                        initialValue:market.costing
                                    })(
                                        <InputNumber precision={2} style={{width:"100%"}} maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={ 8}  >
                                <FormItem
                                    label="销量(市场容量)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('saleroom',{
                                        initialValue:market.saleroom
                                    })(
                                        <InputNumber style={{width:"100%"}} maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={ 8}  >
                                <FormItem
                                    label="销售额(市场容量)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('sales',{
                                        initialValue:market.sales
                                    })(
                                        <InputNumber style={{width:"100%"}} maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}  >
                                <FormItem
                                    label="市场最佳销售链接"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('sellBestLink', {
                                        rules: [{required: true, message: '请输入市场最佳销售链接'}],
                                        initialValue:market.sellBestLink
                                    })(
                                        <Input maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={ 8}  >
                                <FormItem
                                    label="售价(市场最低价)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('sellPrice',{
                                        initialValue:market.sellPrice
                                    })(
                                        <InputNumber precision={2} style={{width:"50%"}} maxLength={100}/>
                                    )}
                                    {getFieldDecorator('sellCurrency',{
                                        initialValue:market.sellCurrency || 1
                                    })(
                                        <Select style={{ width: "48%",marginLeft:"2%" }}>
                                            {currencyOption}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={ 8}  >
                                <FormItem
                                    label="链接(市场最低价)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('sellLink',{
                                        initialValue:market.sellLink
                                    })(
                                        <Input maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}  >
                                <FormItem
                                    label="预估售价"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('predictPrice', {
                                        rules: [{required: true, message: '请输入市场最佳销售链接'}],
                                        initialValue:market.predictPrice
                                    })(
                                        <InputNumber precision={2} style={{width:"50%"}} maxLength={100}/>
                                    )}
                                    {getFieldDecorator('predictCurrency', {
                                        initialValue:market.predictCurrency || 1
                                    })(
                                        <Select style={{ width: "48%",marginLeft:"2%" }}>
                                            {currencyOption}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        
                        <Row >
                            <Col span={ 8}  >
                                <FormItem
                                    label="售价(热销最低价)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('hotsellPrice', {
                                        initialValue:market.hotsellPrice
                                    })(
                                        <InputNumber precision={2} style={{width:"50%"}} maxLength={100}/>
                                    )}
                                    {getFieldDecorator('hotsellCurrency', {
                                        initialValue:market.hotsellCurrency || 1
                                    })(
                                        <Select style={{ width: "48%",marginLeft:"2%" }}>
                                            {currencyOption}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={ 8}  >
                                <FormItem
                                    label="链接一(热销最低价)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('hotsellLink1', {
                                        initialValue:market.hotsellLink1
                                    })(
                                        <Input maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}  >
                                <FormItem
                                    label="链接二(热销最低价)"  {...this.formItemLayout} className="test"
                                >
                                    {getFieldDecorator('hotsellLink2', {
                                        initialValue:market.hotsellLink2
                                    })(
                                        <Input maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={ 5}  >
                        <div className="npd-project-create-upload">
                            <div className="npd-project-create-upload-img">
                            {
                                isImg?
                                <img onLoad={this.imgload} src={imgData.url} alt=""/>
                                :
                                null

                            }
                                
                                <div className="npd-project-create-upload-com">
                                    {
                                        isImg?"修改图片":"上传图片"
                                    }
                                    
                                    <input onChange={this.imguUpload} type="file"/>
                                </div>
                            </div>
                            <div className="npd-project-create-upload-text">
                                <p>备注：图片格式只支持PNG/JPG,大小不能超过2M。</p>
                                <p>重新插入图片会替代已上传的图片！</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App