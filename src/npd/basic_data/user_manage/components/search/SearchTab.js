import React from 'react'

import TagSelect from '../../../../../components/TagSelect';
import Tablelist_user from '../list/Tablelist_user';
import Tablelist_platform from '../list/Tablelist_platform';
import Tablelist_usergroup from '../list/Tablelist_usergroup';
import TableOpiton from '../list/TableOpiton';
import TableOpiton2 from '../list/TableOpiton2';
import TableOpiton3 from '../list/TableOpiton3';

import ItemSelect from '../../../../../common/components/itemSelect'
import * as API from '../../../../constants/Api'
import RadioTags from '../../../../common/components/radiotags'
import StandardFormRow from '../../../../../components/StandardFormRow';

import {
    Tabs,
    Select,
    Form,
    Input
} from 'antd';

import BtnSearch from '../../../../common/components/BtnSearch'
import { businessCode2 } from '../../constants/index'

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

var tablelist, platformCode2 = [];

export default class SearchTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1,
        }

    }

    onChange = (activeKey) => {
        //标签页切换事件
        this.props.form.resetFields();
        switch (activeKey) {
            case "1":
                this.setState({ activeKey: 1 });
                break;
            case "2":
                this.setState({ activeKey: 2 });
                break;
            case "3":
                this.setState({ activeKey: 3 }); this.props.onReset();
                break;
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.activeKey === 1) {
            tablelist = (
                <div>
                    <TableOpiton {...this.props} listFetch1={this.props.listFetch1} />
                    <Tablelist_user {...this.props} listFetch1={this.props.listFetch1} />
                </div>
            )
        } else if (this.state.activeKey === 2) {
            tablelist = (
                <div>
                    <TableOpiton2 {...this.props} listFetch2={this.props.listFetch2} />
                    <Tablelist_platform {...this.props} listFetch2={this.props.listFetch2} />
                </div>
            )
        } else {
            tablelist = (
                <div>
                    <TableOpiton3 {...this.props} listFetch3={this.props.listFetch3} />
                    <Tablelist_usergroup {...this.props} listFetch3={this.props.listFetch3} />
                </div>
            )
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            }
        };
        return (
            <div>
                <div className="npd-usermanagement-tab">
                    <Tabs type="card" onChange={this.onChange}>
                        <TabPane tab="用户列表" key="1" forceRender={true}>
                            <StandardFormRow title="用户姓名">
                                <FormItem>
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入用户姓名" style={{ width: 286 }} />
                                    )}
                                </FormItem>
                                <div className="npd-usermanagement-btnSearch">
                                    <BtnSearch
                                        onResetFields={this.props.form.resetFields}
                                        onSearch={this.props.listFetch1}
                                    />
                                </div>
                            </StandardFormRow>
                        </TabPane>
                        <TabPane tab="平台列表" key="2" className="npd-tab" forceRender={true}>
                            <StandardFormRow title="平台名称">
                                <FormItem>
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入平台名称" style={{ width: 286 }} />
                                    )}
                                </FormItem>
                                <div className="npd-usermanagement-btnSearch">
                                    <BtnSearch
                                        onResetFields={this.props.form.resetFields}
                                        onSearch={this.props.listFetch2}
                                    />
                                </div>
                            </StandardFormRow>

                        </TabPane>
                        <TabPane tab="用户组列表" key="3" forceRender={true}>
                            <StandardFormRow title="业务线">
                                <FormItem>
                                    <RadioTags
                                        getFieldDecorator={getFieldDecorator}
                                        list={businessCode2}
                                        name='businessLineCode'
                                        onChange={() => this.props.listFetch3()}
                                    />
                                </FormItem>
                            </StandardFormRow>
                            <StandardFormRow title="平台">
                                <FormItem style={{ width: 286 }}>
                                    <ItemSelect
                                        getFieldDecorator={getFieldDecorator}
                                        formName='platformCode'
                                        url={API.PLATFORM_LIST_API}     //平台接口
                                        code="code"
                                        params={{'pageData': 20, 'pageNumber': 1}}
                                    />
                                </FormItem>
                                <div className="npd-usermanagement-btnSearch">
                                    <BtnSearch
                                        onResetFields={this.props.onReset}
                                        onSearch={this.props.listFetch3}
                                    />
                                </div>
                            </StandardFormRow>

                        </TabPane>
                    </Tabs>
                </div>

                <div className="npd-usermanagement-tablelist">
                    {tablelist}
                </div>
            </div>
        );
    }
}


