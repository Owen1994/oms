import React, {Component} from 'react' //在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {render} from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面上去
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Radio,
    Input,
    Button,
    DatePicker,
    Col
} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button;
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
import {platformsearchaction} from "../actions";
import StandardFormRow from '../../../common/searchModel/StandardFormRow';
import TagSelect from '../../../common/searchModel/TagSelect';
import {
    AMAZON_TYPE,AMAZON_SEARCH
} from '../../../common/searchModel/constants';
import {levelOptions} from "../../../../util/options";

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state={

    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }

    render() {

        return (
            <div className="newCluenk amazonsetting">
            </div>
        );
    }
}

export default Condition