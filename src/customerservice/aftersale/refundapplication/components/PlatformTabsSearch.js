import React from 'react';
import Search from './Search';
import PlatformTabs from '../../../common/components/RefundPlatformTabs';

export default class PlatformTabsSearch extends React.Component {
    render() {
        return (
            <div className="breadcrumb refundapp-tabs-search">
                <PlatformTabs
                    {...this.props}
                    type="card"
                    ifResetFields={true}
                    loading={this.props.refundLoading}
                />
                <Search {...this.props} />
            </div>
        );
    }
}
