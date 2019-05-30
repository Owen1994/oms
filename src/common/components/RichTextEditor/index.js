import React, { Component } from 'react';
import { fetchUpload } from "@/util/fetch"
import {
    downloadUrl
} from "@/util/baseTool"
import { message } from "antd"
import "./css.css"
class RichTextEditor extends Component {
    state = {
        // iframe 引用
        iframe: null,
        //  iframe window 引用
        _iframe: null,
        targetUrl: downloadUrl('', false),
        // targetUrl: 'http://localhost:5500',
        src: downloadUrl('/download/richeditor/RichTextEditor_6.html')
        // src: "http://localhost:5500/1.html"
    }

    defaultValue = ""

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.defaultValue = value;
        }
        window.addEventListener("message", this.postMessageHandle)
        window.addEventListener("beforeunload", this.remove)
        this.addIframe()
    }

    addIframe = () => {
        const { src } = this.state;
        var iframe = document.createElement("iframe");
        iframe.classList.add("iframe-rich-text-tditor")
        var _iframeWrap = document.getElementById("_iframe_warp");
        iframe.addEventListener("load", (e) => {
            this.setState({
                iframe: iframe,
                _iframe: iframe.contentWindow
            }, this.setDefaultValue)
        })
        _iframeWrap.appendChild(iframe);
        iframe.src = src;
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
        }
    }
    sendDataToIframe = (data) => {
        const { _iframe, targetUrl } = this.state;
        if (!_iframe) return;
        _iframe.postMessage(data, targetUrl);
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
        const { _iframe } = this.state;
        if (_iframe && defaultValue) {
            setTimeout(() => {
                this.sendDataToIframe({
                    type: "setDefaultValue",
                    payload: defaultValue
                })
                // setTimeout(this.getCode, 1000)
            }, 500)
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

    remove = () => {
        this.defaultValue = ""
        window.removeEventListener("message", this.postMessageHandle)
        window.removeEventListener("beforeunload", this.remove)
    }

    componentWillReceiveProps(next) {
        if (next.value && next.value !== this.props.value) {
            this.defaultValue = next.value;
            this.setDefaultValue()
        }
    }
    componentWillUnmount() {
        this.remove()
    }
    render() {
        return (
            <div id="_iframe_warp"></div>
        );
    }
}

export default RichTextEditor;