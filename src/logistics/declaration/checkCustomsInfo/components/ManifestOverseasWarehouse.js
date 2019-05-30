/**
 * 作者: 陈林
 * 描述: 载货清单（海外仓）
 * 时间: 2018/6/15 0015 上午 11:36
 * @param
 **/
import React, { Component } from 'react'
import { post } from "../../../../util/axios";
import { Row,Col,Table,Spin } from "antd";
import {datasaddkey} from "../../../../util/baseTool";
const columns = [
    {
        title: '日期',
        dataIndex: 'date',
    },
    {
        title: '采购单号',
        dataIndex: 'purchaseOrderNo',
    },
    {
        title: 'sku',
        dataIndex: 'sku',
    },
    {
        title: '中文名称',
        dataIndex: 'cname',
    },
    {
        title: '数量',
        dataIndex: 'quantity',
    },
    {
        title: '重量',
        dataIndex: 'weight',
    },
    {
        title: '规格',
        dataIndex: 'specification',
    },
    {
        title: '箱号',
        dataIndex: 'caseNumber',
    },
    {
        title: '金额',
        dataIndex: 'money',
    },
    {
        title: '卡板号',
        dataIndex: 'cardNumber',
    },
    {
        title: '储位',
        dataIndex: 'storageNumber',
    },
    {
        title: '海外仓',
        dataIndex: 'wareHouse',
    },
    {
        title: '物流渠道',
        dataIndex: 'logisticsChannels',
    },
    {
        title: '体积',
        dataIndex: 'volume',
    }
];
export default class App extends Component{

    state = {
        ManifestOverseasWarehouse:[],
        loading: true,
    }

    componentDidMount(){
        const id = this.props.id;
        post(`/customs/api/print/CargoListOversea/cargolistoversea`,{id:id}).then(response => {
            this.setState({
                ManifestOverseasWarehouse: response.data || [],
                loading: false,
            });
        })
    }

    render(){
        return(
            <div className="container lgt-dlt-cd_container">
                <Spin spinning={this.state.loading}>
                    <Row>
                    <Col span={24}>
                        <div className="row ManifestOverseasWarehouse">
                                <p className="com-title text-center"><b className="yks-w333">载货清单（海外仓）</b></p>
                                <Table className="table-top" columns={columns} dataSource={datasaddkey(this.state.ManifestOverseasWarehouse)} bordered  pagination={false}/>
                        </div>
                    </Col>
                </Row>
                </Spin>
            </div>
        )
    }
}