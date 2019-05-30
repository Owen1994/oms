import React from 'react'

import {
    Modal,
    Table,
    Spin,
    Pagination,
    Input,
    message,
    Button
} from 'antd'
const { TextArea } = Input;

import {
    timestampFromat,
    datasaddkey
} from "../../../../util/baseTool"

import Functions from '../../../../components/functions'
import PopConfirm from '../../../../common/components/confirm'
import { levelOptions } from '../../../../util/options';

export default class Tablelist extends React.Component {
    state = {
        visible: false,
        title: "",
        data: []
    }
    columns = () => {
        return this.columns = [
            {
                title: 'listing信息',
                width: 120,
                key: "productId",
                // className="publish-batch-table-result"
                render: (text, record, index) => {
                    return (
                        <div className="text-left publish-batch-table-result-productId">
                            <p className="breakwrod"><span>标题：</span>{record.title}</p>
                            <p className="breakwrod"><span>Product ID：</span>{record.productId}</p>
                        </div>
                    )
                }
            },
            {
                title: 'Seller SKU',
                dataIndex: 'sellerSkus',
                width: 80,
                key: 'sellerSkus',
                render: (text, record, index) => {
                    var arr = text.split(",");
                    var l = arr.length;
                    if (l > 4) {
                        arr = arr.slice(0, 4)
                    }
                    return (
                        <div className="breakwrod">
                            {arr.join(",")}
                            {
                                l > 4 ?
                                    <span className="pointer publish-batch-table-seller-skus" href="javascript:;" onClick={() => this.showModal(text, "更多")}>>></span>
                                    : null
                            }
                        </div>
                    )
                }
            },
            {
                title: '账号信息',
                width: 100,
                key: "account",
                render: (text, record, index) => {
                    return (<div className="publish-batch-table-info">
                        <p style={{ textIndent: "2em" }}><span>平台：</span>{record.platform}</p>
                        <p style={{ textIndent: "2em" }}><span>站点：</span>{record.site}</p>
                        <p><span>销售账号：</span>{record.account}</p>
                    </div>)
                }
            },
            {
                title: '刊登信息',
                width: 100,
                key: "stateDesc",
                render: (text, record, index) => {
                    return (<div className="publish-batch-table-dispose">
                        <p><span>刊登状态：</span>{record.stateDesc}</p>
                        <p><span>刊登人员：</span>{record.creator}</p>
                        <p><span>刊登时间：</span>{record.createTime ? timestampFromat(Number(record.createTime), 0) : "--"}</p>
                    </div>)
                }
            },
            {
                title: '同步结果信息',
                width: 100,
                key: "successTime",
                render: (text, record, index) => {
                    let len = this.getLength(record.failDesc);
                    return (<div className="publish-batch-table-dispose">
                        <p><span>成功时间：</span>{record.successTime ? timestampFromat(Number(record.successTime), 0) : "--"}</p>
                        <p><span>失败时间：</span>{record.failTime ? timestampFromat(Number(record.failTime), 0) : "--"}</p>
                        <div className="publish-batch-table-dispose-div">
                            <span className="publish-batch-table-dispose-span">失败原因：</span>
                            <div className="publish-batch-table-dispose-textarea">
                                {record.failDesc || "--"}
                            </div>
                            {

                                len > 54 ?
                                    <span
                                        onClick={() => this.showModal(record.failDesc, "错误信息")}
                                        className="publish-batch-table-dispose-show">
                                        展开
                                        </span>
                                    : null
                            }
                        </div>
                    </div>)
                }
            },
        ];
    }
    getLength = (str) => {
        var realLength = 0,
            len = str.length,
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
                realLength += 1;
            else
                realLength += 2;
        }
        return realLength;
    };
    showText = (record) => {
        var { getListAction, listData } = this.props
        var { total, list } = listData
        record.__isSHow = true;
        getListAction({ list, total })
    }
    showModal = (v, title) => {
        this.setState({
            visible: true,
            title,
            data: v
        })
    }
    cancel = () => {
        this.setState({
            visible: false,
            data: []
        })
    }
    Paginatihandle = (page, pageSize) => {
        var { getListActionAsync } = this.props
        var params = this.props.getParams()
        params.pageNumber = page
        params.pageData = pageSize
        getListActionAsync(params)
    }

    importHandle = ()=>{
        const params = this.props.getParams();
        if(!params.platform) return message.warning("请先选择平台");
        if(params.searchType !== 3 || !params.searchContent) return message.warning("请先输入刊登人员");
        if(!params.createTime || !params.createTime.length) return message.warning("请先选择刊登时间");
        params.modelName = "plsEbayFileTask"
        params.pageData = 2000
        params.pageNumber = 1
        PopConfirm('是否确认导出？', '', () => this.exportHandle(params)) 
    }
    exportHandle = (params) => {
        this.props.exportFileAction(params)
            .then(reuslt => {
                if (reuslt) {
                    message.success("导出成功,可在导出队列查看进度")
                }
            })
    }

    downFile = (url) => {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    render() {

        var { listData, loadingData, paramsData } = this.props
        var { visible, data, title } = this.state
        var { total, list } = listData
        datasaddkey(list)
        var { pageNumber, pageData } = paramsData
        var columns = typeof this.columns == "function" ? this.columns() : this.columns;
        var table = (
            <div>
                <Functions {...this.props} functionkey="008-000004-000002-002">
                    <div className="text-right margin-ss-bottom">
                        <Button onClick={this.importHandle}>导出</Button>
                    </div>
                </Functions>
                <Spin spinning={loadingData} delay={500} tip="Loading...">
                    <Table
                        bordered={true}
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={columns} />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageData}
                        onChange={this.Paginatihandle} />
                </Spin>
            </div>
        )
        return (
            <div className="publish-batch-tablewrap">
                {table}

                <Modal
                    title={title}
                    width={600}
                    // centered
                    visible={visible}
                    footer={null}
                    onCancel={this.cancel}>
                    <TextArea autosize readOnly value={data}></TextArea>
                </Modal>
            </div>
        )
    }

}