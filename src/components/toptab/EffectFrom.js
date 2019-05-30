/**
*作者: 任贸华
*功能描述: 修改密码组件
*参数说明:
*时间: 2018/4/16 11:03
*/
import React from 'react';

import { Form, Input, Row, Col, Button, Radio, DatePicker, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { api_url } from '../../util/connectConfig';
import axios from 'axios';

class EffectFrom extends React.Component {
	state = {
		confirmDirty: false
	}
	doEffect = (values) => {

		var params = { ...values, token: token };
		axios.get(api_url + '/api/user/resetPassword', { params: params }).then((res) => {
			if (res.data.code == '0') {
				message.success('修改成功');
				this.props.onSubmit();
			}else{
				message.error(res.data.msg);
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('newPassword')) {
			callback('两次输入密码不一致!');
		} else {
			callback();
		}
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {

				this.doEffect(values);
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 7 },
			wrapperCol: { span: 17 }
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} ref="test">
				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout} label="原密码">
							{getFieldDecorator('oldPassword', {
								rules: [{
									required: true, message: '请输入原密码!',
								}]
							})(
								<Input type='password' placeholder="请输入原密码" />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout} label="新密码">
							{getFieldDecorator('newPassword', {
								rules: [{
									required: true, message: '请输入新密码!',
								}]
							})(
								<Input type='password' placeholder="请输入新密码" />
								)}
						</FormItem>
					</Col>
				</Row>

				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout} label="再次输入新密码">
							{getFieldDecorator('newPasswordAgain', {
								rules: [{
									required: true, message: '再次输入新密码!',
								}, {
									validator: this.checkPassword,
								}]
							})(
								<Input type='password' placeholder="再次输入新密码" onBlur={this.handleConfirmBlur} />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<FormItem className="topwidget-submit">
						<Button type="primary" htmlType="submit" className='normal'>提交</Button>
					</FormItem>
				</Row>
			</Form >
		);
	}
}

export default EffectFrom;