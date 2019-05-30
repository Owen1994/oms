import React from 'react'
import { Upload, message } from 'antd'

const UploadHOC = (WrapedComponent) => 
    class UploadComponent extends React.Component {
        state = {
            fileList: []
        }
        uploadConfig = {
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                const reg = /\.(xls|xlsx)$/i;  // excel文件格式校验
                        if(reg.test(file.name) && file.size <= 2097152){
                            this.setState({
                                fileList: [file]
                            })
                        }else{
                            message.error("请上传不大于2M的Excel文件！")
                        }
                        return false;
            },
            fileList: this.state.fileList,
        };
        handleUpload = () => {
            const {fileList} = this.state;
            if (fileList.length > 0) {
                const formData = new FormData();
                fileList.forEach((file) => {
                    formData.append('file', file);
                });
                this.setState({
                    btnLoading: true
                });
    
                let request = new Request(this.props.uploadUrl, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });
                fetch(request)
                .then(response => response.json())
                .then(result => {
                    if (result.state === '000001') {
                        this.importFileCheck(response.data)
                    }
                })
            } else {
                message.warn("请选择上传文件")
            }
        }
        render() {
            return (
                <div>
                    
                    <Upload
                        {...uploadConfig}
                    >
                        <WrapedComponent
                            {...this.props}
                            onUpload={this.handleUpload}
                        />
                    </Upload>
                </div>
            )
        }
    }

export default UploadHOC;
