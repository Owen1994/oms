import React from 'react';
import {
    Button,
    Icon,
    Upload,
    message
} from 'antd';
import {IMPORT_FILE_API} from "../../../common/constants/actionTypes";
import {IMPORT_DATA} from "../constants/Api";
import {fetchPost} from "../../../../util/fetch";

export default class ExportAndImport extends React.Component{
    state = {
        fileList: []
    }

    render(){
        const {downLoadUrl, refreshList} = this.props;
        const that = this;
        const uploadProps = {
            name: 'file',
            action: IMPORT_FILE_API,
            headers: {
                authorization: 'authorization-text',
            },
            showUploadList: false, // 是否展示文件
            beforeUpload(file) {
                const reg = /\.(xls|xlsx)$/i;  // excel文件格式校验
                if(reg.test(file.name) && file.size <= 2097152){
                    that.setState({
                        fileList: [file]
                    })
                }else{
                    message.error("请导入不大于2M的Excel模板文件！");
                    return false;
                }
            },
            fileList: this.state.fileList,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log("uploading");
                }
                if (info.file.status === 'done') {
                    const fileData = info.file.response.data[0];
                    const params = {};
                    params.data = {};
                    params.data.fileName = fileData.filename;
                    params.data.fileUrl = fileData.path;
                    params.data.type = that.props.importType;
                    fetchPost(IMPORT_DATA, params, 2).then(res=>{
                        if(res && res.state === "000001"){
                            if(!res.data || !res.data.failFileUrl){
                                message.success("数据导入成功！");
                            }else{
                                const link = document.createElement('a');
                                link.style.display = 'none';
                                link.href = res.data.failFileUrl;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                message.info("数据导入失败，请等待失败结果文件下载！");
                            }
                            refreshList();
                        }
                    })
                } else if (info.file.status === 'error') {
                    message.error('网关服务出错！');
                }
            },
        };
        return(
            <div>
                <a href={downLoadUrl} className={"ant-btn margin-ms-right"}>
                    <Icon type="download" />
                    <span>下载模板</span>
                </a>
                <Upload {...uploadProps}>
                    <Button><Icon type="upload" /> 数据导入</Button>
                </Upload>
            </div>
        )
    }
}