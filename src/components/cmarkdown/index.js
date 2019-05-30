import React from 'react';
import PropTypes from 'prop-types';

export default class CMarkdown extends React.Component {

    state = {
        url: 'https://erp.youkeshu.com/download/mditor29/index.html'
    }

    componentDidMount(){
        window.addEventListener("message", this.receiveMessage, false);
    }

    componentWillReceiveProps(nextProps){
        const preConfig = this.props.config;
        const config    = nextProps.config;
        if(config && preConfig !== config){
            const editorMarkdown = frames['editorMarkdown'];
            editorMarkdown.postMessage(config, "*");
        }
    }

    componentWillUnmount(){
        window.removeEventListener("message", this.receiveMessage, false);
    }
 
    receiveMessage = (event) => {
        this.props.handleMessage(event);
    }

    render(){
        const url = this.state.url;
        return (
            <div>
                <iframe
                    id='editorMarkdown'
                    name='editorMarkdown'
                    style={{border:0,width:"100%",height:640}} 
                    src={url}
                />
            </div>
        )
    }
}

CMarkdown.propTypes = {
    handleMessage: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
}
