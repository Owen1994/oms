/**
 *作者: 郑学宁
 *功能描述: 抽屉
 *时间: 2019年04月22日17:45:40
 */
import React from 'react';
import {
    Drawer,
    Form, Pagination, Spin, Table,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { Has_Cover_Sub_List_Api } from '../../constants/Api';
import { parseHasSubCoverData } from '../../selectors/index';

class HasCoverDrawer extends React.Component {

    state = {
        loading: false,
        pageNumber: 1,
        pageData: 20,
        params: undefined,
        listData: {list: [], total: 0},
    };

    /**
     * 列表头标签
     * @type {[]}
     */
    columns = [
        {
            title: 'listing ID',
            dataIndex: 'listingId',
            width: 200,
            render: (text, record) => {
                const view = text === '--' ? (
                    <div>
                        {text}
                    </div>
                ) : (
                    <a
                        href={record.webUrl}
                        target={'_blank'}
                    >
                        {text}
                    </a>
                );

                return view;
            },
        },
        {
            title: 'Seller SKU',
            dataIndex: 'sellerSku',
            width: 200,
        },
        {
            title: '历史销量',
            dataIndex: 'historicalSales',
            width: 100,
        },
        {
            title: '零售价',
            dataIndex: 'retailPrice',
            width: 100,
            render: (text, record) => {
                const view = text === '--' ? (
                    <div>
                        {text}
                    </div>
                ) : (
                    <div>
                        {record.currency + ' ' + text}
                    </div>
                );
                return view;
            },
        },
        {
            title: '折扣价',
            dataIndex: 'discountPrice',
            width: 100,
            render: (text, record) => {
                const view = text === '--' ? (
                    <div>
                        {text}
                    </div>
                ) : (
                    <div>
                        {record.currency + ' ' + text}
                    </div>
                );
                return view;
            },
        },
        {
            title: '边际利润率/%',
            dataIndex: 'marginalProfitMargin',
            width: 120,
        },
        {
            title: '销售账号',
            dataIndex: 'sellerAccount',
            width: 200,
        },
        {
            title: '上架时间',
            dataIndex: 'shelfTime',
            width: 200,
        }];

    componentWillReceiveProps(nextProps){
        const visible = this.props.visible;
        const subData = nextProps.subData;
        const nextvisible = nextProps.visible;
        if(visible !== nextvisible && subData !== undefined){
            this.setState({
                loading: true,
                data: subData
            }, function () {
                this.loadData();
            });
        }
    }

    loadData = (pageNumber, pageData) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageData) {
            pageData = this.state.pageData;
        }
        this.setState({
            pageNumber,
            pageData,
        });

        const sSite = this.state.data.siteCode === '--' ? '' : this.state.data.siteCode;

        const data = {
            data: {
                skuCode: this.state.data.skuCode,
                platform: this.state.data.platform,
                siteCode: sSite,
                pageNumber,
                pageData,
            }
        };
        fetchPost(Has_Cover_Sub_List_Api, data, 2)
            .then((result) => {
                this.setState({loading: false});
                if (result.state === '000001') {
                    this.setState({
                        listData: parseHasSubCoverData(result.data, this.state.data.platform, this.state.data.siteCode),
                    });
                }
            })
    };

    onClose = () => {
        this.setState({
            pageNumber: 1,
            pageData: 20,
            params: undefined,
            listData: {list: [], total: 0},
        });
        this.props.hiddenHasCoverDrawerSub();
    };

    render() {
        const {
            loading,
            pageNumber,
            pageData,
            listData,
        } = this.state;

        const {
            visible,
        } = this.props;

        return (

                <Drawer
                    title="覆盖明细"
                    placement="right"
                    onClose={this.onClose}
                    visible={visible}
                    width={1050}
                    destroyOnClose
                >
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            className="sku-cover-drawer"
                            rowKey={record => record.index}
                            columns={this.columns}
                            dataSource={listData.list}
                            size="small"
                            pagination={false}
                            bordered
                        />
                        <Pagination
                            style={{textAlign: 'right', paddingTop: '10px'}}
                            showTotal={() => `共 ${listData.total} 条`}
                            current={pageNumber}
                            showQuickJumper={{ goButton: true }}
                            total={listData.total}
                            pageSize={pageData}
                            onChange={this.loadData}
                            pageSizeOptions={['20', '30', '50', '100', '150', '200']}
                            showSizeChanger
                            defaultPageSize={20}
                            onShowSizeChange={this.loadData}
                        />
                    </Spin>
                </Drawer>
        );
    }
}
export default Form.create()(HasCoverDrawer);
