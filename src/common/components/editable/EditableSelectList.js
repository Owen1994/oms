/**
 *作者: 黄建峰
 *功能描述:  列表分页多选
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Icon, Input } from 'antd';
import PropTypes from 'prop-types';
export default class EditableSelectList extends React.Component {

    state = {
        editable: false,
        value: this.props.value
    };
    // 显示列表modal
    handleSelect = () => {
        const { url, title, type } = this.props.search;
        const columnKey = this.props.columnKey;
        this.props.searchVluesaction({
            title,
            visible: true,
            type,
            url,
            key: columnKey,
            searchabled: true
        })
    };
    handleClick = () => {
        this.setState({ editable: false });
        const columnKey = this.props.columnKey;
        const country   = this.state.country;
        if (this.props.onChange) {
            this.props.onChange(columnKey, country.id, country.name);
        }
    };

    handleEdit = () => {
        this.setState({ editable: true });
    };

    componentWillReceiveProps(nextProps) {
        const { columnKey } = nextProps;
        const preVisible = this.props.searchValues.visible;
        if (columnKey===nextProps.searchValues.key &&
            preVisible &&
            !nextProps.searchValues.visible &&
            nextProps.searchValues.tags.length > 0) {
                const country = nextProps.searchValues.tags[0];
                this.setState({
                    value: country.name,
                    country
                });
        } else {
                this.setState({
                    value: nextProps.value
                });
        }
    }
    render() {
        const {  editable, value } = this.state;
        const {  isRequired, isEditable, name ,labelwidth } = this.props;
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
                                    readOnly
                                    value={value}
                                    onClick={this.handleSelect}
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
                                {
                                    isEditable ? (
                                        <Icon
                                            type="edit"
                                            className="editable-cell-icon"
                                            onClick={this.handleEdit}
                                        />
                                    ):null
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

EditableSelectList.propTypes = {
    searchVluesaction: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
};
