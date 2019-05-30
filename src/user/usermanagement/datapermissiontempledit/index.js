import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';
import Functions from '../../../components/functions';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware),
);

export default class Entrance extends React.Component {
    render() {
        return (
            <Functions {...this.props} functionkey="004-000001-000002-000001-000002-001">
                <Provider store={store}>
                    <App {...this.props} />
                </Provider>
            </Functions>
        );
    }
}
