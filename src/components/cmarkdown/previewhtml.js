import React from 'react';
import PropTypes from 'prop-types';

export default class Previewhtml extends React.Component {

    state = {
        url: 'https://erp.youkeshu.com/download/mditor29/watch2Html.html'
    }

    componentDidMount(){
        window.addEventListener("message", this.receiveMessage, false);
    }

    componentWillReceiveProps(nextProps){
        const preConfig = this.props.config;
        const config    = nextProps.config;
        if(preConfig !== config){
            const previewMarkdown = frames['previewMarkdown'];
            previewMarkdown.postMessage(config, "*");
        }
    }

    componentWillUnmount(){
        window.removeEventListener("message", this.receiveMessage, false);
    }

    receiveMessage = (event) => {
        console.log("receiveMessage event :", event);
    }

    render(){
        const url = this.state.url;
        return (
            <div>
                <iframe
                    id='previewMarkdown'
                    name='previewMarkdown'
                    style={{border:0,width:"100%",height:640}}
                    src={url}
                />
            </div>
        )
    }
}

Previewhtml.propTypes = {
    config: PropTypes.object.isRequired
}
