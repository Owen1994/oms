/**
 * 包裹订单--全部包裹--详情页--买家留言
 */
import React from 'react'
import {
    Form,
    Input,
    Button,
    Table,
    message,
} from 'antd'
import '../css/css.css'
import * as config from "util/connectConfig";
import {datasaddkey, functions, getLoginmsg, timestampFromat} from 'util/baseTool';
import Modalmodel from '@/components/modalmodel';
import axios from "util/axios";

const FormItem = Form.Item

const {TextArea} = Input;

export default class Remarks extends React.Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        title: '备注人',
        className: 'column-order',
        dataIndex: 'creater',
        render:text =>text,
        width: 100,
    }, {
        title: '备注时间',
        dataIndex: 'createDate',
        render: (text, record, index) => timestampFromat(text, 2),
        width: 150,
    }, {
        title: '备注内容',
        dataIndex: 'msgContent',
        render:text =>text,
        width: 500,
    }];

    handleCancel = (visible) => () => {
        this.props.modalmodelaction({[visible]: false,})
        this.props.form.setFieldsValue({remarks: ""})
    }


    handleAdd = () => {
        this.props.modalmodelaction({remarksvisible: true,})
    }

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }


    handleOk = () => {
        const params = {
            notes: this.props.form.getFieldValue('remarks'),
            packageCode: this.props.Infos.orderId,
        }
        if(!params.notes) {
            message.error('请输入备注信息!');
            return;
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/addNotes`, params
        ).then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    this.props.modalmodelaction({remarksvisible: false,})
                    const {count, data} = this.props.tablemodel7;
                    const newData = {
                        key: ++data.length,
                        creater: getLoginmsg().userName,
                        msgContent: this.props.form.getFieldValue('remarks'),
                        createDate: timestampFromat(new Date().getTime(), 2),
                    };

                    this.props.tablemodelaction7({data: [newData,...data ], count: count + 1,})
                    this.props.form.setFieldsValue({remarks: ''})
                    message.success(response.data.msg)
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            this.setState({formloading: false});
        })
    }

    render() {

        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('buyerMessage', {
            initialValue: null
        });
        const buyerMessage = getFieldValue("buyerMessage");
        const {data} = this.props.tablemodel7;
        const newdata = datasaddkey(data)
        const columns = this.columns;
        const content = <FormItem
            label=""  {...this.formItemLayout} className="widthAll"
        >
            {getFieldDecorator('remarks', {
                rules: [{required: false, message: '请输入发货时间'}],
            })(
                <TextArea rows={4} maxLength={255} className="widthAll" placeholder="请输入内容"/>
            )}
        </FormItem>

        return (
            <div className="newCluenk remarks">
                <div className="title">
                    买家备注
                    <Button className="package-remark-btn" onClick={this.handleAdd}>我要备注</Button>
                </div>
                <div className="buyerMessage">
                    { buyerMessage }
                </div>
                <div className="content">
                    {
                        newdata.length ?
                        <Table
                            columns={columns}
                            showHeader={false}
                            pagination={false}
                            dataSource={newdata}
                        />
                        :null
                    }

                </div>
                <Modalmodel  {...{
                    ...this.props.modalmodel,
                    visible: this.props.modalmodel.remarksvisible,
                    ModalText: content, title: '备注内容'
                }}
                             onOk={this.handleOk}
                             confirmLoading={this.props.modalmodel.confirmLoading}
                             onCancel={this.handleCancel('remarksvisible')}/>
            </div>
        );
    }
}
