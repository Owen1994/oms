import React, { Component } from 'react';
import {
    Button, Col, Form, Input,
    Pagination, Radio, Row, Spin, Table, Tabs,
} from 'antd';
import Tableitem from '../../../../../../../components/Tableitem/index';
import CSelect from '../../../../../../../components/cselect';
import { GET_ALL_PERMISSION_WAREHOUSE } from '../../../../../../common/constants/Api';

/**
 * 盘点计划详情
 */
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const initialState = [{ code: '', name: '全部' }];
const SearchInput = Input.Search;
const TabPane = Tabs.TabPane;

class PlanDetailTable extends Component {
    state = {
        pageNumber: 1,
        pageData: 100,
    };

    columns = [
        {
            title: '序号',
            key: 'index',
            width: 50,
            render: (text, record, index) => (this.state.pageNumber - 1) * this.state.pageData + (index + 1),
        },
        {
            title: '盘点方式',
            width: 100,
            dataIndex: 'inventoryType',
        },
        {
            title: 'SKU',
            width: 60,
            dataIndex: 'sku',
        },
        {
            title: '中文名称',
            width: 200,
            dataIndex: 'cnName',
        },
        {
            title: '储位',
            width: 90,
            dataIndex: 'bin',
        },
        {
            title: '盈亏状态',
            width: 80,
            dataIndex: 'profitAndLossStatus',
        },
        {
            title: '盘点状态',
            width: 80,
            dataIndex: 'countingStatus',
        },
        {
            title: '盘点结果',
            width: 160,
            dataIndex: 'preventContainer',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right={40}
                        title="储位库存"
                        content={record.storageStock}
                    />
                    <Tableitem
                        left={100}
                        right={40}
                        title="初盘数量"
                        content={record.initialsNumber}
                    />
                    <Tableitem
                        left={100}
                        right={40}
                        title="初盘差异量"
                        content={record.firstDiscDifference}
                    />
                    <Tableitem
                        left={100}
                        right={40}
                        title="复盘数量"
                        content={record.copiesNumber}
                    />
                    <Tableitem
                        left={100}
                        right={40}
                        title="复盘差异量"
                        content={record.complexDiscAmount}
                    />
                </div>
            ),
        },
        {
            title: '盘点人',
            dataIndex: 'preventAddress',
            width: 260,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={120}
                        right={100}
                        title="初盘人"
                        content={record.firstPerson}
                    />
                    <Tableitem
                        left={120}
                        right={100}
                        title="初盘完成时间"
                        content={record.overTime}
                    />
                    <Tableitem
                        left={120}
                        right={100}
                        title="复盘人"
                        content={record.replicator}
                    />
                    <Tableitem
                        left={120}
                        right={100}
                        title="复盘完成时间"
                        content={record.completionTime}
                    />
                </div>
            ),
        },
        {
            title: '盘点方式',
            width: 80,
            dataIndex: 'inventoryMethod',
        },
        {
            title: '对应出入库编码',
            width: 110,
            dataIndex: 'outPutCode',
        },
    ];

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.detailsParams !== prevProps.detailsParams) {
            this.reset();
        }
    }

    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageData
     */
    loadData = (pageNumber, pageData) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageData) {
            pageData = this.state.pageData;
        }
        this.setState({
            pageNumber,
            pageData,
        });
        const { inventoryNumber } = this.props.detailsParams;
        const values = this.props.form.getFieldsValue();
        this.props.queryDetailsPartList({
            data: {
                ...values,
                countingNumber: inventoryNumber,
                pageNumber,
                pageData,
            },
        });
    };

    tabChange = (selectKey) => {
        this.props.form.setFieldsValue({
            inventoryStatus: selectKey,
        });
        this.loadData(this.state.pageNumber, this.state.pageData);
    };

    reset = () => {
        this.props.form.resetFields();
        this.loadData();
    };

    search = () => {
        const { getFieldDecorator } = this.props.form;
        const { inventoryNumber } = this.props.detailsParams;
        return (
            <div className="margin-ms-bottom erp-search">
                <div className="search_select">
                    <Row type="flex" align="middle">
                        <Col span={8}>
                            <FormItem
                                label="仓库名称:"
                            >
                                {getFieldDecorator('warehouse', {
                                    initialValue: '',
                                })(
                                    <CSelect
                                        list={initialState}
                                        code="code" // 列表编码字段
                                        name="name" // 列表名称字段
                                        url={GET_ALL_PERMISSION_WAREHOUSE}
                                        placeholder="请选择"
                                        handleChange={this.onSubmit}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="search_content">
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>盘点单号</Radio>
                                <Radio value={2}>SKU</Radio>
                                <Radio value={3}>储位</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div className="content_right">
                        {getFieldDecorator('searchContent', {
                            rules: [{
                                required: false,
                                message: '请输入',
                            }],
                            initialValue: inventoryNumber,
                        })(
                            <SearchInput
                                placeholder="请输入内容"
                                enterButton="搜索"
                                style={{ width: 280 }}
                                onSearch={() => this.loadData(this.state.pageNumber, this.state.pageData)}
                            />,
                        )}
                        <Button type="default" onClick={this.reset}>
                            重置
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    table = () => {
        const {
            planDetailParts,
            planDetailLoadingState,
            onChangeListener,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        const {
            pageNumber,
            pageData,
        } = this.state;
        return (
            <div className="breadcrumb wms-tabs">
                {getFieldDecorator('inventoryStatus', {
                    initialValue: '1',
                })(
                    <Tabs
                        type="card"
                        activeKey={this.props.form.getFieldValue('inventoryStatus') || '1'}
                        onChange={this.tabChange}
                    >
                        <TabPane tab={`待盘点(${planDetailParts.waitInventoryNumber || 0})`} key="1" />
                        <TabPane tab={`已盘点(${planDetailParts.stocktakingNumber || 0})`} key="2" />
                    </Tabs>,
                )}
                <div className="padding-ss">
                    <Spin spinning={planDetailLoadingState} delay={500} tip="Loading...">
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={planDetailParts.list}
                            pagination={false}
                            rowKey={record => record.dataIndex}
                        />
                        <Pagination
                            className=""
                            pageSizeOptions={['100']}
                            showTotal={t => `共${t}条`}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            total={planDetailParts.total}
                            current={pageNumber}
                            pageSize={pageData}
                            onChange={onChangeListener}
                        />
                    </Spin>
                </div>
            </div>
        );
    };


    render() {
        return (
            <div className="wms-ant-table">
                {this.search()}
                {this.table()}
            </div>
        );
    }
}

export default Form.create()(PlanDetailTable);
