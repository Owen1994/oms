/**
 * 作者: pzt
 * 描述: 搜索条件（分摊费用、运营费用、刊登费用、头程费用）
 * 时间: 2018/10/26 14:59
 **/
import React from 'react'
import {Form,Row,Col,Input,Button} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import CSelect from '../../../../../components/cselect'
import {GET_PLATFORM} from '../../constants/Api'

export default class Search extends React.Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        const {handleSubmit, handleReset, active} = this.props;
        const formItemLayout = {
            labelCol: {
                sm: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 18 },
            },
        };
        return (
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col span={7}>
                        <FormItem
                            {...formItemLayout}
                            label="平台"
                        >
                            {getFieldDecorator('data[platformCode]')(
                                <CSelect
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={GET_PLATFORM}
                                    params={{searchColumn: 'name'}} // 搜索参数
                                    placeholder={"请选择平台"}
                                    // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    //其它字段同 Select组件配置
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7} className={"text-left"} style={{paddingTop: 4}}>
                        <Button htmlType={"submit"} type={"default"}>搜索</Button>
                        <Button
                            type={"default"}
                            className={"margin-ms-left"}
                            onClick={handleReset}
                        >重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
