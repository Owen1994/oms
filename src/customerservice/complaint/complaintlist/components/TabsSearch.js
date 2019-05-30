import React from 'react';
import { Form } from 'antd';
import OperateTabs from './OperateTabs';
import DisputeSearch from './DisputeSearch';
import CommentSearch from './CommentSearch';
import AccountSearch from './AccountSearch';

class TabsSearch extends React.Component {
    render() {
        const { operateType } = this.props;
        let search;
        if (operateType === '1') {
            search = <DisputeSearch {...this.props} />;
        } else if (operateType === '2') {
            search = <CommentSearch {...this.props} />;
        } else {
            search = <AccountSearch {...this.props} />;
        }
        return (
            <div className="complaint-tabs-search">
                <OperateTabs
                    {...this.props}
                />
                {search}
            </div>
        );
    }
}

export default Form.create()(TabsSearch);
