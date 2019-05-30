import React from 'react';
import {
    Button,
} from 'antd';
import moment from 'moment';
import emotionData from '../Emotion/emotionData';
import { randNum } from '../../../../util/baseTool';
import { popUpImage, angentPicUrl } from '@/util/baseTool';
import MD5 from '@/util/md5';

class ChatBox extends React.Component {
    scrollHeight = 0;

    // 图片后缀名
    extensionsImg = ['JPG', 'JPEG', 'PNG', 'BMP', 'GIF']

    //  PDF
    // extensionsPdf = ['PDF']

    componentDidMount() {
        setTimeout(() => {
            const recordChatBox = document.querySelector('.record-chat-box');
            if (recordChatBox) {
                recordChatBox.scrollTop = recordChatBox.scrollHeight;
            }
        }, 0);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recordDataArr !== this.props.recordDataArr) {
            const recordChatBox = this.refs.recordChatBox;
            if (recordChatBox) {
                const height = recordChatBox.scrollHeight;
                recordChatBox.scrollTop = height - this.scrollHeight;
                this.scrollHeight = 0;
            }
        }
    }

    componentWillUnmount() {
        this.scrollHeight = 0;
    }

    // 对发送内容的表情进行过滤显示 (未打开状态)
    emtionFilter = (content) => {
        const reg = /\/:[\d]{3}/g;
        content = content.replace(reg, (res) => {
            const item = emotionData.find(items => items.entity === res);
            return (
                item
                    ? (
                        `<img alt=${item.title} title=${item.title} data-meaning=${item.meaning} src=${item.src} />`
                    )
                    : null
            );
        });
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // 获取历史消息
    getHistoryMessage = () => {
        const recordChatBox = this.refs.recordChatBox;
        if (recordChatBox) {
            this.scrollHeight = recordChatBox.scrollHeight;
        }
        this.props.handleGetHistoryInfo();
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

    checkIfTranslate = (item) => {
        const regPic = /^<img.*[\/]?\>$/;
        const regEmo = /^(\/:[\d]{3})+$/;
        const content = item.content.replace(/\s/, '');
        if (regPic.test(content) || regEmo.test(content)) {
            return false;
        }
        return true;
    }

    // 翻译
    translate = (item) => {
        const option = {
            appid: '20190216000267610',
            key: 'avc5ndaA3W9TK7E1oHPO',
            from: 'auto',
            to: 'en',
        };
        const salt = new Date().getTime();
        let content = item.content;
        content = content.replace(/\/:\d{3}/g, ' ');
        content = content.replace(/<br \/>/g, '\n');
        const str1 = option.appid + content + salt + option.key;
        const sign = MD5(str1);
        const formData = new FormData();
        formData.append('q', content);
        formData.append('appid', option.appid);
        formData.append('salt', salt);
        formData.append('from', option.from);
        formData.append('to', option.to);
        formData.append('sign', sign);
        $.ajax({
            // url: '/fanyi/api/trans/vip/translate',
            url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
            type: 'get',
            // data: formData,
            // processData: false,
            // contentType: false,
            dataType: 'jsonp',
            data: {
                q: content,
                appid: option.appid,
                salt,
                from: option.from,
                to: option.to,
                sign,
            },
            success: (data) => {
                if (data && data.trans_result && data.trans_result.length) {
                    item.transResult = data.trans_result.map(v => `${v.dst}<br />`).join('');
                    this.setState({});
                }
            },
        });
    }

    // 纯图片展示
    isPureImg = content => content === '< img >';

    render() {
        const {
            operateType, recordData, recordDataArr,
        } = this.props;
        const msgTypeArr = ['1', '4'];
        return (
            <div ref="recordChatBox" className="record-chat-box">
                {/* 沟通聊天框 */}
                <p className="get-history-info">
                    <span onClick={this.getHistoryMessage}>{recordData.isLastPage === 1 ? null : '查看历史消息'}</span>
                </p>
                {
                    recordDataArr.map((item) => {
                        const isBuyer = item.senderType === 1;
                        const boxFloatClass = isBuyer ? 'float-left' : 'float-right';
                        const textAlignClass = isBuyer ? 'text-align-left' : 'text-align-right';
                        const boxStyleClass = isBuyer ? 'addr-theme' : 'sender-theme';
                        const movePosition = isBuyer ? 'move-position-left' : 'move-position-right';
                        const moveTag = isBuyer
                            ? (
                                <span
                                    className={['move-to-tag', movePosition].join(' ')}
                                    onClick={() => this.props.handleMoveTagClick({ emailUnid: [item.emailUnid], emailTime: [item.emailTime] })}
                                >移动至标签
                                </span>
                            )
                            : null;
                        return (
                            this.isPureImg(item.content) ? (
                                <div className="overflow-hidden">
                                    <div className={['single-record', boxFloatClass].join(' ')}>
                                        <p className={['reply-date', textAlignClass].join(' ')}>
                                            {(operateType === '2' && !isBuyer) ? moveTag : null}
                                            <span>{moment.unix(msgTypeArr.includes(operateType) ? item.msgTime : item.emailTime).format('YYYY-MM-DD HH:mm')}</span>
                                            {(operateType === '2' && isBuyer) ? moveTag : null}
                                        </p>
                                        <ul className={['single-record', boxFloatClass].join(' ')}>
                                            {
                                                item.attach.map(ele => (
                                                    <li className="margin-ss-bottom" key={ele.url} onClick={() => popUpImage(angentPicUrl(ele.url), true)}>
                                                        <img className="record-chat-box-small-img" src={angentPicUrl(ele.smallImgurl || ele.url)} alt="" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                    <div className="overflow-hidden" key={randNum()}>
                                        <div className="overflow-hidden">
                                            <div className={['single-record', boxFloatClass].join(' ')}>
                                                <p className={['reply-date', textAlignClass].join(' ')}>
                                                    {(operateType === '2' && !isBuyer) ? moveTag : null}
                                                    <span>{moment.unix(msgTypeArr.includes(operateType) ? item.msgTime : item.emailTime).format('YYYY-MM-DD HH:mm')}</span>
                                                    {(operateType === '2' && isBuyer) ? moveTag : null}
                                                </p>
                                                <div className={['single-record-box', boxStyleClass].join(' ')}>
                                                    {this.emtionFilter(item.content)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clear">
                                            <div className={['other-info', boxFloatClass].join(' ')}>
                                                {
                                                    item.attach.map((ele, i) => (
                                                        <div key={randNum()} style={{ padding: 5 }}><span onClick={() => this.preview(angentPicUrl(ele.url))} className="mail-href">{`附件${i + 1}`}</span></div>
                                                    ))
                                                }
                                                {
                                                    this.checkIfTranslate(item) ? (
                                                        <Button disabled={item.transResult} onClick={() => this.translate(item)} size="small">翻译</Button>
                                                    ) : null
                                                }
                                                {
                                                    //     <Select
                                                    //     placeholder="翻译"
                                                    //     style={{
                                                    //         width: 70, fontSize: 12, float: 'left', marginLeft: isBuyer ? 0 : null,
                                                    //     }}
                                                    //     className="reply-select"
                                                    // >
                                                    //     <Option value="baidu">百度</Option>
                                                    //     <Option value="google">谷歌</Option>
                                                    // </Select>
                                                }
                                                {item.senderType === 2 && item.customerName ? (<div className="customer-name">{item.customerName}</div>) : null}
                                            </div>
                                        </div>
                                        {
                                            item.transResult ? (
                                                <div className="overflow-hidden">
                                                    <div className={['single-record', boxFloatClass].join(' ')}>
                                                        <div className={['single-record-box', boxStyleClass].join(' ')}>
                                                            <div dangerouslySetInnerHTML={{ __html: item.transResult }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null

                                        }
                                    </div>
                                )
                        );
                    })
                }
            </div>
        );
    }
}
export default ChatBox;
