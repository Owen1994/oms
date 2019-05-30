import React, { Component } from 'react';
import { Modal } from 'antd';
const confirm = Modal.confirm;

export const showConfirm = (title, content, onOk, onCancel) => {
    confirm({
        title: title,
        content: content,
        onOk: onOk,
        onCancel: onCancel
    });
}