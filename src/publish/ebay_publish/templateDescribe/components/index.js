import React from 'react';
import Head from './header';
import Banner from './banner';
import Details from './details';
import Left from './left';
import { fetchUpload, fetchPost } from '@/util/fetch';
import getTemp from '../template'
import { getUrlParams } from '@/util/baseTool'
import {
    Row,
    Col,
    message
} from 'antd'

const style = {
    // layout: {
    //     width: '1300px',
    //     margin: '0 auto'
    // },
    main: {
        backgroundColor: '#fff',
        padding: '20px',
        marginTop: '15px',
    },
    info: {
        marginTop: '30px',
    },
    input: {
        height: 0,
        visible: 'hidden',
    }
}

class App extends React.Component {

    state = {
        banner: '',
        footer: [
            { key: 1, htmlStr: '', name: 'Payment' },
            { key: 2, htmlStr: '', name: 'Shipping' },
            { key: 3, htmlStr: '', name: 'Returns' },
            { key: 4, htmlStr: '', name: 'Contact Us' },
            { key: 5, htmlStr: '', name: 'Else' },
        ],
        layout: {
            color: '#F9FAFD',
            fscolor: '#333333',
            relevancyType: 1,  // 关联类型
            describeType: 1, // 描述类型类型
            footerType: 1, // 底部类型
        },
        module: {
            category: {
                has: true,
                edit: false,
                name: 'Shop Category'
            },
            hotItem: {
                has: true,
                edit: false,
                name: 'Hot Item'
            },
            newListItem: {
                has: true,
                edit: false,
                name: 'New List Item'
            },
            specifics: {
                has: true,
                edit: false,
                name: 'Item Specifics'
            }
        }
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        const { saleAccount, tempId } = getUrlParams();
        const { setFieldsValue } = this.props.form;
        if (tempId) {
            fetchPost('/pls/ebay/motan/service/api/IEbayService/getDescriptionTemplateDetail', { tempId })
                .then(res => {
                    if (res && res.state === "000001") {
                        const { htmlTemplate, templateName } = res.data;
                        setFieldsValue({
                            templateName
                        })
                        const obj = /<input id="store" type="hidden" value=['"]?(.+?)['"]?\/>/.exec(htmlTemplate);
                        if (obj && obj[1]) {
                            try {
                                this.setState(JSON.parse(decodeURIComponent(obj[1])))
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    }
                });
        }
    }
    // 修改布局
    changeLayout = (value) => {
        const { layout, module } = this.state;
        if (value.relevancyType === 1) {
            module.category.has = true
            module.hotItem.has = true
            module.newListItem.has = true
        }
        this.setState({
            layout: {
                ...layout,
                ...value
            }
        })
    }
    // 修改state
    changeState = (data, type) => {
        const state = this.state;
        // 左侧全部删除 时 将 relevancyType 修改为 2
        if (type === 'left') {
            const { module } = data;
            if (!module.category.has && !module.hotItem.has && !module.newListItem.has) {
                state.layout.relevancyType = 2;
            }

        }
        this.setState({
            ...state,
            ...data
        })
    }
    // 

    // 上传图片
    upload = (fileList) => {
        //文件上传
        message.info('图片正在上传，请稍候');
        return fetchUpload('/yks/file/server/', fileList).then(data => {
            if (data.state === '000001') {
                message.success('图片上传成功');
                return data.data[0] && data.data[0].path;
            }
        }).catch(error => console.log(error))
    }

    // 保存
    save = () => {
        const { getFieldValue } = this.props.form;
        const templateName = getFieldValue('templateName');
        const {
            banner,
            footer,
            layout,
            module,
        } = this.state;
        const {
            category, hotItem, newListItem, specifics
        } = module;

        // 数据校验
        if (!templateName) return message.warning("请填写模板名称");
        if (!banner) return message.warning("请插入banner图");
        if (layout.relevancyType !== 2) {
            if (category.has && !category.name) return message.warning("Shop Category 标题不能为空");
            if (hotItem.has && !hotItem.name) return message.warning("Hot Item 标题不能为空");
            if (newListItem.has && !newListItem.name) return message.warning("New List Item 标题不能为空");
        }
        if (category.edit || hotItem.edit || newListItem.edit || specifics.edit) return message.warning("请先保存标题");
        if (specifics.has && !specifics.name) return message.warning("Item Specifics 标题不能为空");
        for (let i = 0; i < footer.length; i++) {
            if (!footer[i].name) return message.warning("底部政策标题不能为空");
            if (!footer[i].htmlStr) return message.warning("底部政策内容不能为空");
        }

        // 拼接模板

        const temp = getTemp(this.state);
        const { saleAccount, tempId } = getUrlParams();
        const params = {};
        if (tempId) {
            params.tempId = tempId;
        }
        if (saleAccount) {
            params.saleAccount = saleAccount;
        }
        params.htmlTemplate = temp;
        params.type = 1;
        // params.site = 'eBayMotors';
        params.templateName = templateName;
        fetchPost('/pls/ebay/motan/service/api/IEbayService/descriptionTemplateDetail', params, 2).then(res => {
            if (res && res.state === "000001") {
                const { history } = this.props;
                message.success(res.msg);
                history.replace(`/publish/template/`)
            } else {
                message.error(res.msg);
            }
        });
    }
    render() {
        const { footer, layout, banner, module } = this.state;
        const { relevancyType } = layout;
        const { form } = this.props;
        const {
            category,
            hotItem,
            newListItem,
            specifics
        } = module
        return (
            <div>
                <Head
                    changeLayout={this.changeLayout}
                    save={this.save}
                    layout={layout}
                    form={form}
                />
                <div style={style.main}>
                    <Banner banner={banner} changeState={this.changeState} upload={this.upload} />
                    <div style={style.info}>
                        {
                            relevancyType === 1 && (category.has || hotItem.has || newListItem.has) ?
                                <Row>
                                    <Col span={5}>
                                        <Left module={module} changeState={this.changeState} layout={layout}></Left>
                                    </Col>
                                    <Col span={19}>
                                        <Details module={module} changeState={this.changeState} layout={layout} footer={footer} form={form} />
                                    </Col>
                                </Row>
                                :
                                <Details module={module} changeState={this.changeState} layout={layout} footer={footer} form={form} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default App
