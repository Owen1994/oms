import React from 'react';
import {
    Row,
    Col,
} from 'antd';

const imgQQ = require('../../documentarymanage/img/qq.png');

const imgWangWang = require('../../documentarymanage/img/wangwan.png');

export default class Search extends React.Component {
    render() {
        const {
            documentaryDetailData,
        } = this.props;
        const supplierInfo = documentaryDetailData.supplierInfo;
        let isShowQQ = null;
        if (supplierInfo.qq !== undefined) {
            if (supplierInfo.qq.length !== 0 && supplierInfo.qq !== '无') {
                isShowQQ = (
                    <a
                        href={`tencent://message/?uin=${supplierInfo.qq}`}
                        target="_blank"
                        rel="nofollow me noopener noreferrer"
                        className="documentary_detail_search_img"
                    >
                        <img
                            src={imgQQ}
                            alt="QQ"
                            width="14px"
                            height="14px"
                        />
                    </a>
                );
            }
        }

        let isShowWangWang = null;
        if (supplierInfo.wangwang !== undefined) {
            if (supplierInfo.wangwang.length !== 0 && supplierInfo.wangwang !== '无') {
                isShowWangWang = (
                    <a
                        href={`https://amos.im.alisoft.com/msg.aw?v=2&uid=${supplierInfo.wangwang}&site=cntaobao&s=2&charset=utf-8`}
                        target="_blank"
                        rel="nofollow me noopener noreferrer"
                        className="documentary_detail_search_img"
                    >
                        <img
                            src={imgWangWang}
                            alt="WangWang"
                            width="14px"
                            height="14px"
                        />
                    </a>
                );
            }
        }

        return (
            <div className="white margin-sm-top">
                <div className="documentary_detail_search_table">
                    <Row>
                        <Col span={7} offset={1}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">供应商ID:</div>
                                <div>{supplierInfo.vendorID}</div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">名称:</div>
                                <div>{supplierInfo.name}</div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">退税类型:</div>
                                <div>{supplierInfo.taxRefundType}</div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={7} offset={1}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">供应商评级:</div>
                                <div>{supplierInfo.supplierRating}</div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">供应商备注:</div>
                                <div>{supplierInfo.supplierNote}</div>

                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">QQ:</div>
                                <div>{supplierInfo.qq}</div>
                                {isShowQQ}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={7} offset={1}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">联系人:</div>
                                <div>{supplierInfo.contact}</div>

                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">联系方式:</div>
                                <div>{supplierInfo.contactInformation}</div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="documentary_detail_search_cell">
                                <div className="cell_div_height">旺旺:</div>
                                <div>{supplierInfo.wangwang}</div>
                                {isShowWangWang}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
