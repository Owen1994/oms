import React from 'react';
import {
    Checkbox
} from 'antd';
import PropTypes from 'prop-types';

const CheckboxGroup = Checkbox.Group;

/**
 * @author huangjianfeng
 * @description 自定义Checkbox选择框
 */
export default class CCheckbox extends React.Component {
    state = {
        value: [],
        checkAll: false,
        indeterminate: false,
    }
    
    componentDidMount() {
        const {
            value,
            code
        } = this.props;
        this.parseValue(value, code);
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value;
        const preValue = this.props.value;
        if (value !== preValue) {
            const {
                code
            } = nextProps;
            this.parseValue(value, code);
        }
    }

    handleChange = (checkedValues) => {
        this.setState({
            value: checkedValues,
            indeterminate: !!checkedValues.length && (checkedValues.length < this.props.list.length),
            checkAll: checkedValues.length === this.props.list.length ? true : false
        });

        if (this.props.onChange) {
            const {
                formType = 0
            } = this.props;
            if (formType === 1) {
                const {
                    list
                } = this.props;
                const values = list
                                .filter(item => checkedValues.indexOf(item.value) >= 0);
                this.props.onChange(values);
                if (this.props.handleChange) {
                    setTimeout(() => {
                        this.props.handleChange(values);
                    }, 1000);
                }
            } else {
                this.props.onChange(checkedValues);
                if (this.props.handleChange) {
                    setTimeout(() => {
                        this.props.handleChange(checkedValues);
                    }, 1000);
                }
            }
        }
    }

    parseValue = (value = [], code = 'value', callBak) => {
        let indeterminate = value.length > 0 ? true : false;
        const checkAll = value.length === this.props.list.length;
        if (checkAll) {
            indeterminate = false;
        }
        this.setState({
            value: value.map(item => {
                if (typeof item === 'object') {
                    return item[code];
                }
                return item;
            }),
            checkAll,
            indeterminate
        }, callBak);
    }

    onCheckAllChange = (e) => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });

        if (e.target.checked) {
            const { list, code = 'value' } = this.props;  
            this.handleChange(list.map((item) => {
                if (typeof item === 'object') {
                    return item[code];
                }
                return item;
            }));
        } else {
            this.handleChange([]);
        }
    }
    
    render(){
        const {
            list,
            checkAllOption,
        } = this.props;
        const {
            value,
            checkAll,
            indeterminate,
        } = this.state;
        return (
            <div>
                {
                    checkAllOption === true ?
                    <div>
                        <Checkbox
                            onChange={this.onCheckAllChange}
                            checked={checkAll}
                            indeterminate={indeterminate}
                        >
                            全选
                        </Checkbox>
                    </div>
                    :
                    null
                }
                <CheckboxGroup
                    options={list}
                    defaultValue={value}
                    value={value}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

CCheckbox.propTypes = {
    list: PropTypes.array.isRequired,
    value: PropTypes.array,
}
