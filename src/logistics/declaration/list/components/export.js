import React from 'react'

import {post} from '../../../../util/axios'
import StepsComponent from './steps'
import TempDownloadComponent from './tempDownload'
import TempUploadComponent from './tempUpload'
import UploadSuccessComponent from './UploadSuccess'
import UploadResultComponent from './uploadResult'
export default class Export extends React.Component{
    state={
        id: -1,
        current: 1,
        uploadState: -1,// 2 校验失败 3 校验成功 4 导入成功 5 导入失败
        message: null,
        errorsUrl: null,
        btnLoading: false
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.isCancel){
            this.setState({
                current: 1
            })
        }
    }
    uploadStateChange = (params) => {
        if(params.state === "000001"){
            this.setState({
                current: 2,
                message: params.msg,
            });
            if(params.id){
                this.setState({
                    id: params.id,
                    uploadState: 3,
                })
            }else{
                this.setState({
                    errorsUrl: params.url,
                    uploadState: 2,
                })
            }
        }
    }
    uploadResultChange = () => {
        this.setState({
            btnLoading: true
        });
        post(this.props.uploadConfig.confirmUrl, {"id": this.state.id}).then(data=>{
            if(data.state === "000001"){
                this.setState({
                    current: 3,
                    message: data.msg,
                    btnLoading: false
                })
                if(data.success){
                    this.setState({
                        uploadState: 4,
                    })
                }else{
                    this.setState({
                        uploadState: 5,
                    })
                }
            }
        })

    }
    /**
     * 作者: pzt
     * 描述: 取消提交
     * 时间: 2018/7/13 19:50
     * @params <> 无
     **/
    uploadCancel = ()=>{
        this.setState({
            current: 1,
        })
        this.props.uploadCancel();
    }
    /**
     * 作者: pzt
     * 描述: 重新导入文件
     * 时间: 2018/7/13 19:34
     * @params <> 无参数
     **/
    uploadAnew = ()=>{
        this.setState({
            current: 1,
        })
    }

    render(){
        const {  downloadUrl, uploadUrl, params, onStepChange,confirmUrl, uploadCheckUrl } = this.props.uploadConfig;
        const { current, uploadState, message, id, errorsUrl, btnLoading } = this.state;
        return(
            <div className="import_dec_text">
                <StepsComponent data={params.stepInfo} current={current} />
                <div className="tweb-upload">
                    <div>
                        {current === 1 ?
                            (<div className="margin-ms-left">
                                <p className="margin-ms-top margin-sm-bottom text-erpstyle">1.准备数据</p>
                                <TempDownloadComponent url={downloadUrl} />
                                <p className="margin-ts-bottom margin-sm-top text-erpstyle">2.上传数据文件</p>
                                <p className="files_type margin-ms-bottom">目前支持的文件类型为*.xls,*.xlsx</p>
                                <TempUploadComponent
                                    uploadUrl={uploadUrl}
                                    uploadCheckUrl = {uploadCheckUrl}
                                    uploadType={params.uploadType}
                                    uploadStateChange = {this.uploadStateChange}
                                    uploadCancel={this.props.uploadCancel}
                                />
                            </div>) :
                            null
                        }
                        {
                            current === 2 ?
                                <UploadSuccessComponent
                                    uploadState={uploadState}
                                    message={message}
                                    errorsUrl={errorsUrl}
                                    uploadCancel={this.uploadCancel}
                                    uploadAnew={this.uploadAnew}
                                    uploadConfirm={this.uploadResultChange}
                                    confirmUrl={confirmUrl}
                                    btnLoading={btnLoading}
                                /> :
                                null
                        }
                        {
                            current === 3 ?
                            <UploadResultComponent
                                uploadState = {uploadState}
                                message = {message}
                                uploadAnew = {this.uploadAnew}
                                uploadCancel={this.uploadCancel}
                            />:
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}