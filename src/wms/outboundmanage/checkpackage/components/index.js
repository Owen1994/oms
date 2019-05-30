import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import Search from './Search';
import TableList from './TableList';
import { TAB_TITLES } from '../constants/Table';
import '../../../common/css/index.css';
import '../css/index.css';
import ScanChannelTable from './table/ScanChannelTable';
import Functions from '../../../../components/functions';

const TabPane = Tabs.TabPane;

/**
 * 核对打包
 */
class App extends React.Component {
    state = {
        selectKey: '0',
    };

    setScanSearchFocus = (taskOver) => {
        this.checkPageSearchRef.setScanSearchFocus(taskOver);
    };

    render() {
        const { selectKey } = this.state;
        return (
            <div className="wms-checkpackage wms-tabs">
                <Tabs defaultActiveKey={selectKey} type="card" onChange={this.tabChange}>
                    <TabPane tab={TAB_TITLES[0]} key="0">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000003-001"
                        >
                            <Search
                                ref={ref => this.checkPageSearchRef = ref}
                                {...this.props}
                            />
                            <TableList
                                setScanSearchFocus={this.setScanSearchFocus}
                                {...this.props}
                            />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[1]} key="1">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000003-006"
                        >
                            <ScanChannelTable
                                {...this.props}
                            />
                        </Functions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
