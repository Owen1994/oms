import React from 'react';
import {
    Button, Col,
    Form, Input, Row, Tabs,
} from 'antd';
import '../../../common/css/index.css';
import {
    createBoxLabel, createSkuPrintContent, printErrorLabel, printSkuStyle,
} from '../../../common/util/printUtils';
import { fetchPost } from '../../../../util/fetch';
import Functions from '@/components/functions';
import { COVER_SHEET } from '../../../outboundmanage/checkpackage/constants/Api';
import { printDiv, printWpUrl } from '../../../common/util';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};

/**
 * 补打标签
 */
class App extends React.Component {
    state = {
        activeKey: '1',
    };

    loadSkuInfo = () => {
        const { sku, skuNumber } = this.props.form.getFieldsValue();
        const printLabels = [];
        printLabels.push(skuNumber);
        this.props.loadSkuInfo(
            {
                data: {
                    from: 'RP',
                    sku,
                    printLabels,
                },
            },
        );
    };

    loadBoxInfo = () => {
        const { boxSku, boxNumber, boxPrintSum } = this.props.form.getFieldsValue();
        this.props.loadBoxInfo(
            {
                data: {
                    sku: boxSku,
                    number: boxPrintSum,
                    boxNumber,
                },
            },
        );
    };

    loadErrorInfo = () => {
        const { errorCode } = this.props.form.getFieldsValue();
        this.props.loadErrorInfo(
            {
                data: {
                    errorCode,
                },
            },
        );
    };

    onFaceSheetPrint = () => {
        const { orderNumber } = this.props.form.getFieldsValue();
        const params = {
            data: {
                orderNumber,
            },
        };
        fetchPost(COVER_SHEET, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    const {
                        width, height, labelType, labelUrl, direction,
                    } = result.data.label;
                    printWpUrl(width, height, labelType, labelUrl, direction === '1');
                }
            });
        // printWpUrl(100, 150, 'PDFURL', 'http://dev.channel.kokoerp.com/public/index.php?s=service/label&data=204', '1');
    };

    skuPage = (skuInfo, getFieldDecorator) => (
        <div className="padding-ss">
            <FormItem
                {...formItemLayout}
                label="SKU"
            >
                <Row>
                    <Col span={16}>
                        {getFieldDecorator('sku', {// 只有销售退货时才用到这个
                        })(
                            <Input
                                placeholder="请输入"
                            />,
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="打印数量:"
            >
                <Row>
                    <Col span={16}>
                        {getFieldDecorator('skuNumber', {
                            initialValue: 100,
                        })(
                            <Input
                                placeholder="请输入"
                            />,
                        )}
                    </Col>
                    <Col>
                        <Button
                            loading={this.props.skuLoading}
                            onClick={this.loadSkuInfo}
                            className="margin-ss-left"
                            type="primary"
                        >
                            生成标签
                        </Button>
                    </Col>
                </Row>
            </FormItem>
            <div className="margin-ss-top" style={{ textAlign: 'right', width: '100mm', marginLeft: 100 }}>
                <div>
                    <div
                        style={printSkuStyle.wmsPrintSkuBody}
                        ref={(ref) => {
                            this.reSkuRef = ref;
                        }}
                    >
                        {createSkuPrintContent(skuInfo.printInfoArr, skuInfo.number)}
                    </div>
                </div>
                <div style={{ maxWidth: 760 }}>
                    {skuInfo.printInfoArr && skuInfo.printInfoArr.length > 0 ? (
                        <Button
                            onClick={() => {
                                printDiv(this.reSkuRef, 100, 21);
                            }}
                            className="pull-right margin-ss-top margin-ss-bottom"
                            type="primary"
                        >
                            打印
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );

    boxPage = (boxInfo, getFieldDecorator) => (
        <div className="padding-ss">
            <FormItem
                {...formItemLayout}
                label="箱唛号"
            >
                <Row>
                    <Col span={16}>
                        {getFieldDecorator('boxNumber')(
                            <Input placeholder="请输入内容" />,
                        )}
                    </Col>
                    <Button
                        loading={this.props.boxLoading}
                        onClick={this.loadBoxInfo}
                        className="margin-ss-left"
                        type="primary"
                    >
                        生成标签
                    </Button>
                </Row>
            </FormItem>
            <div className="margin-ss-top" style={{ textAlign: 'right', width: '100mm', marginLeft: 100 }}>
                <div
                    ref={(ref) => {
                        this.reBoxRef = ref;
                    }}
                >
                    {boxInfo.list ? boxInfo.list.map(item => createBoxLabel(item, item.partNumber)) : null}
                </div>
                {boxInfo.list ? (
                    <Button
                        onClick={() => printDiv(this.reBoxRef)}
                        className="margin-ss-top margin-ss-bottom"
                        type="primary"
                    >
                        打印
                    </Button>
                ) : null}
            </div>
        </div>
    );


    faceSheetPage = getFieldDecorator => (
        <div className="padding-ss">
            <FormItem
                {...formItemLayout}
                label="订单号"
            >
                <Row>
                    <Col span={16}>
                        {getFieldDecorator('orderNumber')(
                            <Input placeholder="请输入" />,
                        )}
                    </Col>
                    <Col>
                        <Button
                            onClick={this.onFaceSheetPrint}
                            className="margin-ss-left"
                            type="primary"
                        >
                            打印
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        </div>
    );

    errorPage = (errorInfo, getFieldDecorator) => (
        <div className="padding-ss">
            <FormItem
                {...formItemLayout}
                label="异常编号"
            >
                <Row>
                    <Col span={16}>
                        {getFieldDecorator('errorCode')(
                            <Input placeholder="请输入内容" />,
                        )}
                    </Col>
                    <Button
                        loading={this.props.errorLoading}
                        onClick={this.loadErrorInfo}
                        className="margin-ss-left"
                        type="primary"
                    >
                        生成标签
                    </Button>
                </Row>
            </FormItem>
            <div className="margin-ss-top" style={{ textAlign: 'right', width: '100mm', marginLeft: 100 }}>
                <div ref={ref => this.reErrorRef = ref} style={{ textAlign: '-webkit-center' }}>
                    {errorInfo ? errorInfo.map((item, index) => (
                        printErrorLabel(item, index)
                    )) : null}
                </div>
                {errorInfo ? (
                    <Button
                        onClick={() => printDiv(this.reErrorRef)}
                        className="margin-ss-top margin-ss-bottom"
                        type="primary"
                    >
                        打印
                    </Button>
                ) : null}
            </div>
        </div>
    );

    render() {
        const { getFieldDecorator } = this.props.form;
        const { skuInfo, boxInfo, errorInfo } = this.props;

        return (
            <div className="wms-supplementprint wms-tabs white wms-search ">
                <Tabs
                    type="card"
                    activeKey={this.state.activeKey}
                    defaultActiveKey="1"
                    onChange={(value) => {
                        this.setState({
                            activeKey: value,
                        });
                    }}
                >
                    <TabPane key="1" tab="补打SKU">
                        <Functions {...this.props} isPage functionkey="012-000005-000008-001">
                            {this.skuPage(skuInfo, getFieldDecorator)}
                        </Functions>
                    </TabPane>
                    <TabPane key="2" tab="补打箱唛">
                        <Functions {...this.props} isPage functionkey="012-000005-000008-002">
                            {this.boxPage(boxInfo, getFieldDecorator)}
                        </Functions>
                    </TabPane>
                    <TabPane key="3" tab="补打面单">
                        <Functions {...this.props} isPage functionkey="012-000005-000008-003">
                            {this.faceSheetPage(getFieldDecorator)}
                        </Functions>
                    </TabPane>
                    <TabPane key="4" tab="补打异常标签">
                        <Functions {...this.props} isPage functionkey="012-000005-000008-004">
                            {this.errorPage(errorInfo.list, getFieldDecorator)}
                        </Functions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
