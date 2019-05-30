import React from 'react'
import {Modal, Spin, Table, Pagination, Tooltip} from 'antd'
import {fetchPost} from '../../../../util/fetch'
import {levelOptions} from '../../../../util/options'
import PropTypes from 'prop-types'
import {datasaddkey, timestampFromat} from '../../../../util/baseTool'

export default class LogModal extends React.Component {

    state = {
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        loading: false,
        datas: {list: [], total: 0}
    }

    columns = [
        {
            title: '修改字段',
            align: 'modifiedField',
            dataIndex: 'modifiedField',
        },
        {
            title: '修改前',
            align: 'modifiedBefore',
            dataIndex: 'modifiedBefore'
        },
        {
            title: '修改后',
            dataIndex: 'modifiedAfter',
            align: 'modifiedAfter',
        },
        {
            title: '修改人员',
            dataIndex: 'modifier',
            align: 'modifier',
        },
        {
            title: '修改时间',
            dataIndex: 'modifiedTime',
            align: 'modifiedTime',
            render: text => timestampFromat(text, 2)
        }
    ]

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        const itemId = nextProps.itemId;
        const type = this.props.logTypeId;
        if (visible && !preVisible) {
            const {pageData, pageNumber} = this.state;
            this.queryLogDatas(pageNumber, pageData, itemId, type)
        }
    }

    queryLogDatas = (pageNumber, pageData, lstId, type) => {
        this.setState({loading: true});
        const params = {data:{ pageData, pageNumber, [type]: lstId}};
        fetchPost(this.props.logUrl, params, 2)
            .then(result => {
                this.setState({loading: false})
                if (result.state === '000001') {
                    this.setState({
                        datas: result.data,
                        pageNumber,
                        pageData
                    })
                }
            })
    }

    render() {
        const {loading, datas, pageData, pageNumber} = this.state;
        const {visible} = this.props;
        const dataSource = datasaddkey(datas.list)
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
                    />
                    <Pagination
                        showTotal={logTotal => `共 ${logTotal} 条`}
                        pageSizeOptions={['10', '15']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={(pageNumber, pageData)=>this.queryLogDatas(pageNumber, pageData, this.props.itemId, this.props.logTypeId)}
                        total={datas.total}
                        pageSize={pageData}
                        onChange={(pageNumber, pageData)=>this.queryLogDatas(
                            pageNumber,
                            pageData,
                            this.props.itemId,
                            this.props.logTypeId)
                        }/>
                </Spin>
            </Modal>
        )
    }
}

LogModal.propTypes = {
    itemId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
}