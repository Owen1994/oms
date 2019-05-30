import React from 'react'
import SearchComponent from './Search'
import { Form } from 'antd'
import TableList from './TableList'
import AddUpdateModal from './AddModal'

/**
 *作者: huangjianfeng
 *功能描述:  标题设置组件容器
 *时间: 2018/8/27 15:55
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        addUpdateVisible: false,
        item: undefined
    }

    componentDidMount() {
        this.handleSubmit()
    }

    handleSubmit = (page, pageSize) => {
        this.props.form.validateFields((err, value) => {
            const params = { data: {...value, modelName: 'titlePrefix' } }
            if(page && pageSize) {
                params.data.pageNumber = page
                params.data.pageData   = pageSize
                this.setState({
                    pageNumber: page,
                    pageData: pageSize
                })
            } else {
                params.data.pageNumber = this.state.pageNumber
                params.data.pageData   = this.state.pageData
            }
            this.props.queryTitleList(params)
        })
    }
    render(){
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
                    showAddUpdateModal={(item) => this.setState({
                                        item, 
                                        addUpdateVisible: true
                                    })}
                />
                <AddUpdateModal
                    visible={addUpdateVisible}
                    onCancel={()=>this.setState({addUpdateVisible: false})}
                    item={item}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}
export default Form.create()(App)