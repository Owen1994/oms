import React from 'react';
// import { Form } from 'antd';
import Tabplatform from '../../../common/components/Tabplatflat';
import OperateTabs from './OperateTabs';
import Search from './Search';

class TabsSearch extends React.Component {
    render() {
        const { platform, handleOperateTabs, defaultActivePlatformId } = this.props;
        return (
            <div className="customer-tabs-search">
                <OperateTabs
                    {...this.props}
                    platform={platform}
                    handleOperateTabs={handleOperateTabs}
                />
                <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    { platform.length > 0
                        ? (
                            <Tabplatform
                                {...this.props}
                                platform={platform}
                                loading={this.props.listReducer}
                                handleTabChange={this.props.handleTabChange}
                                activeKey={defaultActivePlatformId}
                            />
                        )
                        : (
                            <div className="mail-detail">
                                <div className="breadcrumb customer-service-tab-platform">
                                    <p style={{ lineHeight: '43px', paddingLeft: 15 }}>暂无数据</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Search
                    {...this.props}
                />
            </div>
        );
    }
}

export default TabsSearch;
