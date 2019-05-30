import React from 'react';
import { Button, Tooltip } from 'antd';
import emotionData from './emotionData';
import { randNum } from '../../../../util/baseTool';
import './index.css';

class Emotion extends React.Component {
    state = {
        isHover: false,
        usedCommlyEmotions: JSON.parse(localStorage.getItem('usedCommlyEmotions')),
    }

    onClick = (meaning) => {
        const { usedCommlyEmotions } = this.state;
        let emtionArr = [];
        const target = emotionData.find(item => item.meaning === meaning);
        if (usedCommlyEmotions) {
            emtionArr = usedCommlyEmotions;
            if (!emtionArr.includes(target)) {
                if (emtionArr.length > 5) {
                    emtionArr.shift();
                }
                emtionArr.push(target);
            }
        } else {
            emtionArr.push(target);
        }
        localStorage.setItem('usedCommlyEmotions', JSON.stringify(emtionArr));
        this.setState({
            usedCommlyEmotions: emtionArr,
            isHover: false,
        });
        this.props.handleSelectEmotion(meaning);
    }

    onMouseEnter = () => {
        this.setState({
            isHover: true,
        });
    }

    onMouseLeave = () => {
        this.setState({
            isHover: false,
        });
    }

    render() {
        const { usedCommlyEmotions } = this.state;
        const Content = props => (
            <div className={['smileys', props.isHover ? null : 'display-none'].join(' ')} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <ul className="ui-smileys-all">
                    {
                        emotionData.map(item => (
                            <li key={item.title} onClick={() => this.onClick(item.meaning)}>
                                <img alt={item.title} title={item.title} data-entity={item.title} data-meaning={item.meaning} src={item.src} />
                            </li>
                        ))
                    }
                </ul>
                <ul className={['ui-best-smileys-list', usedCommlyEmotions ? 'ui-best-smileys-line' : ''].join(' ')}>
                    {
                        usedCommlyEmotions
                            ? usedCommlyEmotions.map(item => (
                                <li key={randNum()} onClick={() => this.onClick(item.meaning)}>
                                    <img alt={item.title} title={item.title} data-entity={item.title} data-meaning={item.meaning} src={item.src} />
                                </li>
                            ))
                            : null
                    }
                </ul>
            </div>
        );
        return (
            <div className="emotion-box">
                <Tooltip placement="bottom" title="选择表情">
                    <Button onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} icon="smile" style={{ marginLeft: 10, fontSize: 18 }} />
                </Tooltip>
                <Content isHover={this.state.isHover} />
            </div>
        );
    }
}
export default Emotion;
