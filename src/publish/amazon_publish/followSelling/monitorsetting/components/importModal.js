import React from 'react'
import moment from 'moment'
import {
    Modal,
    Button,
    Form,
    message,
} from 'antd'
import { fetchUpload } from 'util/fetch'
import {
    downloadUrl
} from "@/util/baseTool"
import { UPLOAD_URL } from '@/constants/Api'
const FormItem = Form.Item;

class EditStockModal extends React.Component {
    state = {
        loading: false,
        file: {},
    }

    handleOk = () => {
        const { uploadAsync, onCancel } = this.props;
        var { file } = this.state
        if (!file || !file.name || !file.size) return message.warning("请选择文件");
        this.setState({
            loading: true
        })
        this.fileUpload()
            .then((result) => {
                if (result) {
                    return uploadAsync({
                        data: {
                            fileName: result.filename,
                            filePath: result.path,
                            fileSize: result.size,
                            platform: 1,
                            taskType: 5
                        }
                    })
                        .then((result) => {
                            if (result) {
                                this.setState({
                                    file: {}
                                })
                                onCancel && onCancel()
                            }
                        })
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
        var { file } = this.state
        if (!file || !file.name || !file.size) return message.warning("请选择文件");
        return fetchUpload(UPLOAD_URL, [file])
            .then(result => {
                if (result.state == "000001" && result.data && result.data.length) {
                    var data = result.data[0]
                    return data
                } else {
                    message.error(result.msg)
                }

            })

    }

    handleCancel = () => {
        this.setState({
            loading: false,
            file: {},
        })
        this.props.onCancel && this.props.onCancel();
    }

    getFile = (e) => {
        var files = e.target.files
        var file = files[0]
        var { type, size, name } = file;
        let testArr = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
        if (!testArr.includes(type) && !/^.+\.(xls|xlsx)$/.test(name)) {
            return message.warning("文件格式只支持 XLS,XLSX")
        }
        if (/\s/.test(name)) return message.warning("文件名不能包含空格")
        this.setState({
            file
        })
        e.target.value = "";
    }


    componentDidUpdate(pre) {
        if (this.props.visible) {
            this.setMethod()
        }
    }

    setMethod = () => {
        const dargModal = document.querySelector(".is-drag-modal");
        if (!dargModal) {
            return setTimeout(this.setMethod, 1000)
        }
        const header = dargModal.querySelector(".ant-modal-header");
        var innerBoxLeft = dargModal.offsetLeft;// 获取弹框距离左侧宽度
        var innerBoxTop = dargModal.offsetTop;// 获取弹框距离顶部高度

        dargModal.style.position = "absolute"
        dargModal.style.top = innerBoxTop + "px"
        dargModal.style.left = innerBoxLeft + "px"

        header.addEventListener("mousedown", (event) => {
            let { left, top } = window.getComputedStyle(dargModal)
            left = parseInt(left)
            top = parseInt(top)
            const { clientX, clientY } = event;
            if (event.button === 0) {
                const move = (e) => {
                    let x = e.clientX;
                    let y = e.clientY;

                    dargModal.style.top = top + (y - clientY) + "px"
                    dargModal.style.left = left + (x - clientX) + "px"
                }
                document.addEventListener("mouseup", (e) => {
                    document.removeEventListener("mousemove", move)
                }, { once: true })
                document.addEventListener("mousemove", move)
            }
        })
    }

    
    fileUrl = downloadUrl('/download/publish/amazon-followselling-set-temp-1.xlsx')

    render() {
        const { loading, file } = this.state;
        const { name } = file;
        const { visible } = this.props;
        return (
            <Modal
                className="is-drag-modal"
                title="数据导入"
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
                    label="导入文件"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    <div>
                        <div className="import-input-btn">
                            <span>选择文件</span>
                            <input onChange={this.getFile} type="file" />
                        </div>
                        <a type="down" href={this.fileUrl} className="blue">下载导入模板</a>
                    </div>
                    {
                        name ? <p className="blue">{name}</p> : null
                    }
                    <p className="red">注：文件支持xls、xlsx格式；单个文件不能超过10万行</p>
                </FormItem>
            </Modal>
        )
    }
}
export default EditStockModal