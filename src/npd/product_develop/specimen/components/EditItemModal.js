import React from 'react';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Modal,
    Button,
    Upload,
    Icon,
    Tooltip,
    InputNumber
} from 'antd';
import { EDIT_SAMPLE_API } from '../constants/Api'
import { CURRENCY_LIST, SAMPLE_TYPE } from '../../constants'
import { UPLOAD_URL } from '../../../../constants/Api'
import { fetchUpload, fetchPost } from '../../../../util/fetch'
import { parseUploadFileObj } from '../../../../util/baseTool'

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const uploadButton = (
    <Icon type="plus" />
);
class EditItemModal extends React.Component {
    state = {
        loading: false,
        avatars: [],
        files: []
    }
    handleSubmit = (type) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = { ...values };
                params.id = this.props.item.id;
                params.type = type;
                params.avatar = this.state.avatars.map(item => {
                    return item.url
                })[0]
                params.accessories = this.state.files.map(item => {
                    return {
                        name: item.name,
                        url: item.url
                    }
                })
                fetchPost(EDIT_SAMPLE_API, params, 1).then(data => {
                    if (data.state === '000001') {
                        this.props.handleSubmit();
                        this.props.handleCancel();
                    }
                })
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        const item = nextProps.item;
        const prevItem = this.props.item;
        const prevVisible = this.props.visible;
        const visible = nextProps.visible;

        if (item && visible && !prevVisible) {
            this.setState({
                files: [],
                avatars: []
            })
            if(item.accessories&&item.accessories.length>0){
                const accessories = item.accessories.map((it, index) => {
                    it.uid = 'file-'+Date.now()+index;
                    return it;
                })
                this.setState({
                    files: accessories
                })
            }
            if(item.avatar){
                const avatars = [];
                const avatar = { url: item.avatar, name: '', uid: 'avatar-'+Date.now()}
                avatars.push(avatar);
                this.setState({
                    avatars
                })
            }
            setTimeout(()=>{
                nextProps.form.setFieldsValue({
                    'avatar': item.avatar,
                    'logisticsType': item.logisticsType,
                    'sampleCode': item.sampleCode,
                    'sampleType': item.sampleType?Number.parseInt(item.sampleType, 10):'',
                    'logisticsCode': item.logisticsCode,
                    'logisticsPrice': item.logisticsPrice,
                    'logisticsCurrency': item.logisticsCurrency?Number.parseInt(item.logisticsCurrency,10):1,
                    'samplePrice': item.samplePrice,
                    'sampleCurrency': item.sampleCurrency?Number.parseInt(item.sampleCurrency, 10):1,
                    'consignee': item.consignee,
                    'shippingAddress': item.shippingAddress,
                    'code': item.supplierCode
                })
            },500)
            
        }
    }

    beforeUpload = (type, file, fileList) => {
        fetchUpload(UPLOAD_URL, fileList).then(data => {
            if (data.state === '000001') {
                this.setState(prevState => {
                    const item = parseUploadFileObj(data.data[0]);
                    if (type === 'avatars') {
                        item.name = '';
                    }
                    const files = type === 'avatars' ? [] : [...prevState.files];
                    files.push(item);
                    return {
                        [type]: files
                    }
                })
            }
        }).catch(error => console.log(error))
    }

    removeUpload = (name, file) => {
        if (!name || !file) {
            return;
        }
        const array = this.state[name];
        const newArray = array.filter((item, index) => item.uid !== file.uid)
        this.setState({
            [name]: newArray
        })
    }

    createUploadFileElement = () => {
        const length = this.state.files.length;
        if (length < 3) {
            return (
                <Button>
                    <Icon type="upload" /> 添加附件
                </Button>
            )
        } else {
            return null;
        }
    }
    render() {
        const { handleCancel, visible,item } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { avatars, files } = this.state;
        const currencyListElement = CURRENCY_LIST.map((item) =>
            <Option key={item.key} value={item.key}>{item.name}</Option>
        );
        const sampleTypeListElement = SAMPLE_TYPE.map((item) =>
            <Option key={item.key} value={item.key}>{item.name}</Option>
        );
        return (
            <Modal
                title="修改样品"
                visible={visible}
                width={600}
                destroyOnClose
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>取消</Button>,
                    <Button key="save" onClick={() => this.handleSubmit(1)}>保存</Button>,
                    <Tooltip placement="bottom" title={"允许修改当前数据"}>
                        <Button key="submit" type="primary" onClick={() => this.handleSubmit(2)}>
                            提交
                        </Button>
                    </Tooltip>
                ]}
            >
                <Form>
                    <FormItem
                        label="上传图片:"
                        {...formItemLayout}
                    >
                        <Upload
                            listType="picture"
                            beforeUpload={(file, fileList) =>
                                this.beforeUpload('avatars', file, fileList)
                            }
                            fileList={avatars}
                            onRemove={(file) => this.removeUpload('avatars', file)}
                        >
                            {avatars.length >= 1 ? null : uploadButton}
                        </Upload>
                    </FormItem>
                    <FormItem
                        label="样品单号:"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('sampleCode')(
                            <Input readOnly />
                        )}
                    </FormItem>
                    <FormItem
                        label="供应商名称:"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('code')(
                            <Input readOnly />
                        )}
                    </FormItem>
                    <FormItem
                        label="样品类型:"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('sampleType')(
                            <Select
                                placeholder="请选择"
                            >
                                {sampleTypeListElement}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="物流方式"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('logisticsType')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="物流单号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('logisticsCode')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="物流费用:"
                        {...formItemLayout}
                    >
                        <Row>
                            <Col span={15}>
                                {getFieldDecorator('logisticsPrice')(
                                    <InputNumber  precision={2}/>
                                )}
                            </Col>
                            <Col span={8} offset={1}>
                                {getFieldDecorator('logisticsCurrency')(
                                    <Select
                                        showSearch
                                        placeholder="请选择币种"
                                    >
                                        {currencyListElement}
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        label="样品成本:"
                        {...formItemLayout}
                    >
                        <Row>
                            <Col span={15}>
                                {getFieldDecorator('samplePrice')(
                                    <InputNumber precision={2}/>
                                )}
                            </Col>
                            <Col span={8} offset={1}>
                                {getFieldDecorator('sampleCurrency')(
                                    <Select
                                        showSearch
                                        placeholder="请选择币种"
                                    >
                                        {currencyListElement}
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        label="收件人:"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('consignee')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="地址:"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('shippingAddress')(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                    <FormItem
                        label="附件:"
                        {...formItemLayout}
                    >
                        <Upload
                            beforeUpload={(file, fileList) =>
                                this.beforeUpload('files', file, fileList)
                            }
                            fileList={files}
                            onRemove={(file) => this.removeUpload('files', file)}
                        >
                            {
                                this.createUploadFileElement()
                            }
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(EditItemModal)