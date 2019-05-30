import React from 'react';
import {
    Button,
    Pagination,
    Spin,
    Table,
} from 'antd';
import { Link } from 'react-router-dom';
import Functions from '../../../../components/functions';
import { getTimeStamp } from "../../../../compliance/utils";
import { parseStrToArray } from "../../../../util/StrUtil";
import { setPageCache } from '../../../../util/PageCache';
import { getLoginmsg } from "../../../../util/baseTool";

const imgQQ = require('../img/qq.png');

const imgWangWang = require('../img/wangwan.png');

export default class TableList extends React.Component {

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];
    listOpEmployee = [{key: '0', label: '全部'}];

    columns = [
        {
            title: '供应商',
            dataIndex: 'supplier',
        },
        {
            title: '采购金额',
            dataIndex: 'purchaseAmount',
        },
        {
            title: '在途SKU数',
            dataIndex: 'skuNumber',
        },
        {
            title: '在途SKU数量',
            dataIndex: 'skuCount',
        },
        {
            title: '联系方式',
            dataIndex: 'contactType',
            render: (text, record) => {
                const isShowQQ = record.qq ? (record.qq.length !== 0) : false;
                const isShowWanWan = record.aliWangWang ? (record.aliWangWang.length !== 0) : false;
                const QQ = `tencent://message/?uin=${record.qq}`;
                const WangWang = `https://amos.im.alisoft.com/msg.aw?v=2&uid=${record.aliWangWang}&site=cntaobao&s=2&charset=utf-8`;
                const vQQ = (
                    <a href={QQ} target="_blank" rel="nofollow me noopener noreferrer">
                        <img
                            className="documentary_list_table_img"
                            src={imgQQ}
                            alt="QQ"
                            width="14px"
                            height="14px"
                        />
                    </a>
                );

                const vWangWang = (
                    <a href={WangWang} target="_blank" rel="nofollow me noopener noreferrer">
                        <img
                            className="documentary_list_table_img"
                            src={imgWangWang}
                            alt="WangWang"
                            width="14px"
                            height="14px"
                        />
                    </a>
                );
                return (
                    <div>
                        <span>{record.contactName}</span>
                        <span>:</span>
                        <span>{record.telPhone}</span>
                        {
                            isShowQQ ? vQQ : null
                        }
                        {
                            isShowWanWan ? vWangWang : null
                        }
                    </div>
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'processingResult',
            render: (text, record) => {
                // const checkUrl = `/pms/purchasemanage/documentarymanage/detail/?id=${record.key}&data=${JSON.stringify(dataURL)}`;
                const checkUrl = `/pms/purchasemanage/documentarymanage/detail/?id=${record.key}`;
                const data = {
                    LogModalVisible: true,
                    items: record,
                };
                return (
                    <div>
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000003-004"
                        >
                            <span className="margin-ss-right">
                                <Link to={checkUrl} target="_blank" onClick={() => {
                                    const searchData = this.props.form.getFieldsValue(); // searchType
                                    const times = searchData.wareHouseTimes ? searchData.wareHouseTimes.map(t => getTimeStamp(t)) : [];

                                    let arrayContents = undefined;
                                    if (searchData.searchType !== 2) {
                                        arrayContents = parseStrToArray(searchData.searchContents);
                                    }

                                    let merchandiser = undefined;
                                    if (searchData.merchandiser) {
                                        if (!Array.isArray(searchData.merchandiser)) {
                                            merchandiser = this.list;
                                        } else {
                                            merchandiser = searchData.merchandiser;
                                        }
                                    }

                                    let opEmployee = undefined;
                                    if (searchData.opEmployee) {
                                        if (!Array.isArray(searchData.opEmployee)) {
                                            opEmployee = this.listOpEmployee;
                                        } else {
                                            opEmployee = searchData.opEmployee;
                                        }
                                    }
                                    const dataURL = {
                                        id: record.key,
                                        ...searchData,
                                        merchandiser,
                                        opEmployee,
                                        searchContents: arrayContents,
                                        wareHouseTimes: times,
                                    };
                                    setPageCache(dataURL, "kDocumentaryManageSearch")
                                }}>展开明细</Link>
                            </span>
                        </Functions>

                        <Functions
                            {...this.props}
                            functionkey="010-000003-000003-003"
                        >
                            <span className="margin-ss-right">
                                <a onClick={this.props.showAKeyExpediteOrderModal.bind(null, data)}>
                                一键催货
                                </a>
                            </span>
                        </Functions>
                    </div>
                );
            },
        }];

    render() {
        const {
            pageNumber,
            pageSize,
            documentaryData,
            loadingData,
            onSearch,
            showExpeditingTemplateModal,
            showImport,
            showExport,
        } = this.props;
        const total = documentaryData.total;
        return (
            <div className="margin-ss-top padding-sm white">
                <Spin spinning={loadingData.loadingState} delay={500} tip="Loading...">

                    <div className="padding-lg-bottom">
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000003-006"
                        >
                            <Button
                                className="margin-sm-bottom pull-right"
                                onClick={() => showExpeditingTemplateModal(1)}
                            >
                                催货模板(QQ/旺旺)
                            </Button>
                        </Functions>

                        <Functions
                            {...this.props}
                            functionkey="010-000003-000003-005"
                        >
                            <Button
                                icon="upload"
                                className="margin-sm-right margin-sm-bottom pull-right"
                                onClick={() => showExport()}
                            >
                                导出
                            </Button>
                        </Functions>

                        <Functions
                            {...this.props}
                            functionkey="010-000003-000003-007"
                        >
                            <Button
                                icon="download"
                                className="margin-sm-right margin-sm-bottom pull-right"
                                onClick={() => showImport()}
                            >
                                导入跟进结果
                            </Button>
                        </Functions>
                    </div>


                    <Table
                        columns={this.columns}
                        dataSource={documentaryData.list}
                        pagination={false}
                        size="small"
                        rowKey={record => record.key}
                        bordered
                    />
                    <Pagination
                        showTotal={() => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        defaultPageSize={20}
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={total}
                        pageSize={pageSize}
                        onChange={onSearch}
                    />
                </Spin>
            </div>
        );
    }
}
