import React from 'react';
import {
    Col, Form, Row, Spin,
} from 'antd';
import '../css/index.css';
import { getUrlParams } from '../../../../../util/baseTool';
import PhotoUpload from '../../../../../compliance/common/components/PhotoUpload';

class App extends React.Component {
    state = {
        isShowAttrs: false,
    }

    /**
     * 第一次初始化视图,加载数据
     */
    componentDidMount() {
        const sku = getUrlParams('').sku;
        this.props.queryData({
            data: {
                sku,
            },
        });
    }

    getAttrList = values => (
        values.map(attr => (
            <div className="attr-content display-inline-block" key={attr.key}>
                <div className="span-key">
                    {attr.key}
                </div>
                {attr.key ? ':' : ''}
                <div className="span-value">
                    {attr.value || '--'}
                </div>
            </div>
        )));

    render() {
        const { loadingState, data } = this.props;
        const image = (
            <div>
                <div
                    className="text-title-16-bold-line39"
                >
                    图片
                </div>
                <PhotoUpload
                    readonly
                    value={data.ImageList}
                />
            </div>
        );
        const productDescription = (
            <div>
                <div
                    className="text-title-16-bold-line39 border-bottom-1-ddd"
                >
                    产品描述
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: data.productDescription }}
                    className="text-body-16 div-content"
                />
            </div>
        );

        const basicInfo = (
            <div>
                <div className="text-title-16-bold-line39 border-bottom-1-ddd">
                    基本信息
                </div>
                {data.BasicInfo ? data.BasicInfo.map((item, index) => {
                    if (item.key === '产品属性') {
                        return this.state.isShowAttrs ? this.getAttrList(item.value)
                            : (
                                <div
                                    key={item.key}
                                    style={{ textAlign: 'center' }}
                                >
                                    <a
                                        onClick={() => {
                                            this.setState({
                                                isShowAttrs: true,
                                            });
                                        }}
                                    >
                                        查看更多
                                    </a>
                                </div>
                            );
                    }
                    return (
                        <div className="attr-content display-inline-block" key={index.toString()}>
                            <div className="span-key">
                                {item.key}
                            </div>
                            {item.key ? ':' : ''}
                            <div className="span-value">
                                {item.value || '--'}
                            </div>
                        </div>
                    );
                }) : null}
            </div>
        );
        return (
            <div className="breadcrumb padding-sm wms-compareimage-detail" style={{ minHeight: 600 }}>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Row>
                        <Col
                            className="padding-md-left "
                            span={16}
                        >
                            {productDescription}
                            {image}
                        </Col>
                        <Col
                            span={8}
                            className="padding-md-left"
                        >
                            {basicInfo}
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

export default Form.create()(App);
