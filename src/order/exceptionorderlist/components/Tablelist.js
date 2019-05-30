/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--列表组件
 *参数说明:
 *时间: 2018/5/29 15:26
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as config from 'util/connectConfig'
import {
    Form,
    Button,
    Select,
    Checkbox,
    Table,
    Pagination,
    message,
    Spin,
    Input,
    Menu,
    Icon,
    Dropdown
} from 'antd'
import '../css/css.css'
import { levelOptions } from '@/util/options';

import {
    timestampFromat,
    datasaddkey,
    objTodata,
    getrangetime,
    getGangeGimes,
    functions,
    downloadUrl
} from '@/util/baseTool';
import { Link } from 'react-router-dom'
import axios from "@/util/axios";
import PopConfirm from "@/common/components/confirm";
import {fetchPost} from "@/util/fetch";
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';
import AuditModal from './AuditModal';

class Tablelist extends Component {

    state = {
        export: false,
        isSelectAllBoxStatus: false,
        //批量审核状态
        checkArr: [1, 2, 3, 5, 6, 88],
        //批量撤单状态
        revokeArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 88],
        //重新分仓、手工分仓
        separateArr: [9],
        batchHWSeparateVisible: false,  // 批量手工分仓弹窗开关
        batchAuditVisible: false,   // 批量审核弹窗开关
        keysArr: [],    // 批量审核keys
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({ selectedRowKeys, selectedRows });
        if (this.isSelectAll(selectedRows)) {
            this.setState({
                isSelectAllBoxStatus: true
            })
        } else {
            this.setState({
                isSelectAllBoxStatus: false
            })
        }
        this.setState({ keysArr: selectedRowKeys });
    }

    /**
     * 作者：魏洁
     * 描述：清除全选状态
     * 时间：2018-4-17
     * @param <Object> data
     */
    clearSelectAll = () => {
        this.props.tablemodelaction({ selectedRows: [], selectedRowKeys: [] });
        this.setState({
            isSelectAllBoxStatus: false
        })
    }

    Paginatihandle = (page, pageSize) => {
        this.props.onSearch(page, pageSize);
    }

    export = () => {
        const params = this.props.filterSearchParams();
        delete params.pageNumber;
        delete params.pageData;
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/exportOrder', params, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.setState({export: true})
                    window.location.href="/order/basicdata/importexportrecords/"
                }
            })
    }
    /**
     * 作者：魏洁
     * 描述：获取 columns
     * 时间：2018-4-17
     * @param <Object> data
     */
    getColumns = () => {

        var type = Number(this.getExceptionType())
        var newcolumns = [
            {
                title: '序号',
                dataIndex: 'sid',
                width: 60,
                render: (text, record, index) => ++index + (this.props.Paginationmodel.current - 1) * this.props.Paginationmodel.pageSize
            }, {
                title: '单号',
                render: (text, record, index) => {
                    const url = `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.yksOrderNumber}`
                    return (
                        <div className="order-tablelist-div" style={{minWidth: 170}}>
                            <p><span className="order-tablelist-span1">YKS单号:</span>
                            {
                                <Link to={url} className={'bcolor breakwrod order-tablelist-span3'} target="_blank">{record.yksOrderNumber}</Link>
                            }
                            </p>
                            <p><span className="order-tablelist-span1">平台单号:</span>
                            <span className="order-tablelist-span3">{record.platformOrderNumber}</span></p>
                        </div>
                    )
                }
            }, {
                title: '平台',
                render: (text, record, index) => {
                    return (
                        <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 150}}>
                            <p><span>销售平台:</span><span>{record.platformName}</span></p>
                            <p><span>销售账号:</span><span>{record.saleAccount}</span></p>
                            <p><span>买家账号:</span><span>{record.buyerAccount}</span></p>
                            <p><span>国家全称:</span><span>{record.countryName}</span></p>
                        </div>
                    );
                }
            }, {
                title: '金额',
                render: (text, record, index) => {
                    return (
                        <div className="order-tablelist-div" style={{minWidth: 160}}>
                            <p><span className="order-tablelist-span2">订单总金额:</span><span>{`${record.currencyName} ${record.orderAmount}`}</span></p>
                            <p><span className="order-tablelist-span2">卖家实收金额:</span><span>{`${record.currencyName} ${record.sellerIncomeAmount}`}</span></p>
                        </div>
                    );
                }
            }, {
                title: '时间',
                render: (text, record, index) => {
                    return (
                        <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 140}}>
                            <p><span>抓单时间:</span><span>{timestampFromat(record.grabTime, 2)}</span></p>
                            <p><span>付款时间:</span><span>{timestampFromat(record.paymentTime, 2)}</span></p>
                        </div>
                    );
                }
            }, {
                title: '状态',
                render: (text, record, index) => {
                    return (
                        <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 140}}>
                            <p><span>订单状态:</span><span>{record.orderStateName}</span></p>
                            <p><span>订单来源:</span><span>{record.orderTypeName}</span></p>
                            <p><span>异常类型:</span><span className="colorRed">{record.exceptionType}</span></p>
                        </div>
                    );
                }
            },
        ];
        let obj = {
            title: '操作',
            width: 70,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.yksOrderNumber}`
                const type = Number(this.getExceptionType())
                const { checkArr } = this.state;
                let arrBtn = [];
                if (checkArr.indexOf(type) !== -1) {
                    arrBtn.push(<a onClick={() => {
                        this.handleAuditOrRevoke(record.yksOrderNumber, true)
                    }} href="javascript:;">
                        审核
                    </a>)
                }
                const content = functions(this, '001-000002-000002-002') ? <Link key="view" to={url} target="_blank">修改</Link> : null
                arrBtn.unshift(content)
                if (record.orderStateName == "分仓失败") {
                    arrBtn.push(
                        <span
                            className={'text-success cursor-pointer'}
                            onClick={() => PopConfirm('是否进行重新分仓？', '', () => this.branchWarehouse(record.yksOrderNumber))}
                        >重新分仓</span>)
                }
                if (arrBtn.length >= 3) {
                    let item = arrBtn.shift()
                    let menu = <Menu>
                        {
                            arrBtn.map((v, k) => {
                                return (<Menu.Item key={k}>
                                    {v}
                                </Menu.Item>)
                            })
                        }
                    </Menu>
                    let more = <Dropdown key={"Dropdown"} overlay={menu}>
                        <a className="ant-dropdown-link" href="javascript:;">
                            更多 <Icon type="down" />
                        </a>
                    </Dropdown>
                    return <div className="exc-somehandle">
                        {item}
                        <span className="verticallinea">|</span>
                        {more}
                    </div>
                } else if (arrBtn.length == 2) {
                    return <div className="exc-somehandle">
                        {arrBtn[0]}
                        <span className="verticallinea">|</span>
                        {arrBtn[1]}
                    </div>
                }
                return (
                    <div className="exc-somehandle">
                        {arrBtn}
                    </div>
                )
            },
        }
        if ( !type ){
            newcolumns.push({
                title: '留言/异常原因',
                key: 'buyerMsgOrExpReason',
                width: 180,
                render: (text, record) => {
                    return <div className="exc-autoScroll">{record.exceptionType === '买家留言' ? record.buyerLeaveMsg : record.exceptionContent}</div>
                }
            });
        } else if ( type && type === 6) {
            newcolumns.push({
                title: '买家留言',
                dataIndex: 'buyerLeaveMsg',
                width: 180,
                render: (text) => {
                    return <div className="exc-autoScroll">{text}</div>
                }
            });
        } else {
            newcolumns.push({
                title: '异常原因',
                dataIndex: 'exceptionContent',
                width: 180,
                render: (text) => {
                    return <div className="exc-autoScroll">{text}</div>
                }
            });
        }
        newcolumns.push(obj)
        return newcolumns
    }
    /**
     * 作者：魏洁
     * 描述：全选与反选回调
     * 时间：2018-4-17
     */
    selectAll = (result) => {
        result.stopPropagation();
        var flag = result.target.checked;
        this.setState({
            isSelectAllBoxStatus: flag
        })
        var selectedRows = [];
        var selectedRowKeys = [];
        var { data } = this.props.tablemodel;
        if (flag) {
            selectedRows = datasaddkey(data)
            selectedRowKeys = selectedRows.map(v => v.key)
        }
        this.props.tablemodelaction({ selectedRowKeys, selectedRows });
    }

    /**
     * 作者：魏洁
     * 描述：是否已经全部选择
     * 时间：2018-4-17
     * @param <Object> data
     */
    isSelectAll = (selectedRows) => {
        var { data } = this.props.tablemodel;
        const newdata = datasaddkey(data)
        return selectedRows && selectedRows.length == newdata.length
    }
    /**
     * 作者：魏洁
     * 描述：获取异常状态
     * 时间：2018-4-17
     */
    getExceptionType = () => {
        return this.props.exceptiontypemodel || 0
    }
    /**
     * 作者：魏洁
     * 描述：获取管理按钮
     * 时间：2018-4-17
     */
    getControlBtn = () => {
        const type = Number(this.getExceptionType());
        const { checkArr, revokeArr, separateArr } = this.state;
        const menu = <Menu>
            {/* {
                checkArr.indexOf(type) !== -1 ? 
                    <Menu.Item key={1}><a onClick={() => PopConfirm('是否批量审核所有选中项数据？', '', () => this.handleCheckAll(0)) }>批量审核</a></Menu.Item> 
                : null
            } */}
            {
                revokeArr.includes(type) || checkArr.includes(type) ? 
                    <Menu.Item key={2}>
                        {/* <a onClick={() => PopConfirm('是否批量撤销所有选中项数据？', '', () => this.handleBatchCancel()) }>批量撤单</a> */}
                        <a onClick={() => this.handleBatchAudit()}>批量审核</a>
                    </Menu.Item> 
                : null
            }
            {
                separateArr.indexOf(type) !== -1 ? 
                    <Menu.Item key={3}><a onClick={() => PopConfirm('是否对所有选中项数据进行批量重新分仓？', '', () => this.batchBranchWarehouse()) }>重新分仓</a></Menu.Item>
                : null
            }
            {
                separateArr.indexOf(type) !== -1 ? 
                    <Menu.Item key={4}><a onClick={ () => this.batchHandworkSeparate()}>手工分仓</a></Menu.Item>
                : null
            }
        </Menu>
        const batchOptionBtn = checkArr.indexOf(type) !== -1 || revokeArr.indexOf(type) !== -1 || separateArr.indexOf(type) !== -1 ? 
            <Dropdown key={"Dropdown"} overlay={menu}>
                <Button className="ant-dropdown-link" href="javascript:;">
                    批量操作 <Icon type="down" />
                </Button>
            </Dropdown>
            : null;
        return (
            <div>
                {
                    batchOptionBtn
                }
                {
                    functions(this, '001-000002-000002-003') ? <Button icon="upload" onClick={this.export} disabled={this.state.export} className="exceptionorderlist-exportbtn">
                        订单导出
                    </Button> : null
                }
            </div>
        )
    }

    // 批量重新分仓
    batchBranchWarehouse = () => {
        const { selectedRows } = this.props.tablemodel;
        const { redoSeparateWarehouseAsync } = this.props;
        let keys = [];
        for (let i = 0; i < selectedRows.length; i++) {
            if (selectedRows[i].orderStateName === "分仓失败") {
                keys.push(selectedRows[i].yksOrderNumber)
            }
        }
        if (!keys.length) return message.warning("请先选择分仓失败订单");
        redoSeparateWarehouseAsync({ data: keys })
            .then(result => {
                if (result.state === '000001') {
                    message.success(result.msg)
                    this.Paginatihandle()
                    this.props.tablemodelaction({ selectedRowKeys: [] });
                }
            })
    }

    // 重新分仓
    branchWarehouse = (keys) => {
        const { redoSeparateWarehouseAsync } = this.props;
        if (!keys) return message.warning("请先选择分仓失败订单")
        redoSeparateWarehouseAsync({ data: [keys] })
            .then(result => {
                if (result) {
                    message.success(result.msg)
                    this.Paginatihandle()
                }
            })
    }

    // 批量手工分仓
    batchHandworkSeparate = () => {
        this.setState({ batchHWSeparateVisible: true });
    }

    // 关闭批量手工分仓弹窗函数
    closeHandworkSeparateModal = () => {
        this.setState({ batchHWSeparateVisible: false });
    }


    /**
     * 作者：魏洁
     * 描述：获取列表 左侧chekebox 是否显示
     * 时间：2018-4-17
     */
    isShowBox = () => {
        var type = Number(this.getExceptionType())
        var checkArr = this.state.checkArr;
        var revokeArr = this.state.revokeArr;
        var separateArr = this.state.separateArr;
        return checkArr.indexOf(type) != -1 || revokeArr.indexOf(type) != -1 || separateArr.indexOf(type) != -1
    }

    /**
     * 列表单独审核
     */
    handleAuditOrRevoke = (yksOrderNumber, f) => {
        this.setState({
            keysArr: [yksOrderNumber],
            batchAuditVisible: true,
        });
    }

    // 批量审核
    handleBatchAudit = () => {
        const { keysArr } = this.state;
        if ( keysArr && keysArr.length === 0 ) {
            message.warning('无选中订单');
            return;
        }
        this.setState({ batchAuditVisible: true });
    }

    // 批量审核弹窗 - 打开
    openBatchAuditModal = () => {
        this.setState({ batchAuditVisible: true });
    }

    // 批量审核弹窗 - 关闭
    closeBatchAuditModal = () => {
        this.setState({
            batchAuditVisible: false,
            keysArr: [],
        });
    }    

    render() {
        const { data } = this.props.tablemodel;
        const { batchHWSeparateVisible, batchAuditVisible, keysArr, checkArr, revokeArr } = this.state;
        const { pageNumber, pageData } = this.props;
        const newdata = datasaddkey(data.data);
        const columns = this.getColumns();
        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            columnWidth: "40px",
        };
        const exceptionType = Number(this.getExceptionType());
        const ifHidingRadio = !checkArr.includes(exceptionType) && revokeArr.includes(exceptionType);
        return (
            <div className="newCluenk margin-ms-top">
                <div className="padding-sm-top padding-sm-left" style={{overflow: 'hidden'}}>
                    {
                        this.getControlBtn()
                    }
                </div>
                <div className="content exc-content">
                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table
                            rowSelection={this.isShowBox() ? rowSelection : null}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                            rowKey={record => record.yksOrderNumber}
                        />
                    </Spin>
                    <div className="pr">
                        {
                            this.isShowBox() ?
                                <Checkbox
                                    checked={this.state.isSelectAllBoxStatus}
                                    className="pa select-all"
                                    onChange={this.selectAll}>
                                    全选
                                </Checkbox>
                                : null
                        }
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={levelOptions('分页显示条数')}
                            showSizeChanger showQuickJumper={{ goButton: true }}
                            current={this.props.Paginationmodel.current}
                            defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                            total={this.props.Paginationmodel.total}
                            pageSize={this.props.Paginationmodel.pageSize}
                            onChange={this.Paginatihandle} />
                    </div>
                </div>
                <BatchOptionModal
                    title="批量手工分仓"
                    visible={batchHWSeparateVisible}
                    closeModal={this.closeHandworkSeparateModal}
                    url="/oms/order/manage/motan/service/api/IOrderManageService/batchImportSplitOrder"
                    templateUrl={downloadUrl('/download/oms/batch-separate2.xlsx')}
                    fileSize={2}
                    maxCount={10000}
                />
                <AuditModal
                    visible={batchAuditVisible}
                    closeModal={this.closeBatchAuditModal}
                    handleSubmit={() => this.props.onSearch(pageNumber, pageData)}
                    keysArr={keysArr}
                    ifHidingRadio={ifHidingRadio}
                    exceptionType={exceptionType}
                />
            </div>

        );
    }
}

export default Tablelist
