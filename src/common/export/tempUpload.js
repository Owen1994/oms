/**
 *作者: pzt
 *时间: 2018/5/21
 *描述: 手动上传模板文件
 **/
import React from 'react'
import PropTypes from 'prop-types';

import { Upload,Button,Icon,message } from 'antd'
import {post} from '../../../util/axios'
import axios from 'axios'

export default class TempUpload extends React.Component{
    state={
        fileList: [],
        btnLoading: false,
    }
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

            // axios({
            //     url: this.props.uploadUrl, // Api url
            //     method: 'post',
            //     data: formData,
            //     headers: {
            //         'Content-Type': false,
            //     },
            // }).then(response => {
            //         debugger
            //         if (response.status === 200) {
            //             this.setState({
            //                 btnLoading: true
            //             });
            //             this.importFileCheck(response.data)
            //         }
            //     })
        }else {
            message.warning("请先上传模板文件！");
        }
    }

    /**
     * 作者: pzt
     * 描述: 文件校验操作
     * 时间: 2018/7/11 16:23
     * @params <name> 附件名称
     * @params <type> 导入数据类型
     * @params <url> 附件地址（由网关返回）
     **/
     importFileCheck = (data) =>{
         let params = {};
         params["name"] = data.data[0].filename;
         params["type"] = this.props.uploadType;
         params["url"] = data.data[0].path;
         post(this.props.uploadCheckUrl, params).then(data=>{
             this.setState({
                 btnLoading: false
             });
             this.props.uploadStateChange(data)
         })
     }

    render(){
        const props = {
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

        return(
            <div className="temp_upload">
                <Upload {...props}>
                    <Button type="primary">
                        <Icon type="plus" />添加文件
                    </Button>
                </Upload>
                <div className="margin-ms-top text-right">
                    <Button
                        type="default"
                        className="margin-ss-right"
                        onClick={this.props.uploadCancel}
                    >
                        取消
                    </Button>
                    <Button
                        className="next_btn"
                        type="primary"
                        onClick={this.handleUpload}
                        loading={this.state.btnLoading}
                    >
                        下一步
                    </Button>
                </div>
            </div>
        )
    }
}

TempUpload.propTypes = {
    handleUpload: PropTypes.func,
    getState: PropTypes.func,
    actionUrl: PropTypes.string,
    btnText: PropTypes.string,
    uploading: PropTypes.bool,
    fileList: PropTypes.array,
    onRemove: PropTypes.func,
    beforeUpload: PropTypes.func,
}
