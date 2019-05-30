import React, { Component } from 'react';
import { Tag, Icon } from 'antd';
import PropTypes from 'prop-types';
import "./index.css";

const { CheckableTag } = Tag;

class TagSelect extends Component {
    state = {
        expand: false,
    };

    onChange = (item) => {
        let { onChange, name, values, isMulti } = this.props;
        if(!Array.isArray(values)) {
            values = Array.of(values);
        }
        let array = [];
        let index = values.indexOf(item.id);
        if (isMulti && item.id!==0) {
            array = values.filter((value) => value!==0);
            if ( index > -1) {
                array.splice(index, 1);
            } else {
                array.push(item.id);
            }
        } else if(index < 0) {
            array = [item.id];
        }
        if(array.length === 0){
            array = [0]
        }
        if (onChange) {
            onChange(array, name);
        }
    };

    handleExpand = () => {
        this.setState({
            expand: !this.state.expand,
        });
    };

    render() {
        const { expand } = this.state;
        let { expandable, values, datas } = this.props;
        if(!Array.isArray(values)) {
            values = Array.of(values);
        }
        return (
            <div className="paved-selected">
                {
                    datas.map((item, index) =>
                        <CheckableTag checked={values.indexOf(item.id) > -1 ? true: false} key={item.id} title={item.lname||item.name} onChange={() => this.onChange(item)}>
                            {item.sname || item.name}
                        </CheckableTag>
                    )
                }
                {expandable && (
                    <a className={styles.trigger} onClick={this.handleExpand}>
                        {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
                    </a>
                )}
            </div>
        );
    }
}

TagSelect.propTypes = {
    expandable: PropTypes.bool,
    datas: PropTypes.array.isRequired,
    isMulti: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}
export default TagSelect;
