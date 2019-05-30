import React from 'react'
import {
    Row,
    Col,
    Input,
    Button,
    Form,
    Tabs
} from 'antd'
import { config } from '../constants/index'
import EditModal from './editModal'
import Wrap from './wrap'

const TabPane = Tabs.TabPane;
const style = {
    title: {
        textAlign: 'left',
        paddingLeft: '15px',
        fontWeight: 700,
    },
    tab: {
        textAlign: 'left'
    }
}

class Footer1 extends React.Component {
    state = {
        visible: false,
        current: {},
        index: '1',
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

    toggle = (key) => {
        const { footer } = this.props;
        const current = footer.find(v => v.key == key);
        this.setState({
            index: key,
            current: current || {}
        })
    }

    onChange = () => {
        this.setState({
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
        })
    }

    componentDidMount() {
        this.getDefaultValue(this.props)
    }

    componentWillReceiveProps(next) {
        if (next.footer !== this.props.footer) {
            this.getDefaultValue(next)
        }
    }

    getDefaultValue = (props) => {
        if (props && props.footer) {
            this.setState({
                current: props.footer[0] || {}
            })
        }
    }

    onDelete = (key) => {
        const { footer } = this.props;
        if(footer.length === 1) return message.warning('底部政策至少保留一项');
        const index = footer.findIndex(v => v.key == key);
        if (index !== -1) {
            footer.splice(index, 1)
            this.setState({})
        }
    }

    onEdit = (targetKey, action)=>{
        if(action === 'remove'){
            this.onDelete(targetKey)
        }
    }

    render() {
        const { footer, layout } = this.props;
        const { visible, current, index } = this.state;
        const { color , fscolor} = layout;
        const tab = (<Tabs
            style={style.tab}
            onChange={this.toggle}
            activeKey={index}
            type="editable-card"
            style={{
                textAlign:'left',
                color:fscolor
            }}
            hideAdd
            onEdit={this.onEdit}
        >
            {footer.map(pane => {
                if(index == pane.key) return <TabPane tab={pane.name} key={pane.key + ''} closable={pane.closable} />
                return <TabPane style={{backgroundColor:color}} tab={pane.name} key={pane.key + ''} closable={pane.closable} />
            })}
        </Tabs>)
        const { htmlStr } = current;
        const innerHtml = { __html: htmlStr };
        const icon = [];
        if(footer.length < config.max){
            icon.push(this.plus)
        }
        icon.push({
                type: 'form',
                onClick :this.onChange
            })
        return (
            <div>
                <Wrap
                    className="margin-sm-top"
                    title={tab}
                    icon={icon}
                    color ={color}
                    fscolor={fscolor}
                >
                    <div className="template-describe-footer" dangerouslySetInnerHTML={innerHtml}></div>
                </Wrap>
                <EditModal visible={visible} onCancel={this.onCancel} data={current} onOk={this.onOk} />
            </div>
        )
    }
}

export default Footer1
