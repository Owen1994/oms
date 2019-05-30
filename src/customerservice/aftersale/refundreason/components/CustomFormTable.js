import React from 'react';
import {
    Table, Spin,
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Modal2 from '../../../../components/Modal2';
// import Functions from '../../../../components/functions';
import FilterType from './FilterType';
import AddFieldModal from './AddFieldModal';
import { showConfirm } from '../../../../compliance/utils';
import { commonRequest } from '../../../common/request';
import { fetchPost } from '../../../../util/fetch';
import { ADD_OR_EDIT_FIELD, DELETE_FIELD } from '../constants';
import { randNum } from '../../../../util/baseTool';


export default class TableList extends React.Component {
    state = {
        modalTitle: '',
        addVisible: false,
        addConfirmLoading: false,
        record: {},
    }

    columns = [
        {
            title: '展示效果',
            dataIndex: 'fieldType',
            align: 'center',
            render: (text, record) => (
                <div className="form-visible ant-form-item">
                    <div className="ant-form-item-label">
                        <div className={record.isRequire === 2 ? 'ant-form-item-required' : ''}>{record.fieldName}：</div>
                    </div>
                    <div className="ant-form-item-control-wrapper">
                        <FilterType item={record} />
                    </div>
                </div>
            ),
        },
        {
            title: '名称',
            dataIndex: 'fieldName',
            width: 200,
            align: 'center',
        },
        {
            title: '类型',
            dataIndex: 'fieldTypeText',
            width: 150,
        },
        {
            title: '选择值',
            dataIndex: 'fieldOption',
            width: 200,
        },
        {
            title: '必填',
            dataIndex: 'isRequire',
            width: 150,
            render: text => {
                if (text === 1) {
                    return <span>否</span>;
                } else {
                    return <span>是</span>;
                }
            }
        },
        {
            title: '排序',
            dataIndex: 'sorts',
            width: 150,
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'options',
            key: 'options',
            width: 200,
            render: (text, record) => {
                const options = [
                    {
                        name: '编辑',
                        funcId: '009-000004-000001-006',
                        onChange: () => { this.handleOpenModal('编辑字段', 'addVisible', record); },
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '009-000004-000001-007',
                        onChange: () => { this.handleDelete(record); },
                        subs: [],
                    },
                ];
                return (
                    <Tableoption {...this.props} options={options} />
                );
            },
        },
    ]

    btnOptions = {
        left: [
            {
                name: '添加字段',
                onChange: () => this.handleOpenModal('添加字段', 'addVisible'),
                type: 'button',
                icon: 'plus',
                funcId: '009-000004-000001-006',
                subs: [],
            },
        ],
        right: [],
    }

    handleDelete = (record) => {
        const platformId = this.props.form.getFieldValue('platformId');
        showConfirm(
            '提示！',
            '确认要删除该字段',
            () => commonRequest(DELETE_FIELD, {
                group: '1',
                fieldId: record.fieldId,
            }, () => this.props.getCustomForm(platformId)),
        );
    }

    /**
     * @param <String> modalTitle-弹出框标题
     * @param <String> visible-弹出框显示控制参数
     */
    handleOpenModal = (modalTitle, visible, record) => {
        this.setState({
            modalTitle,
            [visible]: true,
            record: record || {},
        });
    }

    handleAddOk = () => {
        this.addRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ addConfirmLoading: true });
                const platformId = this.props.form.getFieldValue('platformId');
                values.platformId = platformId;
                values.fieldType = values.fieldType2.key;
                fetchPost(ADD_OR_EDIT_FIELD, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.setState({
                                addVisible: false,
                            });
                            this.props.getCustomForm(platformId);
                        }
                        this.setState({
                            addConfirmLoading: false,
                        });
                    });
            }
        });
    }

    handleCancel = () => {
        this.setState({
            addVisible: false,
        });
    }

    render() {
        const loading = this.props.refundFormLoading;
        const data = this.props.refundFormList.data;
        const {
            modalTitle, addVisible, addConfirmLoading, record,
        } = this.state;
        return (
            <div className="custom-form-tablelist breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        btnOptions={this.btnOptions}
                        {...this.props}
                    />
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={data}
                        pagination={false}
                        rowKey={() => randNum()}
                    />
                </Spin>
                {/* 添加/编辑字段弹窗 */}
                <Modal2
                    component={
                        (
                            <AddFieldModal
                                record={record}
                                ref={addform => this.addRef = addform}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={addVisible}
                    handleOk={this.handleAddOk}
                    handleCancel={this.handleCancel}
                    confirmLoading={addConfirmLoading}
                />
            </div>
        );
    }
}
