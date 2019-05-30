/**
*作者: 任贸华
*功能描述: SKU解析配置入口文件
*参数说明:
*时间: 2018/4/16 11:34
*/
import React, {Component} from 'react'
import {render} from 'react-dom'

import Skuprefix from './skuprefix';
import Modalmodel from '../../../components/modalmodel/searchmodel';
import axios from "../../../util/axios";

import {unbinds} from "../../../util/baseTool";
import * as config from "../../../util/connectConfig";
import {

    message,

} from 'antd'

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    ModalhandleCancel = (value) => () => {
        this.props.skuprefixAPPaction({[value]: false})
        const arr = [...this.props.skuprefixtable.data, ...this.props.skuprefixtable.characterdata]
        unbinds(this, {data:arr})
    }


    render() {
        const content = <div className="newClue">
            <Skuprefix {...this.props} />
        </div>


        return (

            <Modalmodel  {...{
                ...this.props.skuprefixAPP,
                visible: this.props.skuprefixAPP.visible,
                width: 1200,
                title: `${this.props.skuprefixAPP.title}`,
                ModalContent: content
            }}
                         onOk={null} wrapClassName={'mtdiv10'} destroyOnClose footer={null}
                         onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;