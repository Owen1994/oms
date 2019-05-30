/**
 *作者: 李佳时
 *功能描述: 表单渲染
 *参数说明: 
 *时间: 2018/9/30 09:41
 */
import React from 'react'
import {
    Form,
    Input,
    Cascader,
    Table,
    Button,
    Checkbox,
    Radio
} from 'antd'
import PhotoUpload from '../components/PhotoUpload'
import Text from '../components/Text'
import XSelect from '../components/XSelect'

const FormItem = Form.Item
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
// 支持的表单项
const FORM_TYPES = {
    TextArea,
    Input,
    XSelect,
    Cascader,
    PhotoUpload,
    Text,
    Table,
    Button,
    CheckboxGroup,
    RadioGroup
}

const ErrorComp = () => <div>不支持的表单项</div>

/**
 * 批量渲染表单项工具
 * @param {Array} formItems 表单项
 * @param {form obj} form 传入的表单
 */
function renderFormItems(formItems, form) {
    formItems = Array.isArray(formItems) ? formItems : [formItems]
    const { getFieldDecorator } = form
    const defaultLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    }
    return formItems.map((item, i) => {
        const Comp = FORM_TYPES[item.type] || ErrorComp
        const otherProps = item.otherProps || {}
        otherProps.placeholder = otherProps.placeholder || item.placeholder

        let layout = Object.assign(
            {},
            defaultLayout,
            item.formItemLayout,
        )
    
        return (
            <FormItem
                {...layout}
                label={item.label}
                key={item.key}
            >
                {
                    getFieldDecorator(
                        item.key,
                        item.option,
                    )(<Comp {...otherProps}>{item.children || null}</Comp>)
                }
            </FormItem>
        )
    })
}

export default renderFormItems
