import React from 'react'

import {
    Button,
    Modal,
    Tooltip,
    Popover,
    Icon,
    Table,
    Menu,
    Dropdown,
    Spin,
    Pagination,
    Form,
} from 'antd'
// import Functions from '../../../../../components/functions'
import {
    timestampFromat,
    datasaddkey
} from "../../../../util/baseTool"
import {levelOptions} from '../../../../util/options';

export default class Tablelist extends React.Component {
    columns = ()=>{
        return this.columns =  [
            {
                title: '站点',
                dataIndex: 'siteCode',
                width:100,
                key: 'siteCode',
            }, 
            {
                title: '销售账号',
                dataIndex: 'account',
                width:100,
                key: 'account',
            }, 
            {
                title: '物流渠道',
                dataIndex: 'name',
                width:100,
                key: 'name',
            }, 
            {
                title: '物流ID',
                dataIndex: 'code',
                width:100,
                key: 'code',
            }, 
        ];
    }
    Paginatihandle = (page, pageSize)=>{
        var {getListActionAsync,paramsData} = this.props
        var params = paramsData
        params.pageNumber = page
        params.pageData = pageSize
        getListActionAsync(params)
    }
    render(){
        
        var {listData,loadingData,paramsData} = this.props
        var {total,list} = listData;
        datasaddkey(list)
        var { pageNumber,pageData} = paramsData
        var columns = typeof this.columns == "function" ? this.columns():this.columns;

        var table = (
            <Spin spinning={loadingData} delay={500} tip="Loading...">
                <div>
                    <Table 
                    bordered={true}
                    size="small"
                    dataSource={list}
                    pagination=  {false} 
                    columns={columns} />
                    
                </div>
            </Spin>
        )
        return (
            <div className="publish-batch-tablewrap">
                
                {table}
            </div>
        )
    }

}
    // <Pagination
    // showTotal={total => `共 ${total} 条`}
    // pageSizeOptions={levelOptions('分页显示条数')}
    // showSizeChanger 
    // showQuickJumper={{goButton: true}}
    // current={pageNumber}
    // // defaultCurrent={1} 
    // onShowSizeChange={this.Paginatihandle}
    // total={total}
    // pageSize={pageData}
    // onChange={this.Paginatihandle}/>