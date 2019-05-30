import React from 'react'
import moment from 'moment'
import Head from './head'
import UploadModal from './uploadModal'
import UploadURLModal from './uploadURLModal'

import ReactDrag from '../../../common/components/reactDrag/RightDrag'
import {
    message,
    Row,
    Col,
    Button,
} from 'antd'

const style = {
    lineHeight40: {
        lineHeight: '40px'
    }
}

class SkuInfo extends React.Component {

    // 图片唯一id标识
    uid = 0
    max = 9
    state = {
        data: [],
        unChecked: [],
        checked: [],
        // 图片上传弹窗框
        importModalVisible: false,
        uploadURLModalVisible: false,
    }

    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };

    componentDidMount() {
        if (this.props.imgInfo) {
            this.initImgInfo(this.props.imgInfo);
        }
    }

    componentWillReceiveProps(next) {
        if (next.imgInfo !== this.props.imgInfo) {
            this.initImgInfo(next.imgInfo)
        }
    }

    initImgInfo = (list) => {
        if (!list || !list.length) return;
        const { field } = this.props;
        const { setFieldsValue } = this.props.form;
        const data = [];
        const unChecked = [];
        list.forEach(v => {
            const i = this.uid + "";
            data.push({
                label: i,
                url: v,
                value: i
            })
            unChecked.push(i);
            ++this.uid;
        })
        this.setState({
            data,
            unChecked,
            checked: []
        })
        setFieldsValue({
            [field]: list
        })
    }

    // 移动
    move = (val1, val2) => {    // 图片拖拽排序
        const { data } = this.state;
        const a = data.findIndex(v => v.value === val1)
        const obj1 = data[a]
        data.splice(a, 1)
        const b = data.findIndex(v => v.value === val2)
        if (b === -1) {
            data.push(obj1)
        } else {

            data.splice(b, 0, obj1)
        }
        this.setState(() => (
            {
                data: [
                    ...data
                ],
                test: 3
            }
        ))
        this.setImgValue()

    }

    // 选中状态切换
    imgHandleChecked = (e, value) => {
        const { unChecked, checked } = this.state;
        if (!e || !e.target) return;
        if (e.target.checked) {
            checked.push(value)
            const index = unChecked.findIndex(v => v === value);
            index !== undefined && unChecked.splice(index, 1)
        } else {
            unChecked.push(value)
            const index = checked.findIndex(v => v === value);
            index !== undefined && checked.splice(index, 1)
        }
        this.setState({})
    }

    // 刷新图
    setImgValue = () => {
        const { data } = this.state;
        const { field } = this.props;
        const { setFieldsValue } = this.props.form;
        const imgInfo = data.map(v => v.url)
        setFieldsValue({
            [field]: imgInfo
        })
    }
    // 是否达到最大上线
    isMaxlimit = () => {
        const { data } = this.state;
        if (data && data.length >= this.max) {
            message.warning("已到达图片数量上限，请酌情删减后新增");
            return true;
        }
        return false;
    }

    // uploadImg
    uploadImg = () => {
        if (this.isMaxlimit()) return;
        this.setState({
            importModalVisible: true
        })
    }

    // 图片上传后的回调
    onChange = (fileList) => {
        if (!fileList || !fileList.length) return;
        const { setFieldsValue } = this.props.form;
        const { field } = this.props;
        const { data, unChecked } = this.state;
        fileList.forEach(v => {
            const { awsPath } = v;
            const i = this.uid + "";
            unChecked.push(i);
            data.push({
                label: i,
                url: awsPath,
                value: i
            })
            ++this.uid;
        })
        const imgInfo = data.map(v => v.url);

        setFieldsValue({
            [field]: imgInfo
        })
        this.setState({
            data: [...data],
            unChecked: [...unChecked]
        })
    }

    // UploadURLModal
    uploadURLModalOk = (url) => {
        const { data, unChecked } = this.state;
        const index = data.findIndex(v => v.url === url)
        if (index !== -1) return message.warning("当前图片已存在")
        const i = this.uid + "";
        unChecked.push(i);
        data.push({
            label: i,
            url: url,
            value: i
        })
        ++this.uid;
        this.setState({
            data: [...data],
            unChecked: [...unChecked]
        })

    }

    // 删除已选中的图片
    delIsChecked = () => {
        const { unChecked, checked, data } = this.state;
        const { field } = this.props;
        const { setFieldsValue } = this.props.form;
        for (let i = data.length - 1; i >= 0; i--) {
            if (checked.includes(data[i].value)) {
                data.splice(i, 1)
            }
        }
        const imgInfo = data.map(v => v.url)
        this.setState({
            checked: [],
            data: [...data]
        })
        setFieldsValue({
            [field]: imgInfo
        })

    }
    // 删除未选中的图片
    delUnChecked = () => {
        const { unChecked, checked, data } = this.state;
        const { setFieldsValue } = this.props.form;
        for (let i = data.length - 1; i >= 0; i--) {
            if (unChecked.includes(data[i].value)) {
                data.splice(i, 1)
            }
        }
        const imgInfo = data.map(v => v.url)
        this.setState({
            unChecked: [],
            data: [...data]
        })
        setFieldsValue({
            imgInfo
        })

    }

    showUploadURLModal = () => {
        if (this.isMaxlimit()) return;
        this.setState({ uploadURLModalVisible: true })
    }

    render() {
        const { data, importModalVisible, uploadURLModalVisible } = this.state;
        const limit = this.max - data.length
        const { form, field = "" } = this.props;
        const { getFieldDecorator } = form;
        getFieldDecorator(field)
        return (
            <div>
                <Row>
                    <Col className="ant-form-item-label" span={3}>
                        <label>图片</label>
                    </Col>
                    <Col span={21}>
                        <div>
                            <Button type="primary" onClick={this.uploadImg}>上传本地图片</Button>
                            <Button onClick={this.showUploadURLModal} className="margin-sm-left">上传网络图片</Button>
                            <Button onClick={this.delIsChecked} className="margin-sm-left">删除选中</Button>
                            <Button onClick={this.delUnChecked} className="margin-sm-left">删除未选中</Button>
                        </div>
                        <p style={style.lineHeight40} className="red font-sm">注：最多仅能保留{this.max}张图片，仅限JPG/JPEG格式，在1000*1000px及以上，单张大小不能超过1M，支持拖动排序</p>
                        <ReactDrag
                            data={data}
                            move={this.move}
                            handleDel={this.handleDel}
                            imgHandleChecked={this.imgHandleChecked}
                        />
                    </Col>
                </Row>
                <UploadModal
                    max={limit}
                    visible={importModalVisible}
                    onChange={this.onChange}
                    onCancel={() => this.setState({ importModalVisible: false })}
                />
                <UploadURLModal
                    visible={uploadURLModalVisible}
                    onOk={this.uploadURLModalOk}
                    onCancel={() => this.setState({ uploadURLModalVisible: false })}
                />
            </div>
        )
    }
}

export default SkuInfo
