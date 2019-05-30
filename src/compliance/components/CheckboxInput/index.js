import React, { Component } from 'react';
import { Checkbox, Input } from 'antd';
import './index.css';

class App extends Component {
    state = {
        checked: false,
        value: '',
        disabled: true
    }
    componentWillReceiveProps() {
        const { options, reason } = this.props;
        for(var key in reason){
            if(reason[key].id === options.id ){
                this.setState({
                    checked: true,
                    disabled: false,
                    value: reason[key].remarks
                })
            }
        }
    }

    // 选择checkbox
    onChangeCheckbox = (event, obj) => {
        this.props.onChangeCheckbox(event,obj);
        if(event.target.checked === true){
            this.setState({
                disabled: false,
                checked: true
            })
        }else{
            this.setState({
                disabled: true,
                checked: false,
                value: ''
            })
        }
    }

    // 绑定value
    onChangeInput = (event, id) => {
        event.target.checked = true;
        this.setState({
            value: event.target.value
        });
        this.props.onChangeCheckbox(event, {
            id: id,
            remarks: event.target.value
        });
    }

    render() {
        const { options } = this.props;
        const { checked } = this.state;
        return (
            <div className="checkbox-input">
                <div className="checkbox">
                    <Checkbox checked={ checked } onChange={(event) => this.onChangeCheckbox(event,{id:options.id, remarks: this.state.value})}>
                        <span className="checkbox-name">{options.name}</span>
                    </Checkbox>
                </div>
                <div className="input">
                    <Input placeholder="详细描述" disabled={this.state.disabled} value={this.state.value} onChange={(event) => this.onChangeInput(event, options.id)}/>
                </div>
            </div>
        )
    }
}

export default App;