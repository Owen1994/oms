import React from 'react'
import {
    Input,
    Icon,
} from 'antd'

export default class EditCell extends React.Component{
    state = {
        value: "",
        editable: false,
        initialVal: '',
    }

    componentDidMount(){
        this.setState({
            value: this.props.value,
            initialVal: this.props.value,
        })
    }

    componentWillReceiveProps(nextProps){
        // 列表重新渲染
        const currentValue = nextProps.value;
        const value = this.state.value
        if(currentValue !== value){
            this.setState({
                value: currentValue
            })
        }
    }

    handleChange = (e) => {
        let value = e.target.value;
        this.setState({ value });
    }

    check = () => {
        if (this.props.onChange) {
            if (Number(this.state.value) !== Number(this.state.initialVal)){
                let bol = this.props.onChange(this.state.value);
                bol === false ? this.setState({ editable: true }) : this.setState({ editable: false })
            } else {
                this.setState({
                    editable: false,
                    value: this.state.initialVal,
                });
            }
        }
    }
    
    edit = () => {
        this.setState({ editable: true });
    }

    close = () => {
        this.setState({
            editable: false,
            value: this.state.initialVal,
        });
    }

    render(){
        const { editable, value } = this.state;
        const {type} = this.props;
        return (
            <div className="editable-cell cwc-selling-editable-input">
                {
                    editable ? (
                        <Input
                            type={type ? type : "text"}
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            suffix={
                                <span>
                                    <Icon
                                        type="check"
                                        className="editable-cell-icon-check"
                                        onClick={this.check}
                                    />
                                </span>
                            }
                        />
                    ) : (
                        <div>
                            {value === 0 ? 0 : value || ' '}
                            <Icon
                                style={{ paddingLeft: 10 }}
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}
