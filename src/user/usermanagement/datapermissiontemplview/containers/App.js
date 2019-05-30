import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'qs';
import {
    Form,
    Button,
} from 'antd';
import actions from '../actions';
import { parseTempData } from '../selectors';

import '../css/css.css';

// 引入子组件
import Projectintroduct from '../components/Projectintroduct'; // 方案简介
import Authorizationdetail from '../components/Authorizationdetail'; // 授权详情

class UserForm extends Component {
    state = {
        templId: '',
        visible: false,
    }

    componentWillUnmount() {
        this.props.form.resetFields();
        // this.props.baseInfoForm({load:false,sysArr:[],omsPlatformVoList:[],preArr:[],usersysArr:[],templName:{},checkArr:[],intersectArr:[]});
        // this.props.autdetaction({savePlatData:[]});
    }

    componentDidMount() {
        const templIdarr = window.location.href.split('?');
        const templId = templIdarr.length > 1 ? qs.parse(templIdarr[1]).templId ? qs.parse(templIdarr[1]).templId : '' : ''; // 获取ID
        // this.props.baseInfoForm({templId:templId});                         //存放templId
        this.setState({
            templId,
        });
        this.props.loadTemplRuleData({ templId });
    }

    componentWillReceiveProps(nextProps) {
        const prevTempData = this.props.templData;
        const tempData = nextProps.templData;
        if (prevTempData !== tempData && tempData) {
            this.props.form.setFieldsValue({
                templName: tempData.templName,
                remark: tempData.remark,
            });
        }
    }

    // 返回按钮
    returnprev=() => {
        this.props.history.goBack();
    }

    render() {
        const buttons = (
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Button onClick={this.returnprev}>
                    返回
                </Button>
                <Button
                    type="primary"
                    style={{ marginLeft: '20px' }}
                    onClick={() => this.setState({ visible: true })}
                    disabled={!this.props.templData || !this.props.templData.lstDataRuleSys.length}
                >
                    快速分配给用户
                </Button>
            </div>
        );
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <Projectintroduct {...this.props} />
                    <Authorizationdetail
                        {...this.props}
                        templId={this.state.templId}
                        visible={this.state.visible}
                        onCancel={() => this.setState({ visible: false })}
                    />
                    {buttons}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const templData = parseTempData(state.templData);
    return {
        templData,
        ...props,
    };
};
export default connect(mapStateToProps, dispatch => bindActionCreators(actions, dispatch))(Form.create()(UserForm));
