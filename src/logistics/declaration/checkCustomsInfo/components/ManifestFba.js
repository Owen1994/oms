/**
 * 作者: 陈林
 * 描述: 
 * 时间: 2018/6/15 0015 下午 2:30
 * @param
 **/
import React, { Component } from 'react'
import { post } from "../../../../util/axios";
import { Table,Row,Col,Spin } from 'antd';
import { datasaddkey } from '../../../../util/baseTool'
const columns = [
    {
        title: 'shipmentid',
        dataIndex: 'shipmentId',
    },
    {
        title: 'Case No',
        dataIndex: 'caseNo',
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            }
            obj.props.rowSpan = row.row;
            return obj;
        },
    },
    {
        title: '采购单号',
        dataIndex: 'pOrderNumber',
    },
    {
        title: 'sku#',
        dataIndex: 'sku',
    },
    {
        title: '采购名称',
        dataIndex: 'purchaseName',
    },
    {
        title: '报关品名',
        dataIndex: 'customsName',
    },
    {
        title: '数量',
        dataIndex: 'count',
    },
    {
        title: '重量',
        dataIndex: 'totalWeight',
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            }
            obj.props.rowSpan = row.row;
            return obj;
        },
    },
    {
        title: '纸箱规格',
        dataIndex: 'cartonSize',
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            }
            obj.props.rowSpan = row.rows;
            return obj;
        },
    }
];
export default class App extends Component{

    state = {
        ManifestFba:[],
        loading: true,
    }

    componentDidMount(){
        const id = this.props.id;
        post(`/customs/api/print/CargoListFba/cargolistfba`,{id:id}).then(response => {
            this.setState({
                ManifestFba: response.data || [],
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
                                <p className="com-title text-center"><b className="yks-w333">载货清单（FBA）</b></p>
                                <Table className="table-top" columns={columns} dataSource={datasaddkey(this.state.ManifestFba)} bordered  pagination={false}/>
                        </div>
                    </Col>
                </Row>
                </Spin>
            </div>
        )
    }
}