import React from 'react'
import {
    Spin,
    Table,
    Pagination,
} from 'antd'
import {datasaddkey, pageCache,timestampFromat} from '../../../util/baseTool'
import { levelOptions } from "../../../util/options";
import { RECEIVE_OPERATION_LOG_LIST } from '../constants/ActionTypes'
import {LOADING_STATE} from "../../constant"

export default class Tablelist extends React.Component{

    state = {
        visible: true,
        pageNumber: 1,
        pageSize: 20,
    }
    
    componentDidMount(){
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`);
        this.props.getOperationLogList(pageCachedata||{pageNumber: 1, pageData: 20});

    }
   componentWillReceiveProps(nextProps) {
    //      const { operationList } = nextProps;
    //      this.setState({
    //      data: operationList
    // })
    }
    columns = [
        {
            title: '操作类型',
            dataIndex: 'optionType',
            render: (text, record, index) => text
        },
        {
            title: '操作人',
            dataIndex: 'options',
            render: (text, record, index) => text
        },
        {
            title: '说明',
            dataIndex: 'info',
            render: (text, record, index) => text
        },
        {
            title: '操作时间',
            dataIndex: 'createTime',
            render: (text, record, index) => timestampFromat(text,1)
        }]
    
    Paginatihandle = (page, pageSize)=> {
        let params = {};
        params["pageNumber"] = page;
        params["pageData"] = pageSize;
        this.setState({
            pageNumber: page,
            pageSize: pageSize
        })
        this.props.operateLogListFetch(page, pageSize);
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:params}})
    }

    render(){
        const columns = this.columns;
        const loadState = this.props.loadState;
        let { data, total, loading } = this.props.operationList;
        const { pageNumber, pageSize } = this.state;
        // console.log(datasaddkey(data.data));
        
        return(
            <div className="padding-sm">
                <div>
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            columns={columns}
                            dataSource={datasaddkey(data)}
                            pagination={false}
                            bordered={true}
                            size="small"
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageSize}
                        onChange={this.Paginatihandle}/>
                </div>
            </div>
        )
    }
}
