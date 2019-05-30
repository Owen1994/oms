import React from 'react';
import { Form } from 'antd';
import '../css/css.css';
import SearchView from './Search';
import TableView from './Table';
import AuthorizationModal from './AuthorizationModal';
import { fetchPost } from '@/util/fetch';
import {
    Review_Delete_Authorization_Api,
    Review_Get_Authorization_Api
} from '../constants/Api';

/**
 *作者: zhengxuening
 *功能描述: amazon订单列表
 *时间: 2018/12/14 10:00
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 20,
        authorizationVisible: false,
        isNewAdd: false,
        accountID: '',
        detailData: {},
    };

    componentDidMount() {
        this.handleAmazonAuthorizationListData(1, 20);
    }

    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageData
     */
    handleAmazonAuthorizationListData = (pageNumber, pageData) => {
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

        const data = { ...this.props.form.getFieldsValue() };
        this.props.queryAmazonAuthorizationList(
            {
                data: {
                    pageData,
                    pageNumber,
                    authorizeState: data.authorizeState ? data.authorizeState[0] : undefined,
                    sellerAccount: data.sellerAccount,
                },
            }
        );
    };

    /**
     * Http请求 删除授权
     */
    handleDeleteAuthorization = (key) => {
        const data = {
            data: {
                key,
            }
        };
        fetchPost(Review_Delete_Authorization_Api, data, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.handleAmazonAuthorizationListData();
                }
            });
    };

    /**
     * 显示或关闭新增授权弹框
     */
    showOrCloseAuthorizationModal = (modalState, isNewAdd, accountID) => {
        if (accountID.length !== 0) {
            const data = {
                data: {
                    key: accountID,
                }
            };
            fetchPost(Review_Get_Authorization_Api, data, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            authorizationVisible: modalState,
                            isNewAdd,
                            accountID,
                            detailData: result.data,
                        })
                    }
                })
        } else {
            this.setState({
                authorizationVisible: modalState,
                isNewAdd,
                accountID,
                detailData: {},
            });
        }
    };

    render() {
        const {
            pageNumber,
            pageData,
            authorizationVisible,
            isNewAdd,
            accountID,
            detailData,
        } = this.state;

        return (
            <div>
                <SearchView
                    onSearch={this.handleAmazonAuthorizationListData}
                    { ...this.props }
                />
                <TableView
                    { ...this.props }
                    pageNumber={pageNumber}
                    pageData={pageData}
                    loadData={this.handleAmazonAuthorizationListData}
                    showModal={this.showOrCloseAuthorizationModal}
                    deleteAuthorization={this.handleDeleteAuthorization}
                />
                <AuthorizationModal
                    visible={authorizationVisible}
                    isNewAdd={isNewAdd}
                    accountID={accountID}
                    detailData={detailData}
                    loadData={this.handleAmazonAuthorizationListData}
                    showModal={this.showOrCloseAuthorizationModal}
                />
            </div>
        );
    }
}
export default Form.create()(App);
