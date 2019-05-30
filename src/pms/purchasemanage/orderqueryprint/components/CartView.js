import React, { Component } from 'react';
import {
    Button,
    Col,
    Row,
    Table,
    message,
} from 'antd';
import { fetchPost, downlodFile } from '../../../../util/fetch';
import {
    Designation_Card_URL_Api,
} from '../constants/Api';
import { randNum } from '@/util/baseTool';

/**
 * 采购订单产品标示卡
 */
class CartView extends Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 50,
        },
        {
            title: '订单号',
            dataIndex: 'orderNumber',
            width: 70,
            render: (value, row, index) => {
                const isLastCell = this.props.listCard.length - 1 === index;
                if (!isLastCell) {
                    return (<div>
                        {value}
                    </div>)
                } else {
                    return {
                        children: (
                            <div style={{textAlign: 'left'}}>
                                <span>
                                    1、产品标识卡必须贴到货物外箱，否则仓库收货无法识别，会直接拒收；
                                </span>
                                <br />
                                <span>
                                    2、箱内实物必须与外箱标识一致，当不一致时，少发视为欺诈；多发视为赠送；
                                </span>
                                <br />
                                <span>
                                    3、所有产品需有sku标识；如果同一包装内sku较多，需将不同的sku产品隔离存；
                                </span>
                                <br />
                                <span>
                                    4、所有产品严禁裸装发货，同时箱内放我司的订购单与贵司的送货单；
                                </span>
                                <br />
                                <span>
                                    5、采购单号的尾数是53的，请发往东莞企石；采购单号以101开头的请发往深圳平湖，请勿错仓；
                                </span>
                                <br />
                                <span>
                                    {`6、如果订单异常请及时联系订单收货人，电话：${this.props.infoCard.merchandiserPhone || '无'}`}
                                </span>
                            </div>
                        ),
                        props: {
                            colSpan: 5,
                        }
                    }
                }
            },
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 70,
            render: (value, row, index) => {
                const isLastCell = this.props.listCard.length - 1 === index;
                const obj = {
                    children: value,
                    props: {},
                };
                if (isLastCell) {
                    obj.props.colSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '数量',
            dataIndex: 'number',
            width: 30,
            render: (value, row, index) => {
                const isLastCell = this.props.listCard.length - 1 === index;
                const obj = {
                    children: value,
                    props: {},
                };
                if (isLastCell) {
                    obj.props.colSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '本件装箱数量',
            dataIndex: 'packingNumber',
            width: 50,
            render: (value, row, index) => {
                const isLastCell = this.props.listCard.length - 1 === index;
                const obj = {
                    children: value,
                    props: {},
                };
                if (isLastCell) {
                    obj.props.colSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '条形码',
            dataIndex: 'skuCode',
            width: 60,
            render: (text, row, index) => {
                const isLastCell = this.props.listCard.length - 1 === index;
                const obj = {
                    children: (
                        <img
                            src={text}
                            alt="sku图片"
                            style={{maxWidth: '200px'}}
                        />
                    ),
                    props: {},
                };
                if (isLastCell) {
                    obj.props.colSpan = 0;
                }
                return obj;
            },
        }
    ];

    /**
     * 复制文字
     * */
    copy = () => {

        const info = this.props.infoCard;
        const list = this.props.listCard;
        const hh = String.fromCharCode(11);
        let text = '订单号:' + info.orderNumber + hh;
        for (let i = 0; i < list.length; i++) {
            if (i === list.length - 1) {
                break;
            }
            text = text + 'SKU:' + list[i]['sku'] + hh + '数量:' + list[i]['number'] + hh + '名称:' + list[i]['skuName'] + hh;
        }
        text = text + '备注：发货请按要求贴标识卡在外箱上，否则仓库拒收或丢失的损失由发货方承担，谢谢配合！';

        const oInput = document.createElement('input');
        oInput.value = text;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        message.success('复制成功');
    };

    /**
     * 调起打印窗口
     * */
    printing = () => {
        const newcontainer = document.querySelector('.card_print');
        document.body.innerHTML = newcontainer.innerHTML;
        window.print();
    };

    /**
     * 调起下载
     * */
    downloadPOPrint = () => {
        const parameter = { data: { purchaseNumber: [this.props.infoCard.orderNumber] } };
        fetchPost(Designation_Card_URL_Api, parameter, 2)
            .then((result) => {
                if (result.state === '000001') {
                    message.info('请求已发出，请等待下载！');
                    downlodFile(result.data.url);
                }
            });
    };

    render() {
        const {
            listCard,
            infoCard,
        } = this.props;

        const info = infoCard;

        return (
            <div className="designation_card_div">

                <div className="print_button">
                    <Button
                        className="margin-sm-bottom margin-sm-right"
                        onClick={this.downloadPOPrint}
                    >
                        下载
                    </Button>

                    <Button
                        className="margin-sm-bottom"
                        onClick={this.printing}
                    >
                        打印
                    </Button>
                </div>
                <div className="card_print">
                    <div className="designation_card_top_view">
                        <Row type="flex" justify="center">
                            <Col span={24}>
                                <div>
                                    <img
                                        className="designation_card_top_barCode"
                                        src={info.purchaseBar}
                                        alt="采购单条形码"
                                        style={{width: '180px'}}
                                    />
                                    <h2 className="designation_card_top_title">
                                        产品标识卡（外箱唛头）
                                    </h2>
                                </div>

                                <Row className="designation_card_top_info">
                                    <Col span={10}>
                                        <div className="print_purchase_order_head_info_cell">
                                            <div className="cell_div_height">厂商代码:</div>
                                            <div className="cell_div_neiron">
                                                {info.vendorCode}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={10} offset={4}>
                                        <div className="print_purchase_order_head_info_cell">
                                            <div className="cell_div_height">装箱数:</div>
                                            <div className="cell_div_neiron">
                                                共&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件-第&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={10}>
                                        <div className="print_purchase_order_head_info_cell">
                                            <div className="cell_div_height">收货人:</div>
                                            <div className="cell_div_neiron">
                                                {info.operator}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={10} offset={4}>
                                        <div className="print_purchase_order_head_info_cell">
                                            <div className="cell_div_height">所属仓库:</div>
                                            <div className="cell_div_neiron">
                                                {info.warehouse}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Table
                                    className='print_table_color'
                                    columns={this.columns}
                                    dataSource={listCard}
                                    pagination={false}
                                    size="small"
                                    rowKey={t => t.keyNumber}
                                    bordered
                                />

                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="designation_card_copy_view">
                    <div className="copy_div">
                        <div className="copy_text">
                            <a onClick={this.copy}>复制内容</a>
                        </div>
                        <div className="copy_neiron">
                            <div style={{marginBottom: '10px'}}>{`订单号：${info.orderNumber}`}</div>
                            {
                                listCard.map((t) => {
                                    if (!t.orderNumber && !t.sku) {
                                        return null;
                                    }
                                    return (
                                        <div
                                            key={randNum()}
                                            style={{marginLeft: '10px'}}
                                        >
                                            <div>{`SKU：${t.sku}`}</div>
                                            <div>{`数量：${t.number}`}</div>
                                            <div>{`名称：${t.skuName}`}</div>
                                        </div>
                                    )
                                })
                            }
                            <div style={{color: 'red', marginTop: '10px'}}>备注：发货请按要求贴标识卡在外箱上，否则仓库拒收或丢失的损失由发货方承担，谢谢配合！</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartView;
