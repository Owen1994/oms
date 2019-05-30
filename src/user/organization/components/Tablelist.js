import React, { Component } from 'react';
import {
    Button,
    Table,
    Pagination,
    Spin,
    message,
    Icon
} from 'antd';
import axios from '../../../util/axios';
import '../css/css.css';
import { datasaddkey } from '../../../util/baseTool';
import { levelOptions } from '../../../util/options';
import * as config from '../../../util/connectConfig';
import Functions from '../../../components/functions';

class Tablelist extends Component {

    columns = [
        {
            title: '员工',
            dataIndex: 'organstaff',
            render: (text, record, index) => (
                <div>
                    <div className="tablelisall"><span className="tipcolor">姓名：</span><span className="tipname">{record.personName}</span></div>
                    <div className="tablelisall"><span className="tipcolor">工号：</span><span className="tipname">{record.jobNumber}</span></div>
                    <div className="tablelisall"><span className="tipcolor">职位：</span><span className="tipname">{record.position}</span></div>
                </div>
            ),
        }, {
            title: '日期',
            dataIndex: 'platformAccounts',
            render: (text, record, index) => (
                <div>
                    <div className="tablelisall2"><span className="tipcolor2">出生日期：</span><span className="tipname">{record.birthdayStr}</span></div>
                    <div className="tablelisall2"><span className="tipcolor2">入职日期：</span><span className="tipname">{record.joinDateStr}</span></div>
                </div>
            ),
        }, {
            title: '联系方式',
            dataIndex: 'platformAccounts22',
            render: (text, record, index) => (
                <div>
                    <div className="tablelisall3"><span className="tipcolor3">手机号：</span><span className="tipname">{record.phoneNum}</span></div>
                    <div className="tablelisall3"><span className="tipcolor3">邮箱：</span><span className="tipname">{record.email}</span></div>
                </div>
            ),
        }, {
            title: '用户名',
            dataIndex: 'userName',
        },
    ]

    componentDidMount() {

    }

    /**
     *作者: 唐勇
     *功能描述: 同步数据调用
     *参数说明:
     *时间: 2018/6/23 19:00
     */
    synchdata = () => {
        this.props.organtableaction({ loading: true });
        const newobj = {};
        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/syncDingOrgAndUser`, newobj)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    const taskId = response.data.data.taskId;
                    if (taskId == 1) {
                        setTimeout(() => {
                            message.success(response.data.msg);
                            this.props.organtableaction({ loading: false });
                        }, 5000);
                    }
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 修改列表信息
     *参数说明:1.page=当前页码, pageSize=当前页面多少条数据
     *时间: 2018/6/23 19:00
     */
    Paginatihandle = (page, pageSize) => {
        // this.setState({
        //     pagenum: page,
        // })
        const { type, list } = this.props.organtable;
        let values = '';

        if (type == 2) {
            values = list;
            console.log(values);
            values.pageNumber = page;
            values.pageData = pageSize;
            values.type = type;
            console.log(values);
        } else if (type == 1) {
            values = list;
            values.pageNumber = page;
            values.pageData = pageSize;
            values.type = type;
            console.log(values);
        }
        // var newobj = {values,type:type}
        this.props.fetchPosts({
            key: 'data',
            value: values,
        });
    }

    render() {
        const { data } = this.props.organtable;
        const newdata = datasaddkey(data);
        const columns = this.columns;
        return (
            <div className="organtableall newCluenk">
                <div className="rightbtn">
                    <Functions {...this.props} functionkey="004-000001-000001-002">
                        <Button
                            onClick={() => {
                                this.synchdata();
                            }}
                        >
                        <Icon type="reload" /> 同步数据
                        </Button>
                    </Functions>
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
