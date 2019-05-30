import React from 'react';
import CMarkdownPreviewHtml from '../../../../components/cmarkdown/previewhtml';
import { Button } from 'antd';

export default class TestMarkdown extends React.Component {

  state = {
    config: {}
  }

  handleClick = (type) => {
    let config = {};
    switch(type){
      case 1:
        config.markdown = "###Hello world!" + Math.ceil(Math.random()*1000);
      break;
      case 3:
        config.html = `<a href="https://www.baidu.com/">百度一下 ${Math.ceil(Math.random()*1000)}</a>`;
      break;
      case 4:
        config.appendHtml = `<a href="https://www.sohu.com/">搜狐 ${Math.ceil(Math.random()*1000)}</a>`;
      break;
    }
    this.setState({config});
  }


  render(){
    const config = this.state.config;
    return (
      <div style={{backgroundColor: '#fff', padding: 10}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
          <Button onClick={() => this.handleClick(1)}>Reset Markdown</Button>
          <Button onClick={() => this.handleClick(3)}>Reset Html</Button>
          <Button onClick={() => this.handleClick(4)}>Append Html</Button>
        </div>
        <div>
          <CMarkdownPreviewHtml
            config={config}
          />
        </div>
      </div>
    )
  }
}
