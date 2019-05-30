// 授权详情模块
import React, { Component } from 'react';
import {
    Checkbox,
    Tabs,
} from 'antd';
import PlatformDetail from '@/user/common/components/PlatformDetail';
import CommonDetail from './CommonDetail';
import StatisticsDetail from '@/user/common/components/StatisticsDetail';
import WareDetail from '@/user/common/components/WareDetail';
import LogisticsDetail from '@/user/common/components/LogisticsDetail';

const TabPane = Tabs.TabPane;
const Group = Checkbox.Group;

class Authorizationdetail extends Component {
    state = {
        data: [],
        code: '',
        tabIndex: 0,
    }

    // 点击平台站点触发
    onClick = (sysKey, value) => {
        this.props.setTempData({ sysKey, selectEntityCode: value });
    }

    // 授权范围--系统tab切换
    checkTab = (activeKey) => {
        const index = Number.parseInt(activeKey);
        this.setState({
            tabIndex: index,
        });
        const { sysKey, sysName } = this.props.sysStateArr[index];
        this.props.setTempData({ index, sysKey, sysName });
    }

    createComponent = (v) => {
        if (v.entityCode === 'E_CsOrg') {
            return <CommonDetail
                operValuesArr={v.operValuesArr}
            />
        } else if (v.entityCode === 'E_StatisticsSystem') {
            return <StatisticsDetail
                operValuesArr={v.operValuesArr}
            />
        } else if (v.entityCode === 'E_WarehouseAuthorized') {
            return <WareDetail
                operValuesArr={v.operValuesArr}
            />
        } else if (v.entityCode === 'E_Logistics') {
            return <LogisticsDetail
                operValuesArr={v.operValuesArr}
            />
        } else {
            return <PlatformDetail
                operValuesArr={v.operValuesArr}
            />
        }
    }
    createSelectElement = (sysKey) => {
        const ruleMap = this.props.sysRuleMap.get(sysKey);
        if (ruleMap) {
            const wayArr = Array.from(ruleMap.values()); // 授权方式数组
            return (
                <Group style={{ width: '100%' }}>
                    {wayArr.map((v, i) => (
                        <div className="maxBox" key={i}>
                            <div className="topName">
                                指定<a onClick={() => this.onClick(sysKey, v.entityCode)}>{v.entityName}</a>查看范围为 :
                            </div>
                            <div className="bottomText">
                                {
                                    this.createComponent(v)
                                }
                            </div>
                        </div>
                    ))}
                </Group>
            );
        }
        return null;
    }

    render() {
        const sysStateArr = this.props.sysStateArr;
        const TabPaneList = [];
        if (sysStateArr && sysStateArr.length) {
            for (let i = 0; i < sysStateArr.length; i++) {
                const child = this.createSelectElement(sysStateArr[i].sysKey);
                if (child) {
                    TabPaneList.push(<TabPane tab={sysStateArr[i].sysName} key={i}>{child}</TabPane>);
                }
            }
        }
        return (
            <div className="newCluenk scopeCluenk">
                <div className="tabTop">
                    <div className="toplf" />
                    <div className="toprt"> 已授权详情</div>
                </div>
                {
                    TabPaneList && TabPaneList.length
                        ? (
                            <Tabs type="card" className="typeCard" onChange={this.checkTab}>
                                {
                                    TabPaneList
                                }
                            </Tabs>
                        )
                        : null
                }

            </div>
        );
    }
}

export default Authorizationdetail;
