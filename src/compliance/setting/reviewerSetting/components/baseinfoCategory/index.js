import React, { Component } from 'react';
import './index.css';

import Category from './category';
import { getChildrenCategory } from '../../../../common/request';

class App extends Component {
    state = {
        firstCategory: [],
        firstCategoryOption: [],
    }
    uid = 0
    componentDidMount() {
        getChildrenCategory().then((result) => {
            this.setState({ firstCategory: result }, this.initFirstCategoryData)
        });
    }
    componentWillReceiveProps(nextProps) {
        this.initFirstCategoryData(nextProps)
    }
    initFirstCategoryData(nextProps) {
        const values = this.props.form.getFieldsValue()
        const firstCategoryArray = this.state.firstCategory.map(item => {
            item['disabled'] = false
            return item
        })

        const getFirstCategoryIdArray = this.state.firstCategory.map(item => item.id)
        if (values.firstCategory && values.firstCategory.length) {
            values.firstCategory.forEach(item => {
                if (getFirstCategoryIdArray.indexOf(item) !== -1) {
                    const index = getFirstCategoryIdArray.indexOf(item)
                    firstCategoryArray[index]['disabled'] = true;
                }
            })
        }
        this.setState({ firstCategoryOption: firstCategoryArray })
    }
    render() {
        const { categoryInfo } = this.props;
        return (
            <div className="common-sensitive-platform-site">
                <div className="ant-row ant-form-item">
                    <div className="ant-col-6 ant-form-item-label">
                        <label className="ant-form-item-required">基础资料分类</label>
                    </div>
                    <div className="ant-col-12 ant-form-item-control-wrapper">
                        {categoryInfo.map((item) => {
                            let index =item.id;
                            return (
                                <div className="platform-site pull-left" key={index} >
                                    <Category
                                        {...this.props}
                                        index={index}
                                        item={item}
                                        firstCategoryOption={this.state.firstCategoryOption}
                                    />
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default App;