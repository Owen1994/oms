import React from 'react';
import TableListItem from './TableListItem';
import BtnOperation from '../../../../components/BtnOperation';

export default class TableList extends React.Component {
    render() {
        const { onOperate } = this.props;
        const btnOptions = {
            left: [],
            right: [
                {
                    name: '新增一级分类',
                    onChange: () => onOperate('添加一级分类', 'visible', 'addlabel'),
                    type: 'button',
                    icon: 'plus',
                    funcId: '009-000002-000002-002',
                    subs: [],
                },
            ],
        };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <BtnOperation btnOptions={btnOptions} {...this.props} />
                <TableListItem {...this.props} />
            </div>
        );
    }
}
