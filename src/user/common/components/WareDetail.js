import React from 'react';
import { randNum } from '@/util/baseTool';

const WareDetail = ({ operValuesArr=[] }) => (
        <div className="pt" key={randNum()}>
            <div className="ptText">
                {
                    operValuesArr.map((m, n) => (
                            <div key={m.value}>
                                <div className="subAccount">
                                    {m.label}
                                </div>
                                {n == operValuesArr.length - 1 ? '' : <span className="margin-ss-left margin-ss-right v-line">|</span>}
                            </div>
                    ))
                }
            </div>
        </div>
);

export default WareDetail;
