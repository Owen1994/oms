/**
 * 作者: 陈林
 * 描述: 运输模板弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import { AutoComplete, Form, Select, Modal, Input, Icon, Button, InputNumber, Checkbox, message, Spin } from "antd";
import ItemSelect from '../../../../../common/components/itemSelect';
import * as types from '../../../../common/constants/actionTypes';
import {
    ADD_ORUPDATE_SHIPPING_PROFILE,
    GET_RETURN_TEMPLATE_DETAIL,
    GET_SHIPPING_PROFILE_DETAIL,
    GET_TRANSPORT_TEMPLATE,
} from '../../constants/TransportApi'
// import {
//     GET_DESCRIPTION_TEMPLATE
// } from '../../constants/DescribeApi'
import { parseOutTransportAddressFormParams } from '../../selector/OutTransportAddress'
import { fetchPost } from '../../../../../util/fetch'
import CSelect from '../../../../../components/cselect'
import LocalServiceContainer from '../../containers/localService'
import { parseShippingService } from '../../selector/index';
import { getFormatData, comparison } from "./comparison"
import '../../css/css.css'
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
class modal extends React.Component {
    state = {
        loading: false,
        taxidDisabled: false,
        tempId: '',
        modalIoading: true,
        plsProfileId: "",
        isUpdateData: false,
        // 用于判断是否改变
        formatData: {}
    };

    //选择站点

    handleChangesite = (value) => {
        const { site } = this.props;
        if (site) {
            confirm({
                title: '提示',
                content: '切换站点会移除一部分关联站点的数据，是否确认清楚？',
                onOk: () => {
                    const { setFieldsValue, getFieldsValue } = this.props.form
                    const { saleAccount, profileName, country, city, zip } = getFieldsValue([
                        'profileName',
                        "country",
                        "city",
                        "zip",
                        "saleAccount"
                    ])
                    this.changeSiteHandle()
                        .then(r => {
                            this.props.resetRetSite({ value, key: 'site' })
                            setFieldsValue({
                                saleAccount,
                                site: value,
                                profileName,
                                country,
                                city,
                                zip
                            });
                        })
                },
                onCancel: () => {
                    this.props.resetRetSite({ value: site, key: 'site' })
                    this.props.form.setFieldsValue({ site });
                },
            });
        } else {
            this.props.resetRetSite({ value, key: 'site' })
            this.props.form.setFieldsValue({ "salestax[taxId]": "" });
        }

    }

    changeSiteHandle = () => {
        return new Promise((resolve, reject) => {
            const { resetFields } = this.props.form;
            resetFields()
            this.props.resetdatalist()
            this.props.resetFormDatalist()
            resolve()
        })
    }

    //打开时初始化弹窗
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.resetForm()
        }
        if (nextProps.visible &&
            nextProps.item &&
            nextProps.item._isRepalceTemp &&
            nextProps.item.copyPlsProfileId !== this.props.item.copyPlsProfileId
        ) {
            if (nextProps.item.copyPlsProfileId) {
                this.getDetail(nextProps.item)
            }
        }
        if (nextProps.visible &&
            !this.props.visible &&
            nextProps.item &&
            !nextProps.item._isRepalceTemp &&
            nextProps.item.plsProfileId
        ) {
            if (nextProps.item.plsProfileId) {
                this.getDetail(nextProps.item)
            }
        }
    }

    resetForm = () => {
        const { resetFields } = this.props.form;
        resetFields()
        this.props.resetdatalist()
        this.props.resetFormDatalist()
        this.props.resetRetSite({ value: "", key: 'site' })
        this.setState({
            modalIoading: false
        })
    }

    getDetail = (params) => {
        const { _isRepalceTemp, _unchanged } = params;
        const { getFieldsValue } = this.props.form;
        let repalceTempdata = {};
        if (_isRepalceTemp) {
            repalceTempdata = getFieldsValue([
                'copyTemplate',
                'saleAccount',
                'site',
                'profileName'
            ])
        }
        this.resetForm()
        this.setState({
            modalIoading: true
        })
        fetchPost(GET_SHIPPING_PROFILE_DETAIL, {
            plsProfileId:_isRepalceTemp ? params.copyPlsProfileId : params.plsProfileId,
            profileId: params.profileId,
            site: params.site,
            sellerId: params.sellerId
        }, 2).then(res => {
            if (res && res.state === "000001") {
                if (_unchanged) {
                    let formatData = getFormatData(res.data[0]);
                    this.setState({
                        formatData
                    })
                }
                this.props.form.setFieldsValue({
                    "salestax[taxId]": res.data[0].salestax.taxId,
                    "dispatchTimeMax": res.data[0].dispatchTimeMax,
                    ...repalceTempdata
                })
                this.props.initiFormDatalist({ data: res.data[0] });
                this.props.resetInitidatalist({
                    domesticShippingPolicyInfoServiceArr: res.data[0].domesticShippingPolicyInfoServiceArrVO,
                    intlShippingPolicyInfoServiceArr: res.data[0].intlShippingPolicyInfoServiceArrVO
                });
                let data = {};
                if (res.data[0].site) {
                    data.site = res.data[0].site.id;
                }
                data.shipToLocationsType = res.data[0].shipToLocationsType || '0';
                data.domesticShippingType = res.data[0].domesticShippingType;
                data.intlShippingType = res.data[0].intlShippingType;
                this.props.resetRetSite({ data });
                this.setState({
                    plsProfileId:_isRepalceTemp ? params.plsProfileId : res.data[0].plsProfileId,
                    modalIoading: false
                })
            }
        });
    }

    checkedTemp = (value, option) => {
        const { setFieldsValue } = this.props.form;
        const { site } = this.props;
        const { _isAdd, plsProfileId } = this.props.item;
        if (plsProfileId === value) {
            setFieldsValue({
                copyTemplate: undefined
            })
            return message.warning("相同模板不可复制");
        }
        confirm({
            title: '提示',
            content: '是否确认要使用选中模板填充当前模板？',
            onOk: () => {
                this.props.toggleTemp({
                    _isRepalceTemp: true,
                    plsProfileId: plsProfileId,
                    copyPlsProfileId: value,
                    _isAdd,
                    site
                })
            },
            onCancel: () => {
                setFieldsValue({
                    copyTemplate: undefined
                })
            },
        });

    }

    //弹窗提交
    handleOk = () => {
        const { formatData } = this.state;
        const { _unchanged } = this.props.item;
        this.props.form.validateFieldsAndScroll((err, values) => {
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
            if (!err) {
                this.setState({
                    loading: true
                });
                let plsProfileId;
                if (this.props.item) {
                    // plsProfileId = this.props.item.plsProfileId;
                    plsProfileId = this.state.plsProfileId;
                }
                if (values.domesticShippingType === "0") {
                    message.warning('请选择本地运输');
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        })
                    }, 500)
                    return;
                }
                const params = { ...values };
                params.plsProfileId = plsProfileId;
                let flag = false;
                if (/(Flat)|(Calculated)/.test(values.domesticShippingType)) {
                    params.domesticShippingPolicyInfoServiceArr = parseShippingService(this.props.serviceData.domesticShippingPolicyInfoServiceArr);
                    //本地运输判断必填项
                    if (values.domesticShippingType === "Flat") {
                        params.domesticShippingPolicyInfoServiceArr.forEach(item => {
                            if (item.shippingService === null || item.shippingService === undefined || item.shippingService === "") {
                                message.warning("请选择服务");
                                flag = true
                                return false
                            }
                            if (item.shippingServiceCost === null || item.shippingServiceCost === undefined || item.shippingServiceCost === "") {
                                message.warning("请填写费用");
                                flag = true
                                return false
                            }
                            if (item.shippingServiceAdditionalCost === null || item.shippingServiceAdditionalCost === undefined || item.shippingServiceAdditionalCost === "") {
                                message.warning("请填写每加一件");
                                flag = true
                                return false
                            }
                        })
                    } else if (values.domesticShippingType === "Calculated") {
                        params.domesticShippingPolicyInfoServiceArr.forEach(item => {
                            if (item.shippingService === null || item.shippingService === undefined || item.shippingService === "") {
                                message.warning("请选择服务");
                                flag = true
                                return false
                            }
                        })
                    }
                    if (flag) {
                        this.setState({
                            loading: false
                        });
                        return;
                    }
                }
                if (/(Flat)|(Calculated)/.test(values.intlShippingType)) {
                    params.intlShippingPolicyInfoServiceArr = parseShippingService(this.props.serviceData.intlShippingPolicyInfoServiceArr);
                    //全球运输
                    //组合常用地址字段
                    params.intlShippingPolicyInfoServiceArr.map((it, index) => {
                        let newArr = [];
                        if (it.shipToLocationType === '1') {
                            if (params[`usualAddressArr${index}`]) {
                                params[`usualAddressArr${index}`].map((newIt, newIndex) => {
                                    let newObj = { 'locationCode': newIt };
                                    newArr.push(newObj);
                                })
                            }
                        }
                        it.shipToLocationsArr = newArr;

                    })
                    if (values.intlShippingType === "Flat") {
                        params.intlShippingPolicyInfoServiceArr.forEach(item => {
                            if (item.shipToLocationType === null || item.shipToLocationType === undefined || item.shipToLocationType === "") {
                                message.warning("请选择收货地点");
                                flag = true
                                return false
                            }
                            if (item.shippingService === null || item.shippingService === undefined || item.shippingService === "") {
                                message.warning("请选择服务");
                                flag = true
                                return false
                            }
                            if (item.shippingServiceCost === null || item.shippingServiceCost === undefined || item.shippingServiceCost === "") {
                                message.warning("请填写费用");
                                flag = true
                                return false
                            }
                            if (item.shippingServiceAdditionalCost === null || item.shippingServiceAdditionalCost === undefined || item.shippingServiceAdditionalCost === "") {
                                message.warning("请填写每加一件");
                                flag = true
                                return false
                            }
                        })
                    } else if (values.intlShippingType === "Calculated") {
                        params.intlShippingPolicyInfoServiceArr.forEach(item => {
                            if (item.shipToLocationType === null || item.shipToLocationType === undefined || item.shipToLocationType === "") {
                                message.warning("请选择收货地点");
                                flag = true
                                return false
                            }
                            if (item.shippingService === null || item.shippingService === undefined || item.shippingService === "") {
                                message.warning("请选择服务");
                                flag = true
                                return false
                            }
                        })
                    }
                    if (flag) {
                        this.setState({
                            loading: false
                        });
                        return;
                    }

                    if (values.shipToLocationsArr) {
                        values.shipToLocationsArr = values.shipToLocationsArr.map(v => {
                            return { locationCode: v }
                        })
                        params.shipToLocationsArr = values.shipToLocationsArr
                    }
                    params.excludeShipToLocationArr = parseOutTransportAddressFormParams(this.props.outTransportAddress);
                }
                if (!params.packagingHandlingCosts) {
                    params.packagingHandlingCosts = null;
                }
                if (!params.internationalPackagingHandlingCosts) {
                    params.internationalPackagingHandlingCosts = null;
                }
                if (_unchanged) {
                    const isUnchanged = comparison(params, formatData)
                    if (!isUnchanged) {
                        // isUpdateData  是否有修改数据    1：是  0: 否
                        params.isUpdateData = 1
                        this.setState({
                            isUpdateData: true
                        })
                    }
                }


                fetchPost(ADD_ORUPDATE_SHIPPING_PROFILE, params, 1).then(res => {
                    if (res && res.state === "000001") {
                        this.props.getReturnValue && this.props.getReturnValue(res.data)
                        this.onCancel();
                        this.props.form.resetFields();
                        if (this.props.onSearch) {
                            this.props.onSearch();
                        }
                        this.props.resetServiveItem({ key: 'domesticShippingPolicyInfoServiceArr' })
                        this.props.resetServiveItem({ key: 'intlShippingPolicyInfoServiceArr' })
                        this.props.resetServiveItem({ state: [] });
                        this.setState({
                            loading: false
                        });
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        });
    }

    onCancel = () => {
        this.setState({
            plsProfileId: "",
            formatData: {}
        })
        this.props.onCancel();
    }

    handleTaxid = (value) => {
        if (value) {
            this.setState({
                taxidDisabled: true
            })
        }
    }

    render() {
        const { visible, isCopy } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const loading = this.state.loading;
        const { taxidDisabled, modalIoading } = this.state;
        const { formDataList, site } = this.props;
        const { salestax, saleAccount } = this.props.form.getFieldsValue(['salestax[taxId]', "saleAccount"]);
        const { _isRepalceTemp, _isAdd } = this.props.item;
        let title;
        if (_isAdd) {
            title = "新增"
        } else {
            title = "编辑"
        }
        let copyParams = { 'pageData': 20, 'pageNumber': 1, searchColumn: 'templateName', site: [site] };
        if (saleAccount) {
            copyParams.saleAccount = [saleAccount]
        }
        return (
            <div>
                <Modal {...this.props}
                    title={title}
                    visible={visible}
                    destroyOnClose={true}
                    maskClosable={false}
                    onCancel={this.onCancel}
                    className="ebay-tpe-modal publish-template-transport"
                    footer={[
                        <Button key="cancel" onClick={this.onCancel}>取消</Button>,
                        <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                    ]}
                >
                    <Form>
                        <Spin spinning={modalIoading ? true : false} delay={500} tip="Loading...">
                            <div className="product-description">
                                <div className="list-filter-item">
                                    <div className="list-filter-item-title list-filter-item-title_required">站点:</div>
                                    <div className="list-filter-input">
                                        <FormItem>
                                            <ItemSelect
                                                getFieldDecorator={getFieldDecorator}
                                                formName='site'
                                                name="name"
                                                code="id"
                                                disabled={_isAdd ? false : true}
                                                searchColumn="site"
                                                params={{ 'pageData': 20, 'pageNumber': 1 }}
                                                url={types.PUBLISH_EBAYSITE}
                                                onChange={this.handleChangesite}
                                                dValue={[formDataList.site.id]}
                                                dName={[formDataList.site.name]}
                                                placeholder={"请选择站点"}
                                                rules={{
                                                    initialValue: _isRepalceTemp ? undefined : formDataList.site.id ? formDataList.site.id : undefined,
                                                    rules: [{
                                                        required: true, message: '请选择站点',
                                                    }],
                                                }}
                                                apiListType={2}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title list-filter-item-title_required">销售账号:</div>
                                    <div className="list-filter-input">
                                        <FormItem>
                                            <ItemSelect
                                                getFieldDecorator={getFieldDecorator}
                                                formName='saleAccount'
                                                name="id"
                                                code="id"
                                                disabled={_isAdd ? false : true}
                                                searchColumn="saleAccount"
                                                params={{ 'pageData': 20, 'pageNumber': 1 }}
                                                dValue={formDataList.saleAccount}
                                                dName={formDataList.saleAccount}
                                                url={types.PUBLISH_EBAYACCOUNT}
                                                placeholder={"请选择销售账号"}
                                                rules={{
                                                    initialValue: _isRepalceTemp ? undefined : formDataList.saleAccount ? formDataList.saleAccount : undefined,
                                                    rules: [{
                                                        required: true, message: '请选择销售账号',
                                                    }],
                                                }}
                                                apiListType={2}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title list-filter-item-title_required">模板名称:</div>
                                    <div className="list-filter-input">
                                        <FormItem>
                                            {getFieldDecorator('profileName', {
                                                initialValue: _isRepalceTemp ? undefined : formDataList.profileName,
                                                rules: [{
                                                    required: true, message: '请填写模板名称',
                                                }]
                                            })(
                                                <Input
                                                    // placeholder="模板名称"
                                                    style={{ width: 330 }}
                                                    maxLength="60"
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                {
                                    isCopy ?
                                        (
                                            <div className="list-filter-item margin-sm-top">
                                                <div className="list-filter-item-title">复制模板:</div>
                                                <div className="list-filter-input">
                                                    <FormItem>
                                                        {getFieldDecorator('copyTemplate')(
                                                            <CSelect
                                                                disabled={site ? false : true}
                                                                isNotCache  // 默认有初始数据缓存 为true时不用缓存
                                                                name="name"
                                                                code="plsProfileId"
                                                                url={GET_TRANSPORT_TEMPLATE}
                                                                placeholder={"复制模板为可选项"}
                                                                // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                                                params={copyParams}
                                                                apiListType={1}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                                                //其它字段同 Select组件配置
                                                                handleFilter={this.handleFilter} // 搜索结果过滤
                                                                onChange={this.checkedTemp}
                                                            />
                                                        )}

                                                    </FormItem>
                                                </div>
                                            </div>
                                        )
                                        : null
                                }
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title">国家:</div>
                                    <div className="list-filter-input">
                                        <FormItem>
                                            <ItemSelect
                                                getFieldDecorator={getFieldDecorator}
                                                formName='country'
                                                name="name"
                                                code="id"
                                                searchColumn="country"
                                                params={{ 'pageData': 20, 'pageNumber': 1 }}
                                                url={types.PUBLISH_COUNTRIES}
                                                dValue={formDataList.country.id}
                                                dName={formDataList.country.name}
                                                placeholder={"请选择国家"}
                                                allowClear
                                                rules={{
                                                    initialValue: formDataList.country.id ? formDataList.country.id : undefined,
                                                    // rules: [{
                                                    //     required: true, message: '请选择国家',
                                                    // }],
                                                }}
                                                apiListType={2}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title">City,State:</div>
                                    <div className="list-filter-input">
                                        <FormItem>
                                            {getFieldDecorator('city', {
                                                initialValue: formDataList.city,
                                                // rules: [{
                                                //     required: true, message: '请填写City,State',
                                                // }]
                                            })(
                                                <Input
                                                    // placeholder="City,State"
                                                    style={{ width: 330 }}
                                                    maxLength="50"
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title">邮编:</div>
                                    <div className="list-filter-input">
                                        <FormItem>
                                            {getFieldDecorator('zip', {
                                                initialValue: formDataList.zip,
                                            })(
                                                <Input
                                                    // placeholder="邮编:"
                                                    style={{ width: 330 }}
                                                    maxLength="50"
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title">销售税:</div>
                                    <div className="list-filter-input list-filter-flex">
                                        <FormItem className="publish-template-transport-salestax">
                                            <ItemSelect
                                                disabled={site ? false : true}
                                                getFieldDecorator={getFieldDecorator}
                                                formName='salestax[taxId]'
                                                name="name"
                                                code="id"
                                                searchColumn="salestax[taxId]"
                                                params={{ "site": site }}
                                                url={types.PUBLISH_SELLING_TAX}
                                                dValue={[formDataList.salestax.taxId]}
                                                dName={[formDataList.salestax.taxName]}
                                                placeholder="销售税"
                                                onChange={this.handleTaxid}
                                                apiListType={2}
                                                rules={{
                                                    initialValue: formDataList.salestax.taxId ? formDataList.salestax.taxId : undefined,
                                                }}
                                            />
                                        </FormItem>
                                        <FormItem className="margin-sm-left">
                                            {getFieldDecorator(`salestax[rate]`, {
                                                initialValue: formDataList.salestax.rate,
                                            })(
                                                <InputNumber className="rate"
                                                    disabled={taxidDisabled || formDataList.salestax.taxId ? false : true}
                                                    min={0} max={100} />
                                            )}
                                        </FormItem>
                                        <span className="percent margin-ss-left">%</span>
                                    </div>
                                    <div>
                                        <FormItem>
                                            {getFieldDecorator(`salestax[shippingIncludedInTax]`, {
                                                initialValue: formDataList.salestax.shippingIncludedInTax
                                            })(
                                                <Checkbox
                                                    checked={getFieldValue(`salestax[shippingIncludedInTax]`)}
                                                >Also apply to shipping and handing costs</Checkbox>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <LocalServiceContainer
                                    {...this.props}
                                />
                            </div>
                        </Spin>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)