import React from 'react';
import { Table, Switch, message } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { GET_LANGUAGES_LIST, LANGUAGES_ADD_OR_EDIT, LANGUAGES_DELETE } from '../constants';

import Tableoption from '../../../../components/Tableoption';
import EditableCell from '../../../common/components/EditableCell';
import BtnOperation from '../../../../components/BtnOperation';
import { commonRequest } from '../../../common/request';
import { showConfirm } from '../../../../compliance/utils';
import { strTrim } from '../../../../util/baseTool';

class App extends React.Component {
    state = {
        languagesList: [],
        nameIsNull: false, // 编辑/新增时语言栏填写时是否为空的控制参数
    }

    columns = [
        {
            title: '语种名称',
            dataIndex: 'languagesName',
            render: (text, record, index) => {
                let isSys = false;
                if (record.isSys === true) {
                    isSys = true;
                }
                return (
                    <EditableCell
                        isSys={isSys}
                        value={text}
                        editable={record.editable}
                        width={300}
                        onChangeCheck={value => this.onChangeCheck(value, record, index)}
                    />
                );
            },
        }, {
            title: '语种状态',
            dataIndex: 'languagesState',
            align: 'center',
            render: (text, record) => {
                let isSys = false;
                if (record.isSys === true) {
                    isSys = true;
                }
                return (
                    <div>
                        {
                            isSys ? '系统设置' : (
                                <Switch
                                    checkedChildren="启用"
                                    unCheckedChildren="关闭"
                                    onChange={checked => this.onChangeSwitch(checked, record)}
                                    checked={text === 1}
                                />
                            )
                        }
                    </div>
                );
            },
        }, {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            render: (text, record) => {
                let options = [
                    {
                        name: '删除',
                        onChange: () => this.onChangeDelete(record),
                        funcId: '009-000002-000003-003',
                        subs: [],
                    },
                ];
                if (record.isSys === true) {
                    options = [];
                }
                return (
                    <Tableoption {...this.props} options={options} />
                );
            },
        },
    ];

    componentDidMount() {
        this.languageFetch();
    }


    onChangeCheck = (value, record) => {
        if (strTrim(value) === '') {
            message.warning('语种名称不能为空');
            return;
        }
        this.setState({ nameIsNull: false });
        fetchPost(LANGUAGES_ADD_OR_EDIT, {
            languagesId: record.languagesId,
            languagesState: record.languagesState,
            languagesName: value,
        }, 1).then((data) => {
            if (data && data.state === '000001') {
                this.languageFetch();
            } else if (record.isNewTemp) {
                this.setState({ nameIsNull: true });
            }
        });
    }

    onChangeSwitch = (checked, record) => {
        const { languagesList } = this.state;
        if (record.isNewTemp && this.state.nameIsNull) {
            message.warning('请先提交语种名称');
            return;
        }
        const messages = checked ? '确认要开启该项' : '确认要关闭该项';
        const languagesState = checked ? 1 : 2;
        showConfirm(
            '提示！',
            messages,
            () => commonRequest(LANGUAGES_ADD_OR_EDIT, { languagesId: record.languagesId, languagesName: record.languagesName, languagesState }, () => {
                const target = this.state.languagesList.find(item => item.languagesId === record.languagesId);
                if (target) {
                    target.languagesState = target.languagesState === 1 ? 2 : 1;
                    this.setState({ languagesList });
                }
            }),
        );
    }

    onChangeAdd = () => {
        const { languagesList, nameIsNull } = this.state;
        if (nameIsNull) {
            message.warning('请先提交新增项语种名称');
            return;
        }
        this.setState({ nameIsNull: true });
        languagesList.push({
            isNewTemp: true,
            isSys: false,
            languagesName: '',
            languagesState: 1,
            editable: true,
        });
        this.setState({ languagesList });
    };

    onChangeDelete = (record) => {
        const { languagesList } = this.state;
        if (record.isNewTemp) {
            languagesList.pop();
            this.setState({ languagesList, nameIsNull: false });
            return;
        }
        this.setState({ nameIsNull: false });
        showConfirm(
            '提示！',
            '确认要删除该语种',
            () => commonRequest(LANGUAGES_DELETE, { languagesId: record.languagesId }, () => this.languageFetch()),
        );
    }

    languageFetch() {
        fetchPost(GET_LANGUAGES_LIST, {}, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        languagesList: data.data,
                    });
                }
            });
    }

    render() {
        const { languagesList } = this.state;
        const btnOptions = {
            left: [],
            right: [
                {
                    name: '新增',
                    onChange: () => this.onChangeAdd(),
                    type: 'button',
                    icon: '',
                    funcId: '009-000002-000003-003',
                    subs: [],
                },
            ],
        };
        return (
            <div className="templatelists-language">
                <BtnOperation
                    btnOptions={btnOptions}
                    {...this.props}
                />
                <Table
                    bordered
                    size="small"
                    columns={this.columns}
                    dataSource={languagesList}
                    rowKey={(record, index) => (index)}
                    pagination={false}
                />
            </div>
        );
    }
}

export default App;
