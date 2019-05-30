/**
 *作者: 任贸华
 *功能描述: 暂未用到
 *参数说明:
 *时间: 2018/4/16 11:15
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Button,
    Table,
    Pagination,
    Spin,
} from 'antd'
import {timestampFromat} from '../../../util/baseTool';

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = [{
        title: '序号',
        dataIndex: 'platformOrderNumber',
        width: 70,
        render: (text, record, index) => ++index
    }, {
        title: '销售平台',
        className: '',
        dataIndex: 'name',
    },
        {
            title: '操作',
            width: 70,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                let type='',value='未选择';
                if(record.checked){
                    type='primary';
                    value='已选择'
                }
                return <Button type={type} onClick={()=>{this.onchangeHaddle(index)}}>{value}</Button>
            },
        }];

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){

    }

    onchangeHaddle=(index)=>{
        const {data,type} = this.props.platformsearch;
        if(type!='multiple'){
            data.map(v=>v.checked=false)
        }

        data[index].checked =!data[index].checked;

        this.props.platformsearchaction({data})
    }


    Paginatihandle = (page, pageSize)=> {
        const value = this.props.form.getFieldValue('searchplatformkeyword');
        const newobj = {searchcountrykeyword: value}
        this.props.fetchsearchplatform({key: 'data', value: {key: 'data', value: {...newobj, pageSize: page, offset: pageSize}}})
        this.props.tablemodelaction({selectedRowKeys: []});
    }


    render() {

        const {data} = this.props.platformsearch;
        const columns = this.columns;

        return (
                    <Spin spinning={this.props.platformsearch.loading} delay={500} tip="Loading...">
                        <Table columns={columns} dataSource={data} bordered
                               pagination={false}/>

                    <Pagination style={{padding: '10px 0px', textAlign: 'right'}}
                                showTotal={total => `共 ${total} 条`}
                                pageSizeOptions={['20', '30', '40', '50']}
                                showSizeChanger showQuickJumper
                                current={this.props.searchplatformPaginationInfo.current}
                                defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                                total={this.props.searchplatformPaginationInfo.total}
                                pageSize={this.props.searchplatformPaginationInfo.pageSize}
                                onChange={this.Paginatihandle}/>
                    </Spin>
        );
    }
}

export default Tablelist