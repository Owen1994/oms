import React, { Component } from 'react';
import { Input } from 'antd';

/**
 * 扫描用的输入框,
 */
class ScanInput extends Component {
    state = {
        value: '',
        beforeValue: '',
        isReset: false, // 是否需要触发搜索后,保留值
        timeout: 0,
    };

    componentDidMount() {
        const { value, isReset = false, timeout = 0 } = this.props;
        this.setState({
            value, isReset, timeout,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { value, isReset = false, timeout = 0 } = nextProps;
        this.setState({
            isReset,
            timeout,
        });
        if (!isReset && value !== this.state.value) {
            this.setState({
                value,
            });
        }
    }

    /**
     * 输入框获取焦点时
     */
    onHandleFocus = () => {
        this.setState((state) => {
            state.beforeValue = state.value;
            state.value = '';
            return state;
        });
    };

    /**
     * 失去焦点时
     */
    onHandleBlur = () => {
        const { onBlur = false } = this.state;
        const { onSearch } = this.props;
        this.save();
        if (onSearch && onBlur) {
            onSearch(value);
        }
    };

    /**
     * 触发回车时
     * @param e
     */
    onHandleEnter = () => {
        const { isReset, value } = this.state;
        const { onSearch } = this.props;
        if (isReset) { // 连扫模式
            // if (this.props.onChange) { // 修改当前value
            //     this.props.onChange(value);
            // }
            if (onSearch) { // 搜索
                onSearch(value);
            }
            this.reset();// 回车将显示置空
            return;
        }
        this.save();
        if (onSearch) {
            onSearch(value);
        }
    };

    onHandleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
        // console.log(this,this.props.onChange);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    focus = () => {
        this.inputRef.focus();
    };

    reset = () => {
        setTimeout(() => {
            this.setState({
                beforeValue: '',
                value: '',
            });
            this.props.onChange('');
        }, this.state.timeout);
    };

    save = () => {
        const { beforeValue, value } = this.state;
        if (!beforeValue) { // 是否第一次输入.beforeValue如果为"",则先保存一次
            this.setState({
                beforeValue: value,
            });
        }
        if (!value) { // 如果没有输入值,没有改变则恢复
            this.setState({
                value: beforeValue,
            });
        }
    };

    render() {
        const { placeholder, type, disabled } = this.props;
        return (
            <div>
                <Input
                    disabled={disabled}
                    type={type || 'text'}
                    ref={(input) => {
                        this.inputRef = input;
                    }}
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.onHandleChange}
                    onPressEnter={this.onHandleEnter}
                    onBlur={this.onHandleBlur}
                    onFocus={this.onHandleFocus}
                />
            </div>
        );
    }
}

export default ScanInput;
