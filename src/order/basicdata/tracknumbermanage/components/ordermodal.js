import React from 'react';
import {
    Modal,
    Input,
    Form,
    Radio,
    message,
    Button,
    Icon
} from 'antd'
import { UPLOAD_URL } from '../../../../constants/Api'
import { fetchUpload } from '../../../../util/fetch'

class ImportModel extends React.Component {
    state = {
        file:null,
        tempLate:"",
    }
    // 标记
    flag = true 
    componentWillMount(){
    }
    cancel = ()=>{
        this.setState({
            file:null
        })
        this.flag =  true;
        this.props.changeModal("importmodalvisible",false)
    }

    getFile = (e)=>{
        var files = e.target.files
        var file = files[0]
        var {type,name} = file
        let testArr = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ,"application/vnd.ms-excel"]
        if(!testArr.includes(type)) return message.warning("文件格式只支持 XLS,XLSX")
        if(/\s/.test(name))  return message.warning("文件名不能包含空格")
        this.setState({
            file
        })
    }
    // 文件上传
    fileUpload = ()=>{
        var {file} = this.state;
        if(!file) return message.warning("请选择文件");
        if(!this.flag) return ;
        this.flag = false
        var {importFileActionAcync} = this.props;
        return fetchUpload(UPLOAD_URL, [file])
        .then(result=>{
            if(result.state == "000001" && result.data && result.data.length){
                var data = result.data[0]
                var params = {
                    contentType:data.contentType,
                    extension:data.extension,
                    fileName:data.fileName,
                    path:data.path,
                    size:data.size,
                }
                return params
            }else {
                this.flag = true
                message.error(result.msg)
            }

        })
        .then(result=>{
            if(result){
                importFileActionAcync({data:result})
                .then(data=>{
                    this.flag = true
                    if(data.state == "000001" && data.data){
                        message.success(data.msg)
                        this.cancel()
                    }else {
                        message.error(data.msg)
                    }
                })
            }
        })
        .catch(err=>{
            this.flag = true
        })

    }
    render(){
        var { visible} = this.props
        var {file,tempLate} = this.state

        let footer = (
            <div>
                <a style={{fontSize:"12px"}} href={tempLate} className="pull-left">
                    <Icon type="download" />
                    下载导入模板
                </a>
                <Button onClick={this.cancel}>取消</Button>
                <Button onClick={this.fileUpload}>上传</Button>
            </div>
        )

        return (
            <Modal
                title={`文件导入`}
                visible={!!visible}
                onOk={this.handleOk}
                footer={footer}
                onCancel={this.cancel}>
                <div className="publish-batch-upload-com">
                    <div className="publish-batch-upload-com-btn">
                        <span><Icon type="plus"/>选择文件</span>
                        <input onChange={this.getFile} type="file"/>
                    </div>
                    {
                        file?<a href="javascript:;" className="margin-ss-top" style={{display:"inline-block"}}>{file.name}</a>:null
                    }
                </div>
            </Modal>
        )
    }
}

export default ImportModel