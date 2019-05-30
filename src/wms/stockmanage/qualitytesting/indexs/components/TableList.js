import React, { Component } from 'react';
import {
    Input,
    Pagination, Spin, Table, message, Switch,
} from 'antd';
import Tableoption from '../../../../../components/Tableoption';
import Tableitem from '../../../../../components/Tableitem';
import CSelect from '../../../../../components/cselect';
import {
    DEFECTIVE_PRODUCT_LABEL,
    GET_PACKAGE_SPECIFICATION,
    GET_UNQUALIFIED_REASON,
} from '../../../../common/constants/Api';
import { fetchPost } from '../../../../../util/fetch';
import {
    EDIT_CHECK_QUALITY, FINISH_PICKING, GET_QUALITY_INSPECTOR, SCAN_PICKING_SKU,
} from '../constants/Api';
import ConfirmReceiptModal from './modal/ConfirmReceiptModal';
import PrintBoxLabelModal from '../../../../common/components/modal/PrintBoxLabelModal';
import PrintErrorLabelModal from '../../../../common/components/modal/PrintErrorLabelModal';
import PopConfirm from '../../../../../common/components/confirm';


class TableList extends Component {
    state = {
        editFormArr: [],
        showConfirmReceipt: false,
        showPrintBox: false,
        showPrintErrorLabel: false,
        printBoxModel: {
            params: {},
            defaultSum: 1,
        },
        printErrorModel: [],
        confirmReceiptModel: {},
        expandKeys: [], // 控制table展开
        autoShowPrintRecord: null, // 自动弹出打印框的条目数据.
    };

    columns = [
        {
            title: '序号',
            width: 60,
            key: 'groupIndex',
            render: (text, record, index) => ({
                children: <div>{(this.props.pageNumber - 1) * this.props.pageData + (index + 1)}</div>,
                props: {
                    rowSpan: 2,
                },
            }),
        },
        {
            title: '采购单号',
            width: 120,
            dataIndex: 'purchaseNumber',
        },
        {
            title: '是否裸装',
            width: 100,
            render: (text, record) => {
                const isBare = (this.state.editFormArr[record.key] && this.state.editFormArr[record.key].isBare) || record.isBare;
                return (
                    <Switch
                        disabled={!record.isEdit || record.isTotallyUnqualified === '1'}
                        checkedChildren="是"
                        unCheckedChildren="否"
                        checked={(isBare.code || isBare) === '1'}
                        onChange={(check) => {
                            this.onRenderEditChange(record.key, 'isBare', check ? '1' : '2');
                        }}
                    />
                );
            },
        },
        {
            title: '包材规格',
            width: 160,
            render: (text, record) => (
                this.createEditRender(record, 'packageSpecification', {
                    url: GET_PACKAGE_SPECIFICATION,
                    disabled: this.state.editFormArr[record.key] && this.state.editFormArr[record.key].isBare !== '1',
                })
            ),
        },
        {
            title: '包材数量',
            width: 90,
            dataIndex: 'packageNumber',
            render: (text, record) => (
                <div>
                    {
                        this.createEditRender(record, 'packageNumber', {
                            type: 'number',
                            disabled: this.state.editFormArr[record.key] && this.state.editFormArr[record.key].isBare !== '1',
                        })
                    }
                </div>
            ),
        },
        {
            title: '总合格量',
            width: 90,
            dataIndex: 'inputQualifiedAmount',
            render: (text, record) => this.createEditRender(record, 'inputQualifiedAmount', {
                type: 'number',
                disabled: this.state.editFormArr[record.key] && this.state.editFormArr[record.key].isTotallyUnqualified === '1',
            }),
        },
        {
            title: '总不合格量',
            width: 110,
            dataIndex: 'inputUnQualifiedAmount',
            render: (text, record) => this.createEditRender(record, 'inputUnQualifiedAmount', {
                type: 'number',
                disabled: this.state.editFormArr[record.key] && this.state.editFormArr[record.key].isTotallyUnqualified === '1',
            }),
        },
        {
            title: '不合格原因',
            width: 160,
            dataIndex: 'reasonForFailure',
            render: (text, record) => this.createEditRender(record, 'reasonForFailure', { url: GET_UNQUALIFIED_REASON }),
        },
        {
            title: '质检员',
            width: 160,
            dataIndex: 'qualityInspector',
            render: (text, record) => {
                const value = this.state.editFormArr[record.key] ? this.state.editFormArr[record.key].qualityInspector : text;
                if (!record.isEdit) {
                    return (value && value.map(t => t.name).toString()) || '--';
                }
                return (
                    <CSelect
                        formType={1}
                        url={GET_QUALITY_INSPECTOR}
                        mode="multiple" // 是否多选
                        localSearch="1"
                        value={value && value.map(t => t.name || '')}
                        code="name" // 为了直接显示名字
                        onChange={(t) => {
                            this.onRenderEditChange(record.key, 'qualityInspector', t);
                        }}
                    />
                );
            },
        },
        {
            title: '备注',
            width: 120,
            dataIndex: 'remarks',
            render: (text, record) => this.createEditRender(record, 'remarks', { type: 'string' }),
        },
        {
            title: '操作',
            width: 150,
            render: (text, record) => {
                const moreOptions = [
                    {
                        name: '编辑',
                        invisible: record.isCanEdit === '2' || record.isEdit,
                        funcId: '012-000002-000003-002',
                        onChange: () => {
                            this.optionsAction(record, 'edit');
                        },
                        subs: [],
                    },
                    {
                        name: '保存',
                        invisible: record.isCanEdit === '2' || !record.isEdit,
                        funcId: '012-000002-000003-002',
                        onChange: () => {
                            this.optionsAction(record, 'save');
                        },
                        subs: [],
                    },
                    {
                        name: '打印箱唛',
                        subs: [],
                        invisible: record.isPickingConfirm === '是',
                        funcId: '012-000002-000003-003',
                        onChange: () => {
                            this.optionsAction(record, 'printBox');
                        },
                    },
                    {
                        name: '打印异常',
                        onChange: () => {
                            this.optionsAction(record, 'printError');
                        },
                        funcId: '012-000002-000003-004',
                        subs: [],
                    },
                    {
                        name: '拣货确认',
                        invisible: record.isPickingConfirm !== '是',
                        subs: [],
                        funcId: '012-000002-000003-005',
                        onChange: () => {
                            this.optionsAction(record, 'confirm');
                        },
                    },
                    {
                        name: '完结容器',
                        subs: [],
                        funcId: '012-000002-000003-006',
                        invisible: record.isFinishContainer === '2',
                        onChange: () => {
                            this.optionsAction(record, 'finish');
                        },
                    },
                ];
                const items = { ...moreOptions.filter(item => !item.invisible) };
                return (
                    <Tableoption
                        isRender
                        {...this.props}
                        options={items}
                    />
                );
            },
        },
    ];

    componentDidMount() {
        const list = this.props.partList;
        if (list) {
            this.initEditFormArr(list.list);
        }
    }

    /**
     * 将可编辑状态的数据,保存到State中
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const list = this.props.partList;
        const nextList = nextProps.partList;
        if (nextList && list !== nextList) {
            this.initEditFormArr(nextList.list);
        }
    }

    expandColumns = (data) => {
        const column = [
            {
                title: '产品信息',
                width: 250,
                key: 'productInfo',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={80}
                            right={150}
                            title="产品编码"
                            content={record.sku}
                        />
                        <Tableitem
                            left={80}
                            right={150}
                            title="产品名称"
                            content={record.productName}
                        />
                    </div>
                ),
            },
            {
                title: '优先级',
                dataIndex: 'priority',
                width: 80,
                key: 'priority',
                render: text => (<div>{text && text.name}</div>),
            },
            {
                title: '是否已质检',
                width: 100,
                dataIndex: 'isQualityInspection',
                key: 'isQualityInspection',
                render: text => (<div>{text === '1' ? '是' : '否'}</div>),
            },
            {
                title: '供应商',
                width: 160,
                dataIndex: 'supplier',
                key: 'supplier',
            },
            {
                title: '采购到货',
                key: 'quantity',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={80}
                            right="auto"
                            title="采购数量"
                            content={record.purchaseQuantity}
                        />
                        <Tableitem
                            left={80}
                            right="auto"
                            title="到货数量"
                            content={record.arrivalQuantity}
                        />
                    </div>
                ),
            },
            {
                title: '缺货收货',
                key: 'outOfStock',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={90}
                            right="auto"
                            title="缺货数量"
                            content={record.outOfStock}
                        />
                        <Tableitem
                            left={90}
                            right="auto"
                            title="实际收货数量"
                            content={record.actualReceiptQuantity}
                        />
                    </div>
                ),
            },
            {
                title: '合格',
                key: 'qualified',
                render:
                    (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right="auto"
                                title="合格量"
                                content={record.qualifiedAmount}
                            />
                            <Tableitem
                                left={80}
                                right="auto"
                                title="多数合格"
                                content={record.moreQualified}
                            />
                        </div>
                    ),
            },
            {
                title: '不合格',
                key: 'unqualified',
                render:
                    (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right="auto"
                                title="不合格量"
                                content={record.unqualifiedAmount}
                            />
                            <Tableitem
                                left={80}
                                right="auto"
                                title="多数不合格"
                                content={record.moreUnqualified}
                            />
                        </div>
                    ),
            },

        ];
        return (
            <Table
                columns={column}
                dataSource={[data]}
                pagination={false}
                onHeaderRow={() => this.getItemRowClass(data, true)}
                rowClassName={record => this.getItemRowClass(record)}
            />
        );
    };

    getItemRowClass = (data, isHead) => {
        let bgClassName = '';
        if (data.index % 2 === 1) {
            bgClassName = 'table-item-bg2';
        } else {
            bgClassName = 'table-item-bg1';
        }
        if (data.isQualityInspection === '1') { // 已质检
            bgClassName = 'quality-row';
            if (data.printStatus === '1') { // 无需打印的
                bgClassName = 'print-over-row';
            }
        }
        if (data.priority && data.priority.code === '3') { // 绿色通道
            bgClassName = 'priority-row';
        }
        return isHead ? {
            className: bgClassName,
        } : bgClassName;
    };

    /**
     * Table操作选项点击处理
     */
    optionsAction = (record, type) => {
        if (type !== 'save' && record.isQualityInspection === '2') { // 必须先质检保存一次,才能做其它操作
            message.error('未质检,请先质检保存');
            return;
        }
        if (type === 'edit') { // 编辑
            this.setEdit(record.key);
            return;
        }
        if (type === 'save') { // 保存
            const editFormArrElement = this.state.editFormArr[record.key];
            if (record.needShelveQuantity < editFormArrElement.qualifiedAmount) {
                PopConfirm('注意', '输入的合格量大于待入库量', () => {
                    this.saveEdit({
                        ...editFormArrElement,
                        key: record.key,
                    });
                });
                return;
            }
            this.saveEdit({
                ...editFormArrElement,
                key: record.key,
            });
            return;
        }
        if (type === 'printBox') { // 打印箱唛
            if (record.printBoxNumber <= 0) {
                message.error('没有待装箱数');
                return;
            }
            this.setState((state) => {
                state.printBoxModel = {
                    params: {
                        from: 10,
                        key: record.key,
                    },
                    defaultSum: record.printBoxNumber,
                };
                state.showPrintBox = true;
                return state;
            });
            return;
        }
        if (type === 'printError') { // 打印异常标签
            fetchPost(DEFECTIVE_PRODUCT_LABEL, {
                data: {
                    key: record.key,
                },
            }, 2).then((result) => {
                if (result.state === '000001') {
                    this.setState((state) => {
                        state.showPrintErrorLabel = true;
                        state.printErrorModel = result.data.list;
                        return state;
                    });
                }
            });
            return;
        }
        if (type === 'confirm') { // 拣货确认
            this.setState({
                showConfirmReceipt: true,
                confirmReceiptModel: {
                    key: record.key, // 条目id
                    outOfStockGroupId: record.outOfStockGroupId, // 容器id
                    sku: record.sku, // 拣货的sku
                    outOfStock: record.outOfStock, // 缺货数量
                    productName: record.productName, // sku名称
                },
            });
            this.props.form.setFieldsValue({ // 清空model,输入框数据
                outOfStockGroupId: record.outOfStockGroupId,
                pickSku: '',
            });
        }
        if (type === 'finish') {
            this.editConfirmReceiptConfirm(record.outOfStockGroupId);
        }
    };

    /**
     * 具体保存可编辑状态的数据
     * @param list
     */
    initEditFormArr = (list) => {
        const editFormArr = {};
        const expandKeys = [];
        list.forEach((item) => {
            editFormArr[item.key] = {
                ...item,
            };
            expandKeys.push(item.key);
        });
        this.setState({
            editFormArr,
            expandKeys,
        });
    };

    /**
     * 创建可编辑单元
     * @param record
     * @param name
     * @param props 一个对象,根据传入的参数,判断返回Input,或者CSelect
     * @returns {*}
     */
    createEditRender = (record, name, props) => {
        const value = (this.state.editFormArr[record.key] ? this.state.editFormArr[record.key][name] : record[name]) || '';// 加个'',防止字段缺失报错
        if (!record.isEdit) {
            return value.name || value || '--';
        }
        if (props.type) {
            return (
                <Input
                    value={value.name || value}
                    onChange={(e) => {
                        this.onRenderEditChange(record.key, name, e.target.value);
                    }}
                    {...props}
                />
            );
        }
        return (
            <CSelect
                {...props}
                value={value.name || value}
                onChange={(t) => {
                    this.onRenderEditChange(record.key, name, t);
                }}
            />
        );
    };

    /**
     * 编辑修改回调
     * @param indexKey
     * @param name
     * @param value
     */
    onRenderEditChange = (indexKey, name, value) => {
        this.setState((state) => {
            state.editFormArr[indexKey][name] = value;
            return state;
        });
    };

    /**
     * 保存质检单
     * @param values 保存请求的数据
     * @param record 点击条目的数据
     */
    saveEdit = (record) => {
        const {
            reasonForFailure, packageSpecification, qualityInspector, inputQualifiedAmount,
        } = record;
        if (qualityInspector && qualityInspector.length > inputQualifiedAmount) {
            message.error('质检员人数不能大于总合格量');
        }
        fetchPost(EDIT_CHECK_QUALITY, {
            data: {
                ...record,
                reasonForFailure: reasonForFailure.code || reasonForFailure,
                packageSpecification: packageSpecification.code || packageSpecification,
                qualityInspector: qualityInspector && qualityInspector.map(t => t.code),
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                const { printInfo, printStatus } = result.data;
                this.autoShowPrintModel(printInfo, printStatus);
            }
        });
    };

    // 自动弹出打印框
    autoShowPrintModel = (record, printStatus) => {
        this.setState({
            autoShowPrintRecord: record,
        });
        if (printStatus === '1') {
            this.props.onChangeListener();
            return;
        }
        if (printStatus === '2' || printStatus === '3') {
            this.optionsAction(record, 'printBox');
            return;
        }
        if (printStatus === '2' || printStatus === '4') {
            this.optionsAction(record, 'printError');
        }
    };

    /**
     * 设置条目为可编辑,并且刷新redux
     * @param key 唯一id
     */
    setEdit = (key) => {
        const { partList } = this.props;
        partList.list.forEach((item) => {
            if (item.key === key) {
                item.isEdit = true;
            }
        });
        this.props.setItemEdit({
            list: partList.list,
            total: partList.total,
        });
    };

    /**
     * 拣货确认-完成拣货
     */
    editConfirmReceiptConfirm = (groupId) => {
        fetchPost(FINISH_PICKING, {
            data: {
                groupId,
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                this.setState({
                    showConfirmReceipt: false,
                });
                this.props.onChangeListener();
            }
        });
    };

    /**
     * 拣货确认-暂存sku
     */
    editConfirmReceiptSaveSku = (skuArr) => {
        const { key } = this.state.confirmReceiptModel;
        this.props.form.validateFields(['outOfStockGroupId'], (err, values) => {
            if (!err) {
                fetchPost(SCAN_PICKING_SKU, {
                    data: {
                        groupId: values.outOfStockGroupId,
                        key,
                        skuArr,
                    },
                }, 1).then((result) => {
                    if (result.state === '000001') {
                        this.setState({
                            showConfirmReceipt: false,
                        });
                        this.props.onChangeListener();
                    }
                });
            }
        });
    };

    cancelPrintBoxModel = () => {
        this.setState({
            showPrintBox: false,
        });
        const { printStatus } = this.state.autoShowPrintRecord || {};
        if (printStatus === '2' || printStatus === '4') {
            this.optionsAction({ ...this.state.autoShowPrintRecord }, 'printError');
            this.setState({
                autoShowPrintRecord: null,
            });
        } else {
            this.props.onChangeListener();
        }
    };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top wms-expanded-table">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        size="small"
                        bordered
                        expandedRowRender={this.expandColumns}
                        expandIconAsCell={false}
                        expandIconColumnIndex={-1}
                        expandedRowKeys={this.state.expandKeys}
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                        rowClassName={record => this.getItemRowClass(record)}
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
                <ConfirmReceiptModal
                    {...this.props}
                    model={this.state.confirmReceiptModel}
                    visible={this.state.showConfirmReceipt}
                    cancel={() => this.setState({
                        showConfirmReceipt: false,
                    })}
                    saveSku={this.editConfirmReceiptSaveSku}// 提交
                />
                <PrintBoxLabelModal
                    {...this.props}
                    visible={this.state.showPrintBox}
                    cancel={this.cancelPrintBoxModel}
                    params={this.state.printBoxModel.params}
                    defaultSum={this.state.printBoxModel.defaultSum}
                />
                <PrintErrorLabelModal
                    {...this.props}
                    visible={this.state.showPrintErrorLabel}
                    cancel={() => {
                        this.setState({
                            showPrintErrorLabel: false,
                        });
                        onChangeListener();
                    }}
                    infoList={this.state.printErrorModel}
                />
            </div>
        );
    }
}

export default TableList;
