import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import './style.css';

const CheckableTag = Tag.CheckableTag;

/**
 * @author huangjianfeng
 * @description tags选择项
 */
export default class CTags extends React.Component {

    state = {
        selectedTags: [],
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        let nextSelectedTags = [tag];
        if(this.props.mode === 'multiple'){
            nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
        }
        this.setState({ selectedTags: nextSelectedTags });
        if(this.props.onChange){
            this.props.onChange(nextSelectedTags);
        }
        if(this.props.handleChange) {
            setTimeout(() => {
                this.props.handleChange(nextSelectedTags);
            }, 500);
        }
    }

    componentDidMount(){
        this.setState({selectedTags: this.props.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value){
            this.setState({selectedTags: nextProps.value})
        }
    }

    render() {
        const { selectedTags } = this.state;
        return (
            <div className='yks-erp-ctag-style yks-erp-ctag-spacing'>
                {this.props.list.map(tag => (
                    <CheckableTag
                        key={tag.code}
                        checked={selectedTags.indexOf(tag.code) > -1}
                        onChange={checked => this.handleChange(tag.code, checked)}
                    >
                        {tag.name}
                    </CheckableTag>
                ))}
            </div>
        );
    }
}

CTags.propTypes = {
    list: PropTypes.array.isRequired
}
