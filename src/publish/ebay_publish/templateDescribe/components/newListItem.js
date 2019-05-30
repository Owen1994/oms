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
    {
        name: 'Listing title',
        price: "9.99"
    },
    {
        name: 'Listing title',
        price: "9.99"
    },
    {
        name: 'Listing title',
        price: "9.99"
    },
    {
        name: 'Listing title',
        price: "9.99"
    },
    {
        name: 'Listing title',
        price: "9.99"
    }
]

const style = {
    li: {
        padding: '16px',
        lineHeight: '30px',
        borderBottom: '1px solid #EAE9E9'
    },
    defaultImg: {
        float: 'left',
        width: '60px',
        height: '60px',
        marginRight: '15px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#bbbbbb',
        backgroundColor: '#eee',
        lineHeight: '60px',
    },
    text: {
        float: 'left',
        minHeight: "60px",
    }
}

class NewListItem extends React.Component {

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
        const { module, type ,layout} = this.props;
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
                            const styleLi = k === list.length - 1 ? {
                                ...style.li,
                                borderBottom: 'none',
                            } : style.li;
                            return <li className="clear" style={styleLi} key={k}>
                                <div style={style.defaultImg}>
                                    默认图片
                                </div>
                                <div style={style.text}>
                                    <div>{v.name}</div>
                                    <div>USD {v.price}</div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </Wrap>
        )
    }
}

export default NewListItem
