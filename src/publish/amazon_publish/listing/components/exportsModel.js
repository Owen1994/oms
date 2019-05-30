import React from 'react'
import { Modal, Button, Form, message, Radio } from 'antd'
import { fetchPost } from 'util/fetch'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class EditStockModal extends React.Component {
    state = {
        loading: false
    }

    handleOk = () => {
        const { getParams, ids, activeKey } = this.props;
        const { getFieldValue } = this.props.form;
        // 1:导出选中数据，2：导出当前搜索条件数据
        const exportType = getFieldValue("exportType");
        let params = {
            exportType,
            listingStatus: Number(activeKey)
        };
        if (exportType === 1) {
            params.ids = ids
        } else if (exportType === 2) {
            const p = getParams();
            params = {
                ...params,
                ...p
            }
        }
        // message.info("正在导出文件中，请稍等")
        fetchPost('/pls/motan/service/api/IPlsFacadeService/exportListingList', { data: params })
            .then(result => {
                if (result.state == "000001") {
                    message.success(result.msg)
                    this.handleCancel()
                } else {
                    message.error(result.msg)
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleCancel = () => {
        this.props.onCancel();
        this.props.form.resetFields();
    }

    componentDidUpdate(pre) {
        if (this.props.visible && !pre.visible) {
            this.setMethod()
            const ids = this.props.ids;
            const { setFieldsValue } = this.props.form;
            if (ids && ids.length > 0) {
                setFieldsValue({ exportType: 1 });
            } else {
                setFieldsValue({ exportType: 2 });
            }
        }
    }

    setMethod = () => {
        const dargModal = document.querySelector(".is-drag-modal");
        if (!dargModal) {
            return setTimeout(this.setMethod, 1000)
        }
        const header = dargModal.querySelector(".ant-modal-header");
        var innerBoxLeft = dargModal.offsetLeft;// 获取弹框距离左侧宽度
        var innerBoxTop = dargModal.offsetTop;// 获取弹框距离顶部高度

        dargModal.style.position = "absolute"
        dargModal.style.top = innerBoxTop + "px"
        dargModal.style.left = innerBoxLeft + "px"

        header.addEventListener("mousedown", (event) => {
            let { left, top } = window.getComputedStyle(dargModal)
            left = parseInt(left)
            top = parseInt(top)
            const { clientX, clientY } = event;
            if (event.button === 0) {
                const move = (e) => {
                    let x = e.clientX;
                    let y = e.clientY;

                    dargModal.style.top = top + (y - clientY) + "px"
                    dargModal.style.left = left + (x - clientX) + "px"
                    // debugger
                    // console.log("e----", e)
                }
                document.addEventListener("mouseup", (e) => {
                    document.removeEventListener("mousemove", move)
                }, { once: true })
                document.addEventListener("mousemove", move)
            }
        })
    }


    render() {
        const loading = this.state.loading
        const { visible, ids, title, total } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form
        const type = getFieldValue("type");
        return (
            <Modal
                className="is-drag-modal"
                title="数据导出"
                visible={visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>确定</Button>,
                ]}
            >
                <Form>
                    <div className="list-filter-item">
                        <div className="list-filter-item-title list-filter-item-title_required">导出方式：</div>
                        <div className="list-filter-input">
                            <FormItem>
                                {getFieldDecorator('exportType', {
                                    initialValue: 2,
                                    rules: [{
                                        required: true, message: '请输入库存',
                                    }],
                                })(
                                    <RadioGroup>
                                        <Radio value={2}>导出当前搜索条件下数据</Radio>
                                        <Radio disabled={!ids || !ids.length} value={1}>导出选中的数据</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="list-filter-item">
                        <p className="red font-sm">注：单次导出数据不能超过10万条</p>
                    </div>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(EditStockModal)