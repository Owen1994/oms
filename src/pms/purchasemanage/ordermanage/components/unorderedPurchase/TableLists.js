import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Button,
    message,
} from 'antd';
import { Link } from 'react-router-dom';
import { levelOptions } from '../../../../../util/options';
import { getLoginmsg } from '../../../../../util/baseTool';
import Functions from '../../../../../components/functions';
import imgQQ from '../../../documentarymanage/img/qq.png';
import imgWangWang from '../../../documentarymanage/img/wangwan.png';
import { parseStrToArray } from '@/util/StrUtil';
import { setPageCache } from '../../../../../util/PageCache';
import {getTimeStamp} from "../../../../../compliance/utils";
import LogisticsCom from './logisticsCom';
import { fetchPost } from "../../../../../util/fetch";
import { SYS_PURCHASE_PLAN } from "../../constants";


export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        logisticsVisible: false,
    }

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];
    listOeEmployee = [{key: '0', label: '全部'}];
    columns = [
        {
            title: '供应商',
            width: 150,
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: '供应商评级',
            dataIndex: 'supplierLevel',
            width: 60,
            key: 'supplierLevel',
        },
        {
            title: '付款方式',
            dataIndex: 'payType',
            width: 60,
            key: 'payType',
        },
        {
            title: '状态',
            dataIndex: 'state',
            width: 60,
            key: 'state',
            render: text => (<span className={text === '已禁用' ? 'red' : ''}>{text}</span>),
        },
        {
            title: '联系方式',
            dataIndex: 'contactType',
            width: 100,
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
                        <span>{record.contactPhone}</span>
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
            title: '预订货SKU个数',
            dataIndex: 'skuCount',
            width: 60,
            key: 'skuCount',
        },
        {
            title: '预订货数量',
            dataIndex: 'preOrderCount',
            width: 60,
            key: 'preOrderCount',
        },
        {
            title: '预订货金额',
            dataIndex: 'preOrderMoney',
            width: 100,
            key: 'preOrderMoney',
        },
        {
            title: '缺货SKU个数',
            dataIndex: 'outOfStockCount',
            width: 60,
            key: 'outOfStockCount',
        },
        {
            title: '核查中SKU个数',
            dataIndex: 'checkOfStockCount',
            width: 60,
            key: 'checkOfStockCount',
        },
        {
            title: '操作',
            dataIndex: 'permissions',
            width: 100,
            key: 'permissions',
            render: (Text, r) => {
                const checkUrl = `/pms/purchasemanage/ordermanage/detaillist/?id=${r.key}`;
                return (
                    <div>
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000001-003"
                        >
                            <Link to={checkUrl} target="_blank" onClick={() => {
                                    const searchData = this.props.form.getFieldsValue(); // searchType
                                    const times = searchData.demandTimes ? searchData.demandTimes.map(t => getTimeStamp(t)) : [];

                                    let arrayContents = undefined;
                                    if (searchData.searchType !== 2) {
                                        arrayContents = parseStrToArray(searchData.searchContents);
                                    }

                                    let purchaseDevelop = undefined;
                                    if (searchData.purchaseDevelop) {
                                        if (!Array.isArray(searchData.purchaseDevelop)) {
                                            purchaseDevelop = this.listOeEmployee;
                                        } else{
                                            purchaseDevelop = searchData.purchaseDevelop;
                                        }
                                    }

                                    let oeEmployee = undefined;
                                    if (searchData.oeEmployee) {
                                        if (!Array.isArray(searchData.oeEmployee)) {
                                            oeEmployee = this.list;
                                        } else {
                                            oeEmployee = searchData.oeEmployee;
                                        }
                                    }

                                    const dataURL = {
                                        id:r.key,
                                        ...searchData,
                                        purchaseDevelop,
                                        oeEmployee,
                                        searchContents: arrayContents,
                                        demandTimes: times,
                                    };
                                    setPageCache(dataURL, "unorderedPurchase")
                                }}>展开明细</Link>
                        </Functions>
                    </div>
                );
            }
        },
    ];

    // 更新最低价供应商
    updata = () => {
        fetchPost(SYS_PURCHASE_PLAN,{data: undefined}, 2).then((result) => {
            if (result.state === '000001') {
                message.success('更新最低价供应商!');
                this.props.onSearch();
            }
        });
    }
   
    //  生成PO
    createPo = () => {
        if (!this.state.selectedRowKeys.length) return message.warning('请先选择项');
        this.setState({
            logisticsVisible: true,
            logisticsData: this.state.selectedRowKeys,
        });
    }

    // 关闭弹窗
    poCancel = (flag) => {
        this.setState({
            logisticsVisible: false,
            logisticsData: [],
            selectedRowKeys: []
        });
        if (flag) {
            this.props.onSearch();
        }
    }
   
    render() {
        const { orderManagementList, onSearch,showExport,showImport } = this.props;
        const {
            total,
            list,
            params,
            loading,
        } = orderManagementList;
       
        const pageNumber = this.props.pageNumber;
        const pageData = this.props.pageSize;
        const { selectedRowKeys, importFileVisible, logisticsVisible,logisticsData  } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                this.setState({
                    selectedRowKeys: rowKeys,
                });
            },
        };

        const table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <div className="padding-lg-bottom">
                    <Functions
                            {...this.props}
                            functionkey="010-000003-000001-015"
                        >
                    <Button
                            className="margin-sm-bottom pull-left"
                            onClick={this.createPo}
                        >
                            生成PO
                            </Button>
                    </Functions>        
                    <Functions
                            {...this.props}
                            functionkey="010-000003-000001-010"
                        >
                        <Button
                            className="margin-sm-bottom pull-right"
                            onClick={()=>showImport()}
                        >
                            导入更换供应商
                            </Button>
                     </Functions>       
                         <Functions
                            {...this.props}
                            functionkey="010-000003-000001-009"
                        >
                        <Button
                            icon="upload"
                            className="margin-sm-right margin-sm-bottom pull-right"
                            onClick={showExport}
                        >
                            数据导出
                            </Button>
                        </Functions>    
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000001-011"
                        >
                        <Button
                            icon="sync"
                            className="margin-sm-right margin-sm-bottom pull-right"
                            onClick={this.updata}
                        >
                            更新最低价供应商
                        </Button>
                        </Functions>
                    </div>
                    <Table
                        bordered
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={this.columns}
                        rowSelection={rowSelection}
                    />
                    <Pagination
                        showTotal={t => `共 ${t} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={total}
                        pageSize={pageData}
                        onChange={onSearch}
                    />
                </div>
            </Spin>
        );
        return (
            <div>
                {table}
                <LogisticsCom
                    visible={logisticsVisible}
                    data={logisticsData}
                    // supplierId={supplierId}
                    onCancel={this.poCancel}
                    // logisticsAsync={logisticsAsync}
                    onSearch={this.handleSearch}
                    selectedRowKeys={selectedRowKeys}
                    {...this.props}
                    // orderDetailGeneratePoAsync={orderDetailGeneratePoAsync}

                />
            </div>
        );
    }
}
