import React from 'react'
import {
    Modal,
    Button,
    Form,
    message,
    Icon
} from 'antd'
import { fetchUpload } from '@/util/fetch'
import { UPLOAD_URL } from '@/constants/Api'
import { removeFileItem } from 'antd/lib/upload/utils';
const FormItem = Form.Item;

const style = {
    lh: {
        lineHeight: "22px"
    }
}

class UploadModal extends React.Component {
    state = {
        loading: false,
        fileList: [],
    }

    handleOk = () => {
        const { onChange, onCancel, max } = this.props;
        const { fileList } = this.state
        if (max && fileList.length > max) {
            return message.warning("当前图片超出上限，请酌情删减")
        }
        this.setState({
            loading: true
        })
        this.fileUpload()
            .then((result) => {
                if (result) {
                    onChange && onChange(result)
                    this.setState({
                        fileList: []
                    })
                    onCancel && onCancel()
                }
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    // 文件上传
    fileUpload = () => {
        const { fileList } = this.state
        if (!fileList || !fileList.length) return message.warning("请选择文件");
        return fetchUpload(UPLOAD_URL, fileList)
            .then(result => {
                if (result.state == "000001" && result.data && result.data.length) {
                    return result.data;
                } else {
                    message.error(result.msg)
                }

            })

    }

    handleCancel = () => {

        this.setState({
            loading: false,
            fileList: [],
        })
        this.props.onCancel && this.props.onCancel();
    }
    // 宽高需大于等于 1000 px
    checkeWidthAndHeight = (file) => {
        const reader = new FileReader();
        const img = new Image();
        return new Promise((r, j) => {
            img.onload = function () {
                const originWidth = this.width;
                const originHeight = this.height;
                if (originWidth >= 1000 && originHeight >= 1000) r(true)
                r()
            }
            img.onerror = function (e) {
                r()
            }
            reader.onerror = function (e) {
                r()
            };
            reader.onload = function (e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        })
    }

    getFile = (e) => {
        e.persist && e.persist()
        const { fileList } = this.state
        let files = e.target.files
        // files = [...files]
        let testArr = ["image/jpeg", "image/jpg"];
        let promiseList = [];
        let messageList = [];
        // message.warning(<p>文件格式只支持 JPG/JPEG 格式的图片<br/>我们不一阿道夫</p>)
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const { type, size, name } = file;
            if (!testArr.includes(type) && !/^.+\.(xls|xlsx)$/.test(name)) {
                messageList.push(`${name}非 JPG/JPEG 格式的图片`);
                continue
            }
            if (size > 1024 * 1024) {
                messageList.push(`${name}文件大小超过1M`)
                continue
            }
            if (/\s/.test(name)) {
                messageList.push(`${name}文件名不能包含空格`)
                continue
            }
            if (fileList.find(v => v.name === name)) {
                messageList.push(`${name}文件已存在`)
                continue
            }
            promiseList.push(
                this.checkeWidthAndHeight(file)
                    .then(reuslt => {
                        if (reuslt) {
                            return file
                        } else {
                            messageList.push(`${name}图片宽高小于1000像素`)
                        }
                    })
            )
        }
        Promise.all(promiseList)
            .then(list => {
                list = list.filter(v => v)
                fileList.push(...list)
                this.setState({
                    fileList: [...fileList]
                })
                if (messageList.length) {
                    message.warning(messageList.join("; "))
                }
            })
            .finally(() => {
                e.target.value = "";
            })

    }

    removeFileItem = (v) => {
        const { fileList } = this.state;
        const index = fileList.findIndex(val => val === v)
        if (index !== -1) {
            fileList.splice(index, 1)
            this.setState({
                fileList: [...fileList]
            })
        }
    }

    render() {
        const { loading, fileList } = this.state;
        const { visible } = this.props;
        return (
            <Modal
                title="图片上传"
                visible={visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <FormItem
                    className="font-sm"
                    label="文件"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    <div>
                        <div className="import-input-btn">
                            <span>选择文件</span>
                            <input onChange={this.getFile} multiple="multiple" type="file" />
                        </div>
                    </div>
                    {
                        fileList.map(v => {
                            return (
                                <p key={v.name + v.size} style={style.lh} className="blue">
                                    {v.name}
                                    <span onClick={() => this.removeFileItem(v)} className="amazon-listing-upload-close-btn">
                                        <Icon type="close" />
                                    </span>
                                </p>
                            )
                        })
                    }
                </FormItem>
            </Modal>
        )
    }
}
export default UploadModal