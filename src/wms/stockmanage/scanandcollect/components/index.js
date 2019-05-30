import React from 'react';
import {
    Form,
} from 'antd';
import '../css/index.css';
import Search from './Search';
import TableList from './table';
import { RECEIVED_TABLE, SCANRECEIPT_TABLE } from '../constants/TableList';
import { getUrlParams } from '../../../../util/baseTool';
import PopConfirm from '../../../../common/components/confirm';
import {
    TYPE_1_PURCHASE_GOODS,
    TYPE_2_RECEIPT_PACKAGING,
    TYPE_3_SAMPLE_RECEIPT,
    TYPE_4_SALE_ORDER_BACK,
} from '../constants';

/**
 * 扫描收货
 */
class App extends React.Component {
    state = {
        activeKey: SCANRECEIPT_TABLE,
        pageNumber: 1,
        pageData: 50,
        // isAdd: false, // 是否是对图跳转过来,新增优先级高的货物
    };

    componentDidMount() {
        const cardNumber = getUrlParams('').cardNumber;
        if (cardNumber) {
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    cardNumber,
                });
                this.onCardSearch();
            }, 500);
        }
    }

    /**
     * 已收货列表
     * @param pageNumber
     * @param pageData
     */
    onCardSearch = (pageNumber, pageData) => {
        if (!pageNumber) { // 如果不传则不是翻页,重置页数
            pageNumber = 1;
        }
        if (!pageData) {
            pageData = 50;
        }
        this.setState({
            pageNumber,
            pageData,
        });
        this.props.form.validateFields(['cardNumber', 'receivingType'], (err, values) => {
            if (!err) {
                const { cardNumber } = values;
                this.setState({
                    activeKey: RECEIVED_TABLE,
                });
                this.props.queryPartList({
                    data: {
                        pageNumber,
                        pageData,
                        cardNumber,
                        receivingType: values.receivingType[0] || '',
                    },
                }, (result) => {
                    if (result.state === '000001') {
                        this.props.form.setFieldsValue({
                            purchaseNumber: '',
                        });
                    }
                });
            }
        });
    };

    /**
     * 查询按钮,扫描收货
     */
    onSearch = () => {
        let validateArr = [];
        const params = { data: {} };
        const { receivingType } = this.props;
        if (receivingType === TYPE_1_PURCHASE_GOODS) {
            validateArr = ['purchaseNumber', 'cardNumber'];
        }
        if (receivingType === TYPE_2_RECEIPT_PACKAGING) {
            validateArr = ['receiptNumber'];
        }
        if (receivingType === TYPE_3_SAMPLE_RECEIPT) {
            validateArr = ['sampleNumber', 'cardNumber'];
        }
        if (receivingType === TYPE_4_SALE_ORDER_BACK) {
            validateArr = ['searchContent', 'searchType', 'cardNumber'];
        }
        this.props.form.validateFields([...validateArr, 'receivingType'], (err, values) => {
            if (!err) {
                this.setState({
                    activeKey: SCANRECEIPT_TABLE,
                });
                params.data = {
                    ...values,
                    purchaseNumber: values.receiptNumber || values.purchaseNumber,
                };
                params.data.receivingType = receivingType || ''; // 收货类型
                this.props.queryScanReceiptList(params, (result) => {
                    if (result.state === '000001') {
                        let isAddList = true;
                        if (receivingType === TYPE_1_PURCHASE_GOODS) {
                            result.data.list.forEach((item) => {
                                if (item.priorityLevel && item.priorityLevel.code === '3') {
                                    isAddList = false;
                                }
                            });
                            if (!isAddList) {
                                PopConfirm('提示', `单号:${values.purchaseNumber} 为优先级高的货物，需优先进入紧急通道！是否加入当前卡板？`, () => {
                                    this.props.scanReceiptPartList(result.data);
                                });
                            }
                            this.props.form.setFieldsValue({
                                remarks: '',
                                imageList: undefined,
                            });
                        }
                        return isAddList;
                    }
                });
            }
        });
    };


    /**
     * 切换监听
     */
    onTabChangeListener = (activeKey) => {
        this.setState({
            activeKey,
        });
        if (activeKey === RECEIVED_TABLE) {
            this.onCardSearch(this.state.pageNumber, this.state.pageData);
        }
    };

    /**
     * 收货类型切换回调,清空表单
     * @param value
     */
    onReceivingTypeChange = (value) => {
        this.props.form.setFieldsValue({
            sampleNumber: '',
            searchType: 1,
            searchContent: '',
            reasonCode: '',
            purchaseNumber: [],
            cardNumber: '',
        });
        if (value === TYPE_2_RECEIPT_PACKAGING) {
            this.setState({
                activeKey: SCANRECEIPT_TABLE,
            });
        }
        this.props.selectReceivingType(value);
    };

    render() {
        const { pageNumber, pageData } = this.state;
        return (
            <div className="wms-scanandcollect">
                <Search
                    {...this.props}
                    onSearchListener={this.onSearch}
                    onCardSearch={this.onCardSearch}
                    onReceivingTypeChange={this.onReceivingTypeChange}
                />
                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    activeKey={this.state.activeKey}
                    onTabChangeListener={this.onTabChangeListener}
                    onCardSearch={this.onCardSearch}
                />
            </div>
        );
    }
}

export default Form.create()(App);
