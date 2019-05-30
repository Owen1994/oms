import React from 'react'

import {
    Button,
    Table,
    Spin,
    message,
    Pagination,
} from 'antd'
import Functions from '../../../../components/functions'
import {
    datasaddkey
} from "../../../../util/baseTool"
import { levelOptions } from '../../../../util/options';
import PopConfirm from '../../../../common/components/confirm'
import AddModal from "./modal"
export default class Tablelist extends React.Component {
    state = {
        visible: false,
        modiferData: {},
        title: "添加品牌设置"
    }
    changeModal = (p, title) => {
        if (!p) {
            this.setState({ visible: p, modiferData: {} })

        }
        this.setState({ visible: p, title })
    }
    modifer = (p) => {
        this.setState({ modiferData: p })
        this.changeModal(true, "编辑品牌设置")
    }
    columns = () => {
        return this.columns = [
            {
                title: '平台',
                dataIndex: 'platformCodeDesc',
                width: 60,
                key: 'platformCodeDesc',
            },
            {
                title: '站点',
                dataIndex: 'siteCode',
                width: 60,
                key: 'siteCode',
            },
            {
                title: '销售账号',
                dataIndex: 'account',
                width: 80,
                key: 'account',
                render: (text) => {
                    return <span className="breakwrod">{text}</span>
                }
            },
            {
                title: '配置信息',
                dataIndex: 'brand',
                width: 140,
                key: 'brand',
                render: (text, record) => {
                    var flag = record.platformCode === "SHOPEE" && (!record.bannerImage || record.bannerImage === "--")
                    if (record.platformCode === "EBAY") {
                        return <p className="breakwrod">PayPal账号：{record.paypalAccounts.join('，')}</p>
                    }
                    return <div style={{ "textAlign": "left" }}>
                        <p  style={ {textIndent:"2.1em"}}>品牌：<span className="breakwrod">{record.brand}</span></p>
                        {
                            flag ?
                            record.daysToShip ?
                                <p style={ {textIndent:"2.1em"}}>预购：<span className="breakwrod">YES（{record.daysToShip}内发货）</span></p>
                                :
                                <p style={ {textIndent:"2.1em"}}>预购：<span className="breakwrod">NO（3天内发货）</span></p>
                            :
                            <p>banner图：<span className="breakwrod">{record.bannerImage}</span></p>
                        }
                    </div>
                }
            },
            {
                title: '添加人/添加时间',
                dataIndex: 'creator',
                width: 140,
                key: 'creator',
                render: (text, record) => {
                    return <div style={{ "textAlign": "left" }}>
                        <p style={{textIndent:"1em"}}>添加人：<span className="breakwrod">{record.creator}</span></p>
                        <p>添加时间：<span className="breakwrod">{record.createTime}</span></p>
                    </div>
                }
            },
            {
                title: '最新修改人员/最新修改时间',
                dataIndex: 'modifer',
                width: 140,
                key: 'modifer',
                render: (text, record) => {
                    return <div style={{ "textAlign": "left" }}>
                        <p>最新修改人员：<span className="breakwrod">{record.modifer}</span></p>
                        <p>最新修改时间：<span className="breakwrod">{record.modifyTime}</span></p>
                    </div>
                }
            },
            {
                title: '操作',
                dataIndex: 'handle',
                width: 60,
                key: 'handle',
                render: (text, record) =>
                    <div style={{ "textAlign": "center" }}>
                        <Functions {...this.props} functionkey={'008-000002-000006-003'}>
                            <a onClick={() => this.modifer(record)}
                                style={{ marginLeft: '10px' }}>
                                编辑
                            </a>
                        </Functions>
                        <Functions {...this.props} functionkey={'008-000002-000006-004'}>
                            <a onClick={() => PopConfirm('是否确认要删除？', '', () => this.delHandle(record))}
                                style={{ marginLeft: '10px' }}>
                                删除
                            </a>
                        </Functions>
                    </div>
            },
        ];
    }
    delHandle = (record) => {
        let { delAction, getList } = this.props;
        delAction({ data: { id: record.id, modelName: "accountConfig" } })
            .then(r => {
                if (r) {
                    message.success(r.msg)
                    getList()
                }
            })
    }
    Paginatihandle = (page, pageSize) => {
        var { getListActionAsync, paramsData } = this.props
        var params = paramsData
        params.pageNumber = page
        params.pageData = pageSize
        getListActionAsync(params)
    }
    render() {
        var { visible, modiferData, title } = this.state
        var { listData, loadingData, paramsData, getList } = this.props
        var { total, list } = listData;
        datasaddkey(list)
        var { pageNumber, pageData } = paramsData
        var columns = typeof this.columns == "function" ? this.columns() : this.columns;
        var buttons = (
            <Functions {...this.props} functionkey={'008-000002-000006-002'}>
                <div className="lazadaaccountconf-tablewrap-btns">
                    <Button icon="plus" onClick={() => this.changeModal(true, "添加品牌设置")} className="pull-right">
                        <span>新增</span>
                    </Button>
                </div>
            </Functions>
        )
        var table = (
            <Spin spinning={loadingData} delay={500} tip="Loading...">
                <div>
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
                        // defaultCurrent={1} 
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageData}
                        onChange={this.Paginatihandle} />
                </div>
            </Spin>
        )
        return (
            <div className="lazadaaccountconf-tablewrap">
                {buttons}
                {table}
                <AddModal
                    {...this.props}
                    getLis={getList}
                    modiferData={modiferData}
                    title={title}
                    changeModal={this.changeModal}
                    visible={visible}>
                </AddModal>
            </div>
        )
    }

}
// <Functions {...this.props} functionkey="008-000004-000001-002">
//                 <Button onClick={modalShow} className="pull-right margin-sm-right">
//                     <Icon type="download" />
//                     <span>导入</span>
//                 </Button>
//             </Functions>