import React from 'react';
import { randNum } from '@/util/baseTool';
import CTree from '@/components/ctree';


export default class StatisticsDetail extends React.Component {

    createCategory = (array = []) => (
        <div className="pt" key={randNum()}>
            <div className="ptTitle">
                指定[品类]
            </div>
            <div className="ptText">
                <CTree
                    code="cateId"
                    name="cateNameCn"
                    list={array}
                    checkable={false}
                />
            </div>
        </div>
    );

    createDataColumn = (array = []) => (
        <div className="pt" key={randNum()}>
            <div className="ptTitle">
                可查看[数据列]
            </div>
            <div className="ptText">
                {
                    array.filter(item => item.visiable === '可见').map((m, n) => (
                        <div key={randNum()}>
                            <div className="subAccount">
                                {m.name}
                            </div>
                            {n == array.length - 1 ? '' : <span className="margin-ss-left margin-ss-right v-line">|</span>}
                        </div>
                    ))
                }
            </div>
        </div>)

    render(){
        const operValuesArr = this.props.operValuesArr;
        return (
            operValuesArr.map((v, i) => {
                if (v.value === 'dataColumn') {
                    return this.createDataColumn(v.data);
                }
                if (v.value === 'firstCategory') {
                    return this.createCategory(v.data);
                }
            })
        )
    }
}
