// 授权范围模块
import React, { PureComponent } from 'react';

import {
    Row,
    Col,
    Checkbox,
    Tabs,
} from 'antd';

const TabPane = Tabs.TabPane;

class Authorizationscope extends PureComponent {
    state={
        organitag: 'templName',
        switch: true,
        tabIndex: 0,
    }

    // 授权范围--系统下子集选择的状态
    checkChangeState = (e, entityName) => {
        const sysStateArr = this.props.sysStateArr;
        const tabIndex = this.state.tabIndex;
        const sysEntity = sysStateArr[tabIndex];
        const sysKey = sysEntity.sysKey;
        const checked = e.target.checked;
        const entityCode = e.target.value;
        if (checked) {
            this.props.addSysRule({ sysKey, value: { entityCode, entityName, operValuesArr: [] } });
        } else {
            this.props.delSysRule({ entityCode, sysKey });
        }
    }

    // 选择一个已有方案
    showSolution = () => {
        this.props.showModal();
    }

    // 授权范围--系统tab切换
    checkTab = (activeKey) => {
        const index = Number.parseInt(activeKey);
        this.setState({
            tabIndex: index,
        });
    }

    render() {
        const sysStateArr = this.props.sysStateArr;
        const tabIndex = this.state.tabIndex;
        let arrGroupValue = null;
        const sysEntity = sysStateArr[tabIndex];
        if (sysEntity && sysEntity.lstEntity) {
            const entityMap = this.props.sysRuleMap.get(sysEntity.sysKey);
            arrGroupValue = (
                <div className="margin-sm">
                    <Row type="flex" justify="start">
                        {sysEntity.lstEntity.map((v, i) => (
                            <Col key={i} span={24}>
                                <Checkbox
                                    value={v.entityCode}
                                    onClick={e => this.checkChangeState(e, v.entityName)}
                                    checked={!!(entityMap && entityMap.get(v.entityCode))}
                                >
                                            指定<a>{v.entityName}</a>范围
                                </Checkbox>
                            </Col>
                        ))}
                    </Row>
                </div>
            );
        }

        return (
            <div className="newCluenk scopeCluenk">
                <div className="tabTop">
                    <div className="toplf" />
                    <div className="toprt"> 可授权范围</div>
                    <div className="toprr"><a onClick={this.showSolution} disabled={!this.props.sysStateArr.length}>+ 选择一个已有方案</a></div>
                </div>
                <Tabs type="card" className="typeCard" onChange={this.checkTab}>
                    {sysStateArr.map((v, i) => (
                        <TabPane tab={v.sysName} key={i} />
                    ))}
                </Tabs>
                {arrGroupValue || ''}
            </div>
        );
    }
}

export default Authorizationscope;
