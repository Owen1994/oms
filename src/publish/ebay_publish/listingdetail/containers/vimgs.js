import React from 'react'
import { connect } from 'react-redux'
import Vimgs from '../components/skuinfo/variationimgs'
import { parseVimgs } from '../selector/vimgs'
import vlistParseVimgs from '../selector/vlist';
import {
    uploadVimg,
    getGalleryListAction
} from '../actions/skuvariation'

const mapStateToProps = (state, props) => {
    const vrelationship = state.vrelationship;
    const saleAccount = state.basicData.saleAccount
    const vlist = vlistParseVimgs(state);
    const dataSource = parseVimgs(state)
    return { saleAccount, vlist, vrelationship, dataSource, ...props }
};

export default connect(
    mapStateToProps, {
        uploadVimg,
        getGalleryListAction
    }
)(Vimgs)
