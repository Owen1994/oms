import React, { Component } from 'react';
import { Icon } from 'antd';
import MessageCollapse from './MessageCollapse';

class App extends Component {
    state = {
        activeKey: [],
    }

    style = {
        messageListTitle: {
            padding: '5px 10px 5px 0',
            textAlign: 'center',
            fontWeight: 700,
        },
    }

    componentDidUpdate(prevProps) {
        if (this.props.msglistArr.length && prevProps.msglistArr !== this.props.msglistArr) {
            const newActiveKey = this.getRidOfSame(this.props.msglistArr, prevProps.msglistArr);
            this.setState({ activeKey: newActiveKey });
        }
    }

    // 加载更多时获取默认展开项的key
    getRidOfSame = (next, pre) => {
        let { activeKey } = this.state;
        const { operateType } = this.props;
        const itemField = operateType === '1' ? 'messageDate' : 'emailDate';
        if (pre && pre.length) {
            next.forEach((ele) => {
                let flag = true;
                for (let i = 0; i < pre.length; i++) {
                    if (ele[itemField] === pre[i][itemField]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    activeKey.push(ele[itemField]);
                }
            });
        } else {
            activeKey = next.map(v => v[itemField]);
        }
        // activeKey = Array.from(new Set(activeKey));
        return activeKey;
    }

    handleHeaderClick = (key, activeKey) => {
        const index = activeKey.indexOf(key);
        if (index > -1) {
            activeKey.splice(index, 1);
        } else {
            activeKey.push(key);
        }
        this.setState({ activeKey });
    }

    handleSort = (sortType) => {
        this.setState({ activeKey: [] }, () => {
            this.props.handleSort(sortType);
        });
    }

    render() {
        const { activeKey } = this.state;
        const msglistArr = this.props.msglistArr || [];
        const messageCollapse = msglistArr.length > 0
            ? (
                <MessageCollapse
                    {...this.props}
                    activeKey={activeKey}
                    handleHeaderClick={this.handleHeaderClick}
                />
            ) : <p className="messge-list-nodata">暂无数据</p>;
        return (
            <div>
                <div className="breadcrumb padding-sm overflow-hidden margin-sm-top customer-message-list">
                    <div style={this.style.messageListTitle}>
                        <p style={this.style.messageListTitle}>消息列表</p>
                        <div className="message-sort-icons">
                            <Icon type="caret-up" className="message-caret-up" onClick={() => this.handleSort(2)} />
                            <Icon type="caret-down" className="message-caret-down" onClick={() => this.handleSort(1)} />
                        </div>
                    </div>
                    {messageCollapse}
                </div>
            </div>
        );
    }
}
export default App;
