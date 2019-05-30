import React from 'react'
import {Modal,Button,Upload,Icon, message,Input} from 'antd'
const { TextArea } = Input;
import {angentPicUrl} from '../../../../util/baseTool'
import ImageDrag from './reactDrag/RightDrag';
import * as types from "../../../ebay_publish/listingdetail/constants/reducerTypes";
let imgId = 999999;


export default class ImgsUploadAndDrag extends React.Component{
    state={
        visible1: false
    }

    showInput = () => {
        this.setState({
            visible1: true,
            urls : ""
        });
    }
    saveUrl = (e)=>{
        this.setState({
            urls: e.target.value
        })
    }
    handleNetImgs = (e) => {
        const {urls} = this.state;
        let {img} = this.props.skuinfoData;
        let imgsArr = urls.split('\n');
        let newImgs = []
        imgsArr.forEach((v,i)=>{
            if(v){
                newImgs.push({
                    label: v,
                    value: ++imgId,
                    url: angentPicUrl(v),
                    oldUrl: v
                })
            }
        });
        img = [...img, ...newImgs];
        this.props.editComponentDataAction(types.ADD_SKUINFO, 'img', img);
        this.setState({
            visible1: false,
        });
    }

    netImgsCancel = (e) => {
        console.log(e);
        this.setState({
            visible1: false,
        });
    }

    render(){
        const { visible,confirmLoading,fileList,skuImages} = this.props;
        const {
            beforeUpload,
            handleUpload,
            move,
            imgHandleChecked,
            handleDel,
            showModal,
            cancelUpload,
            onRemove,
        } = this.props.imgsUploadConfig;
        const props = {
            multiple: true,
            beforeUpload: beforeUpload,
            onRemove: onRemove,
        };

        return(
            <div>
                <div className="overflow-hidden">
                    <div className="upload-imgs">
                        <Button
                            type="primary"
                            onClick={showModal}
                        >
                            <Icon type="upload" /> 上传本地图片
                        </Button>
                        <Button
                            type="default"
                            onClick={this.showInput}
                        >上传网络图片</Button>
                        <Button
                            type="default"
                            onClick={()=>handleDel("checked")}
                        >删除选中</Button>
                        <Button
                            type="default"
                            onClick={()=>handleDel("unChecked")}
                        >删除未选中</Button>
                    </div>
                </div>
                <div>
                    <p className="upload-tips text-danger">注：最多仅能保留12张图片，支持拖动排序</p>
                    <ImageDrag
                        data={skuImages}
                        move={move}
                        handleDel={handleDel}
                        imgHandleChecked={imgHandleChecked}
                    />
                    <div>
                        <Modal title="上传本地图片"
                               visible={visible}
                               onOk={handleUpload}
                               confirmLoading={confirmLoading}
                               onCancel={cancelUpload}
                               okText="确定上传"
                               className="ebay-upload_photos"
                        >
                            <Upload {...props} fileList={fileList}>
                                <Button type="dashed" >
                                    <Icon type="plus" /> 添加图片
                                </Button>
                            </Upload>
                        </Modal>
                        <Modal
                            title="上传网络图片"
                            visible={this.state.visible1}
                            onOk={this.handleNetImgs}
                            onCancel={this.netImgsCancel}
                        >
                            <TextArea
                                value={this.state.urls}
                                placeholder={"请输入网络图片地址，多个地址使用换行符隔开..."}
                                rows={3}
                                onChange={(e)=>this.saveUrl(e)}
                            />
                        </Modal>

                    </div>
                </div>
            </div>
        )
    }
}