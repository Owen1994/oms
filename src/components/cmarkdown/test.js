import React from 'react';
import CMarkdown from '../../../../components/cmarkdown';
import { Button } from 'antd';

export default class TestMarkdown extends React.Component {

  state = {
    config: {}
  }

  handleClick = (type) => {
    let config = {};
    switch(type){
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 16:
      case 17:
        config = {
          type
        }
      break;
      case 11:
        config = {
          type,
          lineNumber: 20
        }
      break;
      case 12:
        config = {
          type,
          toolbarIcons: 'simple'
        }
      break;
      case 13: // theme
        config = {
          type,
          theme: 'dark'
        }
      break;
      case 14: // editorTheme
        config = {
          type,
          editorTheme: 'pastel-on-dark'
        }
      break;
      case 15: // previewTheme
        config = {
          type,
          previewTheme: 'dark'
        }
      break;
    }
    this.setState({config});
  }

  handleMessage = (event) => {
    const data = event.data;
    if(data.type === 3) { // 获取markdown源码
      console.log("markdown source :", data.md);
    } else if(data.type === 4) { // 获取html源码
      console.log("html source :", data.html);
    }
  }

  render(){
    const config = this.state.config;
    return (
      <div style={{backgroundColor: '#fff', padding: 10}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
          <Button onClick={() => this.handleClick(1)}>Show editor</Button>
          <Button onClick={() => this.handleClick(2)}>Hide editor</Button>
          <Button onClick={() => this.handleClick(3)}>Get Markdown</Button>
          <Button onClick={() => this.handleClick(4)}>Get HTML</Button>
          <Button onClick={() => this.handleClick(5)}>Watch</Button>
          <Button onClick={() => this.handleClick(6)}>Unwatch</Button>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
          <Button onClick={() => this.handleClick(7)}>Preview HTML</Button>
          <Button onClick={() => this.handleClick(8)}>Fullscreen</Button>
          <Button onClick={() => this.handleClick(9)}>Show toolbar</Button>
          <Button onClick={() => this.handleClick(10)}>Hide toolbar</Button>
          <Button onClick={() => this.handleClick(11)}>Goto line 90</Button>
          <Button onClick={() => this.handleClick(12)}>ToolbarIcons Set</Button>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
          <Button onClick={() => this.handleClick(13)}>Theme</Button>
          <Button onClick={() => this.handleClick(14)}>Editor Theme</Button>
          <Button onClick={() => this.handleClick(15)}>Preview Theme</Button>
          <Button onClick={() => this.handleClick(16)}>ToC default</Button>
          <Button onClick={() => this.handleClick(17)}>ToC Dropdown menu</Button>
        </div>
        <div>
          <CMarkdown
            config={config}
            handleMessage={this.handleMessage}
          />
        </div>
      </div>
    )
  }
}
