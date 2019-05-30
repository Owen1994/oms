import React, { Component } from 'react';
import { fetchUpload } from "@/util/fetch"
import { message } from "antd"
class RichTextEditor extends Component {
    state = {
        targetUrl: 'https://erp.youkeshu.com',
        // targetUrl: 'http://127.0.0.1:5500',
        isDev: true,
        iframe: null
    }

    defaultValue = ""

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.defaultValue = value;
        }
        window.addEventListener("message", this.postMessageHandle)
        var _iframe = document.getElementById("_iframe");
        _iframe.addEventListener("load", (e) => {
            this.setState({
                iframe: _iframe.contentWindow
            }, this.setDefaultValue)
        })
        setTimeout(this.getCode, 5000)
    }

    postMessageHandle = (evnet) => {
        let origin = evnet.origin;
        if (origin !== this.state.targetUrl) return;
        let data = evnet.data;
        const { type, payload } = data;
        switch (type) {
            case 'imageUpload':
                return this.onImageUpload(payload)
                    .then(result => {
                        if (result) {
                            this.sendDataToIframe({
                                type: "insertImg",
                                payload: result
                            })
                        }
                    })
            case "receiveCode":
                this.handleChange(payload)
            // console.log(payload)

        }
    }
    sendDataToIframe = (data) => {
        const { iframe, targetUrl } = this.state;
        iframe.postMessage(data, targetUrl);
    }
    //将base64转换为文件
    dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    // 图片上传
    onImageUpload = (data) => {
        const { base64, name } = data;
        const file = [this.dataURLtoFile(base64, name)]
        let loading = message.loading("图片上传中，请稍等");
        return fetchUpload('/yks/file/server/', file)
            .then(result => {
                if (result.state === '000001') {
                    return result.data && result.data[0] && result.data[0].path;
                }
            })
            .finally(() => {
                loading()
            })

    }
    // 设置默认值
    setDefaultValue = () => {
        const { defaultValue } = this;
        const { iframe } = this.state;
        if (iframe && defaultValue) {
            this.sendDataToIframe({
                type: "setDefaultValue",
                payload: defaultValue
            })
        }
    }
    // 获取html代码
    getCode = () => {
        this.sendDataToIframe({ type: "getCode" })
    }
    // 设置值到 form表单
    handleChange = (content) => {
        const { onChange } = this.props;
        onChange && onChange(content);
    }
    componentWillReceiveProps(next) {
        if (next.value && next.value !== this.props.value) {
            this.defaultValue = next.value;
            this.setDefaultValue()
        }
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.postMessageHandle)
    }
    render() {
        const { isDev } = this.state;
        // const src = 'http://127.0.0.1:5500/sf.html'
        const src = "https://erp.youkeshu.com/download/richeditor/RichTextEditor_3.html"
        // 
        return (
            <iframe id="_iframe" className="iframe-rich-text-tditor" src={src}></iframe>
        );
    }
}

export default RichTextEditor;