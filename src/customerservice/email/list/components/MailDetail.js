import React from 'react';
import moment from 'moment';
import {
    Row,
    Col,
} from 'antd';
import { popUpImage, angentPicUrl } from '@/util/baseTool';

const style = {
    content: {
        padding: '10px',
        backgroundColor: '#f9f9f9',
    },
};

export default class MailDetail extends React.Component {
    // 图片后缀名
    extensionsImg = ['JPG', 'JPEG', 'PNG', 'BMP', 'GIF']

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
        const { mailDetailData, ifReply } = this.props;
        const replyDetail = mailDetailData.replyDetail ? mailDetailData.replyDetail : {};
        let enclosureBigUrl = '';
        if (mailDetailData.enclosureBigUrl && mailDetailData.enclosureBigUrl.length > 0) {
            let sellerEmail;
            sellerEmail = mailDetailData.sellerEmail.split('.')[0];
            sellerEmail = sellerEmail.split('@')[1];
            switch (sellerEmail) {
            case 'gmail':
                enclosureBigUrl = 'https://mail.google.com';
                break;
            case '163':
                enclosureBigUrl = 'https://mail.163.com';
                break;
            case '126':
                enclosureBigUrl = 'https://mail.126.com';
                break;
            case 'hotmail':
                enclosureBigUrl = 'https://login.live.com/login.srf';
                break;
            case 'outlook':
                enclosureBigUrl = 'https://login.live.com/login.srf';
                break;
            default:
                break;
            }
        }
        return (
            <div className="mail-detail">
                <Row>
                    <Col span={8}>
                        <Col span={6} align="right">买家邮箱：</Col>
                        <Col span={18}>{mailDetailData.buyerEmail}</Col>
                    </Col>
                    <Col span={8}>
                        <Col span={6} align="right">接收时间：</Col>
                        <Col span={18}>{`${moment(mailDetailData.emailTime * 1000).format('YYYY年MM月DD日 HH:mm:ss')}`}</Col>
                    </Col>
                    <Col span={8}>
                        <Col span={6} align="right">标签：</Col>
                        <Col span={18}>{mailDetailData.tag}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Col span={6} align="right">卖家邮箱：</Col>
                        <Col span={18}>{mailDetailData.sellerEmail}</Col>
                    </Col>
                    <Col span={8}>
                        <Col span={6} align="right">卖家账号：</Col>
                        <Col span={18}>{mailDetailData.sellerAccount}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Col span={2} align="right">邮件标题：</Col>
                        <Col span={18}>{mailDetailData.emailTitle}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Col span={2} align="right">邮件内容：</Col>
                        <Col span={16}>
                            <div className="mail-detail-contents" style={style.content} dangerouslySetInnerHTML={{ __html: mailDetailData.emailContent }} />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Col span={6} align="right">超大附件：</Col>
                        <Col span={18}>{<a href={enclosureBigUrl} rel="noopener noreferrer" target="_blank">{enclosureBigUrl ? '点击查看' : null}</a>}</Col>
                    </Col>
                    <Col span={8}>
                        <Col span={6} align="right">邮件附件：</Col>
                        <Col span={18}>
                            {mailDetailData.enclosureUrl ? mailDetailData.enclosureUrl.map((item, index) => (
                                <span key={item} onClick={() => this.preview(angentPicUrl(item))} className="mail-href">{`附件${index + 1}`} </span>
                            )) : null}
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Col span={2} align="right">处理人：</Col>
                        <Col span={18}>{mailDetailData.operator}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Col span={2} align="right">处理详情：</Col>
                        <Col span={18}>{mailDetailData.operatorContent}</Col>
                    </Col>
                </Row>
                {
                    ifReply
                        ? (
                            <Row>
                                <Col span={24}>
                                    <Col span={2} align="right">回复内容：</Col>
                                    <Col span={16}>
                                        <div className="mail-reply-contents" style={style.content} dangerouslySetInnerHTML={{ __html: replyDetail.replyContent }} />
                                        <div>
                                            {
                                                replyDetail.replyAttach && replyDetail.replyAttach.length
                                                    ? replyDetail.replyAttach.map((item, index) => (
                                                        <span key={item} onClick={() => this.preview(angentPicUrl(item))} className="mail-href">{`附件${index + 1}`} </span>
                                                    ))
                                                    : null
                                            }
                                        </div>
                                    </Col>
                                </Col>
                                <Col span={24} className="mt12">
                                    <Col span={2} align="right">回复人：</Col>
                                    <Col span={18}>{replyDetail.person}</Col>
                                </Col>
                                <Col span={24} className="mt12">
                                    <Col span={2} align="right">回复时间：</Col>
                                    <Col span={18}>{replyDetail.time}</Col>
                                </Col>
                            </Row>
                        )
                        : null
                }
            </div>
        );
    }
}
