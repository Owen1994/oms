import React from 'react'
import {
    Tabs,
} from 'antd'
const TabPane = Tabs.TabPane;

export default class Tabcomponent extends React.Component {
    render() {
        const { tabstate, handleTabsChange, defaultActiveKey, activeKey } = this.props;
        let activeKeyCurent = activeKey !== undefined ? activeKey : defaultActiveKey !== undefined ? defaultActiveKey : '-1'
        activeKeyCurent = activeKeyCurent.toString()
        return (
            <div className="shopee-order-tabs">
                {tabstate.length ?
                    <Tabs activeKey={activeKeyCurent} type="card" onChange={handleTabsChange}>
                        {tabstate.map(it => {
                            return (
                                <TabPane tab={<span>{it.name}({it.num})</span>} key={it.id}></TabPane>
                            )
                        })}
                    </Tabs> : null}
            </div>
        )
    }
}