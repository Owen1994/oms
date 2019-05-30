import React from 'react'
import { Form, Button } from 'antd'
import PSAccount from '../../components/PSAccount'

/**
 *作者: huangjianfeng
 *功能描述:  搜索
 *时间: 2018/8/27 15:55
 */
export default class Search extends React.Component {

    handleReset = () => {
        const psa = this.refs.PSAccount;
        if(psa){
            psa.resetState()
        }
        this.props.form.resetFields()
    }

    render(){
        return (
            <Form>
                <div className="search breadcrumb padding-sm overflow-hidden">
                    <div className="margin-ss-top">
                        <PSAccount 
                            ref={"PSAccount"}
                            {...this.props}
                            accountConfig={{
                                maxCount: 10,
                                mode: 'multiple',
                                formName: 'accounts'
                            }}
                        />
                        <div className="margin-sm"  style={{marginLeft:"341px"}}>
                            <Button className="margin-sm-right" type="primary" onClick={this.props.handleSubmit}>搜索</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}