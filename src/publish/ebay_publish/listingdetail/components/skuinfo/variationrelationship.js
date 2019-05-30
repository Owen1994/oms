import React from 'react'
import {
    Input, Row, Col, Switch, message
} from 'antd'
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow'
import { fetchPost } from "../../../../../util/fetch";
import { CHANGE_MAINSPECIFIC } from '../../constants/api'

export default class Vrelationship extends React.Component {

    // 多属性关系相关
    removePropName = (index, delKey, propsName) => {   // 移除新增表单
        const { specificName } = this.props.vrelationship;
        if (propsName === specificName) {
            message.info("当前项不能删除，请先切换主属性!");
            return
        }
        this.props.delVpropsName({ index, delKey, propsName })
    }
    addPropName = () => {  // 动态添加表单
        const { data } = this.props.vrelationship
        if (data.length > 4) {
            message.info("属性名不能超过5个！")
            return
        }
        this.props.addVpropsName()
    }
    handleSwitch = (e, index, key) => {
        const { data, specificName } = this.props.vrelationship;
        const vList = this.props.vlist;
        const mainSpecificName = data[index].propsName;
        let mainSpecificValues = [];
        let sellerSku = [];
        const propsInfo = [];
        const uniqueObj = {};
        const params = {};
        vList.forEach(v => {
            propsInfo.push({
                sku: v.sellerSku,
                value: v[mainSpecificName]
            })
        });
        propsInfo.forEach((v, index) => {
            if (!uniqueObj[v.value]) {
                mainSpecificValues.push(v.value);
                uniqueObj[v.value] = true
            }
        });
        mainSpecificValues = mainSpecificValues.filter(v => v);
        mainSpecificValues.forEach((v, i) => {
            sellerSku[i] = [];
            vList.forEach(_v => {
                if (v === _v[mainSpecificName]) {
                    sellerSku[i].push(_v.sellerSku);
                }
            })
        });
        sellerSku = sellerSku.map(v => v.join(','));
        params["mainSpecificName"] = mainSpecificName;
        params["mainSpecificValues"] = mainSpecificValues;
        params["sellerId"] = this.props.form.getFieldValue("basicData[saleAccount]");
        params["sellerSku"] = sellerSku.filter(v => v);
        // console.log(vList)
        // console.log(params)
        if (params["sellerSku"].length === 0 && params["mainSpecificValues"].length === 0) {
            return message.error("请确保主属性的值及Seller SKU的值不能全部为空！");
        }
        fetchPost(CHANGE_MAINSPECIFIC, params, 2).then(res => {
            if (res && res.state === "000001") {
                if (res.data && res.data.length > 0) {
                    this.props.editVpropsName({
                        checkedIndex: key,
                        specificName: data[index].propsName,
                        oldSpecificName: specificName,
                        data: res.data
                    });
                } else {
                    return message.error("请确保主属性的值及Seller SKU的值不能全部为空！");
                }
            }
        })
    }
    handleChange = (e, index, item) => {
        const val = e.target.value;
        if (val && val.length > 20) {
            e.target.value = val.slice(0, 20);
            message.info("属性名不能超过20个字符");
            return;
        }
        const { checkedIndex, specificName } = this.props.vrelationship;
        this.props.editVpropsName({
            index,
            value: e.target.value,
            item,
            checkedIndex,
            oldSpecificName: specificName
        });

    }
    handleBlur = (e, index, item) => {
        let { data } = this.props.vrelationship;
        // const { upcOrEan } = this.props.skuinfoData;
        //从多属性列表取第一行数据的UPC或EAN
        let upcOrEan = null;
        let vlist = this.props.vlist[0];
        if (vlist.upc || vlist.UPC) {
            upcOrEan = 'UPC';
        } else if (vlist.ean || vlist.EAN) {
            upcOrEan = 'EAN';
        } else {
            upcOrEan = null;
        }
        let cInput = document.getElementById(e.target.id);
        //过滤UPC或EAN
        if (upcOrEan && upcOrEan.toUpperCase() === e.target.value.toUpperCase()) {
            cInput.focus();
            message.info('属性名不能相同！');
        } else {
            data = data.filter(v => {
                if (v.key !== item.key) {
                    return v
                }
            })
            data.forEach(v => {   // 属性名重复时提示
                if (v.propsName && v.propsName.toUpperCase() === e.target.value.toUpperCase()) {
                    cInput.focus();
                    message.info("属性名不能相同！")
                }
            })
        }
    }
    componentWillMount() { }
    render() {
        const { data, checkedIndex } = this.props.vrelationship

        const formItems = data.map((item, index) => {
            return (
                <Row className="prop-row" key={item.key}>
                    <Col span={10} className="prop-col">
                        <Input
                            id={`propsName${item.key}`}
                            value={item.propsName}
                            onChange={(e) => this.handleChange(e, index, item)}
                            onBlur={(e) => this.handleBlur(e, index, item)}
                            placeholder="属性名"
                            style={{ width: 330, marginTop: 22 }}
                        />
                    </Col>
                    <Col span={10} className="prop-col">
                        <Switch
                            checkedChildren="是"
                            unCheckedChildren="否"
                            checked={item.key === checkedIndex ? true : false}
                            onChange={(e) => this.handleSwitch(e, index, item.key)}
                        />
                    </Col>
                    <Col span={4} className="prop-col prop-btn prop-cBtn">
                        {index === 0
                            ? <span onClick={this.addPropName} style={{ cursor: 'pointer' }}>
                                新增
                              </span>
                            : <span onClick={() => this.removePropName(index, item.key, item.propsName)} style={{ cursor: 'pointer' }}>
                                删除
                              </span>
                        }
                    </Col>
                </Row>
            );
        });

        return (
            <div className="auctionInfo_container">
                <StandardFormRow title={"多属性关系："} required={true} className="variation-relations">
                    <div className="relations-content">
                        <Row className="prop-row prop-header">
                            <Col span={10} className="prop-hCol">属性名</Col>
                            <Col span={10} className="prop-hCol">是否主图</Col>
                            <Col span={4} className="prop-btn prop-hBtn">操作</Col>
                        </Row>
                        {formItems}
                    </div>
                </StandardFormRow>
            </div>
        )
    }

}
