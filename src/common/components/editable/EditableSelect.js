/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Icon, Select } from 'antd';
import PropTypes from 'prop-types';
const Option = Select.Option;

export default class SelectCell extends React.Component {

    state = {
        editable: false,
        value: '',
        name: ''
    };
    handleChange = (value) => {
        const name = this.parseValueToName(this.props.list, value);
        this.setState({ editable: false, value, name  });
        if (this.props.onChange) {
            this.props.onChange(this.props.columnKey, value);
        }
    };
    handleEdit = () => {
        this.setState({ editable: true });
    };
    parseValueToName = (list, id) => {
        let value = '';
        list.forEach((item) => {
            if(item.id==id) {
                value = item.name;
                return false;
            }
        });
        return value || id;
    };

    componentWillReceiveProps(nextProps) {
        const list = nextProps.list;
        if (list && list.length > 0 && !this.state.name){
            const name = this.parseValueToName(list, nextProps.value);
            this.setState({
                name
            });
        }
    }
    render() {
        const {  editable, value } = this.state;
        const {  isRequired, isEditable, name } = this.props;
        const list = this.props.list || [];
        return (
            <div className="editable-cell">
                <div className={"editable-name"}>
                    <span className={isRequired?"tag-info":""}>{name || ' '}</span>
                    <i className={"normal"}>:</i>
                </div>
                <div className={"editable-content"}>
                    {
                        editable ? (
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                value={value}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    list.map(item => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        ) : (
                            <div style={{ paddingRight: 24 }} className={"line-limit-length"}>
                                {this.state.name || ' '}
                                {
                                    isEditable ? (
                                        <Icon
                                            type="edit"
                                            className="editable-cell-icon"
                                            onClick={this.handleEdit}
                                        />
                                    ):(
                                        ""
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

SelectCell.propTypes = {
    list: PropTypes.array,
    name: PropTypes.string.isRequired
};
