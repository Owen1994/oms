import React from 'react';

const PlatformDetail = ({ operValuesArr=[] }) => (
    <div className="pt">
        <div className="ptText" style={{ display: 'flex' }}>
            {   operValuesArr ? operValuesArr.map((_v, _i) => (
                <div key={_i}>
                    <span>{_v.platformName}</span>
                        { _i == operValuesArr.length - 1 ? 
                            '' :
                            <span className="margin-ss-left margin-ss-right v-line">|</span>
                        }
                </div>
                )) : null
            }
        </div>
    </div>
);

export default PlatformDetail;
