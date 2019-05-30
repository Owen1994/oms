import React from 'react'
import {
    Tabs,
} from 'antd'
const TabPane = Tabs.TabPane;

export default class Tabcomponent extends React.Component {
    render() {
        const { tabsData, handleTabsChange } = this.props;
        return (
            <div className="amazon-this-tabs">
                {tabsData.length ?
                    <Tabs defaultActiveKey={'0'} type="card" onChange={handleTabsChange}>
                        {tabsData.map(it => {
                            return (
                                <TabPane tab={<span>{it.name}({it.num})</span>} key={it.id}></TabPane>
                            )
                        })}
                    </Tabs> : null}
            </div>
        )
    }
}
