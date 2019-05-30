import React from 'react'
import { Modal, Button, InputNumber, Form, message } from 'antd'
import { fetchPost } from '../../../../../util/fetch'
import Apis from '../../constants/Api'
import { parseBatchParams } from '../../selector/selling'
const FormItem = Form.Item;
/**
 * @author 黄建峰
 * @description 批量修改库存
 */
class EditStockModal extends React.Component {
    state = {
        loading: false
    }
    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            this.setState({
                loading: true,
            })
            const params = {
                ...value,
                listType: 3,
                type: this.props.items[0].saleType
            }
            const { itemId, skus, type } = parseBatchParams(this.props.items)
            // const itemId = [], skus = []
            // this.props.items.forEach(item => {
            //     itemId.push(item.itemIdStr)
            //     skus.push(item.sellerSkuStr)
            // })
            params.itemId = itemId
            if(skus&&skus.length>0){
                params.skus   = skus
            }
            params.type = type
            fetchPost(Apis.EDIT_STOCK, params, 1).then(result => {
                this.setState({
                    loading: false
                })
                if(result.state==='000001'){
                    this.props.onSearch()
                    this.props.onCancel()
                }
            })
        })
    }

    render(){
        const loading = this.state.loading
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title='批量修改库存'
                visible={visible}
                onCancel={onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <div className="list-filter-item">
                        <div className="list-filter-item-title list-filter-item-title_required">库存：</div>
                        <div className="list-filter-input">
                            <FormItem>
                                {getFieldDecorator('stock', {
                                        // initialValue: 1,
                                        rules: [{
                                            required: true, message: '请输入库存',
                                        }],
                                    })(
                                        <InputNumber
                                            placeholder={"请输入0~999之间的整数"}
                                            min={0}
                                            max={999}
                                            style={{width:'100%', marginLeft:'10px'}}
                                        />
                                )}
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(EditStockModal)