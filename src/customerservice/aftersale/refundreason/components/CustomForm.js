import React from 'react';
import { Form } from 'antd';
import PlatformTab from '../../../common/components/RefundPlatformTabs';
import CustomFormTable from './CustomFormTable';

class CustomForm extends React.Component {
    render() {
        const { platform, getCustomForm, refundFormLoading } = this.props;
        return (
            <div className="breadcrumb padding-sm refund-no-shadow">
                <div className="refund-form-item">
                    <div className="add-label">自定义表单项</div>
                    <div className="add-content custom-add-content">
                        <PlatformTab
                            {...this.props}
                            type="card"
                            isSelfSet={true}
                            platform={platform}
                            listFetch={getCustomForm}
                            loading={refundFormLoading}
                        />
                        {platform.length > 0 ? <CustomFormTable {...this.props} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default Form.create()(CustomForm);
