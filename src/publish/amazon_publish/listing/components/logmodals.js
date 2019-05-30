import React from 'react'
import {Modal, Spin, Table, Pagination, Tooltip} from 'antd'
import {fetchPost} from '../../../../util/fetch'
import {parseLogData} from '../selector/logs'
import {levelOptions} from '../../../../util/options'
import PropTypes from 'prop-types'
import {datasaddkey} from '../../../../util/baseTool'


export default class LogModal extends React.Component {

    state = {
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        loading: false,
        datas: {lst: [], total: 0}
    }

    columns = [
        {
            title: '修改内容',
            align: 'center',
            dataIndex: 'remark',
            key: 'remark',
            render: (array) => (
                <Tooltip placement={"top"} title={array[0] && array[0].remarkVal}>
                    <div style={{maxWidth: 200, margin: '0 auto', textAlign: 'left'}}>
                        {array.map(item => <p key={item.remarkKey} style={{overflow: 'hidden', wordBreak:'break-all', maxHeight: 56}}>{item.remarkKey}:{item.remarkVal}</p>)}
                    </div>
                </Tooltip>
            )
        },
        {
            title: '操作结果',
            align: 'center',
            dataIndex: 'result',
            key: 'result'
        },
        {
            title: '操作类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
        },
        {
            title: '操作人员',
            dataIndex: 'operator',
            key: 'operator',
            align: 'center',
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
        }
    ]

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible
        const preVisible = this.props.visible
        const listingId = nextProps.item.listingId
        if (visible && !preVisible) {
            const {pageData, pageNumber} = this.state
            this.queryLogDatas(pageNumber, pageData, listingId)
        }
    }

    queryLogDatas = (pageNumber, pageData, lstId) => {
        this.setState({loading: true, pageNumber, pageData})
        const listingId = lstId ? lstId : this.props.item.listingId
        const params = {pageData, pageNumber, listingId}
        fetchPost('/pls/ebay/motan/service/api/IEbayService/getListingLog', params, 2)
            .then(result => {
                this.setState({loading: false})
                if (result.state === '000001') {
                    this.setState({
                        datas: parseLogData(result.data)
                    })
                }
            })
    }

    render() {
        const {loading, datas, pageData, pageNumber} = this.state
        const {visible} = this.props
        const dataSource = datasaddkey(datas.lst)
        return (
            <Modal
                destroyOnClose={true}
                title="日志"
                className="oms_inx ebay-listing_log"
                width={800}
                visible={visible}
                footer={null}
                onCancel={this.props.onCancel}
            >
                <Spin spinning={loading} delay={300} tip="Loading...">
                    <Table
                        dataSource={dataSource}
                        columns={this.columns}
                        size="small"
                        bordered={true}
                        pagination={false}
                        rowKey="time"
                    />
                    <Pagination
                        showTotal={logTotal => `共 ${logTotal} 条`}
                        pageSizeOptions={['10', '15']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.queryLogDatas}
                        total={datas.total}
                        pageSize={pageData}
                        onChange={this.queryLogDatas}/>
                </Spin>
            </Modal>
        )
    }
}

LogModal.propTypes = {
    item: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
}