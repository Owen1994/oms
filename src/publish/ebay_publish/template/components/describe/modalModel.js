/**
 * 作者: 陈林
 * 描述: 图库设置添加和修改弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import { AutoComplete, Form, Select, Modal, message, Input, Button } from "antd";
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow/index'
import BraftEditor from 'braft-editor' //富文本编辑器
import 'braft-editor/dist/braft.css'
import { fetchPost } from "../../../../../util/fetch";
import { GET_DESCRIPTION_TEMPLATE_DETAIL, DETAIL } from "../../constants/DescribeApi";
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
class modal extends React.Component {
    state = {
        toHtml: false,
        loading: false,
    }

    handleSelect = (value, type) => {
        // console.log(value);
    }

    insertImg = (param) => {   // 图片上传方法
        post('/yks/file/server/', {}).then(res => {
            if (res && res.state === "000001") {
                for (let i = 0; i < 2; i++) {
                    param.success({
                        url: "http://www.alibaba.com",
                        meta: {
                            id: 'xxx',
                            title: 'xxx',
                            alt: 'xxx',
                        }
                    })
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const { setFieldsValue } = this.props.form;
        if (nextProps.visible && !this.props.visible) {
            if (nextProps.item) {
                fetchPost(GET_DESCRIPTION_TEMPLATE_DETAIL, { tempId: nextProps.item }, ).then(res => {
                    if (res && res.state === "000001") {
                        setFieldsValue({
                            'productInfo[descriptionContent]': res.data.htmlTemplate,
                            'descriptionHtml': res.data.htmlTemplate
                        })
                        this.setState({
                            siteCode: res.data.siteCode,
                            site: res.data.site,
                            saleAccount: res.data.saleAccount,
                            templateName: res.data.templateName,
                            editorContent: res.data.htmlTemplate,
                            editorContentId: (new Date()).valueOf(),
                        })
                    } else {
                        this.setState({
                            templateName: "",
                            editorContent: "",
                            editorContentId: (new Date()).valueOf(),
                        })
                        setFieldsValue({
                            'productInfo[descriptionContent]': this.state.editorContent
                        })
                    }
                });
            }
        }

    }


    handleChange = (content) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            "productInfo[descriptionContent]": content
        })
    }

    replacePlaceholder = (html) => {
        const reg = /<img src="(https?:\/\/(?:(?!img).)+?\/publish\/template\/\$(?:%7B|{)(file\d)(?:%7D|}))"\/>/gi;
        return html.replace(reg, function (str, href, name) {
            return str.replace(href, "${" + name + "}")
        })
    }

    // 取消
    onCancel = ()=>{
        const { onCancel } = this.props;
        this.setState({
            toHtml: false,
            loading: false,
        })
        onCancel && onCancel()
    }

    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                } catch (error) {
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            if (!err) {
                this.setState({
                    loading: true
                });
                const params = {};
                params.tempId = this.props.item;
                if (this.state.saleAccount) {
                    params.saleAccount = this.state.saleAccount;
                }
                // params.site = this.state.site;
                if (values.productInfo.descriptionContent === "<p></p>" || typeof (values.productInfo.descriptionContent) === "undefined") {
                    message.info("HTML编码不能为空！")
                    this.setState({
                        loading: false
                    });
                    return false
                }
                params.type = 2;
                params.templateName = values.templateName;
                let temp;
                try {
                    temp = this.replacePlaceholder(values.productInfo.descriptionContent)
                } catch (e) {
                    temp = values.productInfo.descriptionContent;
                }
                params.htmlTemplate = temp;
                fetchPost(DETAIL, params, 2).then(res => {
                    if (res && res.state === "000001") {
                        message.success(res.msg);
                        this.props.onSearch();
                        this.props.form.resetFields();
                        this.state.editorContent = "";
                        this.state.editorContentId = "";
                        this.onCancel();
                        this.setState({
                            toHtml: false,
                            loading: false
                        })
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        });
    }


    /**
     * 作者: pzt
     * 描述: 自定义实现富文本内容与HTML互换
     * 时间: 2018/8/28 16:42
     * @param <> arg1
     **/
    contentToHtml = () => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const { toHtml } = this.state;
        this.setState({
            toHtml: !toHtml
        })
        if (!toHtml) {
            let content = getFieldValue("productInfo[descriptionContent]");
            setFieldsValue({
                'descriptionHtml': content
            })
        } else {
            let html = getFieldValue('descriptionHtml');
            this.setState({
                editorContent: html,
                editorContentId: (new Date()).valueOf(),
            })
        }
    }

    // 数据双向绑定
    handleHtml = (e) => {
        const { setFieldsValue } = this.props.form;
        let html = e.target.value;
        setFieldsValue({
            'productInfo[descriptionContent]': html
        })
    }

    render() {
        const { toHtml, siteCode, saleAccount, templateName, editorContent, editorContentId } = this.state
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const { visible } = this.props;
        let eleHtml = '';
        toHtml ? eleHtml = "<span style=\"color:#fff;background-color: #4D7BFE; padding: 5px\">HTML</span>" : eleHtml = "<span style=\"color:#4D7BFE;\">&lt;HTML/&gt;</span>"
        const editorProps1 = {
            disabled: toHtml,
            height: 500,
            contentFormat: 'html',
            initialContent: editorContent,
            contentId: editorContentId,
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            media: {
                uploadFn: this.insertImg,
            },
            excludeControls: ['emoji', 'code'],
            extendControls: [
                {
                    type: 'split'
                }, {
                    type: 'button',
                    text: '</>',
                    html: eleHtml,
                    hoverTitle: '编辑HTML',
                    className: 'edit-html',
                    onClick: () => this.contentToHtml()
                }]
        };
        console.log("toHtml",toHtml)
        return (
            <div>
                <Modal {...this.props}
                    title={"修改"}
                    visible={visible}
                    okText="保存"
                    cancelText="取消"
                    className="ebay-tpe-modal"
                    destroyOnClose
                    onCancel={this.onCancel}
                    footer={[
                        <Button key="cancel" onClick={this.onCancel}>取消</Button>,
                        <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                    ]}
                >
                    <div className="product-description">
                        {
                            //     <StandardFormRow title="站点：">
                            //     <span className="line-height">{ siteCode }</span>
                            // </StandardFormRow>
                            // <StandardFormRow title="销售账号：" className="margin-ss-top">
                            //     <span className="line-height">{ saleAccount }</span>
                            // </StandardFormRow>
                        }
                        <StandardFormRow title="模板名称：" required={true} className="text-area margin-ts-top publich-describe">
                            <div>
                                <div className="margin-ss-top">
                                    <FormItem>
                                        {getFieldDecorator('templateName', {
                                            initialValue: templateName,
                                            rules: [{ required: true, message: '请填写模板名称！' }],
                                        })(
                                            <Input
                                                placeholder="模糊搜索"
                                                style={{ width: 330 }}
                                                maxLength="80"
                                            />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                        </StandardFormRow>
                        <div className="publish-standardFormRow">
                            <StandardFormRow title="HTML编码：" required={true}>
                                <FormItem>
                                    {getFieldDecorator("productInfo[descriptionContent]")(
                                        <Input type={"hidden"} />
                                    )}
                                </FormItem>
                                <div className="product-desc-editor margin-sm-right margin-ss-top">
                                    <BraftEditor {...editorProps1} />
                                    <div className={toHtml ? "editor_html" : "display-none"}>
                                        <FormItem>
                                            {getFieldDecorator("descriptionHtml")(
                                                <TextArea
                                                    placeholder=""
                                                    onChange={(e) => this.handleHtml(e)}
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            </StandardFormRow>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)
