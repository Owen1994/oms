import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import {
    Form,
} from 'antd'

import '../css/css.css'
import Tablelist from '../components/Tablelist';
class AmazonPublish extends Component {

    constructor(props) {
        super(props);
    }
    /**
    *作者: 唐勇
    *功能描述: 页面打开加载
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    componentDidMount() {

    }

    render() {
        return (
            <div className="newClue">
                <Tablelist {...this.props} />
            </div>
        );
    }
}

export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {}
            for (let i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i])
                }
            }
            return Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(AmazonPublish));