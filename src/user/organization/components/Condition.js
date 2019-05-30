import React, { Component } from 'react'; // 在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {
    Form,
    Row,
    Tree,
    Button,
    Tag,
    Input,
} from 'antd';
import Tablelist from './Tablelist';
import * as config from '@/util/connectConfig';
import axios from '@/util/axios';
import { datasaddkey } from '@/util/baseTool';

const { TextArea } = Input;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
class Condition extends Component {
    constructor(props) {
        super(props);
    }

    /**
     *作者: 唐勇
     *功能描述: 组织架构页面加载
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    componentDidMount() {
        const newobj = {};
        // 获取组织架构树列表请求
        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/getAllOrgTree`, newobj)
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ selectedKeys: [response.data.data[0].dingOrgId] });
                    this.props.treelistaction({ data: response.data.data });
                    this.onload(response.data.data[0].dingOrgId);
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 清空数据
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    componentWillUnmount() {
        this.props.treelistaction({ data: [] });
        this.props.organtableaction({ data: [] });
    }

    state={
        organitag: '姓名',
        organtype: '1',
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: false,
        selectedKeys: [],
    }

    formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    /**
     *作者: 唐勇
     *功能描述: 根据获取钉钉ID获取列表数据
     *参数说明:dingid=钉钉ID
     *时间: 2018/7/3 14：00
     */
    onload=(dingid) => {
        const newobj = {};
        newobj.dingOrgId = dingid;
        newobj.pageData = 20;
        newobj.pageNumber = 1;
        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/getUserByDingOrgId`, newobj)
            .then((response) => {
                if (response.status == 200) {
                    this.props.organtableaction({ data: response.data.data.lst, type: 1, list: newobj });
                    this.props.Paginationmodelaction({ total: response.data.data.total, current: newobj.pageNumber, pageSize: newobj.pageData });
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 展开收起组织架构树结构触发
     *参数说明:expandedKeys=传递的KEY
     *时间: 2018/7/3 14：00
     */
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    /**
     *作者: 唐勇
     *功能描述: 点击树节点触发
     *参数说明:selectedKeys=节点的KEY info=用来判断是否是选中状态
     *时间: 2018/7/3 14：00
     */
    onSelect = (selectedKeys, info) => {
        if (!info.selected) {
            return false;
        }
        this.setState({ selectedKeys });
        const newobj = {};
        newobj.dingOrgId = selectedKeys[0];
        newobj.pageData = 20;
        newobj.pageNumber = 1;
        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/getUserByDingOrgId`, newobj)
            .then((response) => {
                if (response.status == 200) {
                    this.props.organtableaction({ data: response.data.data.lst, type: 1, list: newobj });
                    this.props.Paginationmodelaction({ total: response.data.data.total, current: newobj.pageNumber, pageSize: newobj.pageData });
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 树结构数据列表展示
     *参数说明:data=数据的data数据
     *时间: 2018/7/3 14：00
     */
    renderTreeNodes = (data) => {
        const newdata = [];
        return data.map((item) => {
            newdata.title = item.orgName;
            newdata.key = item.dingOrgId;
            if (item.subOrg) {
                if (item.key == 1) {
                    return (
                        <TreeNode icon={<img src={require('../img/Logo.png')} />} title={newdata.title} key={newdata.key} dataRef={item}>
                            {this.renderTreeNodes(item.subOrg)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode icon={<img src={require('../img/icon.png')} />} title={newdata.title} key={newdata.key} dataRef={item}>
                        {this.renderTreeNodes(item.subOrg)}
                    </TreeNode>
                );
            }
            return <TreeNode title={newdata.title} key={newdata.key} />;
        });
    }

    /**
     *作者: 唐勇
     *功能描述: 重置按钮功能
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    handleReset = () => {
        this
            .props
            .form
            .resetFields();
    }

    /**
     *作者: 唐勇
     *功能描述: 组织架构搜索方法
     *参数说明:e=数据集合
     *时间: 2018/7/3 14：00
     */
    handleSubmit = (e) => {
        const or = typeof e === 'object';
        or && e.preventDefault();
        const newobj = {};
        const user = {};
        this.props.organtableaction({ list: {} });
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const type = this.state.organtype;
                    const earchcontent = values.earchcontent;
                    newobj.pageNumber = 1;
                    newobj.pageData = 20;
                    if (type == 1) {
                        user.personName = earchcontent;
                        user.jobNumber = '';
                        user.phoneNum = '';
                    } else if (type == 2) {
                        user.personName = '';
                        user.jobNumber = earchcontent;
                        user.phoneNum = '';
                    } else if (type == 3) {
                        user.personName = '';
                        user.jobNumber = '';
                        user.phoneNum = earchcontent;
                    }
                    newobj.user = user;
                    axios
                        .post(`${config.api_url}/urc/motan/service/api/IUrcService/getUserByUserInfo`, newobj)
                        .then((response) => {
                            if (response.status == 200) {
                                this.props.organtableaction({ data: response.data.data.lst, type: 2, list: newobj });
                                this.props.Paginationmodelaction({ total: response.data.data.total, current: newobj.pageNumber, pageSize: newobj.pageData });
                            }
                        });
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 切换搜索类型
     *参数说明:tag=切换的状态
     *时间: 2018/7/3 14：00
     */
    handleChangetabType(tag) {
        this.setState({ organitag: tag });
        switch (tag) {
        case '姓名':
            this.setState({ organtype: 1 });
            break;
        case '工号':
            this.setState({ organtype: 2 });
            break;
        case '手机号':
            this.setState({ organtype: 3 });
            break;
        }
    }

    render() {
        const { data } = this.props.treelistmodel;
        let treeData = [];
        data.map((item, index) => {
            treeData = datasaddkey(item.subOrg);
        });
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="organheight100">
                <div className="organallLeft">
                    <div className="top">
                        <div className="toplf" />
                        <div className="toprt"> 组织架构</div>
                    </div>
                    {/* <div className="tit">深圳市有棵树科技股份有限公司</div> */}
                    <div className="cen">
                        <div className="centree">
                            <Tree
                                showIcon
                                onExpand={this.onExpand} // 展开/收起节点时触发
                                autoExpandParent={this.state.autoExpandParent} // 是否自动展开父节点
                                onSelect={this.onSelect} // 点击树节点触发
                                selectedKeys={this.state.selectedKeys} // （受控）设置选中的树节点
                            >
                                {this.renderTreeNodes(treeData)}
                            </Tree>
                        </div>
                    </div>
                </div>
                <div className="organallright">
                    <div className="organtop">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <div className="organtype">
                                <div className="typetit">
                                    搜索类型 :
                                </div>
                                <CheckableTag
                                    key="dataname"
                                    checked={this.state.organitag == '姓名'}
                                    onChange={checked => this.handleChangetabType('姓名')}
                                    className="typetab mglf0"
                                >
                                    姓名
                                </CheckableTag>
                                <CheckableTag
                                    key="datajob"
                                    checked={this.state.organitag == '工号'}
                                    onChange={checked => this.handleChangetabType('工号')}
                                    className="typetab"
                                >
                                    工号
                                </CheckableTag>
                                <CheckableTag
                                    key="dataphone"
                                    checked={this.state.organitag == '手机号'}
                                    onChange={checked => this.handleChangetabType('手机号')}
                                    className="typetab"
                                >
                                    手机号
                                </CheckableTag>
                            </div>
                            <div className="organcenter">
                                <Row>
                                    <div className="typetit">搜索内容 : </div>
                                    <div className="typenr">
                                        <FormItem
                                            {...this.formItemLayout2}
                                            className="ant-xs-row"
                                        >
                                            {getFieldDecorator('earchcontent', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: '请输入',
                                                    },
                                                ],
                                            })(<TextArea rows={2} placeholder={this.state.organitag == '姓名' ? '姓名支持汉字和拼音的搜索' : '请输入搜索条件'} />)}

                                        </FormItem>
                                    </div>
                                    <div className="typebtn">
                                        <FormItem>
                                            <Button type="primary" htmlType="submit">
                                                搜索
                                            </Button>
                                        </FormItem>
                                        <FormItem>
                                            <Button type="default" onClick={this.handleReset}>
                                                重置
                                            </Button>
                                        </FormItem>
                                    </div>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    <div className="organtable">
                        <Tablelist {...this.props} />
                    </div>
                </div>

            </div>
        );
    }
}

export default Condition;
