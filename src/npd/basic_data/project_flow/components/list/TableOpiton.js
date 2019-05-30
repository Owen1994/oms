import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../../util/axios';
import { PROJECT_ADDORUPDATE_LIST_API } from '../../../../constants/Api';    //导入项目流新增修改接口
import Functions from '../../../../../components/functions';

class TableOption extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values['type'] = 1;
                post(PROJECT_ADDORUPDATE_LIST_API, values).then(data => {
                    if (data.state === '000001') {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.props.listFetch();
                        this.refs.form.resetFields();
                    }else{
                        message.error('新增失败');
                    }
                })
            }else{
                for(let i in err){
                    var msg = i;break;
                }
                message.error(err[msg].errors[0].message);
            }
        });

    }
    // 打开弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    // 取消
    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.refs.form.resetFields();
    }
    componentDidMount() {
        this.props.list_fetch3({ name: 'userGroup_data', value: { pageNumber: 1, pageData: 20 } });
    }
    render() {
        const { visible } = this.state;
        return (
            <div className="npd-project-table-option">
                <Tooltip placement="bottom" title={"新增项目流"}>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="005-000001-000004-001">
                            <Modal
                                component={(<AddDetail ref="form" visible={visible} list_reducer={this.props.list_reducer} />)}
                                btnName="新增"
                                title="新建新品项目流"
                                iconType="plus"
                                btnType="button"
                                visible={visible}
                                showModal={this.showModal}
                                handleOk={this.handleOk}
                                handleCancel={this.handleCancel}
                            />
                        </Functions>
                    </div>
                </Tooltip>
            </div>
        );
    }
}

export default TableOption;