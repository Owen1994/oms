import React from 'react'
import {
    Modal,
    Form,
    Button,
    Select,
    message,
    Input
} from 'antd'
import { QUERY } from '../../../common/constants/Api'
import ItemSelect from '../../../../common/components/itemSelect'
import { fetchPost } from '../../../../util/fetch'
import { SAVE_OR_UPDATE_API, } from '../constants/Api'
import { RESET_IMG_LIST } from '../constants'
import ImgTypeTables from '../containers/ImgTypeTables'

const FormItem = Form.Item
const Option = Select.Option
class AddModal extends React.Component {

    state = {
        isSite: false,
        platformCode: '',
        siteCode: '',
        data: [],
        loading: false,
        imgTypes: [],
        // 不显示站点
        cancelSite: ["eBay", "LAZADA", "AMAZON"]
    }

    componentDidMount() {
        this.props.loadImgTypeList({
            data: {
                modelName: "pictureType"
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const imgTypes = nextProps.imgTypes || []
        const visible = nextProps.visible
        const prevVisible = this.props.visible
        const item = nextProps.item;
        if (visible && !prevVisible) {
            this.setState({
                isSite: false,
                platformCode: '',
                siteCode: '',
                loading: false,
                imgTypes
            })
            if (item && item.imgTypes) {
                this.setState({
                    data: [...item.imgTypes]
                })
            } else {
                this.setState({
                    data: [{ key: Date.now() }],
                })
            }
        } else if(!visible && prevVisible) {
            this.props.form.resetFields()
            this.props.updateImgTypeList(RESET_IMG_LIST, [{ key: Date.now() }])
        }
    }

    handlePlatformChange = (value, desc) => {
        this.setState({
            platformCode: value
        })
        this.props.form.setFieldsValue({
            siteCode: undefined,
            account: undefined
        })
        if (this.state.cancelSite.includes(value)) {
            this.setState({
                isSite: false
            })
            return;
        }
        const params = {
            data: {
                modelName: 'siteList',
                platformCode: value
            }
        }
        fetchPost(QUERY, params).then(result => {
            if (result.state === '000001') {
                if (result.data.list && result.data.list.length > 0) {
                    this.setState({
                        isSite: true
                    })
                } else {
                    this.setState({
                        isSite: false
                    })
                }
            }
        })
    }

    handleSiteChange = (value, desc) => {
        this.setState({
            siteCode: value
        })
        this.props.form.setFieldsValue({
            account: undefined
        })
    }
    handleOk = () => {
        const item = this.props.item
        if (!item) { // 新增
            return this.saveAddForm()
        }
        return this.saveEditForm()
    }

    saveAddForm = () => {
        this.props.form.validateFields((err, value) => {
            if (err) {
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                } catch (error) {
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            let list = this.props.imgTypeList
            let msg = this.isEmptyAndisSameTypeAndLevel(list)
            if (msg) return message.warning(msg)
            this.setState({ loading: true })
            var params = {
                ...value,
                modelName: 'pictureSetting',

            }
            if (!this.isEbayEmpty(list)) {
                params.imgTypes = list
            } else {
                params.imgTypes = []
            }
            fetchPost(SAVE_OR_UPDATE_API, { data: params }, 1)
                .then(result => {
                    this.setState({ loading: false })
                    if (result.state === '000001') {
                        this.props.handleSubmit()
                        this.props.onCancel()
                    }
                })
        })
    }

    saveEditForm = () => {
        const item = this.props.item
        this.props.form.validateFields((err, value) => {
            if (err) {
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                } catch (error) {
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            let list = this.props.imgTypeList;
            let msg = this.isEmptyAndisSameTypeAndLevel(list)
            if (msg) return message.warning(msg)
            this.setState({ loading: true })
            fetchPost(SAVE_OR_UPDATE_API, {
                data: {
                    id: item.id,
                    ...value,
                    modelName: 'pictureSetting',
                    imgTypes: list
                }
            }, 1)
                .then(result => {
                    this.setState({ loading: false })
                    if (result.state === '000001') {
                        this.props.handleSubmit()
                        this.props.onCancel()
                    }
                })
        })
    }
    isEbayEmpty = (list) => {
        let plactform = this.props.form.getFieldValue("platformCode")
        if (plactform === "eBay" && list.length === 1) {
            let { imgType, level, count } = list[0];
            if (!imgType && !level && !count) return true;
        }
        return false
    }
    isEmptyAndisSameTypeAndLevel = (list) => {
        if (this.isEbayEmpty(list)) return;
        let i = 0, l = list.length;
        for (; i < l; i++) {
            let { imgType, level, count } = list[i];
            if (!imgType) return "请填写完整图片类型项"
            if (!count) return "请填写完整取图数量项(需大于零)"
            if (!level) return "请填写完整优先级项"
            for (let j = i + 1; j < l; j++) {
                if (imgType === list[j].imgType || level === list[j].level) {
                    return "请勿设置相同的图片类型和优先级"
                }
            }
        }
    }
    handleCreateTopElement = () => {
        const {
            platformCode,
            siteCode
        } = this.state
        const accountParams = {
            data: {
                modelName: "accountList",
                account: "",
                pageData: 100,
                pageNumber: 1,
                platformCode
            }
        }
        if (siteCode) {
            accountParams.data.country = siteCode
        }
        if (!this.props.item) {
            return this.createAddTopElement(accountParams)
        }
        return this.createEditTopElement(accountParams)
    }
    createAddTopElement = (accountParams) => {
        const { getFieldDecorator } = this.props.form;
        const { isSite, platformCode, siteCode } = this.state
        const galleryImgs = this.props.galleryImgs
        return (
            <div>
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title list-filter-item-title_required">平台:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='platformCode'
                                url={QUERY}
                                onChange={this.handlePlatformChange}
                                params={{ data: { modelName: "platformList", name: "" } }}
                                rules={{
                                    rules: [{
                                        required: true, message: '请选择平台',
                                    }]
                                }}
                            />
                        </FormItem>
                    </div>
                </div>
                {isSite ?
                    <div className="list-filter-item margin-sm-bottom">
                        <div className="list-filter-item-title list-filter-item-title_required">站点:</div>
                        <div className="list-filter-input">
                            <FormItem>
                                <ItemSelect
                                    getFieldDecorator={getFieldDecorator}
                                    formName='siteCode'
                                    name="code"
                                    url={QUERY}
                                    onChange={this.handleSiteChange}
                                    params={{ data: { modelName: "siteList", name: "", platformCode } }}
                                />
                            </FormItem>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title list-filter-item-title_required">销售账号:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            <ItemSelect
                                searchColumn="account"
                                disabled={(!isSite && !platformCode) || (isSite && (!platformCode || !siteCode))}
                                getFieldDecorator={getFieldDecorator}
                                formName='account'
                                name="account"
                                code="account"
                                url={QUERY}
                                placeholder={"可输入账号搜索"}
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
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title"><span className="red">*</span>图库:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator('galleryCode', {
                                initialValue: "1",
                                rules: [{
                                    required: true, message: '请选择图库',
                                }],
                            })(
                                <Select
                                    showSearch
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
            </div>
        )
    }
    createEditTopElement = () => {
        const { getFieldDecorator } = this.props.form
        const item = this.props.item
        const galleryImgs = this.props.galleryImgs
        return (
            <div>
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title">平台:</div>
                    <div className="list-filter-input">
                        <Input readOnly value={item.platformName} />
                    </div>
                </div>
                {item.siteCode && item.siteCode !== "--" ?
                    <div className="list-filter-item margin-sm-bottom">
                        <div className="list-filter-item-title">站点:</div>
                        <div className="list-filter-input">
                            <Input readOnly value={item.siteName} />
                        </div>
                    </div>
                    :
                    null
                }
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title">销售账号:</div>
                    <div className="list-filter-input">
                        <Input readOnly value={item.account} />
                    </div>
                </div>
                <div className="list-filter-item margin-sm-bottom">
                    <div className="list-filter-item-title">图库:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator('galleryCode', {
                                initialValue: item.galleryCode,
                                rules: [{
                                    required: true, message: '请选择图库',
                                }],
                            })(
                                <Select
                                    showSearch
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
            </div>
        )
    }

    handleCreateBottomElement = () => {
        return (
            <div className="list-filter-item margin-ss-top">
                <div className="list-filter-item-title">图片类型:</div>
                <ImgTypeTables
                    imgTypes={this.state.imgTypes}
                    item={this.props.item}
                    visible={this.props.visible}
                />
            </div>
        )
    }


    render() {
        const loading = this.state.loading
        const { visible, onCancel, item } = this.props
        let title = ''
        if (item && item.id) {
            title = '修改'
        } else {
            title = '添加'
        }
        return (
            <Modal
                className="basicsetimgsetaddmodal"
                width={'800px'}
                title={title}
                visible={visible}
                onCancel={onCancel}
                maskClosable={false}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    {this.handleCreateTopElement()}
                    {this.handleCreateBottomElement()}
                </Form>
            </Modal>
        )
    }

}

export default Form.create()(AddModal)
