import React, { Component } from 'react'; // 在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {
    Form,
    Button,
    Input,
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class Condition extends Component {

    state = {
        organitag: 'userName',
        switch: true,
    }

    formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    // 搜索按钮
    handleSubmit = (e) => {
        const or = typeof e === 'object';
        or && e.preventDefault();
        const newobj = {};
        const name = this.state.organitag;
        // ant表格校验方法
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.areaValue = values.areaValue.replace(/[\n]/g, ',').replace(/[\s]/g, '');
                const user = {};
                user.userName = values.areaValue;
                if (user.userName) {
                    newobj.user = user;
                }
                newobj.pageNumber = 1;
                newobj.pageData = this.props.Paginationmodel.pageSize || 20; // 获取存放在redux中当前 每页显示的最大条数
                or && this.props.fetchPosts({ key: 'data', value: newobj });
                this.props.menudataaction({ pageCache: { ...this.props.menuInfos.pageCache, [`${location.pathname}${location.search}`]: newobj } });
            }
        });
    }

    // 搜索类型切换
    handleChangeSKU(tag) {
        this.setState({ organitag: tag, switch: !this.state.switch });
    }

    // 重置按钮
    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedTags } = this.state;

        return (
            <div className="userSearch">
                <div className="organtop">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        {/* <FormItem className="organtype" label="搜索类型">
                                <div className="typenr">
                                    {getFieldDecorator('checking', {
                                        initialValue: false,
                                    })(
                                        <CheckableTag
                                            key={'data'}
                                            checked={this.state.switch}
                                            onChange={(type) => {this.handleChangeSKU('userName')}}
                                            className='typetab mglf0'>
                                            用户名
                                        </CheckableTag>
                                    )}
                                </div>
                            </FormItem> */}
                        <FormItem className="organcenter">
                            <div className="typetit">用户名 : </div>
                            <div className="typenr">
                                {getFieldDecorator('areaValue', {
                                    initialValue: '',
                                })(
                                    <TextArea rows={2} placeholder="支持多个搜索条件换行精确搜索" autosize={{ minRows: 2, maxRows: 15 }} />,
                                )}

                            </div>
                        </FormItem>
                        <FormItem className="searchBtn">
                            <Button type="primary" htmlType="submit">
                                    搜索
                            </Button>
                            <Button type="default" onClick={this.handleReset}>
                                    重置
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Condition;
