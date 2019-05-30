import React from 'react'
import moment from 'moment'
import {
    Modal,
    Button,
    Form,
    Spin,
    Table,
    Pagination,
    Row,
    Col,
    message,
} from 'antd'
import { timestampFromat } from '@/util/baseTool'

class DragModal extends React.Component {
    state = {
        loading: false,
        list: [],
        total: 0,
        pageSize: 20,
        pageData: 1,
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
            render: (t) => t ? timestampFromat(t, 2) : "--"
        },
        {
            title: '结束跟卖时间',
            dataIndex: 'followEndTime',
            key: 'followEndTime',
            width: 100,
            render: (t) => t ? timestampFromat(t, 2) : "--"
        },
    ]

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.getList(data, 1, 20)
        }
    }

    componentWillReceiveProps(next) {
        if (next.visible && next.data && next.data !== this.props.data) {
            this.getList(next.data, 1, 20)
        }
    }
    getList = (data, pageSize = 1, pageData = 20) => {
        const { getViewListAsync } = this.props;
        this.setState({
            loading: true,
        })
        const params = {
            asinSite: data.asinSite,
            pageNumber: pageSize,
            pageData
        }
        getViewListAsync({
            data: params
        })
            .then(r => {
                if (r) {
                    const d = r.data;
                    this.setState({
                        list: d.list,
                        total: d.total,
                        pageSize,
                        pageData
                    })
                }
            })
            .finally(() => {
                this.setState({
                    loading: false,
                })
            })
    }

    onChange = (pageSize, pageData) => {
        const { data } = this.props;
        this.getList(data, pageSize, pageData)
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

    onCancel = () => {
        const { onCancel } = this.props;
        this.setState({
            loading: false,
            list: [],
            total: 0,
            pageSize: 20,
            pageData: 1,
        })
        onCancel && onCancel()
    }

    render() {
        const { visible, data = {} } = this.props;
        const { sellerSku, retailPrice, _currency = "USD" } = data;
        const {
            loading,
            list,
            total,
            pageSize,
            pageData,
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
                <div>
                    <Row className="margin-ms-bottom">
                        <Col span={10}>Seller SKU：{sellerSku}</Col>
                        <Col span={10}>零售价：{_currency} {retailPrice}</Col>
                    </Row>
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            className="table-text-center"
                            columns={this.columns}
                            dataSource={list}
                            pagination={false}
                            bordered={true}
                            size="small"
                            indentSize={0}
                            rowKey={record => record.id}
                        />
                        <div className="text-right">
                            <Pagination
                                showTotal={total => `共 ${total} 条`}
                                pageSizeOptions={['20', '30', '40', '50']}
                                showSizeChanger
                                current={pageSize}
                                defaultCurrent={1}
                                onShowSizeChange={this.onChange}
                                total={total}
                                pageSize={pageData}
                                onChange={this.onChange}
                            />
                        </div>
                    </Spin>
                </div>
            </Modal>
        )
    }
}
export default DragModal