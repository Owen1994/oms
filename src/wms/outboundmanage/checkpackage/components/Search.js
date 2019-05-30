import React from 'react';
import {
    Col, Row, Form, message,
} from 'antd';
import ScanInput from '../../../common/components/ScanInput';
import { fetchPost } from '../../../../util/fetch';
import { SCAN_CONTAINER, SET_ORDER_WEIGHT } from '../constants/Api';
import { CHECKPACKAGE_10_SINGLE, CHECKPACKAGE_30_MOBILE, CHECKPACKAGE_40_FIXED } from '../constants';
import { printWpUrl } from '../../../common/util';
import Functions from '../../../../components/functions';

const FormItem = Form.Item;
export default class Search extends React.Component {
    state = {
        seedWallType: '',
        canScanGroup: false,
    };

    componentWillReceiveProps(nextProps) {
        const { partList } = nextProps;
        if (this.props.partList !== partList) {
            if (this.state.seedWallType === CHECKPACKAGE_10_SINGLE) {
                this.scanSkuNotifyPartList(nextProps.partList);
            }
        }
    }

    /**
     * 搜索
     */
    scanSku = () => {
        const { partList } = this.props;
        if (this.state.seedWallType !== CHECKPACKAGE_10_SINGLE && partList.orderInfo.skuList.length > 0) {
            this.scanSkuNotifyPartList();
            return;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.queryPartList({
                    data: {
                        ...values,
                    },
                });
            }
        });
    };

    /**
     * 扫描SKU,更新本地数据
     */
    scanSkuNotifyPartList = (list) => {
        const { sku } = this.props.form.getFieldsValue();
        const partList = list || this.props.partList;
        let isOver = 0; // 是否已经扫完,大于0则没扫完
        let isRefresh = false; // 是否刷新.
        partList.orderInfo.skuList
            .forEach((item) => {
                const tempSku = sku.split('_')[0];
                if (item.checkNumber > 0 && tempSku === item.sku) { // 不是同一个sku.过滤
                    const tempSkuList = item.skuName.split(',');
                    if (tempSkuList.indexOf(sku) !== -1) {
                        item.checkedQuantity += 1;
                        item.checkNumber = item.quantity - item.checkedQuantity;
                        if (item.scanSkuList.indexOf(sku) === -1) { // 保存唯一码
                            item.scanSkuList.push(sku);
                        }
                        isRefresh = true; // 成功扫描了sku.刷新
                    } else {
                        message.error(`错误的SKU,必须是${tempSkuList}`);
                    }
                }
                if (item.checkNumber !== 0) {
                    isOver++;
                }
            });
        if (!isRefresh) {
            return;
        }
        if (isOver <= 0) {
            this.weightRef.focus();
            const {
                labelType, labelUrl, height, width, direction,
            } = partList.orderInfo.label;
            printWpUrl(width, height, labelType, labelUrl, direction === '1');
        }
        // 必须使用新对象,否则不更新
        const newPartList = {
            ...partList,
        };
        this.props.refreshPartList(newPartList);
    };

    /**
     * 称重提交
     */
    onWeight = () => {
        this.props.form.validateFields(['containerCode', 'weight'], (err, values) => {
            if (!err) {
                const { partList } = this.props;
                const params = {
                    data: {
                        ...values,
                        orderNumber: partList.orderInfo.orderNumber,
                    },
                };
                fetchPost(SET_ORDER_WEIGHT, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.setScanSearchFocus(result.data.taskOver);
                        }
                    });
            }
        });
    };

    // 操作完成时,进行下一步操作,设置哪个输入框获取焦点.
    setScanSearchFocus = (taskOver) => {
        this.props.refreshPartList({
            taskOver,
            seedWallType: this.state.seedWallType,
        });
        const { seedWallType } = this.state;
        if (taskOver === '1' || seedWallType === CHECKPACKAGE_40_FIXED) { // 已扫完,或者任务为多品多件(固定)
            this.setState({
                canScanGroup: false,
            });
            setTimeout(() => {
                this.containerRef.reset();
                this.skuRef.reset();
                this.containerRef.focus();
            }, 500);
            return;
        }
        // 多品,扫描容器,获取下一个sku.
        if (seedWallType === CHECKPACKAGE_30_MOBILE) {
            this.scanGroup();
            return;
        }
        // 还有未扫的,sku获取焦点
        this.skuRef.focus();
    };

    /**
     * 扫描容器
     */
    scanGroup = () => {
        this.props.form.validateFields(['containerCode'], (err, value) => {
            if (err) {
                return;
            }
            const params = {
                data: {
                    ...value,
                },
            };
            fetchPost(SCAN_CONTAINER, params, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        const { seedWallType } = result.data;
                        this.setState({
                            seedWallType,
                            canScanGroup: true,
                        });
                        this.skuRef.focus();
                        this.props.refreshPartList(result.data);
                    } else {
                        this.setState({
                            canScanGroup: false,
                        });
                        this.containerRef.focus();
                    }
                });
        });
    };

    /**
     * 重置表单
     */
    reset = () => {
        this.props.form.resetFields();
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { partList } = this.props;
        return (
            <div className="white overflow-hidden padding-md">
                <Row type="flex">
                    <Col span={12} className="search-col">
                        <div className="search-step-div">
                            <div className="search-step-line-left" />
                            <div className="search-step-text">1</div>
                        </div>
                        <div className="margin-sm">扫描容器</div>
                    </Col>
                    <Col span={12} className="search-col">
                        <div className="search-step-div">
                            <div className="search-step-line-right" />
                            <div className="search-step-text">2</div>
                        </div>
                        <div className="margin-sm">扫描产品</div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={12} className="search-col">
                        <div style={{ width: '50%', textAlign: 'left' }}>
                            <FormItem>
                                {getFieldDecorator('containerCode', {
                                    rules: [{ required: true, message: '请扫描或者输入容器编号' }],
                                })(
                                    <ScanInput
                                        disabled={this.state.canScanGroup}
                                        ref={(input) => {
                                            this.containerRef = input;
                                        }}
                                        onSearch={this.scanGroup}
                                        placeholder="请扫描或输入容器编号"
                                    />,
                                )}
                            </FormItem>
                            <FormItem
                                style={{ display: 'flex' }}
                                label="理论重量"
                            >
                                <div>{partList.orderInfo.theoreticalWeight || ''}</div>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={12} className="search-col">
                        <div style={{ width: '50%', textAlign: 'left' }}>
                            <FormItem>
                                {getFieldDecorator('sku', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请扫描SKU或输入SKU编码' }],
                                })(
                                    <ScanInput
                                        ref={(input) => {
                                            this.skuRef = input;
                                        }}
                                        isReset
                                        onSearch={this.scanSku}
                                        placeholder="请扫描SKU或输入SKU编码"
                                    />,
                                )}
                            </FormItem>
                            <Functions
                                {...this.props}
                                functionkey="012-000006-000003-003"
                            >
                                <FormItem
                                    wrapperCol={{ span: 6 }}
                                    style={{ display: 'flex' }}
                                    label="实际重量"
                                >
                                    {getFieldDecorator('weight', {
                                        initialValue: '',
                                    })(
                                        <ScanInput
                                            isReset
                                            ref={(input) => {
                                                this.weightRef = input;
                                            }}
                                            onSearch={this.onWeight}
                                            placeholder="称重"
                                        />,
                                    )}
                                </FormItem>
                            </Functions>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
