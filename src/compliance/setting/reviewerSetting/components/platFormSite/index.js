import React, { Component } from 'react';
import './index.css';

import PlatFormSite from './platFormSite';
import { getPlatform } from '../../../../common/request';

class App extends Component {
    state = {
        platform: [],
        platformOption: [],
    }
    componentDidMount() {
        getPlatform().then((result) => {
            this.setState({ platform: result}, this.initPlatformData)
        });
    }
    componentWillReceiveProps(nextProps) {
        this.initPlatformData(nextProps)
    }
    initPlatformData(nextProps) {
        const values = this.props.form.getFieldsValue()
        const platformArray = this.state.platform.map(item => {
            item['disabled'] = false
            return item
        })
       
        const getPlatformIdArray = this.state.platform.map(item => item.id)
        if (values.platform && values.platform.length) {
            values.platform.forEach(item => {
                if (getPlatformIdArray.indexOf(item) !== -1) {
                    const index = getPlatformIdArray.indexOf(item)
                    platformArray[index]['disabled'] = true;
                }
            })
        }
        this.setState({platformOption: platformArray})
    }
    render() {
        const { platformInfo } = this.props;
        return (
            <div className="common-sensitive-platform-site">
                <div className="ant-row ant-form-item">
                    <div className="ant-col-6 ant-form-item-label">
                        <label className="ant-form-item-required">平台信息</label>
                    </div>
                    <div className="ant-col-12 ant-form-item-control-wrapper">
                        {platformInfo.map((item, index) => (
                            <div className="platform-site pull-left" key={index} >
                                <PlatFormSite
                                    {...this.props}
                                    index={index}
                                    item={item}
                                    platformOption = {this.state.platformOption}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;