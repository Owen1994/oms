import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import {
    Form,
} from 'antd'

import '../css/css.css'
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
class AmazonPublish extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="newClue">
                <Condition {...this.props} />
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