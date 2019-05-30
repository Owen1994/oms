import React from 'react';
import DisputeTablelist from './DisputeTablelist';
import CommentTablelist from './CommentTablelist';
import AccountTable from './AccountTable';

export default class Tablelist extends React.Component {
    render() {
        const { operateType } = this.props;
        let tablist;
        if (operateType === '1') {
            tablist = <DisputeTablelist {...this.props} />;
        } else if (operateType === '2') {
            tablist = <CommentTablelist {...this.props} />;
        } else {
            tablist = <AccountTable {...this.props} />;
        }
        return (
            <div className="dispute-comment-tablist">
                {tablist}
            </div>
        );
    }
}
