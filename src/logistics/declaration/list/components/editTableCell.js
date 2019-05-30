import React from 'react'
import {
    Input,
    Icon,
} from 'antd'
import Functions from '../../../../components/functions'
export default class EditTableCell extends React.Component{

    state = {
        value: "",
        editable: false,
    }
    componentDidMount(){
        this.setState({
            value: this.props.value,
        })
    }
    componentWillReceiveProps(nextProps){
        const currentValue = nextProps.value;
        const previewValue = this.props.value;
        if(currentValue !== previewValue){
            this.setState({
                value: currentValue
            })
        }
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        if (this.props.onChange) {
            let bol = this.props.onChange(this.state.value);
            bol === false ? this.setState({ editable: true }) : this.setState({ editable: false })
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }

    render(){
        const { editable, value } = this.state;

        return (
            <div className="editable-cell">
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            suffix={
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            }
                        />
                    ) : (
                        <div >
                            {value || ' '}
                            <Functions {...this.props} functionkey={this.props.fkey}>
                                <Icon
                                    style={{ paddingLeft: 10 }}
                                    type="edit"
                                    className="editable-cell-icon"
                                    onClick={this.edit}
                                />
                            </Functions>
                        </div>
                    )
                }
            </div>
        )
    }
}
