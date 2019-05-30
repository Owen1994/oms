import React from 'react';
import { connect } from 'react-redux';
import App from '../components';
import {
    getNewChannelInfoAction,
    getHandleChangeAction,
    getAddItemAction,
    getMoveItemAction,
} from '../actions/channelinfo';

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch, ownProps) => ({
    getNewChannelInfoAction,
    getHandleChangeAction,
    getAddItemAction,
    getMoveItemAction,
});

export default connect( mapStateToProps, mapDispatchToProps() )(App)
