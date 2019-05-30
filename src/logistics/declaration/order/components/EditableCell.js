/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Icon, Input } from 'antd';

export default class EditableCell extends React.Component {

    state = {
        name: this.props.name,
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    edit = () => {
        this.setState({ editable: true });
    };

    render() {
        const { value, editable, name } = this.state;
        const { isRequired, isEditable,fkey } = this.props;
        return (
            <div className="editable-cell">
                <div className={"editable-name"}>
                    <span className={isRequired?"tag-info":""}>{name || ' '}</span>
                    <i className={"normal"}>:</i>
                </div>
                <div className={"editable-content"}>
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
                            <div style={{ paddingRight: 24 }}>
                                {value || ' '}
                                <Functions {...this.props} functionkey={fkey}>
                                    {
                                        isEditable ? (
                                            <Icon
                                                type="edit"
                                                className="editable-cell-icon"
                                                onClick={this.edit}
                                            />
                                        ):(
                                            ""
                                        )
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