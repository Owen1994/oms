import React, {Component} from 'react' //在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {render} from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面上去
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
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
    Icon
} from 'antd'
const FormItem = Form.Item
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../../util/options';
import {platformsearchaction} from "../actions";
import {closehandle, selectValues,addQuotes} from '../../../util/baseTool';
import axios from "../../../util/axios";
class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state={

    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }
    handleChange=(value)=>{
        console.log(`selected ${value}`);
    }
    handleSubmit= (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        let shopAccountKeyWordname=this.props.form.getFieldValue('shopAccountKeyWordname');
        if(shopAccountKeyWordname===undefined||shopAccountKeyWordname==[""]){
            shopAccountKeyWordname=[];
        }else{
            shopAccountKeyWordname=shopAccountKeyWordname.split(',');
        }

        this.props.baseInfoForm({shopname:shopAccountKeyWordname});
        const newobj = {}
        newobj.pageData=20;
        newobj.pageNumber=1;
        newobj.lstShopAccount=shopAccountKeyWordname

        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    }
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
            <div className="newCluenk claimreporttop">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                        <Row>
                            <Col span={5}>
                                {<FormItem {...this.formItemLayout}
                                          label="销售账号" className='ant-xs-row'
                                >
                                    {getFieldDecorator('shopAccountKeyWordname', {
                                            rules: [{required: false, message: '请选择销售账号'}],
                                        },
                                    )(
                                        <Input readOnly placeholder={`请选择销售账号`}
                                               onClick={selectValues({
                                                   obj: this,
                                                   url: '/arm/motan/service/api/IArmService/searchMyShopAccount',
                                                   title: '销售账号',
                                                   name: 'shopAccountKeyWordname',
                                                   id: 'shopAccountKeyWordnameId',
                                                   type:'multiple',
                                                   num:10
                                               })}
                                               maxLength="100"/>

                                    )}
                                    {getFieldDecorator('shopAccountKeyWordnameId')(
                                        <Input readOnly maxLength="100" type="hidden"/>
                                    )}

                                    <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                        closehandle(e, this)
                                    }}/>
                                </FormItem>}
                            </Col>
                            <div className="typebtn" >
                            <Button type="primary" htmlType="submit" >
                                搜索
                            </Button>
                            </div>
                        </Row>

                    </div>
                </Form>
            </div>
        );
    }
}

export default Condition