import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import actions from '../actions';
import '../css/css.css';
import Search from '../components/Search';
import Tablelist from '../components/Tablelist';
import {
    Spin,
} from 'antd';

import {
    Form,
} from 'antd';

class UserForm extends Component {    

    /**
    * 恢复所有颜色
    */
    recoverAllColor = () => {
        // 字体
        this.recoverColorByClass('new-word-color');
        // 图片
        this.recoverColorByClass('orderlocation-plat-img2');
        this.recoverColorByClass('orderlocation-hwimport-img2');
        this.recoverColorByClass('orderlocation-order-img2');
        this.recoverColorByClass('orderlocation-manage-img2');
        this.recoverColorByClass('orderlocation-package-img2');
        this.recoverColorByClass('orderlocation-arrow-color');
        // 线条
        this.recoverColorByClass('orderlocation-line-color');
        this.recoverColorByClass('orderlocation-lefttop-border-color');
        this.recoverColorByClass('orderlocation-bottomleft-border-color');
        // 隐藏信息
        this.toggleMsg(false);
    }

    /**
    * 恢复原色
    */
    recoverColorByClass = (className) => {
        const ele = document.querySelectorAll(`.${className}`);
        for(let i = 0; i < ele.length; i++) {
            const clsList = ele[i].classList;
            const removeCls = clsList[clsList.length-1];
            ele[i].classList.remove(removeCls);
        }
    }

    /**
    * 显示或隐藏信息
    */
    toggleMsg = (visible) => {
        const ele = document.querySelectorAll('.orderlocation-msg');
        if(visible) {
            for(let i = 0; i < ele.length; i++) {
                ele[i].classList.add('orderlocation-visible');
            }
        }else{
            for(let i = 0; i < ele.length; i++) {
                ele[i].classList.remove('orderlocation-visible');
            }
        }
    }

    render() {
        const { loadingState } = this.props;
        return (
            <div>
                <div className="erp-search">
                    <Search {...this.props} recoverAllColor={this.recoverAllColor} />
                </div>
                <Spin spinning={loadingState}>
                    <Tablelist {...this.props} recoverAllColor={this.recoverAllColor} toggleMsg={this.toggleMsg} />
                </Spin>
            </div>
        );
    }
}

export default connect(
    state => ({...state}), dispatch => bindActionCreators(actions, dispatch)
)(Form.create()(UserForm));
