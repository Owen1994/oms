import React, { Component } from 'react';
import {
    Button, Icon, message,
    Pagination, Spin, Switch, Table, Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import Tableitem from '../../../../../components/Tableitem';
import PopConfirm from '../../../../../common/components/confirm';
import { fetchPost } from '../../../../../util/fetch';
import { DELETE_ITEM, EDIT_WRONG_REASON, PRINT_REJECTS_LABEL } from '../constants/Api';
import WrongReasonModal from './modal/WrongReasonModal';
import CGallery from '../../../../../components/cgallery';
import PrintSkuLabelModal from '../../../../common/components/modal/PrintSkuLabelModal';
import PrintErrorLabelModal from '../../../../common/components/modal/PrintErrorLabelModal';
import Functions from '../../../../../components/functions';
import { hasPerssion } from '../../../../../util/baseTool';


class TableList extends Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        showWrongReason: false,
        showPrintSKU: false,
        showPrintError: false,
        editKey: '',
        imgs: undefined,
        printModel: {
            params: {},
            printSum: 0,
        },
        printErrorModel: [],
        showCGallery: false,
    };

    columns = [
        {
            title: '图片',
            width: 200,
            render: (text, record) => {
                if (!record.imageList || record.imageList.length <= 0) {
                    return <div>{record.remarks}</div>;
                }
                return (
                    <div
                        onClick={() => {
                            this.setState({
                                imgs: record.imageList,
                                showCGallery: true,
                            });
                        }}
                    >
                        <img
                            className="group-img"
                            src={record.imageList && record.imageList[0].src}
                            alt=""
                            width="180px"
                            height="180px"
                        />
                    </div>
                );
            },
        },
        {
            title: '采购信息',
            dataIndex: 'purchaseNumber',
            width: 140,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right="100%"
                        title="采购单"
                        content={record.purchaseNumber}
                    />
                    <Tableitem
                        left={100}
                        right="100%"
                        title="采购员"
                        content={record.buyer}
                    />
                </div>
            ),
        },
        {
            title: '优先级',
            dataIndex: 'priorityName',
            width: 100,
        },
        {
            title: '产品信息',
            align: 'center',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right="100%"
                        title="中文名称"
                        content={record.productName}
                    />
                    <Tableitem
                        left={100}
                        right="100%"
                        title="产品编码"
                        content={
                            (
                                <Link
                                    to={`/wms/stockmanage/compareimage/detail/?sku=${record.sku}`}
                                    style={{ textDecoration: 'underline' }}
                                >{record.sku}
                                </Link>
                            )
                        }
                    />
                </div>
            ),
        },
        {
            title: '数量',
            width: 140,
            render: (text, record) => (
                <div>
                    <Tableitem
                        right={40}
                        left={80}
                        title="采购数量"
                        content={record.purchaseQuantity}
                    />
                    <Tableitem
                        right={40}
                        left={80}
                        title="到货数量"
                        content={record.arrivalQuantity}
                    />
                    {/* {<Tableitem */}
                    {/* right={40} */}
                    {/* left={80} */}
                    {/* title="缺货数量" */}
                    {/* content={record.outOfStock} */}
                    {/* />} */}
                </div>
            ),
        },
        {
            title: '是否已对图',
            dataIndex: 'isCheck',
            width: 100,
        },
        {
            title: '是否有误',
            dataIndex: 'isError',
            width: 100,
            render: (text, record) => {
                const isHasPerssion = !hasPerssion('012-000002-000002-002', this.props);
                return (
                    <div>
                        <Switch
                            disabled={isHasPerssion}
                            checkedChildren="是"
                            unCheckedChildren="否"
                            checked={text === '是'}
                            onChange={(check) => {
                                this.itemSwitchChange(record, check);
                            }}
                        />
                        <div style={{ display: text === '否' ? 'none' : 'block' }}>
                            {record.remarks && record.remarks.length > 5
                                ? (
                                    <Tooltip
                                        openClassName="wms-compareimage-pop"
                                        title={record.remarks}
                                    >
                                        {record.remarks.substr(0, 5)}
                                        <a>{'>>'}</a>
                                    </Tooltip>
                                ) : record.remarks}
                            <Icon
                                type="edit"
                                onClick={() => {
                                    this.itemSwitchChange(record, true);
                                }}
                            />
                        </div>
                    </div>
                );
            },
        },
        {
            title: '操作',
            width: 120,
            render: (text, record) => (
                <div>
                    <Functions
                        {...this.props}
                        functionkey="012-000002-000002-003"
                    >
                        <a
                            onClick={() => {
                                if (record.isError === '是') {
                                    this.printErrorLabel(record);
                                } else {
                                    const printModel = {
                                        params: {
                                            number: record.purchaseNumber,
                                            from: 'PC',
                                            sku: record.sku,
                                            key: record.key,
                                        },
                                        printSum: record.arrivalQuantity,
                                    };
                                    this.setState({
                                        showPrintSKU: true,
                                        printModel,
                                    });
                                }
                            }}
                        >
                            打印
                        </a>
                    </Functions>
                    <Functions
                        {...this.props}
                        functionkey="012-000002-000002-004"
                    >
                        <a
                            className="margin-ss-left"
                            onClick={() => PopConfirm('是否确认要删除？', '', () => {
                                this.deleteItem(record.key);
                            })}
                        >
                            删除
                        </a>
                    </Functions>
                </div>
            ),
        },
    ];

    /**
     * 打印不良品标签
     * @param record
     */
    printErrorLabel = (record) => {
        if (record.isCheck === 1) {
            this.setState({
                showPrintError: true,
                printErrorModel: [{
                    type: '1',
                    purchaseOrderNo: record.purchaseNumber,
                    sku: record.sku,
                    productName: record.productName,
                    buyer: record.buyer,
                    badReasons: record.remarks,
                }],
            });
            return;
        }
        fetchPost(PRINT_REJECTS_LABEL, {
            data: {
                key: record.key,
            },
        }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        showPrintError: true,
                        printErrorModel: [{
                            type: '1',
                            purchaseOrderNo: record.purchaseNumber,
                            sku: record.sku,
                            productName: record.productName,
                            buyer: record.buyer,
                            badReasons: record.remarks,
                        }],
                    });
                }
            });
    };

    /**
     *
     * @param itemKey 单个删除时的key
     */
    deleteItem = (itemKey) => {
        let keys = []; // 提交的选中条目Id
        if (itemKey) {
            keys.push(itemKey);
        } else {
            keys = this.state.selectedRowKeys;
        }
        if (keys.length <= 0) {
            message.error('请选择要删除的条目');
            return;
        }
        fetchPost(DELETE_ITEM, {
            data: {
                keys,
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                this.props.onChangeListener();
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
            }
        });
    };

    /**
     * 有误原因编辑
     * @param values
     * @param check 选择框最新状态
     */
    itemSwitchChange = (values, check) => {
        this.props.form.setFieldsValue({
            wrongReason: values.remarks,
        });
        if (!check) {
            this.editWrongReasonConfirm(values.key, -1);// 取消有误
            return;
        }
        this.setState({
            showWrongReason: check,
            editKey: values.key,
        });
    };

    /**
     * 修改有误原因
     * @param editKey
     * @param code -1为取消
     */
    editWrongReasonConfirm = (editKey, code) => {
        const isError = code !== -1 ? '1' : '2';// 1.是 2否
        if (code !== -1) { // modal弹框
            editKey = this.state.editKey;
        }
        this.props.form.validateFields(['wrongReason'], (error, values) => {
            if (!error) {
                fetchPost(EDIT_WRONG_REASON, {
                    data: {
                        isError,
                        wrongReason: values.wrongReason,
                        key: editKey,
                    },
                }, 1).then((result) => {
                    this.setState({
                        showWrongReason: false,
                    });
                    if (result.state === '000001') {
                        this.props.onChangeListener();
                    }
                });
            }
        });
    };

    handleImgClose = () => {
        this.setState({
            showCGallery: false,
            imgs: undefined,
        });
    };

    /**
     * 新增
     */
    addItem = (e) => {
        this.props.form.validateFields(['cardNumber'], (err) => {
            if (!err) {
                this.addCardRef.handleClick(e);
            }
        });
    };

    // /**
    //  * 跳转到打印SKU页面
    //  * @param labels
    //  */
    // toPrintSkuPage = (labels) => {
    //     const { sku, purchaseNumber, key } = this.state.printModel;
    //     const params = `sku=${sku}&number=${purchaseNumber}&key=${key}&from=PC&printLabels=${labels}`;
    //     const url = `/wms/stockmanage/compareimage/print/?${params}`;
    //     this.props.history.push(`${url}`);
    // };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        /**
         * table选中回调
         */
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                });
            },
            getCheckboxProps: () => ({
                disabled: false,
            }),
        };
        // const menu = (
        //     <Menu>
        //         <Menu.Item key="1">
        //             <Functions
        //                 {...this.props}
        //                 functionkey="012-000002-000002-004"
        //             >
        //                 <div
        //                     onClick={() => PopConfirm('是否确认要删除？', '', () => {
        //                         this.deleteItem(null);
        //                     })}
        //                 >
        //                     批量删除
        //                 </div>
        //             </Functions>
        //         </Menu.Item>
        //     </Menu>
        // );
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div className="margin-ss-bottom">
                        {/* <Dropdown overlay={menu}> */}
                        {/* <Button> */}
                        {/* <span>批量操作</span> <Icon type="down" /> */}
                        {/* </Button> */}
                        {/* </Dropdown> */}
                        <Functions
                            {...this.props}
                            functionkey="012-000002-000002-004"
                        >
                            <Button
                                onClick={() => PopConfirm('是否确认要删除？', '', () => {
                                    this.deleteItem(null);
                                })}
                            >
                                批量删除
                            </Button>
                        </Functions>
                        <Button className="pull-right" icon="plus" onClick={this.addItem}>
                            <span> 新增</span>
                            <Link
                                ref={link => this.addCardRef = link}
                                style={{ display: 'none' }}
                                to={`/wms/stockmanage/scanandcollect/?cardNumber=${this.props.form.getFieldValue('cardNumber')}`}
                            />
                        </Button>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                        rowClassName={(record) => {
                            if (record.isCheck === '是') {
                                return 'quality-row';
                            }
                            return record.priority && record.priority.code === '3' ? 'priority-row' : '';
                        }}
                    />
                    <Pagination
                        showTotal={t => `共${t}条`}
                        pageSizeOptions={[`${pageData}`]}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                </Spin>
                <WrongReasonModal
                    {...this.props}
                    visible={this.state.showWrongReason}
                    cancel={() => {
                        this.setState({
                            showWrongReason: false,
                        });
                    }}
                    ok={this.editWrongReasonConfirm}
                />
                <PrintSkuLabelModal
                    {...this.props}
                    visible={this.state.showPrintSKU}
                    cancel={() => {
                        this.setState({
                            showPrintSKU: false,
                        });
                        onChangeListener();
                    }}
                    params={this.state.printModel.params}
                    printSum={this.state.printModel.printSum}
                    // ok={this.toPrintSkuPage}
                />
                <PrintErrorLabelModal
                    {...this.props}
                    visible={this.state.showPrintError}
                    cancel={() => {
                        this.setState({
                            showPrintError: false,
                        });
                        onChangeListener();
                    }}
                    infoList={this.state.printErrorModel}
                />
                <CGallery
                    onMaskClick={this.handleImgClose}
                    handleClose={this.handleImgClose}
                    visible={this.state.showCGallery}
                    imgs={this.state.imgs}
                />
            </div>
        );
    }
}

export default TableList;
