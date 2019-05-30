import React from 'react';

const CommonDetail = ({ operValuesArr=[] }) => (
    operValuesArr.map((_v, _i) => (
        <div className="pt" key={_i}>
            <div className="ptTitle">
                {_v.name ? `${_v.name} :` : ''}
            </div>
            <div className="ptText">
                {
                    _v.children ? _v.children.map((m, n) => (
                        <div key={n}>
                            <div className="subAccount">
                                        ( <a>{m.name}</a> ){m.children ? m.children.map((o, p) => {
                                    const children = [];
                                    children.push(`"${o.name}"`);
                                    return (
                                        children.join('')
                                    );
                                }) : ''}
                            </div>
                            {n == _v.children.length - 1 ? '' : <span className="margin-ss-left margin-ss-right v-line">|</span>}
                        </div>
                    )) : null
                }
            </div>
        </div>
    ))
);

export default CommonDetail;
