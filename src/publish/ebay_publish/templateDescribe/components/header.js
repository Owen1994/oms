import React from 'react'
import {
    Row,
    Col,
    Input,
    Button,
    Form,
    Modal
} from 'antd'
import LayoutModal from './layoutModal'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
        },
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 20
        },
    },
};

const style = {
    row: {
        padding: '10px 20px',
        height: '60px',
        backgroundColor: '#ffffff',
        lineHeight: '40px'
    }
}

class Head extends React.Component {

    state = {
        visible: false
    }

    onShow = () => {
        this.setState({
            visible: true
        })
    }

    onCancel = () => {
        this.setState({
            visible: false
        })
    }

    onOk = (value) => {
        const { changeLayout } = this.props;
        const color = `#${value.color}`;
        const fscolor = `#${value.fscolor}`;
        changeLayout({
            ...value,
            color,
            fscolor
        })
    }

    render() {
        const { visible } = this.state;
        const { layout,save } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Row style={style.row}>
                <Col key={'1'} span={10}>
                    <FormItem
                        {...formItemLayout}
                        label="模板名称"
                    >
                        {getFieldDecorator('templateName', {
                            rules: [{
                                required: true, message: '请输入模板名称',
                            }],
                        })(
                            <Input style={{ width: '330px' }} placeholder={"请输入模板名称（同账号下的模板名称不能重复）"} />
                        )}
                    </FormItem>
                </Col>
                <Col key={'2'} className="text-right" span={14}>
                    <Button onClick={this.onShow} className="margin-sm-right">布局</Button>
                    <Button onClick={save}>保存</Button>
                </Col>

                <Modal
                    title='布局风格'
                    width={470}
                    visible={visible}
                    footer={null}
                    onCancel={this.onCancel}
                    destroyOnClose
                >
                    <LayoutModal
                        layout={layout}
                        onCancel={this.onCancel}
                        onOk={this.onOk}
                    />
                </Modal>
            </Row>
        )
    }
}

export default Head
