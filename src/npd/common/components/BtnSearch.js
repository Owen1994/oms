import React from 'react';
import { Row, Col, Button, Tooltip } from 'antd';

const BtnSearch = ({ onResetFields, onSearch }) => (
    <Row gutter={8} type="flex" justify="start" className="margin-sm">
        <Col span={3}>
        </Col>       
        <Col>
            <Button onClick={() => onSearch()} type="primary">搜索</Button>
        </Col>
        <Col>
            <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                <Button onClick={() => onResetFields()}>重置</Button>
            </Tooltip>
        </Col>
    </Row>
)

export default BtnSearch;
