import React, { Component } from 'react';
import { Table, Spin } from 'antd';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import { timestampFromat } from '../../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { path } from '../../../configs';

class App extends Component {
    state = {
        dataSource: []
    }
    componentDidMount() {
        this.props.listFetch();
    };
    componentWillReceiveProps(nextProps){
        const { data } = nextProps.list_reducer;
        this.setState({dataSource: data})
    }
    columns = [
        {
            title: '分类',
            dataIndex: 'figureCategoryName',
            align: 'left',
            width: 350,
            render: text => {
                return (
                    <span className='separate-indexSize'>{text}</span>
                )
            }
        }, {
            title: '最新修改人员',
            dataIndex: 'lastUpdatePerson',
            width: 240,
        }, {
            title: '最新修改时间',
            dataIndex: 'lastUpdateTime',
            width: 240,
            render: text => timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')
        }, {
            title: '操作',
            dataIndex: 'ss',
            width: 240,
            render: (text, record) => {
                let options = [
                    {
                        name: "修改",
                        onChange: () => {this.props.onChangeModal('detailVisible', '编辑', record)},
                        funcId: '007-000002-000003-002',
                        subs: []
                    }, 
                    {
                        name: '创建子级分类',
                        onChange: () => {this.props.onChangeModal('newVisible', '创建子级分类', record)},
                        funcId: '007-000002-000003-002',
                        subs: []
                    }, {
                        name: '删除',
                        onChange: () => {this.props.deleteItem(record)},
                        funcId: '007-000002-000003-003',
                        subs: []
                    }
                ];
                return (
                    <Tableoption {...this.props} options={ options }/>
                )
            }
        }
    ]
    getChildren = (expanded, record)=> {
        if (!expanded) return
        const params = {
            parentId: record.figureCategoryId,
        }
        fetchPost(path.irp + 'figureCategory/GetChirdrenList/getChirdrenList', params).then(responeData=>{
            if(responeData && responeData.state === "000001"){
                if (responeData.data && responeData.data.data) {
                    const data = responeData.data.data
                    if (data && data.length) {
                        record.children = data
                        this.setState({dataSource: this.state.dataSource})
                    }
                }
                
            }
        })
    }
    render() {
        const { loading } = this.props.list_reducer;
        const btnOptions = {
            left: [  
            ],
            right: [{
                name: '新增一级分类',
                type: 'button',
                icon: 'plus',
                funcId: '007-000002-000003-002',
                onChange: () => this.props.onChangeModal('newFirstVisible', '新增一级分类',),
            }]
        }
        return (
            <div className="breadcrumb padding-sm overflow-hidden">
                <Spin spinning={loading} delay={500}>
                    <div className="table">
                        <BtnOperation
                            btnOptions={btnOptions}
                            {...this.props}
                        />
                        <Table
                            bordered
                            indentSize={0}
                            size="small"
                            defaultExpandAllRows={false}
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                            rowKey={(record) => (record.figureCategoryId)}
                            pagination={false}
                            onExpand={(expanded, record) => (this.getChildren(expanded, record))}
                        />
                    </div>
                </Spin>
            </div>
        );
    }
}

export default App;
