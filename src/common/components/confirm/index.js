import React from 'react';
import { Modal } from 'antd';
const confirm = Modal.confirm;

const PopConfirm = (title, content, onOk) => 
    confirm({
        title: title,
        content: content,
        onOk () {
            onOk()
        },
        onCancel() {
            console.log('Cancel');
        },
    });
export default PopConfirm    