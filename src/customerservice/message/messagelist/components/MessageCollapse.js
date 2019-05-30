import React from 'react';
import { Icon } from 'antd';
import { randNum } from '../../../../util/baseTool';
import { setTimeout } from 'core-js';

export default class MessageCollapse extends React.Component {
    style = {
        position: 'absolute',
        left: '15px',
        top: '17px',
        transition: 'all .3s',
    }

    handleHeaderClick = (key, activeKey) => {
        const targetItem = this[`listItemRef${key}`];
        // 展开
        if (!activeKey.includes(key)) {
            targetItem.style.height = 0;
            setTimeout(() => {
                targetItem.style.height = targetItem.scrollHeight + 'px';
            }, 0);
            targetItem.classList.remove('message-collapse-content-inactive');
        } else {
            targetItem.style.height = targetItem.scrollHeight + 'px';
            targetItem.classList.add('message-collapse-content-inactive');
            setTimeout(() => {
                targetItem.style.height = 0;
            }, 0);
        }
        this.props.handleHeaderClick(key, activeKey);
    }

    getIsActive = (ele) => {
        const { operateType, buyerAccount, sellerAccount, orderNumberArr, buyerEmail, sellerEmail } = this.props;
        if (operateType === '1') {
            return buyerAccount === ele.buyerAccount && sellerAccount === ele.sellerAccount && orderNumberArr.toString() === ele.extendId.toString();
        } else {
            return buyerEmail === ele.buyerEmail && sellerEmail === ele.sellerEmail;
        }
    }

    render() {
        const { activeKey, operateType } = this.props;
        const msglistArr = this.props.msglistArr || [];
        let dateField;
        // let numField;
        let sonDateField;
        let nameField;
        if (operateType === '1') {
            dateField = 'messageDate';
            // numField = 'messageNum';
            sonDateField = 'msgTime';
            nameField = 'buyerNickname';
        } else {
            dateField = 'emailDate';
            // numField = 'emailNum';
            sonDateField = 'emailTime';
            nameField = 'buyerEmail';
        }
        const isLastPage = this.props.listReducer.data.isLastPage;
        const list = (
            <div>
                <div className="message-collapse-list">
                    {
                        msglistArr.map(item => (
                            <div className="message-collapse-item" key={item[dateField]}>
                                <div className="message-collapse-header" onClick={() => this.handleHeaderClick(item[dateField], activeKey)}>
                                    <Icon type="down" style={Object.assign({ transform: `rotate(${!activeKey.includes(item[dateField]) ? '-90deg' : '0'})` }, this.style)} />
                                    {/* {`${item[dateField]}（${item[numField]}）`} */}
                                    {`${item[dateField]}`}
                                </div>
                                <div
                                    ref={reflist => this[`listItemRef${item[dateField]}`] = reflist}
                                    className={['message-collapse-content'].join(' ')}
                                >
                                    <ul>
                                        {item.list.map(ele => {
                                            const postObj = {};
                                            if (this.props.operateType === '1') {
                                                postObj.buyerAccount = ele.buyerAccount;
                                                postObj.buyerNickname = ele.buyerNickname;
                                                postObj.sellerAccount = ele.sellerAccount;
                                            } else {
                                                postObj.buyerEmail = ele.buyerEmail;
                                                postObj.sellerEmail = ele.sellerEmail;
                                            }
                                            return (
                                                <li
                                                    key={randNum()}
                                                    className={['message-li-info', this.getIsActive(ele) ? 'active' : null].join(' ')}
                                                    onClick={() => {
                                                        this.props.handleListClick(postObj, ele.extendId);
                                                    }}
                                                >
                                                    <p>{ele[nameField] || ele.buyerAccount}{ele.unDealNum !== undefined ? `（${ele.unDealNum}）` : ''}</p>
                                                    <p>{ele[sonDateField]}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    isLastPage === 0
                        ? <p className="more-msg-list" onClick={this.props.handleGetMoreMsg}>加载更多</p>
                        : null
                }
            </div>
        );
        return (
            <div className="message-collapse-container">
                <div className="message-collapse margin-sm-top">
                    {list}
                </div>
            </div>

        );
    }
}
