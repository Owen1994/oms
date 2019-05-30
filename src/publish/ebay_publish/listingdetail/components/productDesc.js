import React from 'react'

import { Form, message, Input } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input;
import RichTextEditor from '@/common/components/RichTextEditor'
// import RichTextEditor from './RichTextEditor' //富文本编辑器
// import BraftEditor from 'braft-editor' //富文本编辑器
// import 'braft-editor/dist/braft.css'
import { post } from '../../../../util/axios'
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../common/components/itemSelect'
import { GET_DESCRIPTION_TEMP } from "../constants/api";
import { ADD_PRODUCTINFO } from '../constants/reducerTypes'

export default class ProductDesc extends React.Component {
    state = {
    }

    componentWillReceiveProps(nextProps) {

    }
    // 下拉框同步reducer/state的值
    handleReduxVal = (value, option) => {
        this.props.getTemplatiesAction({
            descTemplId: option.value,
            descTemplName: option.children
        })
    }
    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     **/
    handleFocusBefore = (fields) => {
        const { site, saleType } = this.props.basicData;
        const saleAccount = this.props.form.getFieldValue("basicData[saleAccount]");
        // let categoryId = this.props.detailDataModel.another;
        let categoryId = 45111;
        if (fields === "no") {
            return true
        }
        if (fields instanceof Array && fields.length > 0) {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] === "saleAccount") {
                    if (!saleAccount) {
                        message.info("请先选择销售账号")
                        return false
                    }
                }
                if (fields[i] === "site") {
                    if (!site) {
                        message.info("请先选择站点")
                        return false
                    }
                }
                if (fields[i] === "listingType") {
                    if (!saleType) {
                        message.info("请先选择销售类型")
                        return false
                    }
                }
                if (fields[i] === "categoryId") {
                    if (!categoryId) {
                        message.info("请选择eBay分类至最后一级")
                        return false
                    }
                }
            }
        } else {
            message.warning("校验字段传入格式有误")
        }
        return true
    }

    // handleChange = (content) => {
    //     const { setFieldsValue } = this.props.form;
    //     this.props.editComponentDataAction(ADD_PRODUCTINFO, 'descriptionContent', content)
    //     setFieldsValue({
    //         "productInfo[descriptionContent]": content
    //     })
    // }
    handleTempChange = (content) => {
        const { editComponentDataAction } = this.props;
        const { setFieldsValue } = this.props.form;
        editComponentDataAction(ADD_PRODUCTINFO, 'descriptionContent', content)
        setFieldsValue({
            "productInfo[descriptionContent]": content
        })
    }
    insertImg = (param) => {   // 图片上传方法
        post('http://192.168.201.211:9090/mockjsdata/24/pls/ebay/motan/service/api/IEbayService/options', {}).then(res => {
            if (res && res.state === "000001") {
                console.log(param.libraryId);
                for (let i = 0; i < 2; i++) {
                    param.success({
                        url: "http://www.alibaba.com",
                        meta: {
                            id: 'xxx',
                            title: 'xxx',
                            alt: 'xxx',
                        }
                    })
                }
            }
        })
    }

    render() {
        // const {editComponentDataAction} = this.props;
        const { site } = this.props.basicData;
        const { defaultDescriptionContent } = this.props.productinfoData;
        const { descriptionTemplateObj } = this.props.templatiesData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator("productInfo[descriptionContent]")
        return (
            <div className="product-description">

                <StandardFormRow title="描述模板：">
                    <FormItem>
                        <ItemSelect
                            dName={descriptionTemplateObj ? [descriptionTemplateObj.name] : ""}
                            dValue={descriptionTemplateObj ? [descriptionTemplateObj.tempId] : ""}
                            disabled={false}
                            name="name"
                            code="tempId"
                            url={GET_DESCRIPTION_TEMP}
                            params={{ site: [site], saleAccount: [getFieldValue("basicData[saleAccount]")], pageNumber: 1, pageData: 999 }}
                            value={descriptionTemplateObj.tempId}
                            className={'item-select'}
                            apiListType={1}
                            onChange={(value, option) => this.handleReduxVal(value, option)}
                            onFocusBefore={() => this.handleFocusBefore(["saleAccount", "site"])}
                        />
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow className="summernote-wrap" title="描述内容：" required={true}>
                    <RichTextEditor onChange={this.handleTempChange} value={defaultDescriptionContent}></RichTextEditor>
                </StandardFormRow>
            </div>
        )
    }
}