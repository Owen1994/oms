import React from 'react'
import {
    Icon,
    Button,
    message,
    Modal,
    Radio,
    Form,
    Input
} from 'antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
        },
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 20
        },
    },
};

const style = {
    btnwrap: {
        position: 'absolute',
    },
    btn: {
        color: '#4D7BFE',
    },
    img: {
        display: 'inline-block',
        width: '100%',
    },
    defaultImg: {
        width: '100%',
        height: '320px',
        textAlign: 'center',
        fontSize: '30px',
        color: '#bbbbbb',
        backgroundColor: '#eee',
        lineHeight: '320px'
    }
}

class Banner extends React.Component {

    state = {
        visible: false,
        type: 1,
        url: ''
    }

    getFile = (e) => {
        const { upload } = this.props;
        const files = e.target.files;
        const file = files[0];
        const isRightType = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
        if (!isRightType) {
            e.target.value = '';
            return message.error('需上传Jpg/Jpeg/Png格式的图片')
        } else {
            upload([file])
                .then(result => {
                    if (result) {
                        this.setState({
                            url: result
                        })
                    }
                })
                .finally(() => {
                    e.target.value = '';
                })
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    hideModal = () => {
        this.setState({
            visible: false
        })
    }

    onChange = (e) => {
        const type = e.target.value
        this.setState({
            type
        })

    }

    onOk = () => {
        const { changeState } = this.props;
        const { url, type } = this.state;
        if (/^https?:\/\/.+?\.(jpg|jpeg|png)/.test(url)) {
            changeState({
                banner: url
            })
            this.hideModal()
        } else {
            if (type === 1) return message.warning('请填写正确的图片地址')
            message.warning('请上传图片')
        }
    }

    onInputChange = (e) => {
        this.setState({
            url: e.target.value
        })
    }

    render() {
        const { type, visible } = this.state;
        const { banner } = this.props;
        return (
            <div className="position-relative">
                <div className="tamplet-banner-btn">
                    <Button onClick={this.showModal}><Icon type="cloud-upload" /> 上传</Button>
                </div>
                {
                    banner ? <img style={style.img} src={banner} alt="" /> : <div style={style.defaultImg}>默认图片</div>
                }
                <Modal
                    title="修改横幅"
                    width={340}
                    visible={visible}
                    onCancel={this.hideModal}
                    onOk={this.onOk}
                    destroyOnClose
                >
                    <div style={{ width: '240px', margin: '0 auto' }}>
                        <RadioGroup onChange={this.onChange} value={type}>
                            <Radio value={1}>网络图片</Radio>
                            <Radio value={2}>本地图片</Radio>
                        </RadioGroup>
                        <div className="margin-ms-top">
                            {
                                type === 1 ?
                                    <Input onChange={this.onInputChange} />
                                    :
                                    <div className="tamplet-banner-btn-upload">
                                        <Icon type="cloud-upload" />
                                        <p>点击此处上传</p>
                                        <input onChange={this.getFile} type="file" />
                                    </div>
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Banner
