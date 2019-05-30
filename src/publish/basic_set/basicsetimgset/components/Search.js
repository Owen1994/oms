import React from 'react'
import { Form, Button, Select,message } from 'antd'
import PAccount from '../../components/PAccount'
const FormItem = Form.Item
const Option = Select.Option

/**
 *作者: huangjianfeng
 *功能描述:  图库设置搜索
 *时间: 2018/8/27 15:55
 */
export default class Search extends React.Component {

    handleSubmit = () => {
        this.props.handleSubmit(1)
    }

    handleReset = () => {
        this.props.form.resetFields()
        if(this.refs.paccount){
            this.refs.paccount.resetState()
        }
    }

    limitSelectedAccounts = {
        value:null,
        length:10,
    }
    render(){
        const galleryImgs = this.props.galleryImgs
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <div className="search breadcrumb padding-sm overflow-hidden">
                    <div className="margin-ss-top">
                        <PAccount 
                            ref="paccount"
                            {...this.props}
                            accountConfig={{
                                maxCount: 10,
                                mode: 'multiple',
                                formName: 'accounts'
                            }}
                        />
                    <div className="list-filter-item">
                        <div className="list-filter-item-title">图库:</div>
                        <div className="list-filter-input">
                            <FormItem>
                            {getFieldDecorator('galleryCodes')(
                                    <Select
                                        showSearch 
                                        allowClear
                                        mode="multiple"
                                        
                                        onChange={(value)=>{
                                            if(value && (value.length>this.limitSelectedAccounts.length)){
                                                let index = value.indexOf(this.limitSelectedAccounts.value)
                                                value.splice(index,1)
                                                return message.warning("图库最多可以选择10个")
                                            }
                                        }}
                                        onSelect={(value)=>{
                                            this.limitSelectedAccounts.value = value
                                        }}
                                        filterOption={(inputValue, option) => {
                                            let regExp = new RegExp(inputValue, 'gi');
                                            return regExp.test(option.props.children);                        
                                        }}
                                    >
                                        {galleryImgs.list.map(item => (
                                            <Option value={item.code} key={item.code}>{item.name}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                    </div>
                        <div className="margin-sm"  style={{marginLeft:"341px"}}>
                            <Button className="margin-sm-right" type="primary" onClick={this.handleSubmit}>搜索</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}