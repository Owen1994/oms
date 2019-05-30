import React, { Component } from 'react';
import {
    Form,
    Row,
    Col,
    Icon,
    Select,
    Tooltip,
    message
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option

class Platsite extends Component {
    state = {
        siteList: []
    }
    onChangePlatformHandle = (value, platform) => {
        const {
            getSite,
            index,
            preIndex,
            controlPlatform,
            removeSite
        } = this.props;
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            [`site[${preIndex}][${index}]`]: []
        })
        getSite(value)
            .catch(err => {
                message.error(err.msg || "获取站点错误")
            })
        if (platform !== undefined) {
            removeSite(platform, preIndex)
        }
        controlPlatform(value, preIndex, index)
    }
    onChangeSiteHandle = (value) => {
        const {
            index,
            preIndex,
            controlSite
        } = this.props;
        const { getFieldValue } = this.props.form;
        const platform = getFieldValue(`platform[${preIndex}][${index}]`);
        controlSite(value, platform, preIndex)
    }

    controlPlatformDisabled = (value, key, index) => {
        const { platform } = this.props.store;
        const platformControl = platform[key];
        if (!platformControl) return false;
        var data = platformControl[value.id];
        if (data === undefined) return false;
        if (data === index) return false
        return true
    }
    controlSiteDisabled = (value, key, platform) => {
        if (!platform) return true;
        const { site } = this.props.store;
        const siteControl = site[platform];
        if (!siteControl) return false;
        if(siteControl.isAll){
            if(value.id === "_all" && siteControl['_all'] == key){
                return false;
            }
            return true;
        }
        if(value.id === "_all" ) {
            // console.log("Object.keys(siteControl)",!!Object.keys(siteControl).length)
            return !!Object.keys(siteControl).length
        }
        var data = siteControl[value.id];
        if (data === undefined) return false;
        if (data === key) return false
        return true
    }

    render() {
        const { controlPlatformDisabled, controlSiteDisabled } = this;
        // const { siteList } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {
            index,
            preIndex,
            isFrist,
            length,
            addLine,
            manualCache,
            removeLine,
            removeItem,
        } = this.props;
        const { platformList } = manualCache;
        const platform = getFieldValue(`platform[${preIndex}][${index}]`);
        const siteList = manualCache[platform]
        return (
            <Row key={index.toString()} type="flex" className="disableinfo-platform-wrap">
                <Col style={{ width: "110px" }}>
                    <FormItem className="disableinfo-platform">
                        {getFieldDecorator(`platform[${preIndex}][${index}]`, {
                            rules: [{ required: true, message: '请选择平台' }],
                        })(
                            <Select
                                style={{ width: "100%" }}
                                placeholder="平台"
                                onChange={value => this.onChangePlatformHandle(value, platform)}
                            >
                                {
                                    platformList.map(v => {
                                        return <Option disabled={controlPlatformDisabled(v, preIndex, index)} key={v.id} value={v.id}>{v.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col style={{ width: "200px" }} className="padding-sm-left">
                    <FormItem className="disableinfo-platform">
                        {getFieldDecorator(`site[${preIndex}][${index}]`, {
                            initialValue:[],
                            rules: [{ required: siteList && siteList.length ? true : false, message: '请选择站点' }],
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: "100%" }}
                                placeholder="站点"
                                disabled={!siteList || !siteList.length}
                                onChange={this.onChangeSiteHandle}>
                                {
                                    siteList && siteList.map(v => {
                                        return <Option disabled={controlSiteDisabled(v, preIndex, platform)} key={v.id} value={v.id}>{v.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col className="padding-sm-left disableinfo-platform-icon">
                    <Tooltip placement="top" title="新增一行">
                        <span onClick={() => addLine(preIndex)}><Icon type="plus-circle-o" /></span>
                    </Tooltip>

                    {
                        (length > 1 && isFrist) || !isFrist ?

                            <Tooltip placement="top" title="删除当前行">
                                <span onClick={() => removeLine(preIndex, index, platform)}><Icon type="minus-circle-o" /></span>
                            </Tooltip>
                            : <span style={{ width: '26px' }}></span>
                    }
                    {
                        isFrist ?
                            <Tooltip placement="top" title="删除当前项">
                                <span onClick={() => removeItem(preIndex, index, platform)}><Icon type="minus-circle-o" /></span>
                            </Tooltip>
                            : null
                    }
                </Col>
            </Row>
        );
    }
}

export default Platsite;