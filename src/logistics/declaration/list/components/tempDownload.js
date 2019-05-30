/**
 *作者: pzt
 *时间: 2018/5/21
 *描述: 下载文件模板组件
 **/
import React from 'react'
import PropTypes from 'prop-types';

import { Icon,message } from 'antd'
// import { exportTemp } from '../utils/DownloadTemp'
import TempUpload from "./tempUpload";

export default class TempDownload extends React.Component{

    state = {
        export: false
    }
    downloadTemplate = (e,url,data) =>{
        e.preventDefault();
        message.info("请求已发出，请等待下载！");
        this.setState({export: true})
        exportTemp(this, url, data)
    }

    render(){
        const {url, params} = this.props;
        return(
            <div className="temp_download">
                <a href={url} >
                {/* <a onClick={(e) => (this.downloadTemplate(e, url, params))} > */}
                    <Icon type="download" />
                    <span>下载导入模板</span>
                </a>
            </div>
        )
    }
}

TempUpload.propTypes = {
    url: PropTypes.string,
    params: PropTypes.object,
}
