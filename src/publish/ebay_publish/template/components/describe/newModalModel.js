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
import ItemSelect from '../../../../../common/components/itemSelect'
import { fetchPost } from '../../../../../util/fetch'
import 'braft-editor/dist/braft.css'
import * as types from "../../../../common/constants/actionTypes";
import { DETAIL } from '../../constants/DescribeApi'
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
class modal extends React.Component {
    state = {
        titleLen: 50,
        toHtml: false,
        loading: false
    }

    componentDidMount() {

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

    handleChange = (content) => {
        //去掉富文本编辑器内部转换代码，保证预览前后HTML代码一致
        let newContent = unescape(content.replace(/((http)|(https)):\/\/((erp\.youkeshu\.com)|(erp-test\.youkeshu\.com)|(localhost:8282))\/publish\/template\//g, ""));
        const { setFieldsValue } = this.props.form;
        this.setState({
            editorContent: newContent,
            // editorContentId: (new Date()).valueOf(),
        })
        setFieldsValue({
            "productInfo[descriptionContent]": newContent
        })
    }

    replacePlaceholder = (html) => {
        const reg = /<img src="(https?:\/\/(?:(?!img).)+?\/publish\/template\/\$(?:%7B|{)(file\d)(?:%7D|}))"\/>/gi;
        return html.replace(reg, function (str, href, name) {
            return str.replace(href, "${" + name + "}")
        })
    }

    handleOk = () => {
        const { saleAccount } = this.props;
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
                const params = { ...values };
                if (this.state.editorContent === "<p></p>" || typeof (this.state.editorContent) === "undefined") {
                    message.info("HTML编码不能为空！")
                    this.setState({
                        loading: false
                    });
                    return false
                }
                params.type = 2;
                params.saleAccount = saleAccount;
                let temp;
                try {
                    temp = this.replacePlaceholder(this.state.editorContent)
                } catch (e) {
                    temp = this.state.editorContent;
                }
                params.htmlTemplate = temp;
                fetchPost(DETAIL, params, 2).then(res => {
                    if (res && res.state === "000001") {
                        message.success(res.msg);
                        this.props.onCancel();
                        this.setState({
                            editorContent: "",
                            editorContentId: (new Date()).valueOf(),
                        })
                        this.props.onSearch();
                        this.props.form.resetFields();
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
        const draftInstance = this.editorInstance.getDraftInstance()
        // 使编辑器获得焦点
        setTimeout(() => {
            draftInstance.focus()
        }, 10)

        const { getFieldValue, setFieldsValue } = this.props.form;
        const { toHtml } = this.state;
        this.setState({
            toHtml: !toHtml
        })
        if (!toHtml) {
            let html = this.state.editorContent
            setFieldsValue({
                'descriptionHtml': html
            })
        } else {
            let html = getFieldValue('descriptionHtml');
            this.setState({
                editorContent: html,
                editorContentId: Date.now(),
            })
        }
    }

    // 数据双向绑定
    handleHtml = (e) => {
        const { setFieldsValue } = this.props.form;
        let html = e.target.value;
        this.setState({
            editorContent: html,
            editorContentId: (new Date()).valueOf(),
        })
        setFieldsValue({
            'productInfo[descriptionContent]': html
        })
    }

    //弹窗关闭时清空所有数据
    initializeModalData = () => {
        setTimeout(() => {
            const { setFieldsValue, resetFields } = this.props.form;
            this.handleChange('');
            this.setState({
                editorContent: '',
                editorContentId: (new Date()).valueOf(),
                toHtml: false,
                loading: false
            });
            resetFields();
            setFieldsValue({
                'descriptionHtml': ''
            })
            this.props.onCancel();
        }, 50)

    }

    render() {
        const { newVisible, onCancel } = this.props;
        const { toHtml, editorContent, editorContentId } = this.state;
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        getFieldDecorator("descriptionHtml", {
            initialValue: ""
        })
        getFieldDecorator("productInfo[descriptionContent]", {
            initialValue: ""
        })
        let eleHtml = '';
        toHtml ? eleHtml = "<span style=\"color:#fff;background-color: #4D7BFE; padding: 5px\">HTML</span>" : eleHtml = "<span style=\"color:#4D7BFE;\">&lt;HTML/&gt;</span>"
        const editorProps = {
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
        return (
            <div>
                <Modal {...this.props}
                    title={"新增"}
                    visible={newVisible}
                    okText="保存"
                    cancelText="取消"
                    className="ebay-tpe-modal"
                    destroyOnClose
                    maskClosable={false}
                    onCancel={this.initializeModalData}
                    footer={[
                        <Button key="cancel" onClick={this.initializeModalData}>取消</Button>,
                        <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                    ]}
                >
                    <div className="product-description">
                        <div>
                            <div className="list-filter-item margin-sm-top" style={{ "marginLeft": "45px" }}>
                                <div className="list-filter-item-title list-filter-item-title_required">模板名称:</div>
                                <div className="list-filter-input">
                                    <FormItem>
                                        {getFieldDecorator('templateName', {
                                            rules: [{ required: true, message: '请填写模板名称！' }],
                                        })(
                                            <Input
                                                placeholder="模糊搜索"
                                                style={{ width: 330 }}
                                                maxLength={80}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="margin-ss-top publish-standardFormRow">
                                <StandardFormRow title="HTML编码：" required={true}>
                                    <FormItem>
                                        {getFieldDecorator("productInfo[descriptionContent]")(
                                            <Input type={"hidden"} />
                                        )}
                                    </FormItem>
                                    <div className="product-desc-editor margin-sm-right">
                                        <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance} />
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
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)
