
import React, { Component } from 'react';
import {
    Row,
    Col,
    Form,
    Tooltip, 
} from 'antd';
import imgQQ from '../../../purchasemanage/documentarymanage/img/qq.png';
import imgWangWang from '../../../purchasemanage/documentarymanage/img/wangwan.png';
const FormItem = Form.Item;


class Search extends Component {
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };


    render() {
        const { orderDetailOrderGoodsList } = this.props;
        const QQ = `tencent://message/?uin=${orderDetailOrderGoodsList.supplierId}`;
        const WangWang = `https://amos.im.alisoft.com/msg.aw?v=2&uid=${orderDetailOrderGoodsList.supplierId}&site=cntaobao&s=2&charset=utf-8`;
        const {
            // logisticsType,
            supplierId,
            supplierLevel,
            supplierName,
            supplierRemak,
            supplierState,
            payType,
            aliWangWang,
            contactName,
            contactPhone,
            qq,
        } = orderDetailOrderGoodsList;
        return (
            <div className="search bgcfff padding-sm overflow-hidden documentarymanage-search">
                <Row className="padding-sm-top">
                    <Col span={8}>
                        <FormItem
                            label="供应商ID"
                            {...this.formItemLayout}
                        >
                            <span style={{fontSize: '12px'}}>{supplierId}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="名称"
                            {...this.formItemLayout}
                        >
                            <span style={{fontSize: '12px'}}>{supplierName}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="联系方式"
                            {...this.formItemLayout}
                        >
                            <span style={{fontSize: '12px'}}>{contactName}  {contactPhone}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row className="padding-sm-top">
                    <Col span={8}>
                        <FormItem
                            label="供应商评级"
                            {...this.formItemLayout}
                        >
                            <span style={{fontSize: '12px'}}>{supplierLevel}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="供应商状态"
                            {...this.formItemLayout}
                        >
                            <span style={{fontSize: '12px'}}>{supplierState}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="QQ"
                            {...this.formItemLayout}
                        >
                            <div style={{fontSize: '12px'}}>
                                {qq}
                                {
                                    qq ? <a className="margin-ss-left" href={QQ} target="_blank" rel="nofollow me noopener noreferrer">
                                            <img
                                                className="documentary_list_table_img"
                                                src={imgQQ}
                                                alt="QQ"
                                                width="14px"
                                                height="14px"
                                            />
                                        </a> : null
                                }
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <Row className="padding-sm-top">
                    <Col span={8}>
                        <FormItem
                            label="供应商备注"
                            {...this.formItemLayout}
                        >
                         <Tooltip title={supplierRemak}>
                            <div style={{fontSize: '12px'}} className={"supplierRemak-ellipsis"}>{supplierRemak}</div>
                         </Tooltip>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="支付方式"
                            {...this.formItemLayout}
                        >
                            <span style={{fontSize: '12px'}}>{payType}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="旺旺"
                            {...this.formItemLayout}
                        >
                            <div style={{fontSize: '12px'}}>
                            {aliWangWang}
                            {
                                aliWangWang ? <a className="margin-ss-left" href={WangWang} target="_blank" rel="nofollow me noopener noreferrer">
                                                    <img
                                                        className="documentary_list_table_img"
                                                        src={imgWangWang}
                                                        alt="WangWang"
                                                        width="14px"
                                                        height="14px"
                                                    />
                                                </a> : null
                            }
                            
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Search;
