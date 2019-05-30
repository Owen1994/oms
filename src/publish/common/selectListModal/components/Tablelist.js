import React from 'react'
import {
    Button,
    Table,
    Pagination,
    Spin,
} from 'antd'
import { levelOptions } from "../../../../util/options";
import { datasaddkey } from "../../../../util/baseTool";

class Tablelist extends React.Component {

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
        let {data, type, tags} = this.props.searchValues;

        data[index].checked = !data[index].checked;
        if (data[index].checked) {
            if (type !== 'multiple') {
                data.forEach(v => {
                    if (v.id !== data[index].id) {
                        v.checked = false
                    }
                });
                tags = []
            }
            tags.push(data[index])
        } else {
            tags = tags.filter(v => v.id !== data[index].id)
        }

        this.props.searchVluesaction({data, tags})
    };


    paginatihandle = (page, pageSize) => {
        const value = this.props.searchValues.searchValue;
        const newobj = {name: value};
        this.props.searchVluesaction({ pageNumber: page });
        this.props.fetchsearchValues({
            url: this.props.searchValues.url,
            key: 'data',
            value: {...newobj, pageNumber: page, pageData: pageSize}
        })
    };


    render() {

        const {data, current, total, pageSize} = this.props.searchValues;
        const newdata = datasaddkey(data);
        const columns = this.columns(this.props.searchValues.title);
        return (
            <Spin spinning={this.props.searchValues.loading} delay={500} tip="Loading...">
                <Table columns={columns} dataSource={newdata} bordered scroll={{y: 343}}
                       pagination={false}/>

                <Pagination className={'pstyle'}
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={levelOptions('分页显示条数')}
                            current={current}
                            defaultCurrent={1} onShowSizeChange={this.paginatihandle} hideOnSinglePage
                            total={total}
                            pageSize={pageSize}
                            onChange={this.paginatihandle}/>
            </Spin>
        );
    }
}

export default Tablelist