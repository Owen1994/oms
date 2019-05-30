import React from 'react';
import { Upload } from 'antd';
import { fetchUpload } from '../../util/fetch';
import { randNum } from '../../util/baseTool';

export default class CUpload extends React.Component {

    state = {
        files: []
    }

    handleRequest = (file) => {
        fetchUpload(this.props.url, [file.file])
            .then(result => {
                if(result.state==='000001'&&
                    Array.isArray(result.data)&&
                    result.data.length > 0
                ){
                    this.setState(prevState => {
                        const files = [...prevState.files];
                        files.push({
                            name: result.data[0].filename, 
                            url: result.data[0].path,
                            uid: randNum()
                        })
                        return {
                            files
                        }
                    }, () => {
                        if(this.props.onChange){
                            this.props.onChange(this.state.files);
                        }
                    });
                }
        });
    }

    handleRemove = (file) => {
        if (this.props.onRemove) {
            this.props.onRemove(this.state.files);
        }
        this.setState(prevState => {
            const files = prevState.files.filter(item => item.uid !== file.uid);
            return {
                files
            }
        },() => {
            if(this.props.onChange){
                this.props.onChange(this.state.files);
            }
        })
    }

    render(){
        return (
            <Upload
                customRequest={this.handleRequest}
                {...this.props.config}
                fileList={this.state.files}
                onRemove={this.handleRemove}
            >
                {this.props.children}
            </Upload>
        )
    }

    componentDidMount(){
        this.parseValue(this.props.value);
    }

    componentWillReceiveProps(nextProps){
        const preValue = this.props.value;
        const value    = nextProps.value;
        if(preValue !== value){
            this.parseValue(value);
        }
    }

    parseValue = (value) => {
        this.setState({
            files: value.map(item => {
                item.uid = randNum();
                return item;
            })
        })
    }
}
