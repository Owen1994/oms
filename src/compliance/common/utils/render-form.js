/**
 *作者: 李佳时
 *功能描述: 表单渲染工具
 *参数说明: 
 *时间: 2018/9/30 09:10
 */
import React from 'react'
import { Form, Row, Col } from 'antd'
import renderFormItems from './render-form-items'

/**
 * 批量渲染表单项工具
 * @param {Array} formItems 表单项
 * @param {form obj} form 传入表单
 */
function renderForm(renderformItems, form) {
    const formItems = []
    renderformItems.forEach((item) => {
        if (!item.isHidden) {
            formItems.push(item)
        }
    })

    const rowsFormItems = []
    let rows = 0
    if (formItems.length) {
        rows = Math.ceil(formItems.length / 3)
        for (let i = 0; i < rows; i++) {
            if (formItems.length >= 3) {
                const arr = formItems.splice(0, 3)
                rowsFormItems.push(arr)
            } else {
                rowsFormItems.push(formItems)
            }
        }
    }
    return (
        <Form>
            <Row>
                {
                    rowsFormItems.map((rowsFormItem, index) => {
                        return (
                            <Col key={index} span={24} className="mb15">
                                {
                                    rowsFormItem.map((item) => {
                                        return (
                                            <Col className={item.className} key={item.key} span={item.colSpan || 12} offset={item.offsetSpan}>
                                                {renderFormItems(item, form)}
                                            </Col>
                                        )
                                    })
                                }
                            </Col>
                        )
                    })
                }

            </Row>
        </Form>
    )
}
export default renderForm 