import React from 'react';
// import PropTypes from 'prop-types';
import Filteritem from "./filterItem"
import { Icon } from 'antd';
import "./css.css"


class Filter extends React.Component {
    state = {
        obj:{},
        store:[],
        storeObj:[],
        showObj:{},
    }
    clearFn = []
    clearAll = []
    onChange = (addValue,addObj,delValue,delObj,showField,valueField,type,isMultiple,flag=true)=>{
        if(addValue && addValue.length ===1 && !addValue[0]) return;
        var {showObj,obj} = this.state;
        var {onChange} = this.props
        if(addObj && addValue){
            
            if(!obj[type]){
                obj[type] = {
                    values:null,
                    data:null
                }
            }
            if(isMultiple){
                if( !Array.isArray(obj[type].values)){
                    obj[type].values = []
                    obj[type].data = []
                }
                for (let index = 0; index < addObj.length; index++) {
                    var show =showField?addObj[index][showField]:addObj[index];
                    obj[type].values.push(addValue[index])
                    obj[type].data.push(addObj[index])

                    if(!showObj[type]){
                        showObj[type] = []
                    }
                    showObj[type].push(show)
                }
            }else {
                
                let show =showField?addObj[0][showField]:addObj[0];
                obj[type].values = addValue[0]
                obj[type].data = addObj[0]
                if(!showObj[type]){
                    showObj[type] = []
                }
                showObj[type].push(show)
            }
           
        }
        
        if(delValue.length&&delObj.length){

            if(isMultiple){
                for(var l= obj[type].data.length,i=l-1;i>=0;i--){
                    for(var len= delObj.length,j=len-1;j>=0;j--){
                        if(delObj[j] === obj[type].data[i]){
                            obj[type].values.splice(i,1)
                            obj[type].data.splice(i,1)
                            showObj[type].splice(i,1)
                        }
                    }
                }
                if(obj[type].values && !obj[type].values.length){
                    delete obj[type]
                }
            }else {
                let i = obj[type].data === delObj[0]
                if( i){
                    delete obj[type]
                }

                var del =showField?delObj[0][showField]:delObj[0];
                var index = showObj[type].indexOf(del)
                if( index !== -1){
                    showObj[type].splice(index,1)
                }
            }

        }
        if(onChange && flag){
            onChange(obj)
        }
        this.setState({
            showObj:{...showObj},
            obj
        })
    }
    close = (data,key,type)=>{
        var result,isMultiple ;
        if(key === 0 && !Array.isArray(data.data)){
            result = data.data
            isMultiple = false
        }else {
            result = data.data[key]
            isMultiple = true
        }

        var {obj,showObj} = this.state;
        var {onChange} = this.props
        var clearFn = this.clearFn;
        if(isMultiple){
            obj[type].values.splice(key,1)
            obj[type].data.splice(key,1)
            if(!obj[type].data.length){
                delete obj[type]
            }
        }else {
            delete obj[type]
        }
        showObj[type].splice(key,1)
        clearFn.forEach(v=>{
            v(result)
        })
        if(onChange){
            onChange(obj)
        }
        this.setState({
            obj,
        })
    }
    clearAllFn = ()=>{
        this.clearAll.length && this.clearAll.forEach(v=>v())
        this.setState({
            obj:{}
        })
    }
    getClearStateFn = (ref)=>{
        if(!ref) return;
        var fn = ref.clearState
        var call = ref.clearAll
        if(fn && !this.clearFn.includes(fn)){
            this.clearFn.push(fn)
        }
        if(call && !this.clearAll.includes(call)){
            this.clearAll.push(call)
        }
    }
    componentWillReceiveProps(props){

    }
    render(){
        var {data,showroom} = this.props;
        showroom === undefined?showroom = true:showroom = !!showroom
        var filteritems = data.map((v,k)=>{
            var type = v.type || k
            return <Filteritem ref={this.getClearStateFn} type={type} key={k} data={v} onChange={this.onChange}/>
        })
        var showObj = this.state.showObj;
        var obj = this.state.obj;
        var showList = []
        Object.keys(showObj).forEach((v,k)=>{
            var list = showObj[v].map((val,key)=>{
                return <span className="list-filter-selection-choice" key={k+"-"+key}>
                            {val}<Icon onClick={()=>this.close(obj[v],key,v)} className="list-filter-selection-choice-close" type="close" />
                        </span>
            })
            showList.push(...list)
        })
        return (  
            <div className="list-filter-list">
                {
                    filteritems
                }
                {
                    showroom?
                    <div className="list-filter-selection">
                        {
                            showList
                        }
                    </div>
                    :null
                }
            </div>
        )
    }

}

export default Filter