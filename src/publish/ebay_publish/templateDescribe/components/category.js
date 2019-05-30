import React from 'react'
import {
    Row,
    Col,
    Input,
    Button,
    Form
} from 'antd'
import Wrap from './wrap'

const list = [
    '模拟数据1',
    '模拟数据2',
    '模拟数据3',
]

const style = {
    ul: {
        padding: '16px'
    },
    li: {
        lineHeight: '30px'
    }
}

class Head extends React.Component {

    onChange = () => {
        const { module, type } = this.props;
        module[type].edit = true
        this.setState({})
    }
    onDelete = () => {
        const { module, type, changeState } = this.props;
        module[type].has = false
        changeState({
            module
        },'left')
    }
    onSave = (title) => {
        const { module, type } = this.props;
        module[type].name = title
        module[type].edit = false
        this.setState({})

    }
    render() {
        const { module, type, layout } = this.props;
        const {
            has,
            edit,
            name,
        } = module[type];
        const { color , fscolor} = layout;
        return (
            <Wrap
                title={name}
                edit={edit}
                color ={color}
                fscolor={fscolor}
                onChange={this.onChange}
                onDelete={this.onDelete}
                onSave={this.onSave}
            >
                <ul style={style.ul}>
                    {
                        list.map((v, k) => {
                            return <li style={style.li} key={k}>{v}</li>
                        })
                    }
                </ul>
            </Wrap>
        )
    }
}

export default Head
