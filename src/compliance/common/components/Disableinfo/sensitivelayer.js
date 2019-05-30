import React, { Component } from 'react';
import { Form, Select, Icon, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import './index.css';

// import { getSensitiveLayer } from '../../../common/constants';

import Platsite from './platsite';
import { getPlatform } from '../../../common/request';

class Sensitivelayer extends Component {
    state = {
        platform: [],
        platformOption: [],
        
    }

    componentDidMount() {
        getPlatform().then((result) => {
            this.setState({ platform: result }, this.initPlatformData)
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
        // 过滤无站点的平台
        if (values.platform && values.platform[0]) {
            // if (values.platform[this.props.index].length) {
            //     values.platform[this.props.index].forEach(item => {
            //         if (getPlatformIdArray.indexOf(item) !== -1) {
            //             const index = getPlatformIdArray.indexOf(item)
            //             platformArray[index]['disabled'] = true;
            //         }
            //     })
            // }
        }
        const getPlatformIdArray = this.state.platform.map(item => item.id + '')
        if (values.platform[this.props.index].length) {
            values.platform[this.props.index].forEach(item => {
                if (getPlatformIdArray.indexOf(item) !== -1) {
                    const index = getPlatformIdArray.indexOf(item)
                    platformArray[index]['disabled'] = true;
                }
            })
        }
        // 无站点平台去重
        if (!this.props.disabledPlatForm || !this.props.disabledPlatForm.length) {
            this.setState({ platformOption: platformArray })
            return
        }
        const propsDisablePlatform = this.props.disabledPlatForm.map(item => item + '')
        values.platform.forEach((platformArr) => {
            platformArr.forEach((platformValue) => {
                if (propsDisablePlatform.indexOf(platformValue) !== -1) {
                    if (getPlatformIdArray.indexOf(platformValue) !== -1) {
                        const index = getPlatformIdArray.indexOf(platformValue)
                        platformArray[index]['disabled'] = true;
                    }
                }
            })
        })
        this.setState({ platformOption: platformArray })
    }
    onSelectSensitiveLayer = (value) => {
        const { item } = this.props;
        item.sensitiveLayer.key = value.key;
        item.sensitiveLayer.label = value.label;
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { index, addPlatformSite, item, sensitiveLayerOption,manualCache } = this.props;
        const label = index === 0 ? (
            <label className="ant-form-item-required">禁售信息</label>
        ) : null;

        return (
            <div className="common-sensitive-platform-site">
                <div className="ant-row ant-form-item">
                    <div className="ant-col-4 ant-form-item-label">
                        {label}
                    </div>
                    <div className="ant-col-20 ant-form-item-control-wrapper">
                        <FormItem className="sensitive-layer disableinfo-disable-container ">
                            {getFieldDecorator(`sensitiveLayer[${index}]`, {
                                initialValue: item.sensitiveLayer.key ? item.sensitiveLayer.key + '' : [],
                                rules: [{
                                    required: true,
                                    message: "请选敏感等级.",
                                }],
                            })(
                                <Select
                                    style={{ width: 110, marginRight: 10 }}
                                    placeholder="敏感等级"
                                    // labelInValue
                                    onSelect={this.onSelectSensitiveLayer}
                                >
                                    {
                                        sensitiveLayerOption.map((item, i) => {
                                            if (item.id !== '0') {
                                                return (
                                                    <Option key={i} value={item.id} disabled={item.disabled}>{item.name}</Option>
                                                )
                                            }
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {item.sensitiveLayer.platformSite.map((_item, _index) => (
                            <div className="disableinfo-platform-site clear pull-left" key={_index} >
                                <Platsite
                                    {...this.props}
                                    _index={_index}
                                    _item={_item}
                                    manualCache={manualCache}
                                    platformOption={this.state.platformOption}
                                    addPlatformSite={addPlatformSite}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Sensitivelayer;