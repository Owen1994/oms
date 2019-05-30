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
    Table
} from 'antd'
import moment from 'moment'
import * as config from "../../../util/connectConfig";
import axios from "../../../util/axios";
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../../util/options';
import {platformsearchaction} from "../actions";
import {selectValues,datasaddkey} from '../../../util/baseTool';
import { fetchPost } from '@/util/fetch';
class Signadd extends Component {

    constructor(props) {
        super(props);
    }

    state={
        data:[],
        sites: [],
    }

    componentDidMount() {
        let id='';
        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail`,{id:id})
        .then(response => {
            if (response.status == 200) {
                if(response.data.state=='000001'){
                    var data=response.data.data.addresseeList;
                    this.props.tablemodelaction2({selectlist: data,});
                }
                
            }
        })

    }

    /**
    *作者: 唐勇
    *功能描述: 销售平台
    *参数说明:
    *时间: 2018/4/3 19:00
    */
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
                <Select style={{width: '100%'}} placeholder="请选择"  >
                {
                    this.props.tablemodel2.selectlist.map((item,i) => {
                    return (
                        <Option key={i} value={item.addresseeKey} 
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
        dataIndex: 'addresseeValue',
        key: 'addresseeValue',
        width: 120,
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

     /**
    *作者: 唐勇
    *功能描述: submit报错的信息方法
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }

    formItemLayout2 = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
    }

    /**
    *作者: 唐勇
    *功能描述: 平台选择触发事件
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    handleChange=(name,value)=>{

        const newname = name.replace(/(.*?)\d+/, '$1')
        const prioritylist = this.props.tablemodel2.data2.filter(v => v[newname].name != name)
         let repeat = '';

        for (let i = 0, l= prioritylist.length; i < l; i++) {
            if (this.props.form.getFieldValue(prioritylist[i][newname].name) === value) {
                repeat=prioritylist[i][newname].name
            }
        }

      this.props.form.setFieldsValue({[repeat]: undefined})
      
    }

    /**
    *作者: 唐勇
    *功能描述: 新增弹窗删除
    *参数说明:
    *时间: 2018/4/3 19:00
    */

     deletetablelist=(record,index)=>() => {
        var data2=this.props.tablemodel2.data2;
        data2.splice(index, 1);
        this.props.tablemodelaction2({data2: data2,});

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


    /**
    *作者: 唐勇
    *功能描述: 添加拦截字段
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    addlanjieziduan=() =>{
        const {count, data2} = this.props.tablemodel2;
        const newData = {
            key: count + '',
            addresseeValue: {name: 'addresseeValue' + count, message: '收货人名称', placeholder: '收货人名称',},
            addresseeKey: {name: 'addresseeKey' + count, message: '收货人id', placeholder: '收货人id',},
        };
        newData['index']=count;
        this.props.tablemodelaction2({data2: [...data2, newData], count: count + 1,})
    }

    /**
     * 作者：陈文春
     * 描述：平台选择事件
     * 事件：2019年3月5日10:28:08
     */
    handlePlatformSelect = (val) => {
        if (val === 'SE') {
            fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getPlatformSite', {platform: val}, 2)
                .then(result => {
                    if(result.state === '000001'){
                        this.setState({ sites: result.data });
                    }
                })
        } else {
            this.setState({ sites: [] });
        }
    }

    render() {
        const columns = this.columns;
        const {data2} = this.props.tablemodel2;
        var newdata2=datasaddkey(data2);
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const RadioGroup = Radio.Group;
        const salesPlatform = this.props.commonSelectData.salesPlatform || []
        const platform = this.props.form.getFieldValue('modulesalesPlatform');
        const { sites } = this.state;
        const ifShowSites = platform && platform === 'SE' && sites.length > 0;
        const platformIdselect = salesPlatform.map((v, i) => <Option key={i} value={v.id}>{v.name}</Option>)
             return (
            <div className="newCluenk">
                <Form layout="inline">
                    <div className="content">
                        <Row>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout2}
                                          label="销售平台" className='ant-xs-row'
                                >
                                    {getFieldDecorator('modulesalesPlatform', {
                                            rules: [{required: false, message: '销售平台'}], initialValue: ''
                                        },
                                    )(
                                        <Select className='ant-xs-row' onSelect={this.handlePlatformSelect}>
                                            {platformIdselect}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        {
                            ifShowSites ? (
                                <Row>
                                    <Col span={24}>
                                        <FormItem {...this.formItemLayout2}
                                                  label="站点" className='ant-xs-row'
                                        >
                                            {getFieldDecorator('shopeeSites', {
                                                    initialValue: []
                                                },
                                            )(
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
                            <div className={ifShowSites ? 'add_all' : 'add_all orderconsignee-margintop20'}>
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
                                    <Table key={'data'}  columns={columns} dataSource={newdata2} bordered
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
export default Signadd