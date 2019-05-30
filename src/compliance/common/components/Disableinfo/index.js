import React, { Component } from 'react';
import { Form, Button, Icon } from 'antd';
const FormItem = Form.Item;

import Sensitivelayer from './sensitivelayer';
import { getSensitiveLayer } from '../../../common/constants';

class App extends Component {
    state = {
        sensitiveLayerOption: [],
        currentValue: '',
        sensitiveLayerSelected: [],
        disabledPlatForm: [],
    }
    
    // 缓存
    manualCache =  {}
    
    componentWillReceiveProps() {
        const values = this.props.form.getFieldsValue()
        const sensitiveLayerArray = getSensitiveLayer.map(item => {
            item['disabled'] = false
            return item
        })
        if (values.sensitiveLayer && values.sensitiveLayer[0]) {
            const getSensitiveLayerIdArray = getSensitiveLayer.map(item => item.id)
            values.sensitiveLayer.forEach(item => {
                if (getSensitiveLayerIdArray.indexOf(item) !== -1) {
                    const index = getSensitiveLayerIdArray.indexOf(item)
                    sensitiveLayerArray[index]['disabled'] = true;
                }
            })
        }
    }
    componentWillMount(){
        this.setState({sensitiveLayerOption: getSensitiveLayer})
    }
    
    componentWillUnmount(){
        this.manualCache = null ;
    }
    handleNoSite = (value)=> {
        if (!value) return
        this.state.disabledPlatForm.push(value)
        // this.setState({disabledPlatForm: this.state.disabledPlatForm})
    }
    render() {
        const { disableInfo } = this.props;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 18, offset: 0 },
                sm: { span: 18, offset: 4 },
            },
        };
        let isDisabled = false
        isDisabled = disableInfo? disableInfo.length === 4? true: false : false;
        return (
            <div>
                
                {disableInfo && disableInfo.length?
                    disableInfo.map((item, index) => (
                        <div key={index}>
                            <Sensitivelayer
                                {...this.props}
                                index={index}
                                item={item}
                                manualCache={this.manualCache}
                                // remove={remove}
                                disabledPlatForm={this.state.disabledPlatForm}
                                handleNoSite={this.handleNoSite}
                                sensitiveLayerOption={this.state.sensitiveLayerOption}
                            />
                        </div>
                    )):
                    ''
                }
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.props.addSensitiveLayer} style={{ width: 460 }} disabled={isDisabled}>
                        <Icon type="plus" /> 新增敏感等级
                    </Button>
                </FormItem>
            </div>
        );
    }
}

export default App;