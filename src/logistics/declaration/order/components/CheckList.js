/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';

import { Table, Spin, Button, Modal, Row, Col,Popover } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { LOADING_STATE } from "../../../constant";
import { CHECK_LIST, ORDER_LIST_EXPORT_COLUMN } from "../constants";
import EditableCell from '../../../common/components/EditableCell';
import ExportFields from './ExportFields';
import DragableBodyRow from '../../../common/components/DragTable';
import { datasaddkey } from '../../../../util/baseTool'
import { post } from "../../../../util/axios";


import '../css/css.css';
import { Provider } from 'react-dnd/lib/DragDropContext';
import {message} from "antd/lib/index";
import Functions from '../../../../components/functions'


class CheckList extends React.Component {
    state = {
        selectedRowKeys: [],
        data: [],
        visible: false,
        checkFieldList:[],
    };

    onCellChange = (name, value, dataIndex) => {
        this.props.editListColumn({
            id: this.props.id,
            // id: 198,
            itemId: this.state.data[dataIndex].itemId,
            name,
            value
        });
        return (value) => {
            const dataSource = [...this.state.data];
            dataSource[dataIndex] = value;
            this.setState({ dataSource });
        };
    };
    renderContent = (value, record, index, name) => {
        if(this.state.data.length===(index+1)){
            return value
        }
        const type = this.props.type;
        const isEditable = type==='create'?true:false;
        const children = (
            <EditableCell
                {...this.props}
                fkey={"002-000001-000001-000001-007"}
                value={value}
                name={name}
                dataIndex={index}
                onChange={this.onCellChange}
                isEditable={isEditable?'isEditable':''}
            />
        );
        const obj = {
            children,
            props: {},
        };
        let rowSpan = 1;
        if (record.mergerBoxArray && record.mergerBoxArray.length === 2) {
            rowSpan = Number.parseInt(record.mergerBoxArray[0]);
        }
        obj.props.rowSpan = rowSpan;
        return obj;
    };

    renderBox = (value, record, index, name) => {
        if(this.state.data.length===(index+1)){
            return value
        }
        const type = this.props.type;
        const isEditable = type==='create'?true:false;
        const children = (
            <EditableCell
                {...this.props}
                fkey={"002-000001-000001-000001-005"}
                value={value}
                name={name}
                dataIndex={index}
                onChange={this.onCellChange}
                isEditable={isEditable?'isEditable':''}
            />
        );
        const obj = {
            children,
            props: {},
        };
        let rowSpan = 1;
        if (record.mergerBoxArray && record.mergerBoxArray.length === 2) {
            rowSpan = Number.parseInt(record.mergerBoxArray[0]);
        }
        obj.props.rowSpan = rowSpan;
        return obj;
    };


    renderMergeSku = (value, record, index) => {
        if(this.state.data.length===(index+1)){
            return value
        }
        const children = (
            <span>{ value }</span>
        )
        const obj = {
            children,
            props: {},
        };
        let rowSpan = 1;
        const mSkuCount = Number.parseInt(record.mergeSku, 10);
        if (mSkuCount > 1 || mSkuCount === 0) {
            rowSpan = mSkuCount;
        }
        obj.props.rowSpan = rowSpan;
        return obj;
    };

    renderDakey = (text,record,index) => {
        if ( index === this.state.data.length-1 ) {
          return index;
        }
        const obj = {
            children: index +1,
            props: {},
        };

        let rowSpan = 1;
        const mSkuCount = Number.parseInt(record.mergeSku, 10);
        if (mSkuCount > 1 || mSkuCount === 0) {
            rowSpan = mSkuCount;
        }

        obj.props.rowSpan = rowSpan;
        return obj;

    }

    renderMergeSkuEdit = (value, record, index, name) => {
        if(this.state.data.length===(index+1)){
            return value
        }
        const type = this.props.type;
        const isEditable = type==='create'?true:false;
        const children = (
            <EditableCell
                {...this.props}
                fkey={"002-000001-000001-000001-005"}
                value={value}
                name={name}
                dataIndex={index}
                onChange={this.onCellChange}
                isEditable={isEditable?'isEditable':''}
            />
        );
        const obj = {
            children,
            props: {},
        };
        let rowSpan = 1;
        const mSkuCount = Number.parseInt(record.mergeSku, 10);
        if (mSkuCount > 1 || mSkuCount === 0) {
            rowSpan = mSkuCount;
        }
        obj.props.rowSpan = rowSpan;
        return obj;
    };

    renderInfo = (value, record) => {
        const children = (
        <div className={"lgt-dlt-order_list_item_info"}>
            {record.skuNumber ?
            <Row>
                <Col span={10}><label>SKU:</label></Col>
                <Col span={14}><span>{record.skuNumber}</span></Col>
            </Row> : null}
            {record.purchaseOrderNo ?
            <Row>
                <Col span={10}><label>采购单号: </label></Col>
                <Col span={14}><span>{record.purchaseOrderNo}</span></Col>
            </Row> : null}
            {record.shipmentid ?
            <Row>
                <Col span={10}><label>shipmentid: </label></Col>
                <Col span={14}><span>{record.shipmentid}</span></Col>
            </Row> : null}
            {record.customsName ?
            <Row>
                <Col span={10}><label>报关品名: </label></Col>
                <Col span={14}><span>{record.customsName}</span></Col>
            </Row>: null}
            {record.customesDecUnit ?
            <Row>
                <Col span={10}><label>报关单位: </label></Col>
                <Col span={14}><span>{record.customesDecUnit}</span></Col>
            </Row> : null}
            {record.company ?
            <Row>
                <Col span={10}><label>采购主体: </label></Col>
                <Col span={14}><span>{record.company}</span></Col>
            </Row> : null}
        </div>
    )
        const obj = {
            children,
            props: {},
        };
        let rowSpan = 1;
        // const mSkuCount = Number.parseInt(record.mergeSku, 10);
        // if (mSkuCount > 1 || mSkuCount === 0) {
        //     rowSpan = mSkuCount;
        // }
        obj.props.rowSpan = rowSpan;
        return obj;
    };
    columns = [
        {
            title: '项号',
            dataIndex: 'key',
            width: 60,
            key: 'dekey',
            render:(text,record,index) => { return this.renderDakey(text,record,index)},
            // render: (text,record,index)=> {
            //     if ( index === this.state.data.length-1 ) {
            //         return ;
            //     }
            //     return index+1
            // },
        },
        {
            title: '报关信息',
            key: 'info',
            width: 226,
            render: this.renderInfo,
        },
        {
            title: '数量',
            dataIndex: 'count',
            width: 126,
            render: (value, record, index) => { return this.renderMergeSkuEdit(value, record, index,'count')},
        },
        {
            title: '件数',
            dataIndex: 'num',
            width: 101,
            render: (value, record, index) => { return this.renderBox(value, record, index,'number')},
            // render: (value, record, index) => { return this.renderMergeSkuEdit(value, record, index,'number')},
        },
        {
            title: `毛重/KG`,
            dataIndex: 'grossWeight',
            width: 142,
            render: (value, record, index) => { return this.renderBox(value, record, index,'grossWeight')},
            // render: (value, record, index) => { return this.renderMergeSkuEdit(value, record, index,'grossWeight')},
        },
        {
            title: '体积/CBM',
            dataIndex: 'volume',
            width: 120,
            render: (value, record, index) => { return this.renderBox(value, record, index,'volume')},
            // render: (value, record, index) => { return this.renderMergeSkuEdit(value, record, index,'volume')},
        },
        {
            title: '净重/KG',
            dataIndex: 'weight',
            width: 124,
            render: (value, record, index) => { return this.renderContent(value, record, index, 'netWeight')},
            // render: (value, record, index) => { return this.renderMergeSkuEdit(value, record, index, 'netWeight')},
        },
        {
            title: '含税单价/RMB',
            dataIndex: 'taxinclusivePrice',
            width: 96,
            render: this.renderMergeSku,
        },
        {
            title: '含税总价/RMB',
            dataIndex: 'taxTotalPrice',
            width: 96,
            render: this.renderMergeSku,
        },
        {
            title: '单价/USD',
            dataIndex: 'unitPrice',
            width: 96,
            render: this.renderMergeSku,
        },
        {
            title: '总价/USD',
            dataIndex: 'totalPrice',
            width: 96,
            render: this.renderMergeSku,
        },
        {
            title: '海关编码',
            dataIndex: 'customesCode',
            width: 76,
            render: this.renderMergeSku,
        },
        {
            title: '申报要素',
            dataIndex: 'declaElement',
            width: 176,
            className:"text-left",
            key: 'declaElement',
            render: this.renderMergeSku,
        },
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            width: 110,
            key: 'supplierName',
            // render: this.renderMergeSku,
        },
    ];

    components = {
        body: {
            row: DragableBodyRow,
        },
    };

    measureMoveRowId = (item) => {
        const mergeBoxArray = item.mergerBoxArray;
        if (!mergeBoxArray || mergeBoxArray.length<2) {
            return item.itemId;
        }
        return mergeBoxArray[1];
    };
    moveRow = (dragIndex, hoverIndex) => {
        const pathname = location.pathname
        const keys = this.props.menuInfos.functions[pathname] || []
        if(keys.indexOf('002-000001-000001-000001-007') < 0){
            return false
        }
        const { data } = this.state;
        const dragRow = data[dragIndex];
        const id = this.props.id;
        this.props.editOrderList({id:id, newIndex: hoverIndex, itemId: this.measureMoveRowId(dragRow)});
        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                }
            })
        );
    };

    // 选择的item id集合
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    componentDidMount() {
        const { getCheckList,id } = this.props;
        getCheckList({ id:id });
        // getCheckList();
    }

    componentWillReceiveProps(nextProps) {
        const { checkList } = nextProps;
        this.setState({
            data: checkList,
            selectedRowKeys: []
        })
    }
    // 合并、删除和同步核对清单
    handleOnClick = (type) => {
        const { editListOperation, id } = this.props;
        const itemIdArray = this.state.selectedRowKeys;
        const dataSource = this.state.data
        if(type===5) {
            this.props.history.goBack();
            return false;
        }else if(type===4 && itemIdArray.length > 0){
            if(itemIdArray.length > 0){
                editListOperation({ id: id, type, itemIdArray: itemIdArray, isReload:dataSource.length-1 === itemIdArray.length });
            }else{
                message.info("请选择操作项!")
            }
        }else {
            if(itemIdArray.length > 0){
                editListOperation({ id: id, type, itemIdArray: itemIdArray });

            }else{
                message.info("请选择操作项!")
            }

        }


    };
    // 弹出导出核对清单model
    showExportModel = () => {
        this.setState({
            visible: true
        })
    };
    // 选择要导出的核对清单字段
    handleCheckChange = (checkList) => {
        this.setState({
            checkFieldList: checkList
        })
    };
    // 取消导出核对清单字段
    handleExportCancel = () => {
        this.setState({
            visible: false
        })
    };
    // 导出核对清单字段
    handleExportOk = () => {
        this.setState({
            visible: false
        });
        if (this.state.checkFieldList.length > 0) {
            post(ORDER_LIST_EXPORT_COLUMN, {id: this.props.id,data: this.state.checkFieldList}).then(data => {
            if ( data && data.state === '000001'){
                location.href = data.url
                }
            }
    );
            // this.props.exportColumn({
            //     id: 198,
            //     data: this.state.checkFieldList
            // })
        }
    };
    render() {
    //     const dataSource = [
    //         {
    //             "sku":"AM612401",
    //             "company": "电子商务",
    //             "count": 100,
    //             "customesCode": "8518300000",
    //             "customesDecUnit": "个",
    //             "customsName": "头戴式耳机",
    //             "declaElement": "1.品名：头戴式耳机；2品牌：KOTION EACH；3型号:G9000；境内自主品牌；出口货物在最终目的国（地区）不享受优惠关税；",
    //             "grossWeight": 103.3,
    //             "itemId": 652,
    //             "num": 4,
    //             "purchaseOrderNo": "925540102",
    //             "shipmentid": "FBA15BXGN5C8",
    //             "skuNumber": "AM29055",
    //             "supplierName": "深圳市众信嘉禾电子科技发展有限公司",
    //             "taxTotalPrice": 5335,
    //             "taxinclusivePrice": "53.350",
    //             "totalPrice": "807.000",
    //             "unitPrice": "8.070",
    //             "volume": 0.8099,
    //             "weight": 5.409,
    //             "mergerBoxArray": [5,"652"]
    //
    // }, {
    //             "sku":"AM615463",
    //             "company": "电子商务",
    //             "count": 30,
    //             "customesCode": "8517122000",
    //             "customesDecUnit": "套",
    //             "customsName": "对讲机",
    //             "declaElement": "1品名：对讲机；2用途：通信设备；3适用网络类：无线网络；4品牌：BAOFENG；5型号：BF-888S；6是否加密：否；境内自主品牌；出口货物在最终目的国（地区）不享受优惠关税；一套含2个对讲机",
    //             "grossWeight": 54.7,
    //             "itemId": 539,
    //             "num": 1,
    //             "purchaseOrderNo": "878775102",
    //             "shipmentid": "FBA15BXGN5C8",
    //             "skuNumber": "AM50600",
    //             "supplierName": "福建宝锋电子有限公司",
    //             "taxTotalPrice": 2640,
    //             "taxinclusivePrice": "88.000",
    //             "totalPrice": "399.300",
    //             "unitPrice": "13.310",
    //             "volume": 0.3553,
    //             "weight": 0,
    //             "mergerBoxArray": [0,"652"],
    //     }, {
    //         "sku":"AM511900",
    //             "company": "电子商务",
    //             "count": 90,
    //             "customesCode": "8517122000",
    //             "customesDecUnit": "套",
    //             "customsName": "对讲机",
    //             "declaElement": "1品名：对讲机；2用途：通信设备；3适用网络类：无线网络；4品牌：BAOFENG；5型号：BF-888S；6是否加密：否；境内自主品牌；出口货物在最终目的国（地区）不享受优惠关税；一套含2个对讲机",
    //             "grossWeight": 66,
    //             "itemId": 540,
    //             "num": 3,
    //             "purchaseOrderNo": "878775102",
    //             "shipmentid": "FBA15BXGN5C8",
    //             "skuNumber": "AM50600",
    //             "supplierName": "福建宝锋电子有限公司",
    //             "taxTotalPrice": 7920,
    //             "taxinclusivePrice": "88.000",
    //             "totalPrice": "1197.900",
    //             "unitPrice": "13.310",
    //             "volume": 0.3649,
    //             "weight": 0.66,
    //             "mergerBoxArray": [0,"652"],
    //         "mergeSku": 2
    //     }, {
    //         "sku":"AM511901",
    //             "company": "电子商务",
    //             "count": 48,
    //             "customesCode": "8528691000",
    //             "customesDecUnit": "台",
    //             "customsName": "投影仪",
    //             "declaElement": "1品名；投影仪；2用途；家用；3显示原理；LED；4接口类型；USB\/HDMI\/VGA\/AV;5品牌；LESHP；；6型号；无；7亮度；:3200Lumens；境内自主品牌；出口货物在最终目的国（地区）不享受优惠关税；",
    //             "grossWeight": 177,
    //             "itemId": 541,
    //             "num": 12,
    //             "purchaseOrderNo": "935120102",
    //             "shipmentid": "FBA15BXKXBH8",
    //             "skuNumber": "AM451504",
    //             "supplierName": "深圳市柏莱电子有限公司",
    //             "taxTotalPrice": 35904,
    //             "taxinclusivePrice": "748.000",
    //             "totalPrice": "5429.760",
    //             "unitPrice": "113.120",
    //             "volume": 1.3653,
    //             "weight": 3.3188,
    //             "mergerBoxArray": [0,"652"],
    //             "mergeSku": 0
    //     }, {
    //         "sku":"AM613800",
    //             "company": "电子商务",
    //             "count": 150,
    //             "customesCode": "8521909090",
    //             "customesDecUnit": "台",
    //             "customsName": "车载视频播放器",
    //             "declaElement": "1:品名:车载视频播放器；2:使用媒介：储存卡和U盘；3:类型：视频播放器；4:品牌：CATUO；5:型号：RK-7158G；；境内自主品牌；出口货物在最终目的国（地区）不享受优惠关税；",
    //             "grossWeight": 336,
    //             "itemId": 542,
    //             "num": 30,
    //             "purchaseOrderNo": "903331102",
    //             "shipmentid": "FBA15BXKXBH8",
    //             "skuNumber": "AM682701",
    //             "supplierName": "深圳市理工电子有限公司",
    //             "taxTotalPrice": 77715,
    //             "taxinclusivePrice": "518.100",
    //             "totalPrice": "11752.500",
    //             "unitPrice": "78.350",
    //             "volume": 1.053,
    //             "weight": 2.016,
    //             "mergerBoxArray": [0,"652"]
    //     },{
    //         "count": 150,
    //         "grossWeight": 336,
    //         "num": "全部",
    //         "taxinclusivePrice": "518.100",
    //         "unitPrice": "78.350",
    //         "volume": 1.053,
    //         "weight": 2.016,
    //     },
    //
    // ];
        const { selectedRowKeys } = this.state;
        const  len = this.state.data.length;
        const loadState = this.props.loadState || {};
        const type = this.props.type;
        const isEditable = type==='create'?true:false;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: (() => { // 根据返回值禁选不符需求的值
                    //console.log(Object.getOwnPropertyNames(record).length-1, this.columns.length);
                    if (Object.getOwnPropertyNames(record).length < this.columns.length ) {
                        return true
                    } else {
                        return false
                    }
                })(), // Column configuration not to be checked
            }),
        };
        const mergeSku = (
            <div className="popover-p">
                <p>勾选的sku数据必须含税单价、报关品名、单位、申报要素、海关编码相同</p>
            </div>
        );
        const deleteSku = (
            <div className="popover-p">
                <p>勾选的sku数据将直接从该物流计划单中删除 </p>
            </div>
        ); 
        const synchronizeData = (
            <div className="popover-p">
                <p>将同步勾选的数据的报关品名、报关单位、海关编码、申报要素、第一法定单位、第二法定单位、最小包装数量 </p>
            </div>
        ); 
        return (
            <div>
                {
                    len > 1 ? (
                    isEditable?(
                        <div className="clear margin-sm-top margin-ms-bottom">
                            <Functions {...this.props} functionkey="002-000001-000001-000001-004">
                                <Popover placement="topLeft" content={mergeSku} title="合并sku规则">
                                    <Button onClick={() => this.handleOnClick(1)} className="margin-ss-left">合并SKU</Button>
                                </Popover>
                                <Popover placement="topLeft" content={deleteSku} title="删除sku规则">
                                    <Button onClick={() => this.handleOnClick(2)} className="margin-ss-left">删除SKU</Button>
                                </Popover>
                                <Popover placement="topLeft" content={synchronizeData} title="同步数据">
                                    <Button onClick={() => this.handleOnClick(3)} className="margin-ss-left">同步数据</Button>
                                </Popover>
                            </Functions>
                            <Functions {...this.props} functionkey="002-000001-000001-000001-003">
                                 <Button type="primary" onClick={this.showExportModel} className="margin-ss-right pull-right">导出核对清单</Button>
                            </Functions>
                        </div>
                    ):(
                        <div className="clear margin-sm-top margin-sm-bottom">
                            <Functions {...this.props} functionkey="002-000001-000001-000002-001">
                                   <Button  className="margin-ss-left" type="primary" onClick={this.showExportModel}>导出核对清单</Button>
                            </Functions>
                        </div>
                    )
                    ): null
                }
                <Spin spinning={ loadState[CHECK_LIST]=== LOADING_STATE } delay={500} tip="Loading...">
                    <div className={isEditable?"lgt-dlt-order_list":""} className="padding-sm-left padding-sm-right lgt-dlt-order_list">
                        {
                            isEditable?(
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={this.columns}
                                        dataSource={datasaddkey(this.state.data)}
                                        components={this.components}
                                        pagination={false}
                                        scroll={{x:1658, y: 600 }}
                                        bordered
                                        onRow={(record, index) => ({
                                            index,
                                            moveRow: this.moveRow,
                                        })}
                                    />
                            ):(
                                <Table
                                    columns={this.columns}
                                    dataSource={datasaddkey(this.state.data)}
                                    scroll={{ x:1658,y: 600 }}
                                    pagination={false}
                                    bordered
                                />
                            )
                        }
                    </div>
                </Spin>
                {
                    isEditable ? (
                        <div className={"margin-md"}>
                            <div className={"lgt-dlt-order_footer_inner"}>
                                <Button onClick={() => this.handleOnClick(5)} className="margin-ss-right">返回</Button>
                                <Functions {...this.props} functionkey="002-000001-000001-000001-008">
                                    <Button onClick={() => this.handleOnClick(4)} type="primary">生成报关资料</Button>
                                </Functions>
                            </div>
                        </div>
                    ):null
                }
                <Modal
                    title="选择导出字段"
                    visible={this.state.visible}
                    onOk={this.handleExportOk}
                    onCancel={this.handleExportCancel}
                    width={906}
                >
                    <ExportFields onCheckChange={this.handleCheckChange}></ExportFields>
                </Modal>
            </div>
        );
    }

}

CheckList.propTypes = {
    checkList: PropTypes.array.isRequired,
    loadState: PropTypes.object.isRequired,
    getCheckList: PropTypes.func.isRequired,
    editOrderList: PropTypes.func.isRequired,
    editListOperation: PropTypes.func.isRequired,
    editListColumn: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
export default DragDropContext(HTML5Backend)(CheckList);
