import React from 'react'
import {
    Form,
    Select,
    Input,
    Button,
    Modal,
    Row,
    Col,
    message,
    Cascader,
    Tooltip,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow/index'
import { strTrim } from '../../../../../util/baseTool'
import { post } from '../../../../../util/axios'
import {
    LISTING_DETAIL_SEARCH_CLASS,
} from "../../constants/api";
import {
    PUBLISH_EBAYCLASS,
    PUBLISH_GETCTGSPEC,
} from '../../../../common/constants/actionTypes'
import { categoryFocus } from '../../selector/index'
import * as types from '../../constants/reducerTypes'
import { fetchPost } from "../../../../../util/fetch";

export default class EbayCategory extends React.Component {
    state = {
        category1: '',
        category2: '',
        searchClassRst: [],    // ebay搜索结果
        selectedItem: [],    // ebay搜索选中项
        whichClass: "",       // 是ebayClass1 还是ebayClass2
        prevClassRst: [],       // 搜索分类结果
        lastCategoryId: '',    // 叶子节点ID
    };

    toggleModal = (obj, type) => {
        if (type === "search") {
            const { getFieldValue } = this.props.form;
            let site = getFieldValue("basicData[site]");
            site = site ? strTrim(site) : "";
            if (site === "") {
                message.info("请先选择站点");
                return
            }
        }
        this.setState(obj);
    }

    // 分类搜索
    searchClass = () => {
        const { getFieldValue } = this.props.form;
        let params = {};
        let site = getFieldValue("basicData[site]");
        let searchConent = getFieldValue("searchSku");
        if (site !== "") {
            if (!searchConent) {
                return message.info("请输入Sku!")
            }
            params["site"] = site;
            params["searchConent"] = searchConent;
            post(LISTING_DETAIL_SEARCH_CLASS, params).then(res => {
                if (res && res.state === "000001") {
                    let data = res.data;
                    let arr = []
                    data.forEach(v => {
                        arr.push(categoryFocus(v));
                    });
                    this.setState({
                        prevClassRst: data,
                        searchClassRst: arr
                    })
                }
            })
        } else {
            message.info("请先选择站点")
        }
    }
    // 选中分类搜索项
    selectedClass = (item, index) => {
        this.setState({
            selected: index,
            selectedItem: item,
        })
    }

    handleOk = () => {
        let category;
        const { whichClass, selectedItem, selected, prevClassRst } = this.state;
        const { getFieldValue } = this.props.form;
        if (selectedItem.length <= 0) {
            message.info("请选择搜索后的分类");
            return
        }
        if (whichClass === "ebayClass1") {
            category = "category1"
            this.props.searchClassAction({
                way: 'skuSearch1',
                value: [prevClassRst[selected]]
            })
            let params = {};
            params["categoryId"] = selectedItem[selectedItem.length - 1][0].id;
            params['site'] = getFieldValue("basicData[site]");
            post(PUBLISH_GETCTGSPEC, params).then(res => {
                if (res && res.state === "000001") {
                    this.props.editProductAttrAction(types.ADD_PRODUCTATTR, res.data.productAttr)
                }
            })
        } else {
            category = "category2"
            this.props.searchClassAction({
                way: 'skuSearch2',
                value: [prevClassRst[selected]]
            })
        }
        this.setState({
            visible: false,
            [category]: this.getDefaultEbayCategoryLabel([prevClassRst[selected]])
        })
    }
    // ebay 无限级分类递归渲染 end

    //选择站点，选择完毕后初始化ebay分类
    getParentCategory = (type) => {
        const that = this;
        const { site } = this.props.basicObj.basicData;
        if (!site) {
            message.info("请选择站点！");
            return
        }
        if (type === "ebayCategoryId1") {
            that.props.searchClassAction({
                name: "ebayCategoryArr3",
                value: [],
            })
        } else {
            that.props.searchClassAction({
                name: "ebayCategoryArr4",
                value: [],
            })
        }
        fetchPost(PUBLISH_EBAYCLASS, { parentCategoryId: "", site: site }, 0)
            .then(res => {
                if (res.state === '000001' && res.data.length > 0) {
                    let options = [];
                    res.data.map(item => {
                        options.push({ value: item.id, label: item.name, isLeaf: item.isLeaf });
                    });

                    if (type === "ebayCategoryId1") {
                        that.props.searchClassAction({
                            name: "ebayCategoryArr1",
                            value: options,
                        })
                    } else {
                        that.props.searchClassAction({
                            name: "ebayCategoryArr2",
                            value: options,
                        })
                    }
                }
            })
    }

    handleCascader = (value, selectedOptions, type) => {
        if (type === 'ebayCategoryId1') {
            this.setState({ category1: selectedOptions.map(item => item.label).join('/') });
        }
        if (type === 'ebayCategoryId2') {
            this.setState({ category2: selectedOptions.map(item => item.label).join('/') });
        }
        let selectedItems = [];
        let newSelectedOpt = this.deepCopyArr(selectedOptions); // 数组深拷贝

        if (newSelectedOpt.length > 1) {
            for (let i = 0; i < newSelectedOpt.length; i++) {
                if (newSelectedOpt[i + 1]) {
                    newSelectedOpt[i].children = [newSelectedOpt[i + 1]]
                }
            }
            selectedItems = [newSelectedOpt[0]]
        } else {
            selectedItems = newSelectedOpt
        }

        const lastOption = newSelectedOpt[newSelectedOpt.length - 1];
        const { site } = this.props.basicObj.basicData;
        if (type === "ebayCategoryId1") {
            if (selectedItems.length === 0) {
                this.props.searchClassAction({
                    name: "ebayCategoryArr3",
                    value: selectedItems
                })
            }
            if (lastOption && lastOption.isLeaf) {  // 选择ebay分类1至最后一级时，请求产品属性数据
                this.props.searchClassAction({
                    name: "ebayCategoryArr3",
                    value: selectedItems
                })
                let { data } = this.props.vrelationship;
                data = data.map(v => {
                    if (v.hasOwnProperty("propsName")) {
                        return v.propsName
                    } else {
                        return null
                    }
                });
                data = data.filter(v => {
                    return v
                });
                post(PUBLISH_GETCTGSPEC, {
                    site: site,
                    categoryId: lastOption.value,
                    propsName: data,
                }).then(res => {
                    if (res && res.state === "000001") {
                        const { getFieldValue, setFieldsValue } = this.props.form;
                        const saleType = getFieldValue('basicData[saleType]');
                        if (!res.data.isVariationsEnabled && saleType === 2) {
                            message.info("此分类不支持多属性!");
                            setFieldsValue({
                                'basicData[saleType]': 1
                            })
                        }
                        this.props.getCategorySpecificsAction({ ...res.data })
                    }
                })
            }
        } else {
            if (lastOption && lastOption.isLeaf || selectedItems.length === 0) {
                this.props.searchClassAction({
                    name: "ebayCategoryArr4",
                    value: selectedItems
                })
            }
        }

    }
    //延时加载数据
    loadCascaderData = (selectedOptions) => {
        const { site } = this.props.basicObj.basicData;
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        return fetchPost(PUBLISH_EBAYCLASS, { parentCategoryId: targetOption.value, site: site }, 0)
            .then(res => {
                if (res.state === '000001') {
                    targetOption.loading = false;
                    targetOption.children = [];
                    res.data.map(item => {
                        targetOption.children.push({ value: item.id, label: item.name, isLeaf: item.isLeaf });
                    });
                    this.props.searchClassAction({
                        name: "ebayCategoryArr1",
                        value: [...this.props.ebayCategoryData.ebayCategoryArr1]
                    })
                }
            })
    }
    componentWillReceiveProps(nextProps) {
        const params = {}
        const newEbayCategoryData = nextProps.ebayCategoryData
        const ebayCategoryArr1 = newEbayCategoryData.ebayCategoryArr1
        const ebayCategoryArr2 = newEbayCategoryData.ebayCategoryArr2
        const ebayCategory1 = nextProps.ebayCategory1
        const ebayCategory2 = nextProps.ebayCategory2

        if (newEbayCategoryData.defaultEbayCategory1.length === 0) {
            params.category1 = ""
        }
        if (newEbayCategoryData.defaultEbayCategory2.length === 0) {
            params.category2 = ""
        }
        if (ebayCategoryArr1 !== this.props.ebayCategoryData.ebayCategoryArr1) {
            params.category1 = this.getDefaultEbayCategoryLabel(ebayCategoryArr1)
        }
        if (ebayCategoryArr2 !== this.props.ebayCategoryData.ebayCategoryArr2) {
            params.category2 = this.getDefaultEbayCategoryLabel(ebayCategoryArr2)
        }
        if (ebayCategory1 && ebayCategory1 !== this.props.ebayCategory1) {
            params.category1 = this.getDefaultEbayCategoryLabel(ebayCategory1)
        }
        if (ebayCategory2 && ebayCategory2 !== this.props.ebayCategory2) {
            params.category2 = this.getDefaultEbayCategoryLabel(ebayCategory2)
        }
        this.setState(params)
    }

    getDefaultEbayCategoryLabel = (data, str = "") => {
        if (data && data[0]) {
            str += data[0].label
            if (data[0].children && data[0].children.length) {
                str += ' / '
                return this.getDefaultEbayCategoryLabel(data[0].children, str)
            }
        }
        return str
    }

    render() {
        const { visible, searchClassRst, selectedItem } = this.state;
        const { defaultEbayCategory1, defaultEbayCategory2, ebayCategoryArr1, ebayCategoryArr2 } = this.props.ebayCategoryData;
        const { getFieldDecorator } = this.props.form;
        // 注册ebay分类1，ebay分类2最后一级的id
        const ebayCategoryId1 = defaultEbayCategory1.length > 0 ? defaultEbayCategory1[defaultEbayCategory1.length - 1] : null;
        const ebayCategoryId2 = defaultEbayCategory2.length > 0 ? defaultEbayCategory2[defaultEbayCategory2.length - 1] : null;
        getFieldDecorator("ebayCategoryId1", { initialValue: ebayCategoryId1 });
        getFieldDecorator("ebayCategoryId2", { initialValue: ebayCategoryId2 });
        return (
            <div className="basic-info">
                <StandardFormRow title="eBay分类：" required={true}>
                    <div className={"overflow-hidden"}>
                        <div className="pull-left ebay-class">
                            <div className="part-modal-cascader ">
                                <Tooltip placement="bottom" title={this.state.category1}>
                                    <Cascader
                                        value={defaultEbayCategory1}
                                        allowClear
                                        options={ebayCategoryArr1}
                                        loadData={this.loadCascaderData}
                                        onChange={(p1, p2) => this.handleCascader(p1, p2, 'ebayCategoryId1')}
                                        onClick={() => this.getParentCategory('ebayCategoryId1')}
                                        changeOnSelect
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <span
                            onClick={() => this.toggleModal({
                                visible: true,
                                whichClass: "ebayClass1"
                            }, "search")}
                            className="loading-sku-info ebay-font_style margin-sm-left"
                        >搜索</span>
                    </div>
                </StandardFormRow>
                <StandardFormRow title="eBay分类(2)：" required={false}>
                    <div className={"overflow-hidden"}>
                        <div className="pull-left ebay-class">
                            <div className="part-modal-cascader">
                                <Tooltip placement="bottom" title={this.state.category2}>
                                    <Cascader
                                        value={defaultEbayCategory2}
                                        allowClear
                                        options={ebayCategoryArr2}
                                        loadData={this.loadCascaderData}
                                        onChange={(p1, p2) => this.handleCascader(p1, p2, 'ebayCategoryId2')}
                                        onClick={() => this.getParentCategory("ebayCategoryId2")}
                                        changeOnSelect
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <span
                            onClick={() => this.toggleModal({
                                visible: true,
                                whichClass: "ebayClass2"
                            }, "search")}
                            className="loading-sku-info ebay-font_style margin-sm-left"
                        >搜索</span>
                    </div>
                </StandardFormRow>
                <Modal
                    title="搜索eBay分类"
                    className="basic-info_searchClass"
                    width={800}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={() => this.toggleModal({
                        visible: false
                    })}
                >
                    <Row>
                        <Col span={16}>
                            <FormItem>
                                {getFieldDecorator('searchSku', {})(
                                    <Input placeholder="Please input your sku" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8} style={{ paddingTop: "3px" }} className="padding-sm-left">
                            <Button
                                type="primary"
                                onClick={this.searchClass}
                            >搜索</Button>
                        </Col>
                        <Col span={24} className="margin-sm-top">
                            <div className={"search-content"}>
                                {searchClassRst.map((v, i) => {
                                    return (
                                        <p key={i} onClick={() => this.selectedClass(v, i)} className={this.state.selected === i ? "selected" : ""}>
                                            {v.map((_v, _i) => {
                                                return <span key={_i} id={_v.id}>{_v[0].name}{_i === v.length - 1 ? "" : " >> "}</span>
                                            })}
                                        </p>)
                                })}
                            </div>
                            <div className={"showSelected"}>
                                <strong>selected category: </strong> {
                                    selectedItem.map((v, i) => {
                                        return <span key={i}>{v[0].name}{i === selectedItem.length - 1 ? "" : " >> "}</span>
                                    })
                                }</div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }

    deepCopyArr = function (source) {
        let sourceCopy = source instanceof Array ? [] : {};
        for (let item in source) {
            sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopyArr(source[item]) : source[item];
        }
        return sourceCopy;
    }
}