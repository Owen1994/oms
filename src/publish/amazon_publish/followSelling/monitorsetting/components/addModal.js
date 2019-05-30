import React from 'react'
import moment from 'moment'
import {
    Row,
    Col,
    Modal,
    Button,
    Form,
    Select,
    message,
    Input,
    InputNumber
} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;


const style = {
    w100p: {
        width: '100%'
    }
}

const col = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
    style: {
        marginBottom: "10px"
    },
}

class AddModal extends React.Component {
    state = {
        loading: false,
        accountList: []
    }

    changeSite = (value) => {
        this.clearAccount()
        this.getAccount(value)
    }

    getAccount = (value) => {
        const { getAccountAsync } = this.props;
        const { getFieldValue } = this.props.form;
        const siteCode = value || getFieldValue("siteCode");
        let flag = true;
        if (!siteCode) return;
        getAccountAsync({
            platform: '亚马逊',
            site: siteCode
        })
            .then(r => {
                if (r) {
                    flag = false;
                    this.setState({
                        accountList: r
                    })
                }
            })
            .finally(() => {
                if (flag) {
                    this.setState({
                        accountList: []
                    })
                }
            })
    }

    // onCancel={this.addModalOnCancel}
    // data={amendData}
    // onOk={this.addModalOnOk}
    clearAccount = () => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            sellerAccount: undefined,
        })
    }

    handleOk = () => {
        const { data } = this.props;
        const { onOk } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, value) => {
            if (err) return;
            if (value.lowestPrice >= value.highestPrice) {
                return message.warning("最高售价需大于最低售价")
            }
            this.setState({
                loading: true
            })
            let params;
            if (data) {
                params = {
                    data: {
                        ...value,
                        id: data.id
                    }
                }
            } else {
                params = {
                    data: value
                }
            }

            let promise;
            if (onOk) {
                promise = onOk(params)
            } else {
                promise = Promise.resolve(true)
            }

            promise.then(r => {
                if (r) {
                    this.handleCancel()
                }
            })
                .finally(() => {
                    this.setState({
                        loading: false
                    })
                })
        })
    }

    handleCancel = () => {
        const { resetFields } = this.props.form;
        const { onCancel } = this.props;
        this.setState({
            loading: false,
            accountList: []
        })
        resetFields()
        onCancel && onCancel()
    }

    componentDidUpdate(pre) {
        if (this.props.visible) {
            if ((this.props.data && this.props.data !== pre.data) || (!this.props.data && !pre.data)) {

                this.setMethod()
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
                }
                document.addEventListener("mouseup", (e) => {
                    document.removeEventListener("mousemove", move)
                }, { once: true })
                document.addEventListener("mousemove", move)
            }
        })
    }

    render() {
        const { loading, accountList } = this.state;
        const { data = {}, visible, siteData, getAccountAsync } = this.props;
        const { getFieldDecorator } = this.props.form;
        const is = !!data && !!data.siteCode;
        const title = is ? "修改" : "新增"
        return (
            <Modal
                className="is-drag-modal"
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
                <Form
                >
                    <FormItem label="站点" {...col}>
                        {is ?

                            <Input disabled value={data.siteCode} />
                            :

                            getFieldDecorator('siteCode', {
                                initialValue: undefined,
                                rules: [
                                    { required: true, message: "请选择站点" }
                                ]
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择"
                                    onChange={this.changeSite}
                                >
                                    {
                                        siteData.map(v => <Option value={v.siteCode} key={v.siteCode}>{v.siteCode}</Option>)
                                    }
                                </Select>
                            )}
                    </FormItem>
                    <FormItem label="销售账号"  {...col}
                    >
                        {is ?
                            <Input disabled value={data.sellerAccount} />
                            :
                            getFieldDecorator('sellerAccount', {
                                initialValue: undefined,
                                rules: [
                                    { required: true, message: "请选择销售账号" }
                                ]
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择"
                                >
                                    {
                                        accountList.map(v => <Option value={v} key={v}>{v}</Option>)
                                    }
                                </Select>
                            )}
                    </FormItem>
                    <FormItem label="Seller SKU"  {...col}
                    >
                        {is ?
                            <Input disabled value={data.sellerSku} />
                            :
                            getFieldDecorator('sellerSku', {
                                initialValue: undefined,
                                rules: [
                                    { required: true, message: "请输入Seller SKU" }
                                ]
                            })(
                                <Input placeholder="请输入Seller SKU" />
                            )}
                    </FormItem>
                    <FormItem label="最低售价"  {...col}
                    >
                        {getFieldDecorator('lowestPrice', {
                            initialValue: data.lowestPrice,
                        })(
                            <InputNumber
                                min={0.1}
                                max={399999.99}
                                precision={2}
                                step={0.01}
                                placeholder="请输入最低售价"
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <FormItem label="最高售价"  {...col}
                    >
                        {getFieldDecorator('highestPrice', {
                            initialValue: data.highestPrice,
                        })(
                            <InputNumber
                                min={0.1}
                                max={399999.99}
                                precision={2}
                                step={0.01}
                                placeholder="请输入最高售价"
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <FormItem label="自动调价幅度" {...col}
                    >
                        {getFieldDecorator('autoPriceRange', {
                            initialValue: data.autoPriceRange,
                        })(
                            <InputNumber
                                min={0.01}
                                max={1000}
                                precision={2}
                                step={0.01}
                                placeholder="请输入自动调价幅度"
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <Row>
                        <Col span={15} offset={6}>
                            <p className="font-sm red">注：若listing存在折扣价，则“售价”等于折扣价；否则等于原零售价</p>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        )
    }
}
export default Form.create()(AddModal)