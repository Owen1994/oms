import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Search from './Search';
import Tablelist from './Tablelist';
import Modal2 from '../../../../components/Modal2';
import BindingEmail from './BindingEmail';
import BindingLog from './BindingLog';
import { commonRequest } from '../../../common/request';
import { filterRequest, showConfirm } from '../../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../../constants';
import { BINDING_EMAIL, SET_EMAIL_USE, SET_EMAIL_TO_EXAMINE } from '../constants';


/**
 * 作者: yangbo
 * 功能描述: 绑定邮箱组件容器
 * 时间: 2018/8/27 15:55
 */
class App extends React.Component {
    state = {
        bindingVisible: false, // 绑定/编辑弹窗状态
        bindingLogVisible: false, // 绑定记录弹窗状态
        modalTitle: '', // 弹窗标题
        item: {}, // 选中的数据
        confirmLoading: false, // 确认提交loading状态
    }

    bindingEmailform = React.createRef();

    /**
     * 邮箱绑定请求列表
     * @param <Number> pageNumber 页码
     * @param <Number> pageData 每页条数
     */
    listFetch = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = filterRequest(values);
                if (values.bindingType === undefined) {
                    filter.bindingType = [0];
                }
                filter.pageNumber = pageNumber || page.defaultCurrent;
                filter.pageData = pageData || page.defaultPageSize;
                this.props.listFetch({ name: 'data', value: filter });
            }
        });
    };

    /**
     * 绑定记录请求列表
     * @param <String> id (accountId)销售账号ID
     */
    logListFetch = (id) => {
        const param = {
            accountId: id,
        };
        this.props.logListFetch({ name: 'data', value: param });
    };

    // 点击按钮搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.listFetch();
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

    /**
     * 打开绑定邮箱窗口
     * @param <Object> item             列表的某一行数据
     * @param <String> title            弹窗标题
     * @param <Number> operationType    操作类型，1-编辑，2-新增绑定
     * @param <Number> emailType        邮箱类型，1-主邮箱，2-辅邮箱
     */
    onChangeBinding = (item, title, operationType, emailType) => {
        this.setState({
            bindingVisible: true,
            modalTitle: title,
            item: { ...item, operationType, emailType },
        });
    };

    /**
     * 取消弹框
     * @param <String> name   弹窗visible状态
     */
    handleCancel = (name) => {
        this.setState({
            [name]: false,
            item: {},
        });
    };

    /**
     * 审核
     * @param <String> bindingEmailId     绑定邮箱ID
     */
    onChangeToExamine = (bindingEmailId) => {
        showConfirm(
            '提示！',
            '确认要审核通过？',
            () => commonRequest(SET_EMAIL_TO_EXAMINE, {
                bindingEmailId,
            }, this.listFetch),
        );
    }

    // 保存邮箱
    handleOkBindingEmail = () => {
        this.bindingEmailform.current.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    confirmLoading: true,
                });
                const param = { ...this.state.item, ...values };
                let bindingEmailId;
                if (param.operationType === 1) {
                    bindingEmailId = param.emailType === 1 ? param.emailBinding[0].bindingEmailId : param.emailBinding[1].bindingEmailId;
                }
                const params = {
                    bindingEmailId,
                    accountId: param.accountId,
                    email: `${param.emailPrefix}@${param.emailSuffix}`,
                    emailPwd: param.emailPwd,
                    emailType: param.emailType,
                    emailValidateCode: param.emailValidateCode,
                    platformId: param.platformId,
                };
                fetchPost(BINDING_EMAIL, params, 1).then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({
                            bindingVisible: false,
                        });
                        this.listFetch();
                        this.bindingEmailform.current.resetFields();
                    }
                    this.setState({
                        confirmLoading: false,
                    });
                });
            }
        });
    }

    /**
     * 打开绑定记录弹窗
     * @param <Object> item     绑定的数据
     */
    onChangeBindingLog = (item) => {
        this.setState({
            bindingLogVisible: true,
            item,
        });
    }

    /**
     * 设为主邮箱/设为辅邮箱
     * @param <String> accountId        销售账号ID
     * @param <String> bindingEmailId   邮箱绑定记录主键ID
     * @param <Number> type             主/辅邮箱类型，1-主邮箱，2-辅邮箱
     * @param <String> info             二次确认描述
     */
    onChangeSettingEmailType = (accountId, bindingEmailId, bindingEmailType, info) => {
        showConfirm(
            '提示！',
            `${info}`,
            () => commonRequest(SET_EMAIL_USE, { bindingEmailId }, () => {
                this.logListFetch(accountId);
                this.listFetch();
            }),
        );
    }


    render() {
        const {
            bindingVisible,
            modalTitle,
            bindingLogVisible,
            item,
            confirmLoading,
        } = this.state;
        return (
            <div>
                <Search
                    {...this.props}
                    listFetch={this.listFetch}
                    onReset={this.onReset}
                    onSubmit={this.onSubmit}
                />
                <Tablelist
                    {...this.props}
                    listFetch={this.listFetch}
                    onChangeBinding={this.onChangeBinding}
                    onChangeBindingLog={this.onChangeBindingLog}
                    onChangeToExamine={this.onChangeToExamine}
                />
                {/* 绑定/编辑邮箱弹窗 */}
                <Modal2
                    component={(<BindingEmail item={item} ref={this.bindingEmailform} />)}
                    title={modalTitle}
                    visible={bindingVisible}
                    handleOk={this.handleOkBindingEmail}
                    handleCancel={() => this.handleCancel('bindingVisible')}
                    confirmLoading={confirmLoading}
                    className="binding-edit-modal"
                />
                {/* 绑定记录弹窗 */}
                <Modal2
                    component={
                        (
                            <BindingLog
                                {...this.props}
                                item={item}
                                onChangeSettingEmailType={this.onChangeSettingEmailType}
                                logListFetch={this.logListFetch}
                            />
                        )
                    }
                    title="邮箱绑定记录"
                    visible={bindingLogVisible}
                    className="email-binding-log"
                    handleCancel={() => this.handleCancel('bindingLogVisible')}
                    footer={null}
                    width={590}
                />
            </div>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch),
)(
    Form.create()(App),
);
