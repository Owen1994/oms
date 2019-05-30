import React, { Component } from 'react';
import {
    Form,
    Row,
    Col,
    Button,
    Select
} from 'antd';
import Platsite from './platsite'
const FormItem = Form.Item;
const Option = Select.Option;


class App extends Component {
    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    controlDisabled = (value, key) => {
        const { sensitiveLayer } = this.props.store;
        var data = sensitiveLayer[value.id];
        if(!data) return false ;
        if(data === key) return false
        return true
    }
    render() {
        const {
            data,
            form,
            sensitiveLayerListData,
            addLine,
            removeLine,
            removeItem,
            getSite,
            control,
            store,
            manualCache
        } = this.props;
        const { controlSensitiveLayer, controlPlatform,controlSite,removeSite } = control
        const { getFieldDecorator } = form;
        const { key, list } = data
        return (
            <Row key={key.toString()} className="disableinfo" type="flex">
                <Col style={{ width: "110px" }}>
                    <FormItem className="disableinfo-level">
                        {getFieldDecorator(`sensitiveLayer[${key}]`, {
                            rules: [{ required: true, message: '请选择敏感等级' }],
                        })(
                            <Select
                                style={{ width: "100%" }}
                                placeholder="敏感等级"
                                onChange={(value) => controlSensitiveLayer(value, key)}
                            >
                                {
                                    sensitiveLayerListData.map(v => {
                                        return <Option
                                            key={v.id}
                                            value={v.id}
                                            disabled={this.controlDisabled(v, key)}
                                        >{v.name}</Option>
                                    })
                                }

                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col className="padding-sm-left">
                    {
                        list.map((v, index) => {
                            return <Platsite
                                key={v.toString()}
                                store={store}
                                form={form}
                                manualCache={manualCache}
                                controlPlatform={controlPlatform}
                                controlSite={controlSite}
                                removeSite={removeSite}
                                preIndex={key}
                                index={v}
                                getSite={getSite}
                                addLine={addLine}
                                removeLine={removeLine}
                                removeItem={removeItem}
                                isFrist={index === 0}
                                length={list.length}
                            />
                        })
                    }
                    
                </Col>
            </Row>
        );
    }
}

export default App;