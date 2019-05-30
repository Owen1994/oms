import React from 'react';
import { Form, Modal, Row, Col, Button, Icon } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import CSelect from '../../../../components/cselect';
import { CHANNEL_SET, CHANNEL_SEARCH, WARE_HOUSE_SYNC, WARE_HOUSE_LIST } from '../constants/Api';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};

class EditModal extends React.Component {
    state = {
        submitState: false,
        syncState: false,
        wareList: [],
        channerl: '',
    };

    handleOk = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.setState({submitState: true});
                const item = this.props.item;
                const params = {...values};
                params.key = item.key;
                fetchPost(CHANNEL_SET, {data:params}, 1)
                .then((result) => {
                    this.setState({submitState: false});
                    if (result.state === '000001') {
                        this.props.onOk();
                    }
                });
            }
        });
    };

    handleSync = () => {
        this.setState({syncState: true});
        fetchPost(WARE_HOUSE_SYNC, {}, 1)
        .then(() => {
            this.setState({syncState: false});
        });
    };

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        const item = nextProps.item;
        if (visible && !preVisible && item) {
            this.setState({
                channerl: item.logisticsChannel,
                wareList: item.arrayWarehouseList,
            }, () => {
                setTimeout(() => {
                    this.props.form.setFieldsValue({
                        warehouses: item.arrayWarehouseList.map(item => item.key),
                    })
                }, 1000);
            });
        }
    };

    render(){
        const { onCancel, visible, item } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { submitState, syncState, wareList, channerl } = this.state;
        return (
            <Modal
                width={600}
                title="设置"
                visible={visible}
                onCancel={onCancel}
                onOk={this.handleOk}
                confirmLoading={submitState}
                destroyOnClose={true}
            >
                <FormItem
                    {...formItemLayout}
                    label="物流渠道"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <div>{channerl}</div>
                        </Col>
                    </Row>
                </FormItem>
                <div>
                    <FormItem
                        {...formItemLayout}
                        label="仓库"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('warehouses', {})(
                                    <CSelect
                                        url={WARE_HOUSE_LIST}
                                        code="key"
                                        name="label"
                                        apiListType={2}
                                        mode="multiple"
                                        params={{data:{type:0}}}
                                        list={wareList}
                                        isNotCache
                                    />
                                )}
                            </Col>
                            <Col span={12}>
                                <Button loading={syncState} onClick={this.handleSync}>
                                    <Icon type="sync" />同步
                                </Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <Row gutter={8} >
                            <Col offset={4}>
                                <p style={{color: "red"}}>
                                    备注：当选项中不存在所需仓库，可以点击“同步”更新
                                </p>
                            </Col>
                    </Row>
                </div>
            </Modal>
        )
    }
}

export default Form.create()(EditModal);
