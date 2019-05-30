import React from 'react'
import {
    Row,
    Col,
    Icon,
    Button,
    Input,
} from 'antd'


const style = {
    wrap: {
        border: '1px solid #EAE9E9'
    },
    title: {
        position: 'relative',
        textAlign: 'center',
        height: '40px',
        backgroundColor: '#F9FAFD',
        borderBottom: '1px solid #EAE9E9',
        lineHeight: '40px',
    },
    icon: {
        position: 'absolute',
        zIndex: 1,
        fontSize: '14px',
        top: "5px",
        right: '10px',
        lineHeight: '20px',
        color: '#9DADB5',
        padding: '5px',
        cursor: 'pointer'
    },
    mr10: {
        marginRight: '10px',
    },
    inputWrap:{
        paddingRight:'80px',
    }
}

const empty = () => { }

class Head extends React.Component {
    state = {
        text: ''
    }

    componentDidMount() {
        const {
            title
        } = this.props;
        this.setState({
            text: title
        })
    }

    componentWillReceiveProps(next) {
        if (next.title !== this.props.title && typeof next.title === 'string') {
            const {
                title
            } = next;
            this.setState({
                text: title
            })
        }
    }

    onSave = () => {
        const { onSave } = this.props;
        const { text } = this.state;
        onSave && onSave(text)
    }

    onChange = (e) => {
        const title = e.target.value;
        this.setState({
            text: title
        })
    }

    render() {
        const { text } = this.state;
        const {
            title,
            onChange,
            onDelete,
            className = '',
            icon,
            edit,
            onSave,
            color,
            fscolor,
        } = this.props;
        const styleTitle = {
            ...style.title,
            backgroundColor:color || '#F9FAFD',
            color: fscolor || '#333333',
            textAlign: edit ? 'left' : 'center',
        }
        return (
            <div className={`${className} templateDescribe-wrap`} style={style.wrap}>
                <div style={styleTitle}>
                    {
                        edit ?
                            <div style={style.inputWrap}><Input style={{ width: '100%',maxWidth:'180px' }} value={text} onChange={this.onChange}></Input></div>
                            :
                            React.isValidElement(title) ? title : <p>{title || '默认标题'}</p>
                    }

                    {
                        icon && icon.length ?

                            <div className="templateDescribe-wrap-icon" style={style.icon}>
                                {
                                    icon.map((v, i) => {
                                        return <span onClick={v.onClick || empty} style={i !== icon.length - 1 ? style.mr10 : null}><Icon type={v.type} /></span>
                                    })
                                }
                            </div>
                            :
                            <div className="templateDescribe-wrap-icon" style={style.icon}>
                                {
                                    edit ?
                                        <span onClick={this.onSave || empty} style={style.mr10}><Icon type="save" /></span>
                                        :
                                        null
                                }
                                <span onClick={onChange || empty} style={style.mr10}><Icon type="form" /></span>
                                <span onClick={onDelete || empty}><Icon type="delete" /></span>
                            </div>
                    }
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default Head
