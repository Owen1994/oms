import React from 'react';
import {message,Modal,Button,} from 'antd';

export default class FuncChangeModal extends React.Component {
    
    render() {
        const { visible, handleLogin, handleContinue } = this.props;
        return (
            <Modal
                title="提示"
                destroyOnClose
                width={500}
                onCancel={handleContinue}
                visible={visible}
                maskClosable={false}
                footer={
                    <div>
                        <Button
                            onClick={()=>handleLogin()}
                            style={{marginLeft: 10}}
                        >
                            重新登录
                        </Button>
                        <Button
                            onClick={()=>handleContinue()}
                            type="primary"
                        >
                            继续操作
                        </Button>
                    </div>
                }
            >
                <p style={{
                    textAlign: 'center',
                    color: '#333333',
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.8,
                    }}>
                    您的账号权限发生了变化，您可以重新登录获取最新的权限，也可以继续当前页面的操作，稍后再重新登录
                </p>
            </Modal>
        );
    }
}