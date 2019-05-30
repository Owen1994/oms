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
import {datasaddkey} from '../../../util/baseTool';
import { fetchPost } from '@/util/fetch';
class Signselect extends Component {

    constructor(props) {
        super(props);
    }

    state={
        sites: [],
    }

    componentWillMount () {
        let id=this.props.tablemodel.selkey;
        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail`,{id:id})
        .then(response => {
            if (response.status == 200) {
                if(response.data.state=='000001'){
                    var arr=this.props.commonSelectData.salesPlatform||[];
                    var platform = response.data.data.addresseePlatform.platform;
                    for(var i=0;i<arr.length;i++){
                        if(platform==arr[i].id){
                            response.data.data.addresseePlatform.platform = arr[i].name;
                            break;
                        }
                    }
                    if (response.data.data.addresseePlatform.platform === 'shopee') {
                        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getPlatformSite', {platform: 'SE'}, 2)
                            .then(result => {
                                if(result.state === '000001'){
                                    this.setState({ sites: result.data });
                                }
                            })
                    } else {
                        this.setState({ sites: [] });
                    }
                    this.props.tablemodelaction3({data3: response.data.data,});
                }
            }
        }).catch(e => {
            console.log(e);
        })
    }

    columns= [{
        title: '收货人信息字段',
        className: '',
        dataIndex: 'addresseeValue',
        width: 100,
    },{
        title: '为空是否拦截',
        className: '',
        dataIndex: 'addresseeIsNull',
        width: 100,
        render: (text, record, index) => {
            var text=text
            if(text==1){
                text='是'
            }else{
                text='否'
            }
            return text
        }
    }]

    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
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
    *功能描述: 数据重置
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const columns = this.columns;
        const addresseeDetail = this.props.tablemodel3.data3.addresseeDetail;
        var newdatadetail=datasaddkey(addresseeDetail);
        const { sites } = this.state;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
             return (
            <div className="newCluenk">
                <Form layout="inline">
                    <div className="content">
                        <Row>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout}
                                    label="销售平台" className='ant-xs-row'
                                >
                                    {getFieldDecorator('platform', {
                                            rules: [{required: false, message: '请选择销售平台'}],initialValue: this.props.tablemodel3.data3.addresseePlatform.platform
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
                                        <FormItem {...this.formItemLayout}
                                            label="站点" className='ant-xs-row'
                                        >
                                            {getFieldDecorator('site', {
                                                initialValue: this.props.tablemodel3.data3.addresseePlatform.sites || []
                                            })(
                                                <Checkbox.Group disabled>
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
                                <div  className='add_tilis'> 
                                    <div className='tilis_lef'>
                                        请设置拦截字段：
                                    </div>
                                </div>
                                <div className='consigneeadd_table'>
                                    <Table key={'data'}  columns={columns} dataSource={newdatadetail} bordered
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