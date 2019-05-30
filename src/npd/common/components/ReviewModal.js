import React from 'react';
import { 
    Modal,
    Radio,
    Input,
    Row,
    Col
 } from 'antd';
 import { post } from '../../../util/axios';
 import { CONFIRM_AUDIT_API } from '../../constants/Api';
 import PropTypes from 'prop-types';

 const { TextArea } = Input;
 const RadioGroup = Radio.Group;

 export default class App extends React.Component {
    state = {
        comment: '',
        auditResult: 1
    }
    handleOk = () => {
        const {id, formId} = this.props;
        const { comment, auditResult } = this.state;
        const params = {
            "bizId": [id],
            "comment": comment,
            "formId": formId,
            "auditResult": auditResult
        }
        post(CONFIRM_AUDIT_API, params).then(data => {
            if(data.state==='000001'){
                this.props.handleSubmit && this.props.handleSubmit();
                this.props.handleCancel && this.props.handleCancel();
                this.props.handleOk && this.props.handleOk();
            }
        })
    }

    render(){
        const { visible, handleCancel, showComment = true } = this.props;
        return (
            <Modal
                title="审核"
                visible={visible}
                onOk={this.handleOk}
                onCancel={handleCancel}
                destroyOnClose
            >
            {
                showComment ? (
                    <Row>
                        <Col span={3}>
                            <span>审核意见: </span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4} onChange={(e) => this.setState({comment: e.target.value})}/>
                        </Col>
                    </Row>
                ): null
            }
                <Row className='margin-ss-top'>    
                    <Col offset={3} span={21}>
                        <RadioGroup 
                            name="radiogroup" 
                            defaultValue={this.state.auditResult}
                            onChange={(e) => this.setState({auditResult: e.target.value})} 
                        >
                            <Radio value={1}>通过</Radio>
                            <Radio value={0}>不通过</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </Modal>
        )
    }
 }

 App.propTypes = {
    formId: PropTypes.string.isRequired,
    id: PropTypes.number
 }