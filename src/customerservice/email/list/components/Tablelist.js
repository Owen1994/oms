import React from 'react';
import { Table, Pagination, Spin } from 'antd';
import moment from 'moment';
import Tableoption from '../../../../components/Tableoption';
import Tableitem from '../../../../components/Tableitem';
import Shunt from '../../../../components/Tableitem/shunt';
import BtnOperation from '../../../../components/BtnOperation';
import { page } from '../../../../constants';
import { popUpImage, angentPicUrl } from '@/util/baseTool';

export default class TableList extends React.Component {
    // 图片后缀名
    extensionsImg = ['JPG', 'JPEG', 'PNG', 'BMP', 'GIF']

    columns = [
        {
            title: '买家邮箱/卖家邮箱/卖家账号',
            dataIndex: 'accountInfo',
            align: 'center',
            width: 295,
            render: (text, record) => (
                <div className="mail-account">
                    <Tableitem
                        title="买家邮箱"
                        content={`${record.buyerEmail}`}
                        left={65}
                        right={210}
                    />
                    <Tableitem
                        title="卖家邮箱"
                        content={`${record.sellerEmail}`}
                        left={65}
                        right={210}
                    />
                    <Tableitem
                        title="卖家账号"
                        content={`${record.sellerAccount}`}
                        left={65}
                        right={210}
                    />
                </div>
            ),
        },
        {
            title: '邮件信息',
            dataIndex: 'maiInfo',
            align: 'center',
            width: 245,
            render: (text, record) => (
                <div className="mail-info">
                    <Shunt
                        title="邮件标题"
                        content={
                            <span className="blue pointer" onClick={() => { this.props.handleOperate('邮件详情', 'mailDetailVisible', 'mailDetail', record); }}>{record.emailTitle}</span>
                        }
                        left={1}
                        right={3}
                    />
                    <Shunt
                        title="标签"
                        content={`${record.tag}`}
                        left={1}
                        right={3}
                    />
                    <Shunt
                        title="接收时间"
                        content={`${moment(record.emailTime * 1000).format('YYYY年MM月DD日 HH:mm:ss')}`}
                        left={1}
                        right={3}
                    />
                    <Shunt
                        title="附件信息"
                        content={(
                            <div className="items" style={{ width: 210 }}>
                                {record.enclosureUrl.map((item, index) => (
                                    <span key={item} onClick={() => this.preview(angentPicUrl(item))} className="mail-href">{`附件${index + 1}`} </span>
                                ))}
                            </div>
                        )}
                        left={1}
                        right={3}
                    />
                    <Shunt
                        title="处理详情"
                        content={`${record.operatorContent || ''}`}
                        left={1}
                        right={3}
                    />
                </div>
            ),
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            width: 100,
            render: (text, record) => (
                <div className="mail-status">
                    <div>{record.readState === 1 ? <span className="dis-operate">未读</span> : <span>已读</span>}</div>
                    <div>{record.optionState === 1 ? <span className="dis-operate">未处理</span> : <span>已处理</span>}</div>
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'options',
            key: 'options',
            width: 120,
            render: (text, record) => {
                const options = [
                    {
                        name: '标记',
                        onChange: () => { this.props.handleOperate('处理说明', 'markVisible', 'mark', record); },
                        funcId: '009-000001-000003-003',
                        subs: [],
                    }, {
                        name: '移动',
                        funcId: '009-000001-000003-002',
                        onChange: () => { this.props.handleOperate('移动至标签', 'moveVisible', 'move', record); },
                        subs: [],
                    },
                    // {
                    //     name: '回复邮件',
                    //     funcId: '009-000001-000003-005',
                    //     onChange: () => { this.props.handleOperate('回复邮件', 'replyVisible', 'reply', record); },
                    //     subs: [],
                    // },
                ];
                return (
                    <Tableoption {...this.props} options={options} />
                );
            },
        },
    ]

    btnOptions = {
        left: [
            {
                // name: '',
                type: 'dropdown',
                funcId: ['009-000001-000003-002', '009-000001-000003-003'],
                onChange: this.props.handleMultipleOperate,
                subs: [
                    {
                        name: '标记已处理',
                        funcId: '009-000001-000003-003',
                    },
                    {
                        name: '移动到标签',
                        funcId: '009-000001-000003-002',
                    },
                ],
            },
        ],
        right: [
            {
                name: '同步邮件',
                type: 'button',
                icon: 'sync',
                funcId: '009-000001-000003-004',
                onChange: () => this.props.handleOperate('同步邮件', 'syncEmailVisible', 'syncEmail'),
                subs: [],
            },
        ],
    }

    // 文件预览
    preview = (url) => {
        const itemArr = url.split('.');
        const extension = itemArr[itemArr.length - 1].toUpperCase();
        if (this.extensionsImg.includes(extension)) {
            popUpImage(url, true);
        } else {
            window.open(url, '_blank');
        }
    }

    render() {
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listData, loading } = this.props.listReducer;
        const { listFetch, rowSelection } = this.props;
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        btnOptions={this.btnOptions}
                        {...this.props}
                    />
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={listData}
                        rowSelection={rowSelection}
                        pagination={false}
                        rowKey={record => (record.emailUnid)}
                    />
                    <Pagination
                        className="pull-right"
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch} // pageSize 变化的回调
                    />
                </Spin>
            </div>
        );
    }
}
