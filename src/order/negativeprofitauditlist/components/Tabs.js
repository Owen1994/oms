import React from 'react'
import {
    Tabs,
    Modal,
    Form,
    Button,
    Input,
    message,
} from 'antd'
const TabPane = Tabs.TabPane;

export default class Tabcomponent extends React.Component {
    render() {
        const { tabstate, handleTabsChange,defaultActiveKey } = this.props;
        return (
            <div className="bgcfff">
                {tabstate.length ?
                    <Tabs defaultActiveKey={defaultActiveKey} type="card" onChange={handleTabsChange}>
                        {tabstate.map(it => {
                            return (
                                <TabPane tab={<span>{it.desc}({it.count})</span>} key={it.code}></TabPane>
                            )
                        })}
                    </Tabs> : null}
            </div>
        )
    }
}