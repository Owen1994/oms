import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

class App extends Component {
    state = {
       skus: ''
    }
    componentDidMount() {
       if(this.props.item) {
           const skuList = this.props.item.sku
           if(skuList && skuList.length) {
                skuList.forEach((item, index) => {
                    if (index === length -1) {
                        this.state.skus = this.state.skus + item.label
                    } else {
                        this.state.skus = this.state.skus + item.label + ','
                    }
                })
                this.setState({skus: this.state.skus})
           }
       }
    }
    
    render() {
       return (
            <div >
                <Row gutter={24}>
                    <Col span={24}>
                       {this.state.skus}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);