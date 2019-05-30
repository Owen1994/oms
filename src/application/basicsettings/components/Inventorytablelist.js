//盘点列表
import React, {Component} from 'react'
import {
    Table,
    Spin,
    Checkbox,
    message
} from 'antd'
import '../css/css.css'
import * as types from "../constants/ActionTypes"
import axios from "../../../util/axios";
import {datasaddkey} from '../../../util/baseTool';
import Functions from "../../../components/functions"

class Inventorytablelist extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getList();
    }

    //----常量定义----

    //表头
    columns = [
        {
            title: '代码',
            dataIndex: 'codeId',
            width: 60,
        },
        {
            title: '类型',
            dataIndex: 'codeType',
            width: 60
        },
        {
            title: '描述',
            dataIndex: 'codeDesc',
            width: 80,
        },
        {
            title: '代码组',
            dataIndex: 'codeGroup',
            width: 60
        },
        {
            title: '是否可申请赔偿',
            dataIndex: 'canApply',
            width: 60,
            render: (text, record, index) => {
                let canApply = record.canApply;
                if (canApply == 1) {
                    canApply = true;
                } else if (canApply == 0) {
                    canApply = false;
                }
                return (
                    <Functions {...this.props} functionkey={'006-000001-000003-008'}>
                        <Checkbox onChange={(e) => this.checkChange(e)} defaultChecked={canApply} value={record}/>
                    </Functions>
                )
            }
        }
    ];

    //获取盘点列表数据
    getList = () => {
        this.props.fetchPosts({
            key: 'data',
            value: {
                pageNumber: 1,
                pageData: 20,
            },
            url: types.GET_INVENTORYTABLELIST_API,
            tableAction: 'InventorytablelistAction'
        })
    }

    //checkChange 勾选
    checkChange = (e) => {
        let inventoryCodeVO = [];
        let {codeId, canApply} = e.target.value;
        if (canApply) {
            canApply = 0;
        } else {
            canApply = 1;
        }
        inventoryCodeVO.push({codeId: codeId, canApply: canApply});
        this.props.InventorytablelistAction({data: [], loading: true});
        axios.post(types.UPDATECANAPPLY_API, {inventoryCodeVO: [...inventoryCodeVO]})
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        if (response.data.data == 1) {
                            this.getList();
                        } else {
                            message.error('修改失败!');
                        }
                    }
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        let {data, loading} = this.props.Inventorytablelist;
        if (data) {
            var newdata = datasaddkey(data || []);
        }
        const columns = this.columns;
        return (
            <div className="newCluenk">
                <div className="content">
                    <Spin tip="Loading..." spinning={loading} delay={100}>
                        <Table
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}/>
                    </Spin>

                </div>
            </div>
        );
    }
}

export default Inventorytablelist