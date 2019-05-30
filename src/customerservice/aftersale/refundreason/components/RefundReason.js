import React from 'react';
import Search from './Search';
import RefundTablelist from './RefundTablelist';

export default class RefundReason extends React.Component {
    render() {
        return (
            <div>
                <Search {...this.props} />
                <RefundTablelist {...this.props} />
            </div>
        );
    }
}
