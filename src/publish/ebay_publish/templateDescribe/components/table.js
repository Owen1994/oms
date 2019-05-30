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
        key: 'MPN',
        value: "Does Not Apply"
    },
    {
        key: 'Brand',
        value: "Brand"
    },
    {
        key: 'Type',
        value: "Headset"
    },
    {
        key: 'Carrier',
        value: "Unlocked"
    },
    {
        key: 'Color',
        value: "White"
    },
]

const style = {
    table: {
        width: '100%',
        padding: '16px',
        lineHeight: '30px',
        borderBottom: '1px solid #EAE9E9',
        borderCollapse: 'collapse',
    },
    col: {
        width: '100px',
        minWidth: '100px',
    },
    td: {
        paddingLeft: '15px',
        border: '1px solid #EAE9E9'
    },
    title: {
        textAlign: 'left',
        paddingLeft: '15px'
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
        })
    }
    onSave = (title) => {
        const { module, type } = this.props;
        module[type].name = title
        module[type].edit = false
        this.setState({})

    }
    render() {

        const { module, type,layout } = this.props;
        const {
            has,
            edit,
            name,
        } = module[type];
        const { color , fscolor} = layout;
        return (
            <Wrap
                className="margin-sm-top"
                color ={color}
                fscolor={fscolor}
                title={edit ? name : <p style={style.title}>{name}</p>}
                edit={edit}
                onChange={this.onChange}
                onDelete={this.onDelete}
                onSave={this.onSave}
            >
                <table style={style.table}>
                    <colgroup>
                        <col style={style.col} />
                        <col style={style.col} />
                    </colgroup>
                    <tbody>
                    {
                        list.map((v,i) => (
                            <tr key={i}>
                                <td style={style.td}>{v.key}</td>
                                <td style={style.td}>{v.value}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </Wrap>
        )
    }
}

export default Head
