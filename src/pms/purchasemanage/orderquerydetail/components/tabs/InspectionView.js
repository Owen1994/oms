import React, { Component } from 'react';
import { getUrlParams } from '../../../../../util/baseTool';
import {Spin, Table} from "antd";
import { Purchase_Inspect_List_Api } from '../../constants/Api';
import { fetchPost } from "../../../../../util/fetch";
import { parseInspection } from '../../selectors/index';

/**
 * 质检明细
 */
class InspectionView extends Component {
    state = {
        listData: [],
        loading: false,
    };
    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
        this.setState({loading: true});
        fetchPost(Purchase_Inspect_List_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    listData: parseInspection(result.data),
                });
            }
        });
    }

     columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
        },
        {
            title: '收货单号',
            dataIndex: 'arriveProcessSn',
        },
        {
            title: '对图人',
            dataIndex: 'contrast',
        },
        {
            title: '对图时间',
            dataIndex: 'contrastTime',
        },
        {
            title: '质检人',
            dataIndex: 'inspect',
        },
         {
             title: '质检时间',
             dataIndex: 'inspectTime',
         },
         {
             title: '质检SKU',
             dataIndex: 'inspectSku',
         },
         {
             title: '供应商发货数量',
             dataIndex: 'supplierQuantity',
         },
         {
             title: '实际到货数量',
             dataIndex: 'actualArriveQuantity',
         },
         {
             title: '合法范围合格量',
             dataIndex: 'stGoodQuantity',
         },
         {
             title: '合法范围不合格量',
             dataIndex: 'stUnqualifiedQuantity',
         },
         {
             title: '不合格类型',
             dataIndex: 'unqualifiedType',
         },
         ,
         {
             title: '备注',
             dataIndex: 'inspectMemo',
             render: (text) => {
                 return (
                     <div className="breakwrod">
                         {text}
                     </div>
                 )
             }
         }
         // {
         //     title: '图片',
         //     dataIndex: 'unqualifiedImages',
         //     render: (text, record) => {
         //         return (
         //             <img
         //                 src={record.unqualifiedImages}
         //                 width="73px"
         //                 height="64px"
         //             />
         //         )
         //     }
         // }
    ];

    render() {
        const { listData, loading } = this.state;
        return (
            <div className="padding-sm white pms-order-query_LogTable_bottom">
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <Table
                        rowKey={t => t.serialNumber}
                        dataSource={listData.list}
                        pagination={false}
                        bordered
                        size="small"
                        columns={this.columns}
                    />
                </Spin>
            </div>
        );
    }
}

export default InspectionView;
