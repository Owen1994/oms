import React from 'react';
import { Modal, Form, Spin, Divider } from 'antd';
import CCheckBox from '@/components/ccheckbox';
import { fetchPost } from '@/util/fetch';
import { GET_WARE_DATALIST } from '../constants/Api';
import '../style.css';

const style = {
    height: 300,
    overflowY: 'auto', 
}
class WareModal extends React.PureComponent {
    state = {
        dataList: [],
        loadingState: false,
    }

    componentWillReceiveProps(nextProps) {
        const preVisible = this.props.visible;
        const visible    = nextProps.visible;
        if(visible && visible !== preVisible) {
            this.setState({loadingState: true});
            this.loadData(nextProps.data);
        }
    }

    handleOk = () => {
        const formData = {...this.props.form.getFieldsValue()};
        this.props.onOk(formData.data);
    }

    loadData = (data) => {
        fetchPost(GET_WARE_DATALIST, undefined, 2).then(result => {
            if (result.state === '000001') {
                const dataList = result.data.filter((item) => item.value&&item.label);
                this.setState({
                    dataList
                }, () => {
                    setTimeout(() => {
                        if (Array.isArray(data)) {
                            this.props.form.setFieldsValue({data});
                        }
                    }, 1000);
                });
            }
            setTimeout(() => {
                this.setState({loadingState: false});
            }, 2000);
        });
    }

    handleChange = (values) => {
        // console.log("handleChange values: ", values, param2, param3);
        this.props.form.setFieldsValue({
            data: values
        });
    }

    render() {
        const {
            onCancel,
            visible,
        } = this.props;
        const {
            dataList,
            loadingState,
        } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const data = getFieldValue('data') || [];
        return (
            <Modal
                style={{ maxHeight: '600px' }}
                width={960}
                onOk={this.handleOk}
                onCancel={onCancel}
                title="可查看仓库设置"
                visible={visible}
                destroyOnClose
            >
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div className="user-checkbox-container"  style={style}>
                        <div className="user-checkbox__wrap user-checkbox__left">
                            {getFieldDecorator('data')(
                                <CCheckBox
                                    list={dataList}
                                    formType={1}
                                    checkAllOption={true}
                                />
                            )}
                        </div>
                        <Divider type="vertical" style={{height: '100%', width: 1}}/>
                        <div className="user-checkbox__right">
                            <p>已选择的仓库</p>
                            <CCheckBox
                                list={data}
                                value={data}
                                formType={1}                             
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }
}

export default Form.create()(WareModal);
