import React, { PureComponent } from 'react';
import {
    Form,
    Button,
    Table,
    Pagination,
    message,
    Modal,
} from 'antd';
import '../css/css.css';

import { post } from '../../../../util/axios';


class Tablelist extends PureComponent {
    state = {
        lst: [], // 存储表格选择项
        pageData: 20,
        pageNumber: 1,
        total: 0,
        index: -1,
    }

    // ----常量定义----

    // 表头
    columns = [
        {
            title: '方案名称',
            dataIndex: 'templName',
            width: 150,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: 120,
        },
        {
            title: '创建人',
            dataIndex: 'createBy',
        },
        {
            title: '创建时间',
            dataIndex: 'createTimeStr',
            width: 120,
        },
        {
            title: '最后修改时间',
            dataIndex: 'modifiedTimeStr',
            width: 120,
        },
        {
            title: '操作',
            dataIndex: 'selectOption',
            width: 100,
            render: (text, record, index) => {
                let type = ''; let
                    value = '未选择';
                if (this.state.index === index) {
                    type = 'primary';
                    value = '已选择';
                }
                return (
                    <Button
                        type={type}
                        onClick={(e) => {
                            this.setState({ index });
                        }}
                    >{value}
                    </Button>
                );
            },
        },
    ];

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.loadList();
        }
    }

    loadList = (pageNumber = 1, pageData = 20) => {
        this.setState({
            pageNumber,
            pageData,
        });
        const params = {
            pageNumber,
            pageData,
        };
        post('/urc/motan/service/api/IUrcService/getMyDataRuleTempl', params)
            .then((result) => {
                if (result.state === '000001') {
                    const data = result.data;
                    this.setState({
                        total: data.total,
                        lst: data.lst,
                    });
                } else {
                    message.warning(result.msg);
                }
            });
    }
    // ----自定义方法----

    currentChange = (current, pageSize) => {
        this.setState({
            pagenum: Number(current),
        });
        this.Paginatihandle(current, pageSize);
    }

    Paginatihandle = (current, pageSize = 20) => {
        const newobj = { pageNumber: current, pageData: pageSize };
        this.props.fetchPosts({
            key: 'data',
            value: newobj,
        });
        this.props.tablemodelaction({ selectedRowKeys: [] });
        this.props.menudataaction({ pageCache: { ...this.props.menuInfos.pageCache, [`${location.pathname}${location.search}`]: newobj } });
    }

    handleSubmit = () => {
        alert('点击了我');
    }

    render() {
        const columns = this.columns;
        // const {data} = this.props.tablemodel;
        // const newdata = datasaddkey(data.lst || []);
        const {
            total, pageData, pageNumber, lst, index,
        } = this.state;
        const {
            visible, onOk, onCancel, title,
        } = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={() => onOk(lst[index])}
                onCancel={onCancel}
                width="800px"
            >
                <div className="newCluenk">
                    <div className="content">
                        <Table
                            scroll={{ y: 410 }} // 弹窗高度
                            columns={columns}
                            dataSource={lst}
                            bordered
                            pagination={false}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`} // 用于显示数据总量和当前数据顺序
                            pageSizeOptions={['20', '30', '40', '50']} // 指定每页可以显示多少条
                            showSizeChanger // 是否可以改变 pageSize
                            showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                            current={pageNumber} // 当前页数
                            onShowSizeChange={this.loadList} // pageSize 变化的回调
                            total={total} // 数据总数
                            pageSize={pageData} // 每页条数
                            onChange={this.loadList} // 页码改变的回调，参数是改变后的页码及每页条数
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Tablelist;
