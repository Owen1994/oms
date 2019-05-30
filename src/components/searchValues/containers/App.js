/**
 *作者: 任贸华
 *功能描述: 公共弹窗组件
 *参数说明:
 *时间: 2018/4/16 11:00
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

import '../css/css.css'

import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import Modalmodel from '../../modalmodel/searchmodel';

import {
    Form,
    Input,
    Button,
    Select,
    Tag,
    Row,
    Col,
    DatePicker,
} from 'antd'

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }


    ModalhandleCancel = (value) => () => {
        this.props.searchVluesaction({[value]: false, tags: []})
        if (this.props.searchValues.searchabled) {
            this.props.form.setFieldsValue({'name': ''});
        }

    }


    closehaddle = (e,id) => {
        e.preventDefault();
        let {data, tags} = this.props.searchValues;
        data.forEach(v => {
            if (v.id === id) {
                v.checked = false
            }
        })
        tags = tags.filter(v => v.id !== id)
        this.props.searchVluesaction({data, tags})
    }

    ModalhandleOk = () => {
        const name = this.props.searchValues.name;
        const id = this.props.searchValues.id;
        const searchabled = this.props.searchValues.searchabled;
        let search = {}
        const tags = this.props.searchValues.tags
        const namevalue = tags.map(v => v.name).join(',')
        const idvalue = tags.map(v => v.id).join(',')
        if (searchabled) {
            search = {'name': ''}
        }
        this.props.searchVluesaction({visible: false, tags: []})
        this.props.form.setFieldsValue({[name]: namevalue, [id]: idvalue, ...search});

    }

    render() {
        const {tags, type, title, searchabled, num} = this.props.searchValues;
        const condition = searchabled ? <Condition {...this.props} /> : ''
        const taglist = tags ? tags.map((v, i) => {
            return <Tag key={i} closable onClose={(e,id) => {
                this.closehaddle(e,v.id)
            }}>{v.name}</Tag>
        }) : []
        const nums = typeof num === 'number' ? `,最多${num}个` : ''
        const newtitle = type === 'multiple' ? `请选择${title}(支持多选${nums})` : `请选择${title}(单选)`
        const content = <div className="searchwk">
            <div className="content">
                {condition}

                <Row>

                    <Col span={24}>
                        {taglist}
                    </Col>
                </Row>

                <Tablelist {...this.props} />
            </div>
        </div>
        return (

            <Modalmodel  {...{
                ...this.props.searchValues,
                visible: this.props.searchValues.visible,
                title: newtitle,
                ModalContent: content,
            }}
                         onOk={this.ModalhandleOk} zIndex={9999} wrapClassName={'searchdiv'} width={550}
                         confirmLoading={this.props.searchValues.confirmLoading}
                         onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;