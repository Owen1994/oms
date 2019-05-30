import React from 'react'
import {
    Row,
    Col,
    Input,
    Button,
    Form,
    message
} from 'antd'
// import Chunk from './chunk'
import EditModal from './editModal'
import Wrap from './wrap'
import { config } from '../constants/index'

const style = {
    title: {
        textAlign: 'left',
        paddingLeft: '15px',
        fontWeight: 700,
    }
}

class Footer extends React.Component {
    state = {
        visible: false,
        current: {},
    }

    onChange = (value) => {
        this.setState({
            current: value,
            visible: true
        })
    }

    onOk = (content,name, data) => {
        data.htmlStr = content;
        data.name = name;
    }

    onCancel = () => {
        this.setState({
            visible: false,
            current: {},
        })
    }

    onDelete = (key) => {
        const { footer } = this.props;
        if(footer.length === 1) return message.warning('底部政策至少保留一项');
        const index = footer.findIndex(v => v === key);
        if (index !== -1) {
            footer.splice(index, 1)
            this.setState({})
        }
    }

    plus = {
        type: 'plus',
        onClick: () => {
            const { footer } = this.props;
            if (footer.length === config.max) return message.warning(`当前项最多为${config.max}项`);
            footer.push({
                key: ++config.uid, htmlStr: '', name: ''
            })
            this.setState({})
        }
    }

    render() {
        const { footer,layout } = this.props;
        const { visible, current } = this.state;
        const { color , fscolor} = layout;
        return (
            <div>
                {
                    footer.map(v => {
                        const { htmlStr, name, key } = v;
                        const innerHtml = { __html: htmlStr }
                        const icon = [
                            {
                                type: 'form',
                                onClick :this.onChange.bind(this, v)
                            },
                            {
                                type: 'delete',
                                onClick :this.onDelete.bind(this, v)
                            },
                        ]
                        if (footer.length < config.max) {
                            icon.unshift(this.plus)
                        }
                        return (<Wrap
                            key={key}
                            color ={color}
                            fscolor={fscolor}
                            className="margin-sm-top"
                            title={<p style={style.title}>{name}</p>}
                            icon={icon}
                        >
                            <div className="template-describe-footer" dangerouslySetInnerHTML={innerHtml}></div>
                        </Wrap>)
                    })
                }
                <EditModal visible={visible} onCancel={this.onCancel} data={current} onOk={this.onOk} />
            </div>
        )
    }
}

export default Footer