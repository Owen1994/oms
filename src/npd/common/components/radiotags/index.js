import React from 'react';
import { Radio } from 'antd';
import './css.css'
import PropTypes from 'prop-types';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class RadioTags extends React.Component {

    state = {
        defaultValue: 0
    }
    onChange = (e) => {
        const value = e.target.value;
        const {onChange, name} = this.props;
        if(onChange){
            setTimeout(() => onChange(name, value), 500);
        }
    }
    componentWillMount() {
        const list = this.props.list;
        if(list.length>0){
            this.setState({
                defaultValue: list[0].id
            })
        }
    }
    render() {
        const { list, getFieldDecorator, name } = this.props;
        const defaultValue = this.state.defaultValue;
        return (
            <div className='oms-radiotags'>
                {getFieldDecorator(name, {
                            initialValue: defaultValue,
                        })(
                    <RadioGroup onChange={this.onChange}>
                        {list.map(item => <RadioButton value={item.id} key={item.id}>{item.name}</RadioButton>)}
                    </RadioGroup>
                )}
            </div>
        )
    }
}

RadioTags.propTypes = {
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    getFieldDecorator: PropTypes.func.isRequired
}