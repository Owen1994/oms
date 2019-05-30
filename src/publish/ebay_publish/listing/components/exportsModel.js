import React from 'react'
import { Modal, Button, Form, message, Radio } from 'antd'
import { fetchPost } from 'util/fetch'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class EditStockModal extends React.Component {
    state = {
        loading: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible && !prevProps.visible) {
            const ids = this.props.ids;
            const { setFieldsValue } = this.props.form;
            if (ids && ids.length > 0) {
                setFieldsValue({ type: 2 });
            } else {
                setFieldsValue({ type: 1 });
            }
        }
    }

    handleOk = () => {
        const { searchParams, ids, ptype } = this.props;
        const { getFieldValue } = this.props.form;
        const type = getFieldValue("type");
        let params = { type };
        if (type === 1) {
            const p = searchParams;
            params = {
                ...params,
                ...p
            }
        } else if (type === 2) {
            params.ids = ids
        }
        params.state = ptype
        // message.info("正在导出文件中，请稍等")
        fetchPost('/pls/ebay/motan/service/api/IEbayService/exportListingData', params)
            .then(result => {
                if (result.state == "000001" ) {
                    message.success(result.msg)
                    const { onCancel} = this.props
                    onCancel()
                } else {
                    message.error(result.msg)
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }

    handleCancel = () => {
        this.props.onCancel();
        this.props.form.resetFields();
    }

    render() {
        const loading = this.state.loading
        const { visible, ids, title, total } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form
        const type = getFieldValue("type");
        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <div className="list-filter-item">
                        <div className="list-filter-item-title list-filter-item-title_required">导出方式：</div>
                        <div className="list-filter-input">
                            <FormItem>
                                {getFieldDecorator('type', {
                                    initialValue: 1,
                                    rules: [{
                                        required: true, message: '请输入库存',
                                    }],
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>导出当前搜索条件下数据</Radio>
                                        <Radio disabled={!ids || !ids.length} value={2}>导出选中的数据</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    {
                        (type === 1 && total >= 50000) ?
                        <div className="list-filter-item">
                            <p style={{color: 'red'}}>最多导出5万条，是否导出？</p>
                        </div>
                        :
                        null
                    }
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(EditStockModal)