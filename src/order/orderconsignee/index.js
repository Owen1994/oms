
import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import {functions} from "../../util/baseTool";

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

export default class Entrance extends React.Component {
    render() {
        return (functions(this, '001-000004-000004-001') ?
            <Provider store={store}>
                <App {...this.props}/>
            </Provider>:null
        );
    }
}

