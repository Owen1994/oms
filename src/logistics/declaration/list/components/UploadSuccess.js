/**
 *作者: pzt
 *时间: 2018/5/22
 *描述: 数据导入校验，操作确认
 **/
import React from 'react'
import {
    Button
} from 'antd'

/**
 * 作者: pzt
 * 描述: 数据确定保存入库
 * 时间: 2018/7/13 20:11
 * @params <id> 数据校验通过后的id
 **/

export default class ShowTable extends React.Component{
    state={
        btnLoading: false,
    }

    confirm = ()=>{
        this.props.uploadConfirm()
    }
    render(){
        const {uploadState, message, errorsUrl,id, uploadConfirm,btnLoading} = this.props;
        let element;
        if(uploadState === 2){  // 数据校验失败
            element = (
                <div className="margin-td-top">
                    <p className="text-center lgt-dlt-common_font">{message}</p>
                    {/*<p className="margin-md-top text-center lgt-dlt-common_font">导入失败：SKU数量不符！</p>*/}
                    <p className="text-center"><a href={errorsUrl}>错误结果集下载</a></p>
                    <div className="margin-ms-top text-right">
                        <Button
                            type="default"
                            className="margin-ms-right"
                            onClick={this.props.uploadCancel}
                        >取消</Button>
                        <Button
                            type="primary"
                            onClick={this.props.uploadAnew}
                        >重新导入</Button>
                    </div>
                </div>
            )
        }else if(uploadState === 3 ){ // 数据校验成功
            element = (
                <div className="margin-td-top">
                    {/*<p className="text-center">{message}</p>*/}
                    <p className="text-center lgt-dlt-common_font">数据通过验证！</p>
                    <div className="margin-ms-top text-right">
                        <Button
                            type="default"
                            className="margin-ms-right"
                            onClick={this.props.uploadCancel}
                        >取消</Button>
                        <Button
                            type="primary"
                            onClick={uploadConfirm}
                            loading={btnLoading}
                        >下一步</Button>
                    </div>
                </div>
            )
        }
        return(
            <div>
                {element}
            </div>
        )
    }
}