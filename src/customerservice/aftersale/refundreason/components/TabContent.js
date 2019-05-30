import React from 'react';
import RefundReason from './RefundReason';
import RefundForm from './RefundForm';

export default class TabsContent extends React.Component {
    render() {
        const { operateType } = this.props;
        let tabsContent;
        if (operateType === '1') {
            tabsContent = <RefundReason {...this.props} />;
        } else {
            tabsContent = <RefundForm {...this.props} />;
        }
        return (
            <div className="refund-tab-content">
                {tabsContent}
            </div>
        );
    }
}
