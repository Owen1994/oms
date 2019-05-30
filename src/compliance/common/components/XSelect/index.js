import React from 'react'
import { Select } from 'antd'

const { Option } = Select

class XSelect extends React.Component {
    render() {
        const { props } = this
        const options = props.selectOption || props.options || []
        const configKey = props.configKey
        const configValue = props.configValue
        return (
            <React.Fragment>
                <div ref={(el) => { this.node = el }} />
                <Select style={{ minWidth: 100 }} {...props}>
                    {
                        options.map(item => (
                            <Option key={configKey? item[configKey] + '': item.key + ''} 
                            value={configKey? item[configKey] + '': item.key + ''}  >
                                {configValue? item[configValue]: item.value}
                            </Option>
                        ))
                    }
                </Select>
            </React.Fragment>
        )
    }
}

export default XSelect
