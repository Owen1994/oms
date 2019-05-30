import React from 'react'
import { 
    Modal, 
    Form, 
    Button, 
    Input,
    message,
} from 'antd'
import { QUERY } from '../../../common/constants/Api'
import ItemSelect from '../../../../common/components/itemSelect'
import { fetchPost } from '../../../../util/fetch'
import { SAVE_OR_UPDATE_API } from '../constants/Api'
const FormItem = Form.Item
/**
 *作者: huangjianfeng
 *功能描述:  标题设置增加、修改弹窗
 *时间: 2018/8/27 15:55
 */
class AddModal extends React.Component {

    state = {
        isSite: false,
        platformCode: '',
        siteCode: '',
        loading: false
    }

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible
        const prevVisible = this.props.visible
        if(visible && !prevVisible) {
            this.props.form.resetFields()
            this.setState({
                isSite: false,
                platformCode: '',
                siteCode: '',
                loading: false,        
            })
            const item = nextProps.item
            if(item) {
                setTimeout(() => {
                    this.props.form.setFieldsValue({
                        // platformCode: item.platformCode,
                        // siteCode: item.siteCode,
                        // account: item.account,
                        titlePrefix: item.titlePrefix,
                        titleSufix: item.titleSufix
                    })
                }, 500)
            }
        }
    }

    handlePlatformChange = (value, desc) => {
        this.setState({
            platformCode: value
        })
        this.props.form.setFieldsValue({
            siteCode: '',
            account: ''
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
                    this.setState({
                        isSite: true
                    });
                } else {
                    this.setState({
                        isSite: false
                    });
                }
            }
        })
    }

    handleSiteChange = (value, desc) => {
        this.setState({
            siteCode: value
        })
        this.props.form.setFieldsValue({
            account: ''
        })
    }
    handleOk = () => {
        const item = this.props.item
        if(!item){ // 新增
            return this.saveAddForm()
        }
        return this.saveEditForm()
    }

    saveAddForm = () => {
        this.props.form.validateFields((err, value) => {
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            value.titlePrefix = value.titlePrefix ? value.titlePrefix:""
            value.titleSufix = value.titleSufix ? value.titleSufix:""
            if(!value.titlePrefix && !value.titleSufix) return message.warning("标题前后缀不能都为空")
            this.setState({loading: true})
            fetchPost(SAVE_OR_UPDATE_API, {data: {
                ...value,
                modelName: 'titlePrefix',
                imgTypes: this.state.data
            }}, 1)
            .then(result => {
                this.setState({loading: false})
                if(result.state === '000001') {
                    this.props.handleSubmit()
                    this.props.onCancel()
                }
            })
        })
    }

    saveEditForm = () => {
        this.props.form.validateFields((err, value) => {
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            value.titlePrefix = value.titlePrefix ? value.titlePrefix:""
            value.titleSufix = value.titleSufix ? value.titleSufix:""
            if(!value.titlePrefix && !value.titleSufix) return message.warning("标题前后缀不能都为空")
            this.setState({loading: true})
            const item = this.props.item
            fetchPost(SAVE_OR_UPDATE_API, {data: {
                id: item.id,
                ...value,
                modelName: 'titlePrefix',
                imgTypeArray: this.state.data
            }}, 1)
            .then(result => {
                this.setState({loading: false})
                if(result.state === '000001') {
                    this.props.handleSubmit()
                    this.props.onCancel()
                }
            })    
        })
    }
    handleCreateTopElement = () => {
        const {
            platformCode, 
            siteCode
        } = this.state
        const accountParams = {
            data: {modelName: "accountList", account: "", platformCode}
        }
        if(siteCode) {
            accountParams.data.country = siteCode
        }
        return this.createTopElement(accountParams)
    }
    createSiteElement = (item, isSite) => {
        const { getFieldDecorator } = this.props.form
        const { platformCode } = this.state
        if(!item){
            if(isSite){
                return (
                    <div className="list-filter-item  margin-sm-bottom">
                        <div className="list-filter-item-title"><span className="red">* </span>站点:</div>
                        <div className="list-filter-input">
                            <FormItem>
                                <ItemSelect
                                    getFieldDecorator={getFieldDecorator}
                                    formName='siteCode'
                                    name="code"
                                    url={QUERY}
                                    onChange={this.handleSiteChange}
                                    params={{data: {modelName: "siteList", name: "", platformCode}}}
                                />
                            </FormItem>
                        </div>
                    </div>
                )
            }
            return null
        }
        return (
            <div className="list-filter-item  margin-sm-bottom">
                <div className="list-filter-item-title">站点:</div>
                <div className="list-filter-input">
                    <Input readOnly value={item.siteCode}/>
                </div>
            </div>
        )
        
    }
    createTopElement = (accountParams) => {
        const { getFieldDecorator } = this.props.form
        const {isSite, platformCode, siteCode} = this.state
        const item = this.props.item
        return (
            <div>
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title"><span className="red">* </span>平台:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {!item?
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
                            :
                            <Input readOnly value={item.platformName}/>
                            }
                        </FormItem>
                    </div>
                </div>
                {this.createSiteElement(item, isSite)}
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title"><span className="red">* </span>销售账号:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {!item?
                            <ItemSelect
                            searchColumn="account"
                            disabled={(!isSite&&!platformCode)||(isSite&&(!platformCode||!siteCode))}
                            getFieldDecorator={getFieldDecorator}
                            formName='account'
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
                        :
                        <Input readOnly value={item.account}/>
                        }
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title">标题前缀:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator('titlePrefix')(
                                <Input/>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title">标题后缀:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator('titleSufix')(
                                <Input/>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item">
                    <div className="list-filter-item-title"></div>
                    <div className="list-filter-input gray">
                            注：标题前后缀必填一个
                    </div>
                </div>
        </div>
        )
    }

    render(){
        const loading = this.state.loading
        const {visible, onCancel, item} = this.props
        let title = ''
        if(item&&item.id){
            title = '修改'
        } else {
            title = '添加'
        }
        return (
            <Modal
                width={'600px'}
                title={title}
                destroyOnClose
                visible={visible}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    {this.handleCreateTopElement()}
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(AddModal)