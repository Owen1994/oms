/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Icon, Input } from 'antd';
import Functions from '../../../components/functions'
export default class EditableCell extends React.Component {

    state = {
        editable: false,
        value: this.props.value
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };
    handleClick = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.props.columnKey, this.state.value);
        }
    };
    handleEdit = () => {
        this.setState({ editable: true });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }
    render() {
        const {  editable, value } = this.state;
        const {  isRequired, isEditable, name ,labelwidth,fkey } = this.props;
        return (
            <div className="editable-cell">
                <div className={"editable-name"} style={labelwidth?{width:labelwidth}:{}}>
                    <span className={isRequired?"tag-info":""}>{name || ' '}</span>
                    <i className={"normal"}>:</i>
                </div>
                <div className={"editable-content"} style={labelwidth?{paddingLeft:labelwidth}:{}} >
                    {
                        editable ? (
                            <Input
                                autosize={{ minRows: 1}}
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.handleClick}
                                suffix={
                                    <Icon
                                        type="check"
                                        className="editable-cell-icon-check"
                                        onClick={this.handleClick}
                                    />
                                }
                            />
                        ) : (
                            <div className="showpanel">
                                {value || ' '}
                                <Functions {...this.props} functionkey={fkey}>
                                    {
                                        isEditable ? (
                                            <Icon
                                                type="edit"
                                                className="editable-cell-icon"
                                                onClick={this.handleEdit}
                                            />
                                        ):null
                                    }
                                </Functions>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}