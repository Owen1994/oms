import React, { Component } from 'react'
import { Upload, Modal, Icon, message } from 'antd'
import './index.css'

class PhotoUpload extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        rendered: false
    }

    componentWillMount() {
        this.resetState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.rendered) {
            this.resetState(nextProps)
        } else {
            const { value } = nextProps;
            if (typeof value === 'undefined') {
                this.setState({ fileList: [] })
            }
        }
    }

    /* fileList初始化数据时触发, 给state.fileList赋值, 组件只维护内部的fileList */
    resetState = (props) => {
        const { value } = props
        if (value && Array.isArray(value)) {
            if (!value.length) return
            const newFileList = []
            {
                value && value.forEach((item) => {
                    newFileList.push({
                        uid: `-${item}`,
                        name: item || '',
                        shortUrl: item || '',
                        url: item || '',
                        title: item || '',
                        status: 'success',
                    })
                })
                this.setState({ fileList: newFileList })
            }
        } else {
            if (this.state.fileList.length === 0 && value) {
                this.state.fileList.push({
                    uid: `-${value}`,
                    name: value || '',
                    shortUrl: value || '',
                    url: value || '',
                    title: value || '',
                    status: 'success',
                })
            } else if (typeof value === 'undefined') {
                this.setState({ fileList: [] })
            }
        }
    }

    handleCancel = () => {
        this.setState({ previewVisible: false })
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }
    handleDefalutBeforeUpload = (file) => {
        const isRightType = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
        if (!isRightType) {
            message.error('文件格式为Jpg/Jpeg/Png格式')
        }
        const isSizeOk = file.size / 1024 / 1024 < 1
        if (!isSizeOk) {
            message.error('上传文件不能大于1M')
        }
        return isRightType && isSizeOk
    }
    handleChange = (fields) => {
        let { fileList } = fields
        fileList = fileList.filter((file) => {
            if (!file.status) {
                return
            }
            if (file.status === 'error') {
                message.error(`文件: ${file.name} 上传失败`)
                return false
            }
            if (file.status === 'done') {
                if (file.response.state === '000001') {
                    file.url = file.response.data[0].path
                    if (this.props.onChange) {
                        this.state.rendered = true
                        this.setState({ rendered: true })
                        fileList = fileList.filter(file => (file.status === 'done' || file.status === 'success'))
                        if (fileList.length) {
                            if (this.props.maxLength > 0) {
                                const newFileList = fileList.map(item => {
                                    return item.url
                                })
                                this.props.onChange(newFileList)
                            } else {
                                this.props.onChange(fileList[0].url)
                            }
                        } else {
                            this.props.onChange(null)
                        }
                    }
                    return true
                }
                message.error(file.response.message)
                return false
            }
            return true
        })
        this.setState({ fileList })

    }
    handleRemove = (value) => {
        this.state.fileList.forEach((item, index) => {
            if (item.url === value.url) {
                this.state.fileList.splice(index, 1)
                this.setState({ fileList: this.state.fileList })
                if (this.props.onChange) {
                    const fileList = this.state.fileList
                    if (fileList.length) {
                        if (this.props.maxLength > 0) {
                            const newFileList = fileList.map(item => {
                                return item.url
                            })
                            this.props.onChange(newFileList)
                        } else {
                            this.props.onChange(fileList[0].url)
                        }
                    } else {
                        this.props.onChange(null)
                    }
                }
            }
        })
    }

    render() {
        const { previewVisible, previewImage } = this.state
        const uploadButton = (
            <Icon type="upload" />
        )
        // 默认是一张
        const maxLength = this.props.maxLength || 1
        return (
            <React.Fragment>
                <Upload
                    className="photo-upload"
                    action={this.props.action}
                    accept="image/*"
                    listType="picture-card"
                    multiple={false}
                    fileList={this.state.fileList}
                    onPreview={this.handlePreview}
                    beforeUpload={this.props.beforeUpload || this.handleDefalutBeforeUpload}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    showUploadList={{ showPreviewIcon: true, showRemoveIcon: !this.props.readonly }}
                >
                    {
                        this.props.readonly || this.state.fileList.length === maxLength ? null : uploadButton
                    }
                </Upload>
                <Modal
                    centered
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                    zIndex={2000}
                >
                    <img alt="" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </React.Fragment>
        )
    }
}

export default PhotoUpload
