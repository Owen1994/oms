import React, { Component } from 'react';
import { Row, Col } from 'antd';

import StandardItemRow from '../../../components/StandardItemRow';
import { active } from '../../../data';
import { getStateName } from '../../../../utils';

class App extends Component {
    render() {
        const { item } = this.props;
        if(!item.trademarkName) item.trademarkName=[];
        if(!item.country) item.country=[];
        return (
            <div className="reptilian-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        <StandardItemRow title="权利人：">
                            { item.obligee ? item.obligee : '--' }
                        </StandardItemRow>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <StandardItemRow title="国家：">
                            {item.country.length !== 0 ?
                                item.country.map((item, index) => (
                                    <span key={index}>{item}；</span>
                                )) : '--'
                            }
                        </StandardItemRow>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <StandardItemRow title="活跃状态：">
                            { getStateName(item.activeState, active) }
                        </StandardItemRow>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <StandardItemRow title="商标商品分类：">
                            {item.trademarkName.length !== 0 ?
                                item.trademarkName.map((item, index) => (
                                    <span key={index}>{item}；</span>
                                )) : '--'
                            }
                        </StandardItemRow>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <StandardItemRow title="商标词：">
                            { item.sensitive ? item.sensitive : '--' }
                        </StandardItemRow>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;