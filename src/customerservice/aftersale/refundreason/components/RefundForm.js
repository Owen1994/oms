import React from 'react';
import PresetForm from './PresetForm';
import CustomForm from './CustomForm';

export default class RefundForm extends React.Component {
    render() {
        return (
            <div>
                <PresetForm {...this.props} />
                <CustomForm {...this.props} />
            </div>
        );
    }
}
