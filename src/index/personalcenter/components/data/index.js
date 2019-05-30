//授权详情模块
import React, { Component } from 'react'

import {
    Row,
    Checkbox,
    Tabs,
} from 'antd'
import PlatformDetail from '@/user/common/components/PlatformDetail';
import StatisticsDetail from '@/user/common/components/StatisticsDetail';
import WareDetail from '@/user/common/components/WareDetail';
import LogisticsDetail from '@/user/common/components/LogisticsDetail';
import CommonDetail from './CommonDetail';

const TabPane = Tabs.TabPane;
const Group = Checkbox.Group

class Authorizationdetail extends Component {
    createComponent = (v) => {
        if (v.entityCode === 'E_CsOrg') {
            return <CommonDetail
                        operValuesArr={v.operValuesArr}
                    />
        } else if (v.entityCode === 'E_StatisticsSystem') {
            return <StatisticsDetail
                        operValuesArr={v.operValuesArr}
                    />
        }  else if (v.entityCode === 'E_WarehouseAuthorized') {
            return <WareDetail 
                        operValuesArr={v.operValuesArr}
                    />
        } else if (v.entityCode === 'E_Logistics') {
            return  <LogisticsDetail 
                        operValuesArr={v.operValuesArr}
                    />
        } else {
            return <PlatformDetail
                        operValuesArr={v.operValuesArr}
                    />
        }
    }

    createSelectElement = (subWhereClause) => {
        if (subWhereClause) {
            return (
                <Group style={{ width: '100%' }}>
                    <Row type="flex" justify="start">
                        {subWhereClause.map((v, i) => {
                            // let entity = v.entityCode === "E_CsOrg";
                            return (
                                <div className="maxBox" key={i}>
                                    <div className="topName" >
                                        指定<a>{v.entityName}</a>查看范围为 :
                                    </div>
                                    <div className="bottomText">
                                        {
                                            this.createComponent(v)
                                        }
                                        {/* {
                                            entity ?
                                                <CommonCheck
                                                    operValuesArr={v.operValuesArr}
                                                />
                                                :
                                                v.operValuesArr && v.operValuesArr.map((_v, _i) => {
                                                    return (
                                                        <div className="pt" key={_i}>
                                                            <div className="ptTitle" >
                                                                {_v.platformName ? `${_v.platformName} :` : ''}
                                                            </div>
                                                            <div className="ptText">
                                                                {
                                                                    _v.lstShop ? _v.lstShop.map((m, n) => {
                                                                        return (
                                                                            <div key={n}>
                                                                                <div className="subAccount">
                                                                                    ( <a>{m.shopName}</a> ){m.lstSite ? m.lstSite.map((o, p) => {
                                                                                        let siteArr = [];
                                                                                        siteArr.push(`"${o.siteName}"`)
                                                                                        return (
                                                                                            siteArr.join('')
                                                                                        )
                                                                                    }) : '"所有站点"'}
                                                                                </div>
                                                                                {n == _v.lstShop.length - 1 ? '' : <span className="margin-ss-left margin-ss-right v-line">|</span>}
                                                                            </div>
                                                                        )
                                                                    }) : '所有账号'
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                        } */}
                                    </div>
                                </div>
                            );
                        })}
                    </Row>
                </Group>
            );
        }
        return null;
    }
    render() {
        const lstDataRuleSys = this.props.templData.lstDataRuleSys;
        let TabPaneList = []
        if (lstDataRuleSys && lstDataRuleSys.length) {
            for (let i = 0; i < lstDataRuleSys.length; i++) {
                let data = this.createSelectElement(lstDataRuleSys[i].subWhereClause)
                if (data) {
                    TabPaneList.push((
                        <TabPane tab={lstDataRuleSys[i].sysName} key={lstDataRuleSys[i].sysKey}>
                            {data}
                        </TabPane>
                    ))
                }
            }
        }
        return (
            <div className="newCluenk scopeCluenk">
                <div className="tabTop">
                    <div className="toplf"></div>
                    <div className="toprt"> 已授权详情</div>
                </div>
                {
                    <Tabs type="card" className='typeCard'>
                        {TabPaneList}
                    </Tabs>
                }
            </div>
        );
    }
}

export default Authorizationdetail
