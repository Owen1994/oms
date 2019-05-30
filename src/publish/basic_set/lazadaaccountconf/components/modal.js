import React from 'react';
import { Row, Col, message, Modal, Form, Select, Button, Input, Radio, InputNumber } from "antd"
import {
    debounce
} from "util/baseTool";
import CSelect from '@/components/cselect';
import { parseStrToArray } from 'util/StrUtil';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};
const { TextArea } = Input;
const emailRegxp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/g;
class ImportCom extends React.Component {
    state = {
        current: 0,
        loading: false,
        file: null,
        platform: [
            { code: "LAZADA", name: "Lazada" },
            { code: "AMAZON", name: "Amazon" },
            { code: "SHOPEE", name: "Shopee" },
            { code: "EBAY", name: "eBay" },
        ],
        site: [],
        accounts: [],
        title: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible && !prevProps.visible) {
            const { setFieldsValue } = this.props.form;
            const modiferData = this.props.modiferData;
            if (modiferData) {
                this.setState({
                    accounts: [{account: modiferData.account}]
                }, () => {
                    setFieldsValue({
                        'platformCode': modiferData.platformCode,
                        'account': modiferData.account,
                        'paypalAccounts': modiferData.paypalAccounts ? modiferData.paypalAccounts.join('\n') : ''
                    });
                });
            }
        }
    }

    modalCancel = () => {
        this.resetCom()
        this.props.changeModal(false)
    }

    resetCom = () => {
        this.props.form.setFieldsValue({
            platformCode: undefined, 
            brand: undefined, 
            bannerImage: undefined ,
            yugou: undefined ,
            daysToShip: undefined 
            
        })
        this.clearSiteFn()
        this.clearAccountsFn()
    }

    testIsSearchAccounts = debounce((value) => {
        this.clearAccountsFn()
    }, 500)

    save = () => {
        let { saveAction, getList ,modiferData} = this.props;
        const { validateFields } = this.props.form;
        const platformCode = this.props.form.getFieldValue("platformCode")
        let fields = ['platformCode'];
        if (platformCode === 'EBAY') {
            fields = ['platformCode', 'account', 'paypalAccounts']
        } else if (platformCode === 'SHOPEE') {
            fields = ['platformCode', 'siteCode', 'account', 'brand', 'yugou', 'daysToShip']
        } else if (platformCode === 'AMAZON') {
            fields = ['platformCode', 'siteCode', 'account', 'brand']
        } else if (platformCode === 'LAZADA') {
            fields = ['platformCode', 'siteCode', 'account', 'brand']
        }
        validateFields(fields, (err, values) => {
            if (!err) {
                const data = {...values};
                if (modiferData && modiferData.id) {
                    data.id =  modiferData.id
                }
                if(data.paypalAccounts) {
                    data.paypalAccounts = parseStrToArray(data.paypalAccounts);
                    if (data.paypalAccounts.some((item) => !(new RegExp(emailRegxp).test(item)))) {
                        message.warning("paypal账号必须是email格式!");
                        return ;
                    }
                }
                data.modelName = "accountConfig"
                if(data.yugou !== undefined){
                    if(data.yugou === 0) {
                        data.daysToShip = 0
                    }else if(data.yugou === 1){
                        if(!data.daysToShip){
                            return message.warning("请输入预购时间")
                        }else if(data.daysToShip < 7 || data.daysToShip > 30){
                            return message.warning("请输入正确的预购时间")
                        }
                    }
                    delete data.yugou
                    delete data.bannerImage
                }else if(!data.bannerImage) {
                    data.bannerImage = ""
                }
                this.setState({loading: true});
                saveAction({ data })
                    .then(result => {
                        this.setState({loading: false});
                        if (result) {
                            message.success(result.msg)
                            this.modalCancel()
                            getList()
                        }
                });
            }
        });
        // var data = getFieldsValue()
        // data.brand = data.brand && data.brand.trim()
        // data.bannerImage = data.bannerImage && data.bannerImage.trim()
        // if (!data.siteCode) return message.warning("请选择站点")
        // if (!data.account) return message.warning("请选择销售账号")
        // if (!data.brand) return message.warning("请输入品牌名称")
        // if (data.brand.length > 32) return message.warning("品牌名称限制32个字符以内")        
    }

    getOption = () => {
        var { site, accounts } = this.state;
        site && site.length ? (this.siteOption.list = site) : (this.siteOption.list = [])
        accounts && accounts.length ? (this.accountsOption.list = accounts) : (this.accountsOption.list = [])
        return [
            this.siteOption,
            this.accountsOption
        ]
    }
    // 清除站点信息
    clearSiteFn = () => {
        this.props.form.setFieldsValue({ siteCode: undefined })
        this.setState({ site: [] })
    }
    // 清除账号信息
    clearAccountsFn = () => {
        // this.accountsOption.disabled = true
        this.props.form.setFieldsValue({ account: undefined })
        this.setState({ accounts: [] })
    }
    onPlatformSelect = () => {
        this.clearSiteFn()
        this.clearAccountsFn()
        this.siteOption.search()
    }

    accountsOption = {
        v: "account",
        n: "销售账号",
        // multiple:true,
        // disabled:true,
        onFocus: () => {
            var { accounts } = this.state
            // if(accounts && accounts.length) return ;
            this.accountsOption.search()
        },
        search: debounce((v) => {
            let { searchAccount } = this.props;
            var siteCode = this.props.form.getFieldValue("siteCode");
            var platformCode = this.props.form.getFieldValue("platformCode");
            if (!siteCode) return message.warning("请先选择站点");
            var params = {
                modelName: "accountList",
                pageData: 100,
                pageNumber: 1,
                platformCode,
                account: v,
                country: siteCode
            }
            return searchAccount(params)
                .then(result => {
                    if (result && result.length) {
                        this.setState({ accounts: result })
                    } else {
                        this.setState({ accounts: [] })
                    }
                })
        }, 500),
        getOption: (value) => {
            return value.map((v, k) => {
                return <Option value={v.account} key={v.account}>{v.account}</Option>
            })
        }
    }


    siteOption = {
        v: "siteCode",
        n: "站点",
        onFocus: () => {
            var { platform, site, accounts } = this.state
            if (site && site.length) return;
            this.siteOption.search()
        },
        onChange: (value) => {
            if (value) {
                this.testIsSearchAccounts(value)
            } else {
                this.clearAccountsFn()
            }
        },
        onSelect: (value) => {
            this.testIsSearchAccounts(value)
        },
        search: debounce((v) => {
            let { searchSite } = this.props
            var platformCode = this.props.form.getFieldValue("platformCode")
            var params = {
                pageData: 20,
                pageNumber: 1,
                modelName: "siteList",
                platformCode,
                name: v
            }
            return searchSite(params)
                .then(result => {
                    this.clearAccountsFn()
                    if (result && result.length) {
                        this.setState({ site: result })
                    } else {
                        this.setState({ site: [] })
                    }
                })
        }, 500),
        getOption: (value) => {
            return value.map((v, k) => {
                return <Option value={v.code} key={v.code}>{v.code}</Option>
            })
        }
    }

    createEbayComponent = (platformCode) => {
        const { getFieldDecorator } = this.props.form;
        const { modiferData } = this.props
        const { accounts } = this.state;
        return (
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label="销售账号"
                >
                    {getFieldDecorator("account", {
                        // initialValue: modiferData["account"] || undefined,
                        rules: [{
                            required: true, message: '请选择销售账号',
                        }]
                    })(
                        <CSelect
                            disabled={!!modiferData.platformCode}
                            list={ accounts }
                            style={{ width: "344px" }}
                            params={{
                                data: {
                                    searchColumn: 'account',
                                    modelName: "accountList",
                                    pageData: 100,
                                    pageNumber: 1,
                                    platformCode,
                                }
                            }}
                            code="account"
                            name="account"
                            placeholder={ "请输入搜索条件" }
                            url='/listing/base/ext/IListingExtInfoService/query'
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="PayPal账号"
                >
                    {getFieldDecorator('paypalAccounts', {
                        rules: [{
                            required: true, message: '请输入paypal账号',
                        }]
                    })(
                        <TextArea
                            placeholder="请输入paypal账号，多个换行隔开"
                            style={{ width: 344 }}
                            autosize={{ minRows: 2, maxRows: 6 }}
                        />
                    )}
                </FormItem>
            </React.Fragment>
        )
    }

    render() {
        const loading = this.state.loading;
        const { visible, changeModal, modiferData, title } = this.props
        const modalCancel = this.modalCancel;
        var { getFieldDecorator, getFieldsValue } = this.props.form;
        let { platformCode, yugou } = getFieldsValue(["platformCode", "yugou"]);
        // SHOPEE
        const option = this.getOption();
        if (platformCode === undefined && modiferData.platformCode) {
            platformCode = modiferData.platformCode
        }
        if (yugou === undefined && modiferData.daysToShip && modiferData.daysToShip >= 7) {
            yugou = 1
        }
        let date = null;
        if (platformCode && platformCode.toLowerCase() === 'ebay') {
            date = this.createEbayComponent(platformCode);
        } else {
            date = (
                <div className="publish-batch-advanced">
                    {
                        option.map((value, k) => {
                            let { n, v, getOption, search, disabled, placeholder, list, onSelect, onChange, multiple, onFocus } = value
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={n}                                
                                >
                                    {getFieldDecorator(v, {
                                        initialValue: modiferData[v] || undefined,
                                        rules: [{
                                            required: true, message: `请选择${n}`,
                                          }]
                                    })(
                                        <Select
                                            style={{ width: "344px" }}
                                            showSearch
                                            onFocus={onFocus || this.empty}
                                            onChange={onChange || this.empty}
                                            disabled={!!modiferData[v]}
                                            onSelect={onSelect || this.empty}
                                            mode={multiple ? "multiple" : null}
                                            placeholder={placeholder || "请输入搜索条件"}
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            allowClear
                                            onSearch={search || this.empty}
                                            notFoundContent={null}
                                            className="tweb-choice-select-v">
                                            {getOption(list)}
                                        </Select>
                                    )}
                                </FormItem>)
                        })
                    }
                    <FormItem
                        {...formItemLayout}
                        label="品牌"
                    >
                        {getFieldDecorator("brand", {
                            initialValue: modiferData.brand || undefined,
                            rules: [
                                { max: 32, message: "品牌名称限制32个字符以内" },
                                { required: true, message: '请输入品牌!'}
                            ]
                        })(
                            <Input style={{ width: "344px" }} />
                        )}
                    </FormItem>
                    {
                        platformCode !== "SHOPEE" ?
                            <FormItem
                                {...formItemLayout}
                                label="Banner"                                    
                            >
                                {getFieldDecorator("bannerImage", {
                                    initialValue: modiferData.bannerImage || undefined,
                                })(
                                    <Input style={{ width: "344px" }} />
                                )}
                            </FormItem>
                            :
                            <div>
                            <FormItem
                                {...formItemLayout}
                                label="预购"
                            >
                                {getFieldDecorator("yugou", {
                                    initialValue: yugou || 0,
                                    rules: [{
                                        required: true, message: '请选择是否预购!',
                                    }],
                                })(
                                    <RadioGroup>
                                        <Radio value={0}>No</Radio>
                                        <Radio value={1}>Yes</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                                {
                                    !yugou ?
                                        <div className="tweb-choice-select tweb-list-filter-item">
                                            <div className="tweb-choice-select-n tweb-list-filter-item-title top7" >
                                            </div>
                                            <FormItem>
                                                <p>我会在三天内发货（不包括公共假期和快递服务非工作日）</p>
                                            </FormItem>
                                        </div>
                                        :
                                        <Row type="flex" align="middle">
                                            <Col offset={6} span={18}>
                                                <span className="prefix margin-ss-right" style={{fontSize: 14}}>我会在</span>
                                                {getFieldDecorator("daysToShip", {
                                                    initialValue: modiferData.daysToShip || undefined,
                                                })(
                                                    <InputNumber
                                                        min={7}
                                                        max={30}
                                                        precision={0}
                                                        style={{ width: "100px" }} />
                                                )}
                                                <span className="suffix margin-ss-left" style={{fontSize: 14}}>天内发货（最少7天，最多30天）</span>
                                            </Col>
                                        </Row>
                                }
                            </div>
                    }
    
                </div>
            )    
        }
        let footer = (
            <div className="lazadaaccountconf-tablewrap-btns">
                <Button onClick={this.save} className="pull-right" type="primary" loading={loading}>
                    <span>保存</span>
                </Button>
                <Button onClick={modalCancel} className="pull-right margin-sm-right">
                    <span>取消</span>
                </Button>
            </div>
        )
        return (
            <Modal
                title={platformCode === 'EBAY' ? 'PayPal账号设置' : title}
                width={600}
                centered
                destroyOnClose
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={() => changeModal(false)}
                className="publish-batch-import">
                    <React.Fragment>
                        <FormItem
                            {...formItemLayout}
                            label="平台"
                        >
                            {getFieldDecorator("platformCode", {
                                initialValue: modiferData.platformCode || undefined,
                                rules: [{
                                    required: true, message: '请选择平台!',
                                }],
                            })(
                                <Select
                                    style={{ width: "344px" }}
                                    onSelect={this.onPlatformSelect}
                                    defaultActiveFirstOption={false}
                                    disabled={!!modiferData.platformCode}
                                    placeholder="请选择平台"
                                    showArrow={false}
                                    filterOption={false}
                                    notFoundContent={null}
                                    className="tweb-choice-select-v">
                                    {this.state.platform.map((v, k) => {
                                        return (<Option value={v.code} key={v.code}>{v.name}</Option>)
                                    })}
                                </Select>
                            )}
                        </FormItem>
                        {date}
                    </React.Fragment>
                </Modal>
        )
    }
}

export default Form.create()(ImportCom)