import React from 'react';
import Tablelist from './Tablelist';
import { message, Spin } from 'antd';
import { getLoginmsg } from "util/baseTool";


export default class OperateApp extends React.Component {

    componentDidMount() {
        let userName = getLoginmsg().userName;
        if (userName) {
            this.props.fetchPosts({
                key: 'data',
                value: {
                    userName: userName,
                    pageNumber: 1,
                    pageData: 20,
                }
            });
            this.props.loadSysStateRule({ lstUserName: [userName] });
            this.props.baseInfoForm({ userName });
        } else {
            message.warn('请登录!')
        }
    }


    render() {
        const { tablemodel } = this.props;
        return (
            <div className="newClue">
                <Spin tip="Loading..." spinning={tablemodel && tablemodel.loading} delay={200}>
                    <div className="newCluewk">
                        <Tablelist {...this.props} />
                    </div>
                </Spin>
            </div>
        );
    }
}
