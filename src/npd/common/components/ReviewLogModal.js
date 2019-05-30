import React from 'react';
import { 
    Modal,
    Table
 } from 'antd';
 import { post } from '../../../util/axios';
 import { AUDIT_LOGS_API } from '../../constants/Api';
 import PropTypes from 'prop-types';
import { timestampFromat } from '../../../util/baseTool'
 export default class App extends React.Component {
    state = {
        list: []
    }
    columns = [{
        title: '审核状态',
        dataIndex: 'auditNodeName',
      }, {
        title: '操作步骤',
        dataIndex: 'operated',
      }, {
        title: '备注',
        dataIndex: 'comment',
      }, {
        title: '操作人',
        dataIndex: 'operator',
      }, {
        title: '操作时间',
        dataIndex: 'endTime',
        render: (text) => <div>{timestampFromat(text)}</div>
      },
    ];


    componentWillReceiveProps(nextProps) {
        const preVisible = this.props.visible;
        const visible = nextProps.visible;
        if(!preVisible&&visible) {
            post(AUDIT_LOGS_API, { bizId: nextProps.id, formId: nextProps.formId}).then(data => {
                if(data.state === '000001') {
                    this.setState({
                        list: data.data.map((item, index) => {
                            item.key = index
                            return item;
                        })
                    })
                }
            })
        }
    }
    render(){
        const list = this.state.list;
        const { visible, handleCancel,className } = this.props;
        return (
            <Modal
                className={className}
                title="查看审核记录"
                visible={visible}
                footer={false}
                onCancel={handleCancel}
            >
                <Table 
                    size="small"
                    dataSource={list} 
                    columns={this.columns}
                    pagination={false}
                    bordered
                />
            </Modal>
        )
    }
 }

 App.propTypes = {
    formId: PropTypes.string.isRequired,
    id: PropTypes.number
 }