import React from 'react'

import { Modal, Radio } from 'antd'
import {post} from '../../../util/axios'
import StepsComponent from './steps'
import TempDownloadComponent from './tempDownload'
import TempUploadComponent from './tempUpload'
import UploadSuccessComponent from './UploadSuccess'
import UploadResultComponent from './uploadResult'

const RadioGroup = Radio.Group;

import './index.css'

export default class ExportModal extends React.Component{
    state={
        id: -1,
        current: 1,
        uploadState: -1,// 2 校验失败 3 校验成功 4 导入成功 5 导入失败
        message: null,
        errorsUrl: null,
        btnLoading: false
    }
    componentWillReceiveProps(nextprops){
        const visible = this.props.visible;
        if(!visible && nextprops.visible){
            this.setState({
                current: 1
            })
        }
    }
    uploadStateChange = (params) => {
        const curl = this.props.uploadConfig.confirmUrl;
        if(params.state === "000001" && curl){
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
        } else if (params.state === "000001" && !curl) {
            this.setState({
                current: 3,
                message: params.msg,
                btnLoading: false,
                uploadState: 4,
            })
            this.props.uploadConfig.onStepChange()
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
                    this.props.uploadConfig.onStepChange()
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
        this.props.onCancel();
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

    onChangeRadioGroup = (e) => {
        console.log(e)
    }

    render(){
        const { title, visible, uploadConfig, onCancel, onChangeRadioGroup } = this.props;
        const {  downloadUrl, uploadUrl, params, confirmUrl, uploadCheckUrl,onStepChange } = uploadConfig;
        const { current, uploadState, message, errorsUrl, btnLoading } = this.state;
        return(
            <Modal
                title={title}
                visible={visible}
                onCancel={onCancel}
                footer={null}
                destroyOnClose={true}
            >
                <div className="import_dec_text">
                    <StepsComponent data={params.stepInfo} current={current} />
                    <div className="tweb-upload">
                        <div>
                            {current === 1 ?
                                (<div className="margin-ms-left">
                                    <p className="margin-ms-top margin-sm-bottom text-erpstyle">1.准备数据</p>
                                    <TempDownloadComponent url={downloadUrl} />
                                    <p className="margin-ts-bottom margin-sm-top text-erpstyle">2.上传数据文件</p>
                                    <p className="files_type margin-ms-bottom">目前支持的文件类型为*.xls,*.xlsx；单次最多支持1000行数据。</p>
                                    <p>3.导入方式</p>
                                    <div className="export-type">
                                        <RadioGroup defaultValue={1} onChange={onChangeRadioGroup}>
                                            <Radio value={1}>全部</Radio>
                                            <p className="padding-md-left">处理整个文件（如 数据 已经存在，则更新相应的信息。如果 数据 不存在， 则自动创建新的数据）</p>
                                            <Radio value={2}>仅处理新的数据</Radio>
                                            <p className="padding-md-left">仅处理不存在的 数据（忽略已有的 数据，只为系统中不存在的 数据 创建 新的项目）</p>
                                            <Radio value={3}>仅更新</Radio>
                                            <p className="padding-md-left">仅处理已有的 数据（更新已有的 数据，忽略系统中不存在的 数据）</p>
                                        </RadioGroup>
                                    </div>
                                    <TempUploadComponent
                                        uploadUrl={uploadUrl}
                                        uploadCheckUrl = {uploadCheckUrl}
                                        uploadType={params.uploadType}
                                        uploadStateChange = {this.uploadStateChange}
                                        uploadCancel={this.props.onCancel}
                                        getSelectType={this.props.getSelectType}
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
                                    onStepChange = {onStepChange}
                                />:
                                null
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
