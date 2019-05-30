import React from 'react'
import Head from './head'
import {
    Form,
    Input,
    Button
} from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;

const style = {
    inputWidth: {
        width: '288px'
    },
    tip: {
        lineHeight: '20px',
        fontSize: '12px'
    }
}

class BasicInfo extends React.PureComponent {

    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };

    initialToCapital = () => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        let title = getFieldValue("basicInfo[title]");
        title = title.split(" ").map(v => {
            let first = v.slice(0, 1)
            if (/[a-zA-Z]/.test(first)) {
                return first.toUpperCase() + v.slice(1)
            }
            return v
        }).join(" ")
        setFieldsValue({
            "basicInfo[title]": title
        })
    }

    render() {
        const { basicInfo = {}, form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const title = getFieldValue("basicInfo[title]");
        const titleLength = title ? 200 - title.length : 200
        getFieldDecorator("basicInfo[asinSite]", {
            initialValue: basicInfo.asinSite,
        })
        getFieldDecorator("basicInfo[id]", {
            initialValue: basicInfo.id,
        })
        getFieldDecorator('basicInfo[listingType]', {
            initialValue: basicInfo.listingType,
        })
        // let listingType;
        // switch (basicInfo.listingType) {
        //     case 1:
        //         listingType = "单属性";
        //         break;
        //     case 2:
        //         listingType = "单属性";
        //         break;
        //     default:
        //         listingType = "";
        // }
        return (
            <Head title="基本信息" id="basicInfo">
                <FormItem
                    {...this.formItemLayout}
                    label="Amazon分类"
                >
                    {getFieldDecorator('basicInfo[categoryName]', {
                        initialValue: basicInfo.categoryName,
                    })(
                        <Input type="hidden" disabled />
                    )}
                    <p className="amazon-categoryName">{basicInfo.categoryName || ""}</p>
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="销售账号"
                >
                    {getFieldDecorator('basicInfo[listingSellerId]', {
                        initialValue: basicInfo.listingSellerId,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="站点"
                >
                    {getFieldDecorator('basicInfo[siteId]', {
                        initialValue: basicInfo.siteId,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                {
                    // <FormItem
                    //     {...this.formItemLayout}
                    //     label="销售类型"
                    // >
                    //     <Input value={listingType} style={style.inputWidth} disabled />
                    // </FormItem>
                }
                <FormItem
                    className="margin-ss-top"
                    {...this.formItemLayout}
                    label="标题"
                >
                    {getFieldDecorator('basicInfo[title]', {
                        initialValue: basicInfo.title,
                        rules: [
                            { required: true, message: "请输入标题" },
                            { max: 200, message: '标题最多200字符' }
                        ]
                    })(
                        <TextArea placeholder="请输入（可输入200个字符）" style={style.inputWidth} />
                    )}
                    <Button onClick={this.initialToCapital} className="margin-sm-left">首字母大写</Button>
                    {
                        titleLength >= 0 ?
                            <p style={style.tip}>（您还可以输入<span className="red">{titleLength}</span>个字符）</p>
                            :
                            null
                    }

                </FormItem>
            </Head>
        )
    }
}

export default BasicInfo
