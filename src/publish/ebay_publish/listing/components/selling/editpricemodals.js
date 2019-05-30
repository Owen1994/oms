import React from 'react'
import { Modal, Select, Form, InputNumber, Button, message } from 'antd'
import { parseBatchParams } from '../../selector/selling'
import priceTypes from '../../constants/PriceType'
import { fetchPost } from '../../../../../util/fetch'
import Apis from '../../constants/Api'

const FormItem = Form.Item;
const Option = Select.Option

/**
 * @author 黄建峰
 * @description 批量修改价格
 */
class EditPriceModal extends React.Component {

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
            params.itemId = itemId
            params.type   = type
            if(skus&&skus.length>0){
                params.skus   = skus
            }
            fetchPost(Apis.EDIT_PRICE, params, 1).then(result => {
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

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible
        const preVisible = this.props.visible
        if(visible && !preVisible){
            this.props.form.resetFields()
        }
    }
    render(){
        const loading = this.state.loading
        const { visible,onCancel } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title='批量修改零售价'
                visible={visible}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <div className="list-filter-item">
                        <div className="list-filter-item-title list-filter-item-title_required">修改方式：</div>
                        <div className="list-filter-input">
                            <FormItem>
                                {getFieldDecorator('editType', {
                                        initialValue: 1,
                                        rules: [{
                                            required: true, message: '请输入修改方式',
                                        }],
                                    })(
                                        <Select
                                            // onChange={(value)=>this.handleSelectVal(value)}
                                            style={{ width: "100%",marginLeft: "10px" }}
                                        >
                                            {priceTypes.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)}
                                        </Select>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="list-filter-item">
                        <div className="list-filter-item-title list-filter-item-title_required">零售价:</div>
                        <div className="list-filter-input">
                            <FormItem>
                                {getFieldDecorator('price', {
                                        rules: [{
                                            required: true, message: '请输入零售价',
                                        }],
                                    })(
                                        <InputNumber
                                            placeholder={"请输入零售价"}
                                            min={0}
                                            max={100000000}
                                            className="margin-ss-left"
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
export default Form.create()(EditPriceModal)