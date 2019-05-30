/**
 *作者: 任贸华
 *功能描述: 表格展示模块
 *参数说明:
 *时间: 2018/4/16 11:01
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Button,
    Table,
    Pagination,
    Spin,
    message
} from 'antd'
import {levelOptions} from '../../../util/options';
import {datasaddkey, timestampFromat} from '../../../util/baseTool';

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = (title) => [{
        title: '序号',
        dataIndex: 'platformOrderNumber',
        className: 'tc',
        width: 70,
        render: (text, record, index) => ++index
    }, {
        title: `${title}`,
        className: '',
        dataIndex: 'name',
    },
        {
            title: '操作',
            width: 91,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                let type = '', value = '未选择';
                if (record.checked) {
                    type = 'primary';
                    value = '已选择'
                }
                return <Button type={type} onClick={() => {
                    this.onchangeHaddle(index)
                }}>{value}</Button>
            },
        }];

    onchangeHaddle = (index) => {
        let {data, type, tags, num} = this.props.searchValues;

        if (typeof num === 'number') {
            if (tags.length >= num) {
                message.warning(`超出最大数量${num}个哦！`)
                return false;
            }
        }

        data[index].checked = !data[index].checked;
        if (data[index].checked) {
            if (type !== 'multiple') {
                data.forEach(v => {
                    if (v.id !== data[index].id) {
                        v.checked = false
                    }
                })
                tags = []
            }
            tags.push(data[index])
        } else {
            tags = tags.filter(v => v.id !== data[index].id)
        }

        this.props.searchVluesaction({data, tags})
    }


    Paginatihandle = (page, pageSize) => {
        const value = this.props.form.getFieldValue('name');
        const tags = this.props.searchValues.tags;
        const transformData = this.props.searchValues.transformData;
        const name = this.props.searchValues.searchField || "name";
        const newobj = {}
        newobj[name] = value
        this.props.fetchsearchValues({
            url: this.props.searchValues.url,
            key: 'data',
            tags,
            transformData,
            value: {...newobj, pageNumber: page, pageData: pageSize}
        })
    }


    render() {

        const {data} = this.props.searchValues;
        const newdata = datasaddkey(data)
        const columns = this.columns(this.props.searchValues.title)

        return (
            <Spin spinning={this.props.searchValues.loading} delay={500} tip="Loading...">
                <Table columns={columns} dataSource={newdata} bordered scroll={{y: 343}}
                       pagination={false}/>

                <Pagination className={'pstyle'}
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={levelOptions('分页显示条数')}

                            current={this.props.searchValuesPagination.current}
                            defaultCurrent={1} onShowSizeChange={this.Paginatihandle} hideOnSinglePage
                            total={this.props.searchValuesPagination.total}
                            pageSize={this.props.searchValuesPagination.pageSize}
                            onChange={this.Paginatihandle}/>
            </Spin>
        );
    }
}

export default Tablelist