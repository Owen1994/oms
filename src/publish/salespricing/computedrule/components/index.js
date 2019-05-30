import React from 'react';
import { Form, Drawer, Button, message, Modal } from 'antd';
import Modal2 from '../../../../components/Modal2';
import Search from './Search';
import Table from './Table';
import EditDrawer from './EditDrawer';
import ViewDrawer from './ViewDrawer';
import LogsModal from './LogsModal';

import { EDIT_DOMESTIC, DELETE_DOMESTIC } from '../constants';
import { fetchPost } from '../../../../util/fetch';

const confirm = Modal.confirm;

class ComputedRule extends React.Component {
    state = {
        record: {},
    }

    componentDidMount() {
        this.listFetch();
    }
    
    listFetch = (pageData = 20, pageNumber = 1) => {
        const values = this.props.form.getFieldsValue();
        values.pageData = pageData;
        values.pageNumber = pageNumber;
        this.props.queryRules(values);
    }

    // 验证部分非自动校验的字段
    validateRules = (values) => {
        const {
            headerFix,
            skuRule,
        } = values;
        const {
            orderApportionCoefficient,
            orderApportionCharge,
            paypalLargeCharge,
            paypalLargeRate,
            paypalPointValue,
            paypalSmallCharge,
            paypalSmallRate,
        } = values.charge;
        if (headerFix) {
            if (headerFix !== 'empty') {
                if (skuRule) {
                    values.basis.matchRule = `${headerFix}=${skuRule}`;
                    delete values.headerFix;
                    delete values.skuRule;
                } else {
                    message.warning('请填写完整的SKU匹配规则');
                    return false;
                }
            } else {
                delete values.basis.matchRule;
            }
        }
        if (!orderApportionCoefficient || !orderApportionCharge) {
            message.warning('请填写完整的订单均摊费');
            return false;
        }
        if (!paypalLargeCharge || !paypalLargeRate || !paypalSmallCharge || !paypalPointValue || !paypalSmallRate) {
            message.warning('请填写完整的Paypal参数');
            return false;
        }
        return true;
    }

    // 删除操作
    deleteRule = (record) => {
        const { basisId } = record;
        confirm({
            title: '提示！',
            content: '确定删除此规则？',
            onOk: () => {
                return fetchPost(DELETE_DOMESTIC, { data: { basisId } }, 2)
                    .then((res) => {
                        if (res && res.state === '000001') {
                            this.listFetch();
                        }
                    })
            },
        });
    }

    // 提交新增/编辑
    submitRules = () => {
        this.addEditRef.validateFields((err, values) => {
            if (!err) {
                const isValidateOk = this.validateRules(values);
                if (!isValidateOk) return false;
                this.setState({ editLoading: true });
                fetchPost(EDIT_DOMESTIC, { data: values }, 1)
                    .then((res) => {
                        if (res && res.state === '000001') {
                            this.listFetch();
                            this.setState({ editVisible: false });
                        }
                    }).finally(() => {
                        this.setState({ editLoading: false });
                    })
            }
        })
    }

    onReset = () => {
        this.props.form.resetFields();
    }

    openDrawer = (visible, record) => {
        this.setState({
            record: record ? record : {},
            [visible]: true,
        });
        if (visible === 'editVisible') {
            this.setState({
                modalTitle: record ? '编辑' : '新增',
            });
        }
    }

    closeDrawer = (visible) => {
        this.setState({ [visible]: false });
    }

    render() {
        const { editVisible, viewVisible, modalTitle, logsVisible, record, editLoading } = this.state;
        return (
            <div className="computed-rules">
                <Search
                    {...this.props}
                    onReset={this.onReset}
                    listFetch={this.listFetch}
                />
                <Table
                    deleteRule={this.deleteRule}
                    openDrawer={this.openDrawer}
                    {...this.props}
                />
                {/* 新增/编辑抽屉 */}
                <Drawer
                    title={modalTitle}
                    placement="right"
                    visible={editVisible}
                    onClose={() => this.closeDrawer('editVisible')}
                    width={'80%'}
                    className='domestic-drawer'
                >
                    <EditDrawer
                        record={record}
                        modalTitle={modalTitle}
                        editVisible={editVisible}
                        rulesStateInit={this.props.rulesStateInit}
                        rulesInitReducer={this.props.rulesInitReducer}
                        ref={addRef => this.addEditRef = addRef}
                    />
                    <div className='drawer-rule-btns'>
                        <Button style={{marginRight: 8}} onClick={() => this.closeDrawer('editVisible')}>取消</Button>
                        <Button loading={editLoading} onClick={() => this.submitRules('editVisible')} type="primary">确认</Button>
                    </div>
                </Drawer>
                {/* 查看抽屉 */}
                <Drawer
                    title="查看"
                    placement="right"
                    visible={viewVisible}
                    onClose={() => this.closeDrawer('viewVisible')}
                    width={'80%'}
                    className='domestic-drawer'
                >
                    <ViewDrawer record={record} viewVisible={viewVisible} ref={view => this.viewRef = view} />
                </Drawer>
                {/* 日志弹窗 */}
                <Modal2
                    component={(
                        <LogsModal record={record} />
                    )}
                    title='日志'
                    visible={logsVisible}
                    handleCancel={() => this.closeDrawer('logsVisible')}
                    footer={null}
                    width={800}
                />
            </div>
        )
    }
}
export default Form.create()(ComputedRule);
