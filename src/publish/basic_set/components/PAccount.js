import React from 'react'
import ItemSelect from '../../../common/components/itemSelect'
import PropTypes from 'prop-types'
import { QUERY } from '../../common/constants/Api'
import { fetchPost } from '../../../util/fetch'
import { 
    Form, 
} from 'antd'
const FormItem = Form.Item

/**
 * @author 黄建峰
 * @description 平台、站点、账号
 */
export default class PSAccount extends React.Component {
    state = {
        platformCode: '',   // 平台编码
        // siteCode: ''       // 站点编码
    }

    render(){
        const { getFieldDecorator } = this.props.form
        const {isSite, platformCode, siteCode} = this.state
        const accountParams = {
            data: {modelName: "accountList", account: ""}
        }
        if(platformCode){
            accountParams.data.platformCode = platformCode
        }
        // if(siteCode) {
        //     accountParams.data.country = siteCode
        // }
        return (
            <div>
                <div className="list-filter-item  margin-ss-bottom">
                    <div className="list-filter-item-title">平台:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='platformCode'
                                url={QUERY}
                                onChange={this.handlePlatformChange}
                                params={{data: {modelName: "platformList", name: ""}}}
                                rules={{
                                    rules: [{
                                        required: true, message: '请选择平台',
                                    }]
                                }}
                            />
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item  margin-ss-bottom">
                    <div className="list-filter-item-title">销售账号:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            <ItemSelect
                                {...this.props.accountConfig}
                                searchColumn="account"
                                disabled={!platformCode}
                                getFieldDecorator={getFieldDecorator}
                                name="account"
                                code="account"
                                url={QUERY}
                                params={accountParams}
                                rules={{
                                    rules: [{
                                        required: true, message: '请选择销售账号',
                                    }]
                                }}
                            />
                        </FormItem>
                    </div>
                </div>
            </div>
        )
    }
    resetState = ()=>{
        this.setState({
            platformCode:""
        })
    }
    /**
     * 平台选择监听
     */
    handlePlatformChange = (value, desc) => {
        // debugger
        this.setState({
            platformCode: value
        })
        const mode = this.props.accountConfig.mode
        this.props.form.setFieldsValue({
            // siteCode: '',
            accounts: mode==='multiple'?[]:undefined
        })
        const params = {
            data: {
                modelName: 'siteList',
                platformCode: value
            }
        }
        fetchPost(QUERY, params).then(result => {
            if(result.state === '000001') {
                if(result.data.list && result.data.list.length > 0) {
                }
            }
        })
    }
}

PSAccount.propTypes = {
    accountConfig: PropTypes.object.isRequired
}