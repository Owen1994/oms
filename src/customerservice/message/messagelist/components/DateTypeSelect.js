import React, { Component } from 'react';
import { Form, Select } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends Component {
    state = {
        monthArr: [],
        // activeStatus: 5,
    }

    componentDidMount() {
        const { monthArr } = this.state;
        for (let i = 0; i < 6; i++) {
            monthArr[i] = {};
            const year = moment().add(-i, 'month').get('year');
            const month = moment().add(-i, 'month').get('month') + 1;
            const value = moment().add(-i, 'month').format('YYYYMM');
            monthArr[i].label = `${year}年${month}月`;
            monthArr[i].value = value;
        }
        this.setState({ monthArr });
    }

    // handleStatusChange = (key) => {
    // const { operateType } = this.props;
    // const postStatus = operateType === '1' ? 'messageStatus' : 'emailStatus';
    // this.props.form.setFieldsValue({ [postStatus]: key });
    // this.setState({
    //     activeStatus: key,
    // });
    // }

    render() {
        const { monthArr } = this.state;
        // console.log('activeStatus', activeStatus);
        // const {
        // operateType,
        // messageStatus
        // } = this.props;
        const { getFieldDecorator } = this.props.form;
        // const statusList = operateType === '1' ? this.props.listReducer.data.messageStatusList : this.props.listReducer.data.emailStatusList;
        // const postType = operateType === '1' ? 'messageDate' : 'emailDate';
        // const postStatus = operateType === '1' ? 'messageStatus' : 'emailStatus';
        return (
            <div className="date-type-select">
                <FormItem
                    style={{ display: 'inline-block' }}
                >
                    {getFieldDecorator(postType, {
                        initialValue: monthArr.length > 0 ? monthArr[0].value : null,
                    })(
                        <Select
                            style={{ width: 110 }}
                            onChange={() => {
                                setTimeout(() => {
                                    this.props.handleDateChange();
                                }, 50);
                            }}
                        >
                            {monthArr.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>,
                    )}
                </FormItem>
                {
                    // statusList && statusList.length > 0
                    //     ? (
                    //         <Select
                    //             className="message-status-select"
                    //             value={messageStatus}
                    // onChange={(key) => {
                    // setTimeout(() => {
                    // this.handleStatusChange(key);
                    // this.props.handleStatusChange(key);
                    // }, 0);
                    // }}
                    //     >
                    //         {statusList.map(item => <Option key={item.key} value={item.key}>{`${item.text}（${item.num}）`}</Option>)}
                    //     </Select>
                    // )
                    // : null
                }
                {
                    // <FormItem>
                    //     {getFieldDecorator(postStatus, {
                    //         initialValue: 5,
                    //     })(
                    //         <Input type="hidden" />,
                    //     )}
                    // </FormItem>
                }
            </div>
        );
    }
}

export default App;
