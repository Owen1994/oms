/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import Functions from '../../../components/functions'

export default class EditableCell extends React.Component {
    state = {
        value: "",
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };
    handleClick = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.props.name, this.state.value, this.props.dataIndex);
        }
    };
    handleEdit = () => {
        this.setState({ editable: true });
    };

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    render() {
        const { value, editable } = this.state;
        const isEditable = this.props.isEditable;
        const fkey = this.props.fkey;

        return (
            <div className=".lgt-dlt-order_editable-cell">
                {
                    editable ? (
                        <Input
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
                        <div style={{ paddingRight: 24 }}>
                            {value || ' '}
                            <Functions {...this.props} functionkey={fkey}>
                                {
                                    isEditable ? (
                                        <Icon
                                            type="edit"
                                            style={{ marginLeft: 12 }}
                                            onClick={this.handleEdit}
                                        />
                                    ) : ''
                                }
                            </Functions>
                        </div>
                    )
                }
            </div>
        );
    }
}
EditableCell.propTypes = {
    name: PropTypes.string.isRequired,
    dataIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
