import React from 'react'
import Category from './category'
import HotItem from './hotItem'
import NewListItem from './newListItem'

class Left extends React.Component {

    onChange = (type) => {
        const { has, changeState } = this.props;
        has[type] = false
        changeState({
            has
        })
    }

    render() {
        const {
            module,
            changeState,
            layout,
        } = this.props;
        const {
            category,
            hotItem,
            newListItem,
        } = module;
        return (
            <div className="template-main-left">
                {
                    category.has ? <Category layout={layout} changeState={changeState} module={module} type={'category'}></Category> : null
                }
                {
                    hotItem.has ? <HotItem layout={layout} changeState={changeState} module={module} type={'hotItem'}></HotItem> : null
                }
                {
                    newListItem.has ? <NewListItem layout={layout} changeState={changeState} module={module} type={'newListItem'}></NewListItem> : null
                }
            </div>
        )
    }
}

export default Left
