import React from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
} from 'antd';
import { timestampFromat } from 'util/baseTool';
import { platform } from '../constants';

export default class TablelistComponent extends React.Component {

    componentDidUpdate(prevProps) {
        const prevData = prevProps.datas;
        const data = this.props.datas;
        if(prevData !== data && data.length > 0) {
            const renderData = data[0];
            this.props.recoverAllColor(); // 恢复成原色
            if (renderData.platformName) {

                // 销售平台
                this.showPlatformName(platform[renderData.platformName]);
                this.changeColor('salePlatform', 'orderlocation-plat-img', 'orderlocation-plat-img2');

                // 平台订单
                if(renderData.plat && !renderData.manage && !renderData.packages && !renderData.endPoints){

                    this.changeColorByClassname('orderlocation-arrow1', 'orderlocation-arrow-color');
                    this.changeColor('platformOrder', 'orderlocation-order-img', 'orderlocation-order-img2');

                } else if (renderData.plat || renderData.manage || renderData.packages || renderData.endPoints) {

                    this.changeColorByClassname('orderlocation-arrow1', 'orderlocation-arrow-color');
                    this.changeColor('platformOrder', 'orderlocation-order-img', 'orderlocation-order-img2');
                    this.changeColorByClassname('orderlocation-arrow3', 'orderlocation-arrow-color');

                }

            } else {
                // 手工订单
                this.changeColor('hwImport', 'orderlocation-hwimport-img', 'orderlocation-hwimport-img2');
                this.changeColorByClassname('orderlocation-arrow2', 'orderlocation-arrow-color');
            }
    
            // 订单管理
            if (renderData.manage || renderData.packages || renderData.endPoints) {
                this.changeColor('orderManage', 'orderlocation-manage-img', 'orderlocation-manage-img2');
            }

            // 包裹订单
            if (renderData.packages || renderData.endPoints) {
                this.changeColor('packageOrder', 'orderlocation-package-img', 'orderlocation-package-img2');
                this.changeColorByClassname('orderlocation-arrow4', 'orderlocation-arrow-color');
            }

            // 终点
            if (renderData.endPoints && renderData.endPoints.length > 0) {
                renderData.endPoints.map((v ,i) => {
                    if(Number(v.type) === 1){
                        this.changeColorById('endWarehouse');
                        this.changeColorById('endWarehouse', 'new-endpoint-bordercolor');
                        this.changeColorByClassname('orderlocation-lefttop-border', 'orderlocation-lefttop-border-color');
                        this.changeColorByClassname('orderlocation-line2', 'orderlocation-line-color');
                    }
                    if(Number(v.type) === 2){
                        this.changeColorById('endErp');
                        this.changeColorById('endErp', 'new-endpoint-bordercolor');
                        this.changeColorByClassname('orderlocation-line1', 'orderlocation-line-color');
                    }
                    if(Number(v.type) === 3){
                        this.changeColorById('endWms');
                        this.changeColorById('endWms', 'new-endpoint-bordercolor');
                        this.changeColorByClassname('orderlocation-bottomleft-border', 'orderlocation-bottomleft-border-color');
                        this.changeColorByClassname('orderlocation-line3', 'orderlocation-line-color');
                    }
                })
            }

            // 显示信息
            this.props.toggleMsg(true);
        }
    }

    /**
     * 显示平台名称
     */
    showPlatformName = (platformName) => {
        document.querySelector('#salePlatform').innerHTML = platformName;
    }

    /**
     * 改变图标、字体颜色
     */
    changeColor = (wordId, imgClassName, newImgClassName) => {
        this.changeColorById(wordId);
        this.changeColorByClassname(imgClassName, newImgClassName);
    }

    /**
     * 通过ID查找元素
     */
    changeColorById = (wordId, newClassName = 'new-word-color') => {
        if(wordId) {
            const id = document.querySelector(`#${wordId}`);
            id.classList.add(newClassName);
        }
    }

    /**
     * 通过类名查找元素
     */
    changeColorByClassname = (oldColorClass, newColorClass) => {
        if(oldColorClass && newColorClass) {
            const img = document.querySelector(`.${oldColorClass}`);
            img.classList.add(newColorClass);
        }
    }

    render() {
        const data = this.props.datas && this.props.datas.length > 0 ? this.props.datas[0] : {};
        let url = '';
        if(data){
            if(data.plat) {
                const platform = data.platformName;
                switch(platform) {
                    case 'EB': url = `/order/platformorder/ebay/detail/?orderNumber=${data.plat.orderNumber}`; break;
                    case 'WH': url = `/order/platformorder/wish/?orderId=${data.plat.orderNumber}`; break;
                    case 'YA': url = `/order/platformorder/amazon/detail/?orderNumber=${data.plat.orderNumber}`; break;
                    case 'SM': url = `/order/platformorder/smt/smtorderdetail/?platformNumber=${data.plat.orderNumber}`; break;
                    case 'SE': url = `/order/platformorder/shopee/detail/?orderNumber=${data.plat.orderNumber}`; break;
                    case 'JO': url = `/order/platformorder/joom/detail/?id=${data.plat.orderNumber}`; break;
                    case 'MM': url = `/order/platformorder/mymall/detail/?platformOrderNumber=${data.plat.orderNumber}`; break;
                }
            }
            if(data.manage) {
                url = data.manage.isException ? `/order/exceptionorderlist/exceptionorderdetail/?orderId=${data.manage.yksOrderNumber}`
                    : `/order/orderlist/orderdetail/?orderId=${data.manage.yksOrderNumber}`;
            }
        }
        return(
            <div className="orderlocation-table breadcrumb">
                <Row >
                    <Col span={24}>
                        <Row>
                            <Col span={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-img orderlocation-plat-img"></div>
                                    <div className="orderlocation-word old-word-color" id="salePlatform">销售平台</div>
                                </div>
                            </Col>
                            <Col span={3} offset={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-img orderlocation-hwimport-img"></div>
                                    <div className="orderlocation-word old-word-color" id="hwImport">手工导入</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-arrow orderlocation-arrow1"></div>
                                </div>
                            </Col>
                            <Col span={3} offset={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-arrow orderlocation-arrow2"></div>
                                </div>
                            </Col>
                            <Col span={1} offset={4}>
                                <div className="orderlocation-table-cell orderlocation-lefttop-border">
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="orderlocation-end-cell" style={{overflow: 'visible'}}>
                                    <div className="orderlocation-line orderlocation-line2"></div>
                                    <div className="orderlocation-endPoint orderlocation-warehouse old-word-color old-endpoint-bordercolor" id="endWarehouse">
                                        <p>汇总分仓</p>
                                        <p>海外发货</p>
                                    </div>
                                    <div>
                                        {
                                            data.endPoints && data.endPoints.length > 0 ? data.endPoints.map((v, i) =>{
                                                return Number(v.type) === 1 ? (
                                                    <div className="orderlocation-msg" style={{top: i*50 - 30}}>
                                                        <p><span>接收时间：</span>{timestampFromat(v.receiveTime, 2)}</p>
                                                        <p><span>状态：</span>{v.status}</p>
                                                    </div>
                                                ) : null
                                            }) : null
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-img orderlocation-order-img"></div>
                                    <div className="orderlocation-word old-word-color" id="platformOrder">平台订单</div>
                                </div>
                                {
                                    data.plat ? (
                                        <div className="orderlocation-msg orderlocation-left20">
                                            <p><span>平台单号：</span><Link to={url} target="_blank" className="orderlocation-flex">{data.plat.orderNumber}</Link></p>
                                            <p><span>抓单时间：</span>{timestampFromat(data.plat.grabTime, 2)}</p>
                                            <p><span>状态：</span>{data.plat.status}</p>
                                        </div>
                                    ) : null
                                }
                            </Col>
                            <Col span={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-arrow orderlocation-arrow-right orderlocation-arrow3"></div>
                                </div>
                            </Col>
                            <Col span={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-img orderlocation-manage-img"></div>
                                    <div className="orderlocation-word old-word-color" id="orderManage">订单管理</div>
                                </div>
                                {
                                    data.manage ? (
                                        <div className="orderlocation-msg orderlocation-left20">
                                            <p><span>平台单号：</span><Link to={url} target="_blank" className="orderlocation-flex">{data.manage.orderNumber}</Link></p>
                                            <p><span>接收时间：</span>{timestampFromat(data.manage.receiveTime, 2)}</p>
                                            <p><span>状态：</span>{data.manage.status}</p>
                                        </div>
                                    ) : null
                                }
                            </Col>
                            <Col span={3}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-arrow orderlocation-arrow-right orderlocation-arrow4"></div>
                                </div>
                            </Col>
                            <Col span={2}>
                                <div className="orderlocation-table-cell">
                                    <div className="orderlocation-img orderlocation-package-img"></div>
                                    <div className="orderlocation-word old-word-color" id="packageOrder">包裹订单</div>
                                </div>
                                <div>
                                    {
                                        data.packages && data.packages.length > 0 ? data.packages.map((v, i) =>{
                                            const pUrl = v.isNeedAudit ? `/order/deliveryparcellist/deliveryparceldetail/?orderId=${v.packageCode}&exceptionType=1`
                                                : `/order/deliveryparcellist/deliveryparceldetail/?orderId=${v.packageCode}`;
                                            return (
                                                <div className="orderlocation-msg orderlocation-left40" style={{top: 100*(i+1)-i*30}}>
                                                    <p><span>平台单号：</span><Link to={`${pUrl}`} target="_blank" className="orderlocation-flex">{v.orderNumber}</Link></p>
                                                    <p><span>接收时间：</span>{timestampFromat(v.receiveTime, 2)}</p>
                                                    <p><span>状态：</span>{v.status}</p>
                                                </div>
                                            )
                                        }
                                            
                                        ) : null
                                    }
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="orderlocation-end-cell">
                                    <div className="orderlocation-line orderlocation-line1"></div>
                                    <div className="orderlocation-endPoint orderlocation-erp old-word-color old-endpoint-bordercolor" id="endErp">
                                        <p>老ERP</p>
                                        <p>国内发货</p>
                                    </div>
                                    <div>
                                        {
                                            data.endPoints && data.endPoints.length > 0 ? data.endPoints.map((v, i) =>{
                                                return Number(v.type) === 2 ? (
                                                    <div className="orderlocation-msg" style={{top: 20*(i+1) + i*20}}>
                                                        <p><span>接收时间：</span>{timestampFromat(v.receiveTime, 2)}</p>
                                                        <p><span>状态：</span>{v.status}</p>
                                                    </div>
                                                ) : null
                                            }) : null
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={1} offset={13}>
                        <div className="orderlocation-table-cell orderlocation-bottomleft-border">
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="orderlocation-end-cell" style={{overflow: 'visible'}}>
                            <div className="orderlocation-line orderlocation-line3"></div>
                            <div className="orderlocation-endPoint orderlocation-wms old-word-color old-endpoint-bordercolor" id="endWms">
                                <p>新WMS</p>
                                <p>即将上线</p>
                            </div>
                            <div>
                                {
                                    data.endPoints && data.endPoints.length > 0 ? data.endPoints.map((v, i) =>{
                                        return Number(v.type) === 3 ? (
                                            <div className="orderlocation-msg" style={{top: 70*(i+1) - i*20}}>
                                                <p><span>接收时间：</span>{timestampFromat(v.receiveTime, 2)}</p>
                                                <p><span>状态：</span>{v.status}</p>
                                            </div>
                                        ) : null
                                    }) : null
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
} 