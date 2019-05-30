import React from 'react'
import moment from 'moment'
import { getSensitiveLayer } from '../constants/index'
import {
    Modal,
    Form,
    Row,
    Col,
    Spin,
    message,
} from 'antd'
const FormItem = Form.Item;

class EditStockModal extends React.Component {
    state = {
        loading: false,
        list: [],
    }

    columns = [
        {
            title: '跟卖者',
            dataIndex: 'followSeller',
            key: 'followSeller',
            width: 100,
        },
        {
            title: '跟卖者出价',
            dataIndex: 'followPrice',
            key: 'followPrice',
            width: 100,
        },
        {
            title: '开始跟卖时间',
            dataIndex: 'followBeginTime',
            key: 'followBeginTime',
            width: 100,
        },
        {
            title: '结束跟卖时间',
            dataIndex: 'followEndTime',
            key: 'followEndTime',
            width: 100,
        },
    ]

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.getView(data)
        }
    }

    componentWillReceiveProps(next) {
        if (next.visible && next.data && next.data !== this.props.data) {
            this.getView(next.data)
        }
    }
    getView = (data) => {
        const { getViewListAsync } = this.props;
        this.setState({
            loading: true,
        })
        const params = {
            id: data.id,
            pageData: 20,
            pageNumber: 1
        }
        getViewListAsync(params)
            .then(r => {
                if (r) {
                    const d = r.data;
                    this.setState({
                        list: d.list,
                    })
                }
            })
            .finally(() => {
                this.setState({
                    loading: false,
                })
            })
    }

    onCancel = () => {
        const { onCancel } = this.props;
        this.setState({
            loading: false,
            list: [],
        })
        onCancel && onCancel()
    }


    componentDidUpdate(pre) {
        if (this.props.visible && this.props.data && this.props.data !== pre.data) {
            this.setMethod()
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
        const { visible } = this.props;
        const {
            loading,
            list,
        } = this.state;
        return (
            <Modal
                className="is-drag-modal"
                title="查看"
                visible={visible}
                onCancel={this.onCancel}
                destroyOnClose={true}
                maskClosable={false}
                width={700}
                footer={null}
            >
                <Spin spinning={loading} delay={500} tip="Loading...">
                    {
                        list.map((v, i) => {
                            let sensitiveLevel = getSensitiveLayer.find(val => val.id == v.sensitiveLevel)
                            sensitiveLevel = sensitiveLevel ? sensitiveLevel.name : ''
                            let className = i == list.length - 1 ? "" : "margin-sm-bottom"
                            return (
                                <div className={className} key={v.id} >
                                    <p style={{ fontWeight: 700, marginBottom: "7px" }}>{v.yksSku}</p>
                                    <p style={{ marginBottom: "7px" }}>敏感等级：{sensitiveLevel}</p>
                                    <p>原因描述：{v.description}</p>
                                </div>
                            )
                        })
                    }
                </Spin>
            </Modal>
        )
    }
}
export default EditStockModal