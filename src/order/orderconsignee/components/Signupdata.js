import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Checkbox,
    message,
    Table
} from 'antd'
import moment from 'moment'
import * as config from "../../../util/connectConfig";
import axios from "../../../util/axios";
import { fetchPost } from '@/util/fetch';
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../../util/options';
import {platformsearchaction} from "../actions";
import {
    getUrlParams,
    timestampFromat,
    objTodata,
    objToarrsort,
    datasaddkey,
    sortarrToobj,
    objvaluesformat
} from '../../../util/baseTool';
class Signselect extends Component {

    constructor(props) {
        super(props);
    }

    state={
        sites: [],
    }

    componentWillMount () {

        let id=this.props.tablemodel.updakey;
        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail`,{id:id})
        .then(response => {
            if (response.status == 200) {
                if(response.data.state=='000001'){
                    var arr=this.props.commonSelectData.salesPlatform||[];
                    var platforms= response.data.data.addresseePlatform.platform;
                    for(var i=0;i<arr.length;i++){
                        if(platforms == arr[i].id){
                            platforms = arr[i].name;
                            break;
                        }
                    }
                    if (platforms === 'shopee') {
                        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getPlatformSite', {platform: 'SE'}, 2)
                            .then(result => {
                                if(result.state === '000001'){
                                    this.setState({ sites: result.data });
                                }
                            })
                    } else {
                        this.setState({ sites: [] });
                    }
                    const sites = response.data.data.addresseePlatform.sites;
                    const productInfo = response.data.data.addresseeDetail;
                    var objlist=response.data.data.addresseeList;
                    const productInfoarr = datasaddkey(productInfo);
                    const newproductInfoarr = productInfoarr.length? productInfoarr.map((v, i) => {
                        
                        return ({
                            key: ++i + '',
                            objlist:objlist,
                            addresseeKey: {
                                name: `addresseeKey${v.key}`,
                                initialValue: v.addresseeKey,
                                message: '收件人ID',
                                placeholder: '收件人ID'
                            },
                            addresseeValue: {
                                name: `addresseeValue${v.key}`,
                                initialValue: v.addresseeValue,
                                message: '收件人名称',
                                placeholder: '收件人名称'
                            },
                            id:{
                                name: `id${v.key}`,
                                initialValue: v.id,
                            },
                            platform:{
                                name: `platform${v.key}`,
                                initialValue: v.platform,
                                message: '销售平台',
                                placeholder: '销售平台'
                            }
                        })
                    }):[]
                    this.props.tablemodelaction4({data4: newproductInfoarr,count:newproductInfoarr.length+1, loading: false,platform:platforms, sites});
                }
                
            }
        }).catch(e => {
            console.log(e);
        })
    }

    selectaccountType1 = ({name, message, initialValue = undefined, placeholder = ''}) => (
        <FormItem style={{width: '90%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: initialValue,onChange: (value) => {
                    
                    this.handleChange(name, value)
                }
            })(
                <Select className='ant-xs-row' placeholder="请选择"   >
                {
                    
                    this.props.tablemodel4.data4[0].objlist.map((item,i) => {
                    return (
                        <Option key={i} value={item.addresseeKey } 
                        >
                           {item.addresseeValue}
                        </Option>
                    )
                    })
                }
                </Select>
            )}
        </FormItem>
    )

    columns= [{
        title: '收货人信息字段',
        className: '',
        dataIndex: 'addresseeKey',
        width: 100,
        render:this.selectaccountType1
    },
    {
        title: '操作',
        width: 60,
        dataIndex: 'Operation',
        render: (text, record, index) => {
            return (
                <a onClick={this.deletetablelist(record,index)}>删除</a>
            )
        }
    }]

    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }
    formItemLayout2 = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
    }
     /**
    *作者: 唐勇
    *功能描述: 平台选择触发事件
    *参数说明:1.name=下拉框选中的key名称 2.value=选中的值
    *时间: 2018/4/3 19:00
    */
    handleChange=(name,value)=>{
        const newname = name.replace(/(.*?)\d+/, '$1')
        const prioritylist = this.props.tablemodel4.data4.filter(v => v[newname].name != name)
        let repeat = '';
        for (let i = 0, l= prioritylist.length; i < l; i++) {
            if (this.props.form.getFieldValue(prioritylist[i][newname].name) == value) {
              
                repeat=prioritylist[i][newname].name
            }
        }

      this.props.form.setFieldsValue({[repeat]: undefined})

        
    }

    /**
    *作者: 唐勇
    *功能描述: 添加拦截字段
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    addlanjieziduan=() =>{
        const {count, data4} = this.props.tablemodel4;
        const newData = {
            key: count + '',
            addresseeValue: {name: 'addresseeValue' + count, message: '收货人名称', placeholder: '收货人名称',},
            addresseeKey: {name: 'addresseeKey' + count, message: '收货人id', placeholder: '收货人id',},
            objlist:data4[0].objlist
        };
        
        newData['index']=count;
        this.props.tablemodelaction4({data4: [...data4, newData], count: count + 1,})
       
    }

     /**
    *作者: 唐勇
    *功能描述: 修改弹窗删除
    *参数说明:1.record=当前行数据集合 2.第几条数据
    *时间: 2018/4/3 19:00
    */

    deletetablelist=(record,index)=>() => {
        var data4=this.props.tablemodel4.data4;
        if(data4.length<=1){
            message.error('拦截字段不能为空!');
            return false;
        }else{
        data4.splice(index, 1);
        this.props.tablemodelaction4({data4: data4,});
        }
    }

    /**
    *作者: 唐勇
    *功能描述: 选择配置是否验证
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    }

    
   /**
    *作者: 唐勇
    *功能描述: 清空列表数据
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const columns = this.columns;
        const data4 = this.props.tablemodel4.data4;
        var newdata4=datasaddkey(data4);
        const { sites } = this.state;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
             return (
            <div className="newCluenk">
                <Form layout="inline">
                    <div className="content">
                        <Row>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout2}
                                    label="销售平台" className='ant-xs-row'
                                >
                                    {getFieldDecorator('platform', {
                                            rules: [{required: false, message: '请选择销售平台'}],initialValue:this.props.tablemodel4.platform 
                                    })(
                                        <Input disabled={true}/>
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                        {
                            sites.length > 0 ? (
                                <Row>
                                    <Col span={24}>
                                        <FormItem {...this.formItemLayout2}
                                            label="站点" className='ant-xs-row'
                                        >
                                            {getFieldDecorator('shopeeSites2', {
                                                initialValue: this.props.tablemodel4.sites || []
                                            })(
                                                <Checkbox.Group>
                                                    {
                                                        sites.map(v => <Checkbox key={v.key} value={v.key}>{v.key}</Checkbox>)
                                                    }
                                                </Checkbox.Group>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            ) : null
                        }
                        <Row>
                        <Col span={24}>
                            <div className='add_all'>
                                <div className='add_tilis'> 
                                    <div className='tilis_lef'>
                                        请设置拦截字段：
                                    </div>
                                    <div className='tilis_rit'>
                                        <div className='rit_btn'>
                                            <Button
                                            type="primary"
                                            onClick={this.addlanjieziduan}
                                        >
                                            添加
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className='consigneeadd_table'>
                                    <Table key={'data'}  columns={columns} dataSource={data4} bordered
                                pagination={false}/>
                                    </div>
                            </div>
                            
                            </Col>
                        </Row>    

                    </div>
                </Form>
            </div>
        );
    }
}
export default Signselect 