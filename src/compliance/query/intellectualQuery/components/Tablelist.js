import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';
import { timestampFromat } from '../../../../utils';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Tableitem from '../../../../components/Tableitem';

class App extends Component {
    state = {
        columns: []
    }
    componentDidMount() {
        // this.props.listFetch();
    };
    render() {
        const { data, colum, loading  } = this.props;
        const { current, pageSize,total } = this.props.paginationReducer;
        const { listFetch } = this.props;

        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin delay={500} spinning={loading}>
                    <div className="table">
                        <Table
                            bordered
                            size="small"
                            columns={colum}
                            dataSource={data}
                            rowKey={(record, index) => (index)}
                            pagination={false}
                        />
                    </div>
                    <div className="pagination">
                        <Pagination
                            className="pull-right"
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={page.pageSizeOptions}      // 指定每页可以显示多少条
                            showSizeChanger                             // 是否可以改变 pageSize
                            defaultCurrent={page.defaultCurrent}        // 默认的当前页数
                            current={current}
                            showQuickJumper                             // 是否可以快速跳转至某页
                            total={total}                               // 数据总数
                            pageSize={pageSize}                         // 每页条数
                            onChange={listFetch}                        // 页码改变的回调，参数是改变后的页码及每页条数
                            onShowSizeChange={listFetch}                // pageSize 变化的回调
                        />
                    </div>
                </Spin>
            </div>
        );
    }
}

export default App;
