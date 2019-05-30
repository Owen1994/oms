import React from 'react';
import { Cascader } from 'antd';
import { fetchPost } from 'util/fetch';
import {
    PUBLISH_STORECLASS, GE_RETURNS_WITHIN_OPTION_lIST,
} from '../../../../common/constants/actionTypes';
import {
    getDefaultEbayCategory
} from '../../selector/ebaycategorydataparse';

export default class ShopCategory extends React.Component {
    state = {
        options: [],
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lst && nextProps.lst !== this.props.lst) {
            const { formName, setFieldsValue } = nextProps;
            const values = getDefaultEbayCategory(nextProps.lst);
            this.setState({options: nextProps.lst}, () => {
                setFieldsValue({[formName]: values});
            });
        }
    }

    loadData = (selectedOptions) => {
        const { params, handleFocusBefore } = this.props;
        if (!handleFocusBefore(["saleAccount"])) {
            return ;
        }
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        fetchPost(PUBLISH_STORECLASS, { parentCategoryId: targetOption.value, ...params }, 0)
        .then((result) => {
            targetOption.loading = false;
            if (result.state === '000001') {
                targetOption.children = [];
                result.data.map(item => {
                    targetOption.children.push({ value: item.id, label: item.name, isLeaf: item.isLeaf });
                });
            }
            this.setState({
                options: [...this.state.options],
            });
        });
    }

    initLstData = () => {
        const { params, handleFocusBefore } = this.props;
        if (!handleFocusBefore(["saleAccount"])) {
            return ;
        }
        fetchPost(PUBLISH_STORECLASS, {parentCategoryId: '', ...params}, 0)
        .then((result) => {
            if (result.state === '000001') {
                const options = result.data.map(item => {
                    return { value: item.id, label: item.name, isLeaf: item.isLeaf };
                });
                this.setState({
                    options,
                });
            }
        });
    }

    onChange = (value, selectedOptions) => {
        const {onChange} = this.props;
        onChange && onChange(value, selectedOptions)
    }

    render() {
        const { getFieldDecorator, formName, rules } = this.props;
        const options = this.state.options;
        // const categoryId = options.length > 0 ? options[options.length-1] : [];
        // console.log("categoryId :", categoryId);
        return (
            <React.Fragment>
                {
                    getFieldDecorator(formName, {...rules })(
                        <Cascader
                            options={options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            onClick={this.initLstData}
                        />
                    )
                }
            </React.Fragment>
        )
    }
}
