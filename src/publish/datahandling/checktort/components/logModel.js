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
                return <div>
                    <Shunt title='零售价' content={`USD ${r.retailPrice}`} right={3} />
                    <Shunt title='折后价' content={`USD ${r.discountPrice}`} right={3} />
                    <Shunt title='促销日期' content={`${r.promotionBeginDate}-${r.promotionEndDate}`} right={3} />
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
    getList = (data, pageSize = 1, pageData = 20) => {
        const { getLogAsync } = this.props;
        this.setState({
            loading: true,
        })
        const params = {
            id: data.id,
            pageSize,
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
                title="数据导入"
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
                        <Col span={10}>零售价：USD {retailPrice}</Col>
                    </Row>
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
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