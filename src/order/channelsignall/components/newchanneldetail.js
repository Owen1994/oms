import React from 'react';
import {
    Row,
    Col,
    Radio,
    Table,
    Tabs,
} from 'antd';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

export default class NewChannelDetail extends React.Component{

    wareHouseInfoColumns = [
        {
            title: '状态',
            dataIndex: 'isAvailable',
            width: 80,
            render: text => text === "0" ? "启用" : "停用"
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseCodeName',
            width: 120,
        },
        {
            title: '仓库的渠道标识',
            dataIndex: 'warehouseChannelSign',
            width: 120,
        }];

    signInfoColumns = [
        {
            title: '状态',
            className: '',
            dataIndex: 'isAvailable',
            width: 80,
            render: text => text === "0" ? "启用" : "停用"
        },
        {
            title: '平台名称',
            width: 100,
            dataIndex: 'platformName',
        },
        {
            title: '标记类型',
            width: 80,
            dataIndex: 'signTypeName',
        },
        {
            title: '发货地',
            width: 80,
            dataIndex: 'dispatchCountry',
        },
        {
            title: '目的国',
            width: 80,
            dataIndex: 'toCountryName',
        },
        {
            title: '标记渠道简称',
            width: 110,
            dataIndex: 'signChannelName',
        },
        {
            title: '标记中文名称',
            width: 110,
            dataIndex: 'signCnName',
        },
        {
            title: '标记承运商名称',
            width: 110,
            dataIndex: 'signCarrierName',
        },
        {
            title: '标记网址',
            width: 110,
            dataIndex: 'signWebSite',
        },{
            title: '是否回标',
            width: 110,
            dataIndex: 'isNeedChannelCodeTrackNo',
            render: (text, record) => {
                // 是否回标功能暂时只支持ebay平台，真实标记下才显示
                return record.platform === 'EB' && Number(record.signType) === 0 ? text === '1' ? '启用' : '停用' : '--';
            }
        }];

    thirdInfoColumns = [
        {
            title: '状态',
            dataIndex: 'isAvailable',
            width: 80,
            render: text => text === "0" ? "启用" : "停用"
        },
        {
            title: '系统名称',
            dataIndex: 'systemCodeName',
            width: 80,
        },
        {
            title: '渠道简称（第三方）',
            width: 100,
            dataIndex: 'systemChannelCode',
        },
        {
            title: '渠道中文名称（第三方）',
            width: 100,
            dataIndex: 'systemCnName',
        },
        {
            title: '渠道英文名称（第三方）',
            width: 100,
            dataIndex: 'systemEnName',
        },
        {
            title: '渠道扩展信息',
            width: 100,
            dataIndex: 'channelInfo',
        }];

    truckingColumns = [{
            title: '状态',
            dataIndex: 'isAvailable',
            width: 80,
            render: text => text === "0" ? "启用" : "停用"
        },{
            title: '平台',
            dataIndex: 'platformName',
            width: 80,
        },{
            title: '系统名称',
            dataIndex: 'systemCodeName',
            width: 80,
        },{
            title: '使用跟踪号',
            dataIndex: 'truckingNumberName',
            width: 80,
        }];
    render () {
        const {
            warehouseInfoData,
            signInfoData,
            thirdInfoData,
            channelInfoData,
            truckingInfoData,
        } = this.props;
        let {
            isAvailable,
            newChannelCode,
            channelCountryName,
            channelCnName,
            channelEnName,
            companyCarrierCode,
            companyCarrierName,
            channelWebSite,
            channelTypeName,
            channelGroup,
            channelGroupName,
            trackingTypeName,
            channelCountry,
            developingCountry,
            developingCountryName,
            outLineCountries,
            outLineCountriesName,
            shortestLength,
            longestLength,
            channelMaxWeight,
            channelLogisticsAttr,
            extendInfo,
        } = channelInfoData;
        isAvailable = isAvailable ? isAvailable : '0'; // 0是启用 1是停用
        const warehouseData = warehouseInfoData.data; // 仓库信息
        const signData = signInfoData.data; // 标记信息
        const thirdData = thirdInfoData.data; // 第三方信息
        const truckingData = truckingInfoData.data; // 跟踪号配置信息

        return (
            <div>
                <div className="newCluenk">
                    <div className="title">
                        <Row className={'channel-title'}>
                            <Col span={18}>渠道信息</Col>
                            <Col span={6} className="channel-detail-col">
                                <RadioGroup
                                    className={'padding-xm-top'}
                                    defaultValue={0}
                                >
                                    <Radio value={0}>{isAvailable === '0' ? "启用" : "停用"}</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="content">
                        <Row className={'pad-top-bottom8'}>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道编号: </span>
                                <span>{ newChannelCode }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道中文名称: </span>
                                <span>{ channelCnName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道英文名称: </span>
                                <span>{ channelEnName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">承运商编号: </span>
                                <span>{ companyCarrierCode }</span>
                            </Col>
                        </Row>
                        <Row className={'pad-top-bottom8'}>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">承运商名称: </span>
                                <span>{ companyCarrierName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道网址: </span>
                                <span>{ channelWebSite }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道类型: </span>
                                <span>{ channelTypeName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道分组: </span>
                                <span>{ channelGroupName }</span>
                            </Col>
                        </Row>
                        <Row className={'pad-top-bottom8'}>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">是否追踪: </span>
                                <span>{ trackingTypeName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道所属国家: </span>
                                <span>{ channelCountryName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">可发国家: </span>
                                <span>{ developingCountryName }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">例外国家: </span>
                                <span>{ outLineCountriesName }</span>
                            </Col>
                        </Row>
                        <Row className={'pad-top-bottom8'}>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">发货最短时长: </span>
                                <span>{ shortestLength }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">发货最长时长: </span>
                                <span>{ longestLength }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">渠道最大重量: </span>
                                <span>{ channelMaxWeight }</span>
                            </Col>
                            <Col span={6} className="channel-detail-col">
                                <span className="col-label">物流属性: </span>
                                <span>{ channelLogisticsAttr }</span>
                            </Col>
                        </Row>
                        <Row className={'pad-top-bottom8'}>
                            <Col span={12} className="channel-detail-col">
                                <span className="col-label">渠道扩展信息: </span>
                                <span>{ extendInfo }</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="newCluenk">
                    <div className="content channelall">
                        <Tabs type="card" className="tabs" defaultActiveKey="1">
                            <TabPane tab="仓库信息" key="1">
                                <Table
                                    columns={this.wareHouseInfoColumns}
                                    pagination={false}
                                    dataSource={warehouseData}
                                    bordered
                                />
                            </TabPane>
                            <TabPane tab="标记信息" key="2">
                                <Table
                                    columns={this.signInfoColumns}
                                    pagination={false}
                                    dataSource={signData}
                                    bordered
                                />
                            </TabPane>
                            <TabPane tab="第三方信息" key="3">
                                <Table
                                    columns={this.thirdInfoColumns}
                                    pagination={false}
                                    dataSource={thirdData}
                                    bordered
                                />
                            </TabPane>
                            <TabPane tab="跟踪号配置" key="4">
                                <Table
                                    columns={this.truckingColumns}
                                    pagination={false}
                                    dataSource={truckingData}
                                    bordered
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}