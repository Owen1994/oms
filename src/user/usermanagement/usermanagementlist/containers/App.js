import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Form,
} from 'antd';
import actions from '../actions';


import '../css/css.css';

// 引入子组件
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import { pageCache } from '../../../../util/baseTool';

class UserForm extends Component {

    componentDidMount() {
        const pageCachedata = pageCache(this, `${location.pathname}${location.search}`);
        this.props.fetchPosts({
            key: 'data',
            value: pageCachedata || {
                pageNumber: 1,
                pageData: 20,
            },
        });
    }

    render() {
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <Condition {...this.props} />
                    <Tablelist {...this.props} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({ ...state }), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {};
            for (const i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i]);
                }
            }
            return Infos;
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields);
        },
    })(UserForm),
);
