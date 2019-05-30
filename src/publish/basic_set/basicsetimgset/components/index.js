import React from 'react'
import SearchComponent from './Search'
import { Form } from 'antd'
import TableList from './TableList'
import AddUpdateModal from '../containers/AddModal'
import { deepCopyobject } from '../../../../util/baseTool'
/**
 *作者: huangjianfeng
 *功能描述:  图库设置组件容器
 *时间: 2018/8/27 15:55
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        addUpdateVisible: false,   // 修改、新增弹窗是否显示
        item: undefined    // 选中的条目
    }

    componentDidMount() {
        this.handleSubmit()
        this.props.loadGalleryImgList({ data: { modelName: "galleryList" } }) // 加载图库类型数据
        this.props.loadImgTypeList({ data: { modelName: "pictureType" } }) //加载图片类型数据
    }

    handleSubmit = (page, pageSize) => {
        this.props.form.validateFields((err, value) => {
            const params = { data: { ...value, modelName: 'pictureSetting' } }
            if (page) {
                params.data.pageNumber = page
            } else {
                page = params.data.pageNumber = this.state.pageNumber
            }
            if (pageSize) {
                params.data.pageData = pageSize
            } else {
                pageSize = params.data.pageData = this.state.pageData
            }

            this.setState({
                pageNumber: page,
                pageData: pageSize
            })
            this.props.queryGalleryList(params)
        })
    }

    showAddUpdateModal = (item) => {
        let params = {
            addUpdateVisible: true
        }
        if (item) {
            params.item = deepCopyobject(item)
        }
        this.setState(params)
    }
    render() {
        const {
            pageData,
            pageNumber,
            addUpdateVisible,
            item,
        } = this.state
        return (
            <div>
                <SearchComponent
                    {...this.props}
                    handleSubmit={this.handleSubmit}
                />
                <TableList
                    {...this.props}
                    pageData={pageData}
                    pageNumber={pageNumber}
                    handleSubmit={this.handleSubmit}
                    showAddUpdateModal={this.showAddUpdateModal}
                />
                <AddUpdateModal
                    visible={addUpdateVisible}
                    onCancel={() => this.setState({ addUpdateVisible: false, item: undefined })}
                    item={item}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}
export default Form.create()(App)