import React from 'react'
import {
    Tabs,
} from 'antd'
const TabPane = Tabs.TabPane;

export default class Tabcomponent extends React.Component {
    render() {
        const { tabstate, handleTabsChange, activeKey } = this.props;
        return (
            <div className="mymallorder-tabs">
                {tabstate.length ?
                    <Tabs activeKey={activeKey.toString()} type="card" onChange={handleTabsChange}>
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