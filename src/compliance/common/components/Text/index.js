import React, { Component } from 'react'
import { Tooltip } from 'antd'

class TextItem extends Component {
    render() {
        const stringLength = this.props.value? this.props.value.length : 0
        const maxStringLength = this.props.maxStringLength
        return (
            (maxStringLength && maxStringLength < stringLength)?
            <Tooltip placement="topLeft" title={this.props.text || this.props.value}>
                <span className="ant-form-text">{this.props.text || this.props.value}</span>
            </Tooltip>
            :
            <span className="ant-form-text">{this.props.text || this.props.value}</span>
        )
    }
}

export default TextItem
