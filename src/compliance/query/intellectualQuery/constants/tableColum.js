import { path, config } from '../../../configs';
import Tableitem from '../../../../components/Tableitem';
import { getStateName, angentPicUrl } from '../../../../utils';
import React, { Component } from 'react';
import { useState, active, getSinsitiveReason } from '../../../data';

import sensitiveDetail from '../../../database/sensitive/components/detail'
import patentDetail from '../../../database/patent/components/Detail2'
import versionDetail from '../../../database/version/components/Detail2'
import authenticationDetail from '../../../database/authentication/components/Detail2'
import contrabandDetail from '../../../database/contraband/components/Detail2'
import skuDetail from '../../../database/sku/components/detail'

import '../../../database/sensitive/css/index.css'
import '../../../database/patent/css/index.css'
import '../../../database/version/css/index.css'
import '../../../database/authentication/css/index.css'
import '../../../database/contraband/css/index.css'
import '../../../database/sku/css/index.css'

export const tableColum = [
    {
        id: 1,
        name: '全部',
        url: '/irp/api/GetIntellctualRightQueryList/getIntellctualRightQueryList',
        components: null,
        tableColum: [
            {
                title: '名称/SKU',
                dataIndex: 'sku',
                key: 'sku',
                align: 'center',
                width: 120,
            },
            {
                title: '知产代码',
                dataIndex: 'intellectualCode',
                key: 'intellectualCode',
                align: 'center',
                width: 120,
            }, {
                title: '禁售信息',
                dataIndex: 'disableInfo',
                align: 'center',
                width: 360,
                render: (text, record) => {
                    return (
                        <div className='disableInfo'>
                            {
                                record.disableInfo.map((item, index) => {
                                    return (
                                        <Tableitem
                                            title={item.sensitiveLayer}
                                            content={item.platformSite}
                                            left={80}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            }, {
                title: '商标库',
                dataIndex: 'sensitivePool',
                key: 'sensitivePool',
                align: 'center',
                width: 120,
            }, {
                title: '专利库',
                dataIndex: 'patentPool',
                key: 'patentPool',
                align: 'center',
                width: 120,
            }, {
                title: '版权库',
                dataIndex: 'versionPool',
                key: 'versionPool',
                align: 'center',
                width: 120,
            }, {
                title: '平台违禁品库',
                dataIndex: 'platformContrabandPool',
                key: 'platformContrabandPool',
                align: 'center',
                width: 120,
            }, , {
                title: '平台认证库',
                dataIndex: 'platformAuthenticationPool',
                key: 'platformAuthenticationPool',
                align: 'center',
                width: 120,
            }, {
                title: '已审SKU库',
                dataIndex: 'sensitiveSkuPool',
                key: 'sensitiveSkuPool',
                align: 'center',
                width: 120,
            }
        ]
    },
    {
        id: 2,
        name: '商标库',
        components: sensitiveDetail,
        url: path.irp + 'sensitive/List/list',
        tableColum: [
            {
                title: '商标名',
                dataIndex: 'sensitive',
                key: 'sensitive',
                align: 'center',
                width: 120,
            }, {
                title: '敏感信息',
                dataIndex: 'sensitiveInfo',
                key: 'sensitiveInfo',
                algin: 'left',
                width: 240,
                render: (text, record) => {
                    return (
                        <div>
                            <Tableitem
                                title="注册国家"
                                content={record.country}
                                left={90}
                                right={90}
                            />
                            <Tableitem
                                title="知产代码"
                                content={record.intellectualCode}
                                left={90}
                                right={90}
                            />
                            <Tableitem
                                title="权利人"
                                content={record.obligee}
                                left={90}
                                right={90}
                            />
                            <Tableitem
                                title="商标号"
                                content={record.trademarkNumber}
                                left={90}
                                right={90}
                            />
                        </div>
                    )
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: 240,
                render: (text, record) => {
                    return (
                        <div>
                            <Tableitem
                                title="活跃状态"
                                content={getStateName(record.activeState, active)}
                                left={90}
                                right={90}
                            />
                            <Tableitem
                                title="使用状态"
                                content={getStateName(record.useState, useState)}
                                left={90}
                                right={90}
                            />
                        </div>
                    )
                }
            }, {
                title: '其他信息',
                dataIndex: 'trademarkInfo',
                key: 'trademarkInfo',
                width: 240,
                render: (text, record) => {
                    return (
                        <div>
                            <Tableitem
                                title="商标商品分类"
                                content={record.trademark}
                                left={90}
                                right={90}
                            />
                            <Tableitem
                                title="来源"
                                content={record.source}
                                left={90}
                                right={90}
                            />
                            <div className="clear"></div>
                        </div>
                    )
                }
            }, {
                title: '图片',
                dataIndex: 'img',
                key: 'img',
                align: 'center',
                width: 120,
                render: (text, record) => {
                    let defaultUrl = config.defaultImg;
                    return (
                        <img src={text ? angentPicUrl(text) : defaultUrl} width={58} height={50}
                            onError={() => {
                                record.figureLogoPic = defaultUrl
                                // this.forceUpdate()
                            }}
                        />
                    )
                }
            }, {
                title: '图片类型',
                dataIndex: 'imgType',
                key: 'imgType',
                align: 'center',
                width: 120,
                render: (text, record) => (
                    <span>{text ? text : '--'}</span>
                )
            },]
    },
    {
        id: 3,
        name: '专利库',
        components: patentDetail,
        url: path.irp + 'GetPatentPoolList/getPatentPoolList',
        tableColum: [
            {
                title: '专利名称',
                dataIndex: 'productName',
                width: 120,
            },
            {
                title: '示例SKU',
                dataIndex: 'sku',
                width: 240,
                render: (text, record) => {
                    return (
                        <div className='data-decorate-sku-colum'>
                            <Tableitem
                                title=""
                                separator={'\,'}
                                content={record.sku}
                                float={'left'}
                                right={'180px'}
                            />
                        </div>
                    )
                }
            },
            {
                title: '专利摘要',
                dataIndex: 'patentAbstract',
                align: 'center',
                width: 120,
                render: text => <div style={{width: '120px', wordWrap: 'break-word', wordBreak: 'normal'}}>{text}</div>,
            },
            {
                title: '注册国家',
                dataIndex: 'registerCountry',
                width: 120,
            },
            {
                title: '知产代码',
                dataIndex: 'intellectualCode',
                width: 120,
            },
            {
                title: '实物图片',
                dataIndex: 'patentPic',
                align: 'center',
                width: 120,
                render: (text, record) => {
                    let defaultUrl = config.defaultImg;
                    return (
                        <img src={text ? angentPicUrl(text) : defaultUrl} width={58} height={50}
                            onError={() => {
                                record.patentPic = defaultUrl
                                // this.forceUpdate()
                            }}
                        />
                    )
                }
            },]
    },
    {
        id: 4,
        name: '版权库',
        components: versionDetail,
        url: path.irp + 'GetVersionRepositoryList/getVersionRepositoryList',
        tableColum: [
            {
                title: '版权名称',
                dataIndex: 'productName',
                width: 120,
            },
            {
                title: '示例SKU',
                dataIndex: 'sku',
                width: 240,
                render: (text, record) => {
                    return (
                        <div className='data-decorate-sku-colum'>
                            <Tableitem
                                title=""
                                separator={'\,'}
                                content={record.sku}
                                float={'left'}
                                right={'180px'}
                            />
                        </div>
                    )
                }
            },
            {
                title: '知产代码',
                dataIndex: 'intellectualCode',
                align: 'center',
                width: 120,
            },
            {
                title: '版权号',
                dataIndex: 'version',
                width: 120,
            },
            {
                title: '权利人',
                dataIndex: 'obligee',
                width: 120,
            },
            {
                title: '实物图片',
                dataIndex: 'versionPic',
                align: 'center',
                width: 120,
                render: (text, record) => {
                    let defaultUrl = config.defaultImg;
                    return (
                        <img src={text ? angentPicUrl(text) : defaultUrl} width={58} height={50}
                            onError={() => {
                                record.versionPic = defaultUrl
                                // this.forceUpdate()
                            }}
                        />
                    )
                }
            }
        ]
    },
    {
        id: 5,
        name: '平台违禁品库',
        components: contrabandDetail,
        url: path.irp + 'GetPlatformContrabandPoolList/getPlatformContrabandPoolList',
        tableColum: [
            {
                title: '英文违禁品名',
                dataIndex: 'englishContraband',
                align: 'center',
                width: 120,
            }, {
                title: '中文违禁品名',
                dataIndex: 'chineseContraband',
                width: 120,
            }, {
                title: '知产代码',
                dataIndex: 'intellectualCode',
                width: 120,
            }, {
                title: '禁售信息',
                dataIndex: 'disableInfo',
                align: 'center',
                width: 360,
                render: (text, record) => {
                    return (
                        <div className='disableInfo'>
                            {
                                record.disableInfo.map((item, index) => {
                                    return (
                                        <Tableitem
                                            title={item.sensitiveLayer}
                                            content={item.platformSite}
                                            left={80}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            },
            {
                title: '关联SKU',
                dataIndex: 'associatedSku',
                width: 240,
                render: (text, record) => {
                    return (
                        <div className='data-decorate-sku-colum'>
                            <Tableitem
                                title=""
                                separator={'\,'}
                                content={record.associatedSku}
                                float={'left'}
                                right={'180px'}
                            />
                        </div>

                    )
                }
            }, {
                title: '产品说明',
                dataIndex: 'productDesc',
                width: 120,
            }
        ]
    },
    {
        id: 6,
        name: '平台认证库',
        components: authenticationDetail,
        url: path.irp + 'GetPlatformAuthenticationPoolList/getPlatformAuthenticationPoolList',
        tableColum: [
            {
                title: '英文名称',
                dataIndex: 'englishName',
                align: 'center',
                width: 120
            }, {
                title: '中文名称',
                dataIndex: 'chineseName',
                width: 120
            }, {
                title: '认证项目',
                dataIndex: 'authenticationProject',
                width: 120
            }, {
                title: '知产代码',
                dataIndex: 'intellectualCode',
                width: 120
            }, {
                title: '禁售信息',
                dataIndex: 'disableInfo',
                align: 'center',
                width: 360,
                render: (text, record) => {
                    return (
                        <div>
                            {
                                record.disableInfo.map((item, index) => {
                                    return (
                                        <Tableitem
                                            title={item.sensitiveLayer}
                                            content={item.platformSite}
                                            left={100}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            }
        ]
    },
    {
        id: 7,
        name: '已审SKU库',
        components: skuDetail,
        url: path.irp + 'sku/List/list',
        tableColum: [
            {
                title: 'SKU',
                dataIndex: 'sku',
                key: 'sku',
                align: 'center',
                width: 120
            }, {
                title: '产品信息',
                dataIndex: 'productInfo',
                key: 'productInfo',
                width: 240,
                render: (text, record) => {
                    return (
                        <div>
                            <Tableitem
                                title="SPU"
                                content={record.spu}
                                left={100}
                            />
                            <Tableitem
                                title="产品中文名称"
                                content={record.skuName}
                                left={100}
                            />
                            <Tableitem
                                title="使用状态"
                                content={getStateName(record.useState, useState)}
                                left={100}
                            />
                        </div>
                    )
                }
            }, {
                title: '知产代码',
                dataIndex: 'intellectualCode',
                width: 100,
            }, {
                title: '禁售信息',
                dataIndex: 'disableInfo',
                align: 'center',
                width: 240,
                render: (text, record) => {
                    return (
                        <div>
                            {
                                record.disableInfo.map((item, index) => {
                                    return (
                                        <Tableitem
                                            title={item.sensitiveLayer}
                                            content={item.platformSite}
                                            left={100}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            },{
                title: '敏感原因',
                dataIndex: 'reason',
                width: 240,
                render: (t) => {
                    return (
                        <div className="colon-separate">
                            {
                                t && Array.isArray(t) && t.map((v, index) => <p key={v.id}><span>{getSinsitiveReason[v.id].name}：</span>{v.remarks}</p>)
                            }
                        </div>
                    )
                }
            }
        ]
    },
]
