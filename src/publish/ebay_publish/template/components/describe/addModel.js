/**
 * 作者: 陈林
 * 描述: 图库设置添加和修改弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import { Form, Select, Modal, Radio, Input, Button, message} from "antd";
import ItemSelect from '@/common/components/itemSelect'
import * as types from "../../../../common/constants/actionTypes";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class modal extends React.Component {
    state = {
        toHtml: false,
        loading: false,
    }

    handleOk = () => {
        const { getFieldsValue } = this.props.form;
        const { handleOk } = this.props;
        const value = getFieldsValue();
        if(!value.saleAccount) return message.warning('请选择销售账号')
        handleOk(value);
    }

    render() {
        const { toHtml, siteCode, saleAccount, templateName, editorContent, editorContentId } = this.state
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const { visible, onCancel } = this.props;

        return (
            <Modal {...this.props}
                title={"新增"}
                // visible
                width={500}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>确定</Button>,
                ]}
            >
                <div>
                    <div className="list-filter-item margin-sm-top">
                        <div className="list-filter-item-title list-filter-item-title-width list-filter-item-title_required">销售账号：</div>
                        <div className="list-filter-input">
                            <FormItem style={{width:280}}>
                                <ItemSelect
                                    getFieldDecorator={getFieldDecorator}
                                    formName='saleAccount'
                                    name="id"
                                    code="id"
                                    searchColumn="saleAccount"
                                    params={{ 'pageData': 20, 'pageNumber': 1 }}
                                    url={types.PUBLISH_EBAYACCOUNT}
                                    // mode='multiple' // 是否支持多选
                                    // maxCount={10}  // 最大可选数  配合  multiple使用
                                    apiListType={2}
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className="list-filter-item margin-sm-top">
                        <div className="list-filter-item-title list-filter-item-title-width list-filter-item-title_required">设计方式：</div>
                        <div className="list-filter-input">
                            <FormItem>
                                {getFieldDecorator('type', {
                                    initialValue: 1,
                                    rules:[{ required: true }]
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>系统模板</Radio>
                                        <Radio value={2}>HTML自定义</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default Form.create()(modal)
