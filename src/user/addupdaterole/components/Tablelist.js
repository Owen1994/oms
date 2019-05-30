import React, { Component } from 'react';
import {
    Button,
    Table,
    Pagination,
    Spin,
} from 'antd';
import { fetchPost } from '../../../util/fetch';
import '../css/css.css';
import { datasaddkey } from '../../../util/baseTool';
import { levelOptions } from '../../../util/options';

class Tablelist extends Component {

    columns = [
        {
            title: '员工',
            dataIndex: 'organstaff',
            render: (text, record, index) => (
                <div>
                    <p>姓名：{record.personName}</p>
                    <p>工号：{record.jobNumber}</p>
                    <p>职位：{record.position}</p>
                </div>
            ),
        }, {
            title: '日期',
            dataIndex: 'platformAccounts',
            render: (text, record, index) => (
                <div>
                    <p>出生日期：{record.birthdayStr}</p>
                    <p>入职日期：{record.joinDateStr}</p>
                </div>
            ),
        }, {
            title: '联系方式',
            dataIndex: 'platformAccounts22',
            render: (text, record, index) => (
                <div>
                    <p>手机号：{record.phoneNum}</p>
                    <p>邮箱：{record.email}</p>
                </div>
            ),
        }, {
            title: '用户名',
            dataIndex: 'userName',
        },
    ]

    componentDidMount() {

    }

    synchdata = () => {
        const newobj = {};
        fetchPost('/urc/motan/service/api/IUrcService/syncDingOrgAndUser', newobj, 2)
            .then(() => {
                this.props.organtableaction({ loading: true });
            });
    }

    render() {
        const { data } = this.props.organtable;
        const newdata = datasaddkey(data);
        const columns = this.columns;
        return (
            <div className="organtableall">
                <div className="rightbtn">
                    <Button
                        onClick={() => {
                            this.synchdata();
                        }}
                    >
                        同步数据
                    </Button>
                </div>

                <div className="organtablecen">
                    <Spin spinning={this.props.organtable.loading} delay={100} tip="Loading...">
                        <Table
                            rowSelection={null}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle}
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist;
