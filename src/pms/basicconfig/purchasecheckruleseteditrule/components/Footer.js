import React from 'react';
import {
    Table,
    Input,
    Icon,
} from 'antd';
import CSelect from '../../../../components/cselect';
import {
    EDITORIAL_RULES_APPROVER,
} from '../constants';


export default class Footer extends React.Component {
    templateMap = new Map();

    columns = [
        {
            title: '审批顺序',
            dataIndex: 'orderPosition',
            render: (record, records, index) => (
                <span>{index + 1}</span>
            ),
        }, {
            title: '审批阶段',
            dataIndex: 'approvalStage',
            render: (record, records, index) => (
                <Input
                    defaultValue={record}
                    onBlur={e => this.handleBlur(index, 'approvalStage', e)}
                />
            ),
        }, {
            title: '审批人',
            dataIndex: 'approver',
            render: (record, records, index) => (
                <CSelect
                    value={record.length > 0 ? record[0].key : ''}
                    list={record}
                    code="key"
                    name="label"
                    url={EDITORIAL_RULES_APPROVER}
                    params={{
                        data: {
                            searchColumn: 'name',
                            pageData: 20,
                            pageNumber: 1,
                        },
                    }} // 搜索参数
                    apiListType={0}
                    placeholder="请选择"
                    formType={1}
                    onChange={value => this.handleChange(index, 'approver', value)
                    //   this.templateMap.set(index, value)
                    }
                    onFilters={this.handleTemplateFilters}
                />
            ),
        }, {
            title: '操作',
            className: 'publish-matchrule-active',
            render: (record, text, index) => (
                index === 0 ? <span className="colorBlue" onClick={this.add}><Icon type="plus" />&nbsp;&nbsp;新增</span> : <span className="colorBlue" onClick={() => this.remove(index)}><Icon type="delete" />&nbsp;&nbsp;删除</span>
            ),
        }];

    // handleTemplateFilters = list => (
    //     list.filter((item) => {
    //         let flag = true;
    //         for (const value of this.templateMap.values()) {
    //             if (value === item.id) {
    //                 flag = false;
    //                 break;
    //             }
    //         }
    //         return flag;
    //     })
    // )


    handleChange = (index, key, value) => {
        this.props.executionActionSetValue({ index, key, value });
    }

    handleBlur = (index, key, event) => {
        this.props.executionActionSetValue({ index, key, value: event.target.value });
    }

    remove = (index) => {
        this.props.executionActionDel(
            {
                key: 'dataSource',
                index,
            },
        );
    }

    add = () => {
        this.props.executionActionAdd(
            {
                key: 'dataSource',
                value: {
                    key: Date.now(),
                    approvalStage: '',
                    approver: [{ key: '', label: '' }],
                },
            },
        );
    }

    render() {
        return (
            <div className="pms-purchasecheckruleseteditrule-tab">
                <span className="pms-rule">流程规则</span>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={this.props.executionData}
                        bordered
                        pagination={false}
                    />
                </div>
            </div>
        );
    }
}
