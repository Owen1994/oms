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
        this.props.platformsearchaction({[value]: false,})
    }

    ModalhandleOk = ()=>{
        const name = this.props.platformsearch.fileds.name;
        const id = this.props.platformsearch.fileds.id;
        const data = this.props.platformsearch.data.filter(v=>v.checked)
        const namevalue= data.map(v=>v.name).join(',')
        const idvalue= data.map(v=>v.id).join(',')
        this.props.platformsearchaction({visible:false,})
        this.props.form.setFieldsValue({[name]: namevalue,[id]: idvalue,'searchplatformkeyword':''});
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
                ...this.props.platformsearch,
                visible: this.props.platformsearch.visible,
                ModalContent: content,
            }}
            onOk={this.ModalhandleOk}
            confirmLoading={this.props.platformsearch.confirmLoading}
            onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;