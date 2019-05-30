/**
 *作者: 任贸华
 *功能描述: 暂未用到
 *参数说明:
 *时间: 2018/4/16 11:15
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

import '../css/css.css'

import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import Modalmodel from '../../modalmodel/searchmodel';


class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    ModalhandleCancel = (value) => () => {
        this.props.countrysearchaction({[value]: false,})
    }

    ModalhandleOk = ()=>{
        const name = this.props.countrysearch.fileds.name;
        const id = this.props.countrysearch.fileds.id;
        const data = this.props.countrysearch.data.filter(v=>v.checked)
        const namevalue= data.map(v=>v.name).join(',')
        const idvalue= data.map(v=>v.id).join(',')
        this.props.countrysearchaction({visible:false,})
        this.props.form.setFieldsValue({[name]: namevalue,[id]: idvalue,'searchcountrykeyword':'',});
    }

    render() {
        const content = <div className="searchwk">
            <div className="content">
                <Condition {...this.props} />
                <Tablelist {...this.props} />
            </div>
        </div>
        return (

            <Modalmodel  {...{
                ...this.props.countrysearch,
                visible: this.props.countrysearch.visible,
                ModalContent: content,
            }}
                         onOk={this.ModalhandleOk}
                         confirmLoading={this.props.countrysearch.confirmLoading}
                         onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;