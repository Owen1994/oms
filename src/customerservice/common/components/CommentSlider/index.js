import React from 'react';
import './index.css';

export default class CommentSlider extends React.Component {
    render() {
        const {
            value, marks, popover, aver, averPopover,
        } = this.props;
        const total = marks[marks.length - 1] - marks[0];
        const per = (value - marks[0]) / total * 100;
        const averPer = (aver - marks[0]) / total * 100;
        return (
            <div className="comment-slider">
                <div className="comment-slider-rail">
                    <div className="comment-slider-track" style={{ width: `${per}%` }} />
                </div>
                <div className="comment-slider-mark">
                    {marks.map((item) => {
                        const itemPer = (item - marks[0]) / total * 100;
                        return <div key={item} className="comment-slider-mark-text" style={{ left: `${itemPer}%` }}>{item}</div>;
                    })}
                </div>
                <div className="comment-slider-popover" style={{ left: `${per}%` }}>
                    {popover.map(item => <div key={item}>{item}</div>)}
                </div>
                {this.props.isDailyScore
                    ? (
                        <div className="daily-slider-intro">
                            <div className="daily-slider-line">
                                <div className="daily-slider-progress">
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                </div>
                                <div className="daily-slider-words">
                                    <div>不利于曝光</div>
                                    <div>正常曝光</div>
                                    <div>有利于曝光</div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className="comment-slider-popover-aver" style={{ left: `${averPer}%` }}>
                            {averPopover.map(item => <div key={item}>{item}</div>)}
                        </div>
                    )
                }
            </div>
        );
    }
}
