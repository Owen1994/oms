/**
 * 作者: pzt
 * 描述: 速卖通条件查询组件
 * 时间: 2018/4/18 20:23
 **/
import React, { Component } from 'react'
import Ctags from '@/components/ctags'
import CSelect from '@/components/cselect';
import { authState, tokenState } from '../constants/index'
import { joomSellerId } from '../constants/Api'
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Tag
} from 'antd'
const FormItem = Form.Item;

class Condition extends Component {
    constructor(props) {
        super(props);
    }

    getList = () => {
        const {
            getList,
            getParams
        } = this.props;
        let value = getParams()
        value.pageNumber = 1 ;
        getList(value)
    }

    reset = ()=>{
        this.props.form.resetFields()
    }

    formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
    };
    render() {

        const { formItemLayout } = this;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let authorizationStatus = getFieldValue("authorizationStatus")
        if (authorizationStatus) {
            authorizationStatus = authorizationStatus.toString()
        }

        return (
            <div className="search breadcrumb overflow-hidden padding-ss">
                <div>
                    <FormItem
                        style={{ width: '100%' }}
                        {...formItemLayout}
                        label="授权状态"
                    >
                        {getFieldDecorator('authorizationStatus', {
                            initialValue: [0]
                        })(
                            <Ctags
                                list={authState}
                                handleChange={this.getList}
                            />
                        )}
                    </FormItem>
                    {
                        !!authorizationStatus && authorizationStatus === "2" ?
                            null
                            :
                            <FormItem
                                style={{ width: '100%' }}
                                {...formItemLayout}
                                label="token状态"
                            >
                                {getFieldDecorator('tokenStatus', {
                                    initialValue: [0]
                                })(
                                    <Ctags
                                        list={tokenState}
                                        handleChange={this.getList}
                                    />
                                )}
                            </FormItem>
                    }
                    <Row>
                        <Col span={2} className="ant-form-item-label">
                            <label>店铺账号</label>
                        </Col>
                        <Col>
                            <FormItem style={{ width: '330px' }} className="display-inline-block">
                                {
                                    getFieldDecorator('account')(
                                        <CSelect
                                            code='key' // 列表编码字段
                                            name='label' // 列表名称字段
                                            url={joomSellerId}
                                            placeholder="请输入店铺账号名称"
                                            formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                            params={{ data: { searchColumn: 'name', pageData: 20, pageNumber: 1 } }} // 搜索参数
                                            // apiListType={1}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder={'请选择'}
                                        />
                                    )
                                }
                            </FormItem>
                            <span className="joom-auth-search-btn">
                                <Button className="margin-sm-left" onClick={this.getList} type="primary">搜索</Button>
                                <Button onClick={this.reset} className="margin-sm-left">重置</Button>
                            </span>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Condition