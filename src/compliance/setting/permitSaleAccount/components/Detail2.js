import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

class App extends Component {
    state = {
    }
    getMultipleStr = (list) => {
        if (list && list.length) {
            let str = '';
            list.forEach((item, index) => {
                if (index === list.length - 1) {
                    str = str + item.lable
                } else {
                    str = str + item.lable + ','
                }
            })
            return str
        }
    }

    render() {
        const str = this.getMultipleStr(this.props.detailData)
        return (
            <div >
                <Row gutter={24}>
                    <Col span={24}>
                        {str}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);