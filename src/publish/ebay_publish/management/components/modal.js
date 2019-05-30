import React from 'react'
import ItemSelect from '../../../../common/components/itemSelect'
import {
    Modal,
    Form,
    Button,
    message,
    Upload,
    Cascader,
    Tooltip,
} from 'antd'
import { fetchPost, fetchUpload } from '../../../../util/fetch';
import * as API from '../../../common/constants/Api'
const FormItem = Form.Item;

class AddModal extends React.Component {
    state = {
        categoryId: '', //分类最小一级id
        site: '',       //站点        
        fileList: [],
        fileUrl: '',
        options: [],
        tip: '',
        loading: false,
    };
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    options = [];
    //提交
    handleSubmit = () => {
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //判断是否选择最小级分类
                if(this.state.categoryId){
                    values.categoryId = this.state.categoryId;
                }else{
                    message.error('eBay分类请选择到最小一级');
                    return;
                }
                //判断是否已上传文件
                if(this.state.fileUrl){
                    let arr = this.state.fileUrl.split('/');
                    let str = arr[arr.length - 1].split('.')[0];
                    values.excelUrl = this.state.fileUrl;
                    values.autoPartsName = str.slice(0, str.length-14);
                }else{
                    message.error('请先上传文件');
                    return;
                }
                //发起请求
                fetchPost(API.IMPORT_PART, values, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.props.handleSubmit();
                            this.handleCancel();
                        }
                    })
            } else {
                Object.keys(err).some(item => message.error(err[item].errors[0].message));
            }
        })
    }
    //取消
    handleCancel = () => {
        this.setState({ 
            categoryId: '',
            site: '',
            fileList: [],
            fileUrl: '',
            options: [],
            tip: '',
            loading: false,
         });
        this.props.closeModal();
    }
    //文件移除
    removeUpload = (file) => {
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        });
        this.setState({fileUrl: ''})
    };
    //文件上传
    beforeUpload = (file, fileList) => {
        const reg = /\.(xls|xlsx)$/i;
        // this.setState({ loading: false });
        if (reg.test(file.name)) {
            message.info('文件正在上传，请稍候');
            fetchUpload('/yks/file/server/', fileList).then(data => {
                if (data.state === '000001') {
                    let fileUrl = data.data[0] && data.data[0].path;
                    this.setState({
                        fileList: [file],
                        loading: false,
                        fileUrl
                    })
                    message.success('文件上传成功');
                }
            }).catch(error => console.log(error))
        } else {
            message.error("请上传Excel文件！")
            return false;
        }
    };
    //选择站点，选择完毕后初始化ebay分类
    handleSiteChange = (value) => {
        this.setState({
            loading: false,
            site: value,
            tip: '',
         });
        fetchPost(API.GET_EBAY_CLASS, { parentCategoryId: "", site: value }, 0)
            .then(res => {
                if (res.state === '000001' && res.data.length > 0) {
                    this.options = [];
                    res.data.map(item => {
                        this.options.push({ value: item.id, label: item.name, isLeaf: item.isLeaf });
                    });
                    this.setState({ 
                        options: this.options,
                     });
                }
            })
    }
    //级联选择时进行提示并监听是否为叶子节点
    onChange = (value, selectedOptions) => {
        let tip = '';
        const lastOption = selectedOptions[selectedOptions.length - 1];
        //保存按钮loading停止旋转
        this.setState({ loading: false });
        //拼接tooltip
        selectedOptions.map(item=>{
            if(!item.isLeaf){
                tip += item.label + ' / ';
            }else{
                tip += item.label;
            }
        })
        this.setState({tip});
        //为叶子节点时保存categoryId
        if (lastOption && lastOption.isLeaf) {
            this.setState({ categoryId: lastOption.value });
        }else{
            this.setState({ categoryId: ''});
        }
    }
    //延时加载数据
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        return fetchPost(API.GET_EBAY_CLASS, { parentCategoryId: targetOption.value, site: this.state.site }, 0)
            .then(res => {
                if (res.state === '000001') {
                    targetOption.loading = false;
                    targetOption.children = [];
                    res.data.map(item => {
                        targetOption.children.push({ value: item.id, label: item.name, isLeaf: item.isLeaf });
                    });
                    this.setState({
                        options: [...this.state.options],
                    });
                }
            })
    }

    render() {
        const { title, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="part-modal">
                <Modal
                    visible={visible}
                    title={title}
                    destroyOnClose={true}
                    okText="保存"
                    width={600}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form>
                        <div className="part-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="站点"
                                className="oms-itemselect_label_required"
                            >
                                <ItemSelect
                                    getFieldDecorator={getFieldDecorator}
                                    formName='siteId'
                                    url={API.GET_EBAY_SITE}
                                    code="id"
                                    name="name"
                                    params={{ 'pageData': 20, 'pageNumber': 1 }}
                                    rules={{
                                        rules: [{
                                            required: true, message: '站点不能为空',
                                        }],
                                    }}
                                    apiListType={2}
                                    onChange={this.handleSiteChange}
                                />
                            </FormItem>
                            {this.state.site ? (
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="eBay分类："
                                        className="oms-itemselect_label_required"
                                    >
                                    <Tooltip placement="top" title={this.state.tip}>
                                        <div className="part-modal-cascader">
                                            <Cascader
                                                options={this.state.options}
                                                loadData={this.loadData}
                                                onChange={this.onChange}
                                                changeOnSelect
                                                placeholder={'需选择至最小级别ebay分类'}
                                            />
                                        </div>
                                            </Tooltip>
                                    </FormItem>
                            ) : null}
                            <FormItem
                                {...this.formItemLayout}
                                label="文件："
                                className="oms-itemselect_label_required"
                            >
                                <Upload
                                    beforeUpload={this.beforeUpload}
                                    onRemove={this.removeUpload}
                                    fileList={this.state.fileList}
                                >
                                    <Button type="primary">
                                        选择文件
                                    </Button>
                                </Upload>
                                <p>注：仅限xls/xlsx文件格式</p>
                            </FormItem>
                        </div>
                        <div className="part-submitBtn">
                            <Button onClick={this.handleCancel}>取消</Button>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal)