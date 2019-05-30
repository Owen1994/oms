import React, { Component } from 'react';
import { Modal } from 'antd';
import OrganizationStructure from '@/user/common/components/OrganizationStructure';

class Modalmodel extends Component {
    state = {
        value: []
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.visible && !this.props.visible) {
            this.setState({value: []});
        }
    }

    handleChange = (users) => {
        this.props.onChange(users);
        this.setState({ value: users });
    }

    render() {
        const value = this.state.value;
        const { visible, handleOK, handleCancel } = this.props;
        return (
            <Modal
                className="modelBox"
                title='快速分配给用户'
                width='685px'
                visible={visible}
                onOk={handleOK}
                destroyOnClose
                onCancel={handleCancel}>
                    <OrganizationStructure
                        onChange={this.handleChange}
                        // value={value}
                    />
            </Modal>
        );
    }
}
export default Modalmodel;
