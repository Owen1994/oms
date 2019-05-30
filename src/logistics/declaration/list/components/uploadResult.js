/**
 *作者: pzt
 *时间: 2018/5/22
 *描述: 数据导入校验，操作确认
 **/
import React from 'react'
import {
    Button,
    Icon,
} from 'antd'
import {post} from "../../../../util/axios";

export default class ShowTable extends React.Component{

    componentDidMount(){
    }
    // componentWillReceiveProps(nextProps){
    //     let {id, confirmUrl, current} = this.props;
    //     let params = {};
    //     if(id !== -1 && current ===3){
    //         params['id'] = id;
    //         post(confirmUrl, params).then(data=>{
    //             this.props.uploadResultChange(params);
    //         })
    //
    //     }
    // }
    render(){
        const {uploadState, message, uploadCancel, uploadAnew} = this.props;
        let element;
        if(uploadState === 4){  // 操作成功提示
            element = (
                <div className="tweb-upload_success margin-td-top">
                    {/*<p>{message}</p>*/}
                    <p className="tweb-upload_success_icon"><Icon type="check" /></p>
                    <p className="tweb-upload_success_text margin-md-top">操作成功</p>
                    <div className="margin-ms-top">
                        <Button
                            type="primary"
                            onClick={uploadAnew}
                        >继续导入</Button>
                        <Button
                            type="default"
                            onClick={uploadCancel}
                        >关闭</Button>
                    </div>
                </div>
            )
        }else if(uploadState === 5 ){ // 操作失败提示
            element = (
                <div className="tweb-upload_failed margin-td-top">
                    {/*<p>{message}</p>*/}
                    <p className="tweb-upload_failed_icon"><Icon type="close" /></p>
                    <p className="tweb-upload_failed_text margin-md-top">导入失败</p>
                    <div className="margin-ms-top tweb-upload_failed_btns">
                        <Button
                            type="primary"
                            className="margin-ms-right"
                            onClick={uploadAnew}
                        >重新导入</Button>
                        <Button
                            type="default"
                            onClick={uploadCancel}
                        >关闭</Button>
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