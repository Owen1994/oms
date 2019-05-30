import React from 'react'
import {
    Tabs,
} from 'antd'
const TabPane = Tabs.TabPane;

export default class Tabcomponent extends React.Component {
    render() {
        const { tabstate, handleTabsChange } = this.props;
        return (
            <div className="ebayorder-tabs">
                {tabstate.length ?
                    <Tabs defaultActiveKey={'0'} type="card" onChange={handleTabsChange}>
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