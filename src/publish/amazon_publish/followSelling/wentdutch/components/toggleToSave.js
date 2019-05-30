import React from 'react';
import {
    Icon,
    message,
    Input,
} from 'antd';


const style = {
    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
    },
    pr36: {
        paddingRight: '36px'
    }
}

export default class ToggleToSave extends React.Component {
    state = {
        value: '',
        primitive: '',
    }
    componentDidMount() {
        const {
            value
        } = this.props;
        this.setState({
            value,
            primitive: value
        })
    }


    // 编辑框编辑
    inputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    editSave = () => {
        const { primitive, value } = this.state;
        const { save } = this.props;
        const isNumber = typeof primitive === "number";
        let currentValue = value;
        if (isNumber) {
            if (/^-?\d+$/.test(currentValue)) {
                currentValue = Number(currentValue)
            } else {
                return message.warning('请输入数字')
            }
        }
        save && save(currentValue)
    }

    editeClose = () => {
        const { close } = this.props;
        close && close()
    }

    render() {
        const {
            value
        } = this.state;
        return <div style={style.pr36} className="position-relative ant-input">
            <input style={style.input} value={value} onChange={this.inputChange} />
            <div className="amazon-listing-edit-save">
                <span className="margin-ts-right" onClick={this.editeClose}><Icon type="close" /></span>
                <span onClick={this.editSave}><Icon type="check" /></span>
            </div>
        </div>
    }
}