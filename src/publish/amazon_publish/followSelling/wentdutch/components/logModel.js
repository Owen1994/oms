import React from 'react'
import {
    Modal,
    Spin,
    Table,
    Pagination,
    Row,
    Col,
} from 'antd'
import Shunt from './shunt'
import { timestampFromat } from '@/util/baseTool'

class LogModel extends React.Component {
    state = {
        loading: false,
        list: [],
        total: 0,
        pageSize: 20,
        pageData: 1,
    }

    columns = [
        {
            title: '调整后价格',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 200,
            render: (t, r, i) => {
                const { data } = this.props;
                const currency = data._currency || "USD"
                const begin = r.promotionBeginDate ? timestampFromat(r.promotionBeginDate) : "--"
                const end = r.promotionEndDate ? timestampFromat(r.promotionEndDate) : "--"
                const time = `${begin} - ${end}`
                const discountPrice = r.discountPrice ? r.discountPrice : "--"
                return <div>
                    <Shunt title='零售价' content={`${currency} ${r.retailPrice}`} right={3} />
                    <Shunt title='折后价' content={`${currency} ${discountPrice}`} right={3} />
                    <Shunt title='促销日期' content={time} right={3} />
                </div>
            }
        },
        {
            title: '操作人员',
            dataIndex: 'operator',
            key: 'operator',
            width: 100,
        },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
            key: 'operationTime',
            width: 100,
            render: (t) => timestampFromat(t, 2)
        }
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

    componentDidUpdate(pre) {
        if (this.props.visible && this.props.data && this.props.data !== pre.data) {
            this.setMethod()
        }
    }
    getList = (data, pageSize = 1, pageData = 20) => {
        const { getLogAsync } = this.props;
        this.setState({
            loading: true,
        })
        const params = {
            id: data.id,
            pageNumber: pageSize,
            pageData
        }
        getLogAsync({
            data: params
        })
            .then(r => {
                if (r) {
                    this.setState({
                        list: r.list,
                        total: r.total || 0,
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
        const { visible, data = {} } = this.props;
        const { sellerSku, retailPrice } = data;
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
                title="调价日志"
                visible={visible}
                onCancel={this.onCancel}
                destroyOnClose={true}
                maskClosable={false}
                width={700}
                footer={null}
            >
                <div>
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
export default LogModel