import React, { Component } from 'react';
import { Spin } from 'antd';
import BasicInfoList from './BasicInfoList';
import SupplierInfoList from './SupplierInfoList';
import ProductInfoTable from './ProductInfoTable';

import { getUrlParams } from '../../../../../util/baseTool';


const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};

class Index extends Component {
    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
        this.props.getOrderDetailAccess(parameter);
    }

    render() {
        const { access, isAccessLoading } = this.props;
        return (
            <Spin spinning={isAccessLoading} delay={500} tip="Loading...">
                <BasicInfoList
                    {...this.props}
                    data={access.basicInfo}
                    // logistics={access.basicInfo.logistics}
                    formItemLayout={formItemLayout}
                />
                <SupplierInfoList
                    {...this.props}
                    data={access.supplierInfo}
                    formItemLayout={formItemLayout}
                />
                <ProductInfoTable
                    {...this.props}
                    isCanEdit={this.props.isCanEdit}
                    productInfoArray={access.productInfoArray}
                />
            </Spin>
        );
    }
}

export default Index;
