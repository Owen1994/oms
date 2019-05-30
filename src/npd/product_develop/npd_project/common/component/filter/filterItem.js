import React from 'react';
import {Icon} from "antd"

class Filteritem extends React.Component {
    state = {
        store:[],
        storeObj:[],
        oneLine:false,
        type:null,
    };
    defaultObj = {};
    defaultValue = "";
    componentWillMount(){
        const data = this.props.data;
        const type = this.props.type;
        const {oneLine,defaultValue,showField,valueField,list,isMultiple} = data;
        let getDefaultValue = [];
        let getDefaultObj = [];

        if(showField && valueField){
            this.defaultObj = {
                [showField]:"全部",
                [valueField]:""
            }
            this.defaultValue = ""
        }else {
            this.defaultObj = "全部"
            this.defaultValue = "全部"
        }
        if(defaultValue){
            if(Array.isArray(defaultValue)){
                if(showField && valueField  ){
                    if(isMultiple){
                        getDefaultValue = [...defaultValue]
                        for (let i = 0; i < list.length; i++) {
                            for (let j = 0; j < getDefaultValue.length; j++) {
                                if(list[i][valueField] ===getDefaultValue[j] ){
                                    getDefaultObj.push(list[i])
                                    break
                                }
                            }
                        }
                    }else {
                        getDefaultValue.push(defaultValue[0])
                        for (let i = 0; i < list.length; i++) {
                            if(list[i][valueField] ===getDefaultValue[0] ){
                                getDefaultObj.push(list[i])
                                break;
                            }
                        }
                    }
                }else { 
                    if(isMultiple){
                        getDefaultValue = [...defaultValue]
                        getDefaultObj = [...defaultValue]
                    }else {
                        
                        getDefaultValue = [defaultValue[0]]
                        getDefaultObj = [defaultValue[0]]
                    }
                }
            }else {
                getDefaultValue.push(defaultValue)
                for (let i = 0; i < list.length; i++) {
                    if(list[i][valueField] ===getDefaultValue[0] ){
                        getDefaultObj.push(list[i])
                        break;
                    }
                }
            }

            if(getDefaultValue.length !== getDefaultObj.length ){

                throw new Error("默认值设置错误")
            }
            this.setState({
                storeObj:[...getDefaultObj],
                store:[...getDefaultValue],
                oneLine:oneLine,
                type
            })
            
            if(this.props.onChange){
                this.props.onChange([...getDefaultValue],[...getDefaultObj],[],[],showField,valueField,type,isMultiple,false)
            }
        }else {
            this.setState({
                storeObj:[this.defaultObj],
                store:[this.defaultValue],
                oneLine:oneLine,
                type
            })
            if(this.props.onChange){
                this.props.onChange([this.defaultValue],[this.defaultObj],[],[],showField,valueField,type,isMultiple,false)
            }
        }
        
        
        
    }
    clearAll = ()=>{
        this.setState({
            storeObj:[this.defaultObj],
            store:[this.defaultValue],
        })
    }
    clearState = (obj)=>{
        const {storeObj,store} = this.state;
        for(let l=storeObj.length,i=l-1;i>=0;i--){
            if(storeObj[i] === obj){
                storeObj.splice(i,1)
                store.splice(i,1)
                if(!storeObj.length){
                    storeObj.push(this.defaultObj)
                    store.push(this.defaultValue)
                }
                break;
            }
        }
        this.setState({
            storeObj:[...storeObj],
            store:[...store],
        })
    }
    onClick = (v,value,index)=>{
        const {isMultiple,valueField,showField} = this.props.data;
        let store = this.state.store;
        let storeObj = this.state.storeObj;
        const type = this.state.type;
        
        if(storeObj.length ===1 && v === this.defaultObj && storeObj[0] === this.defaultObj  ) return
        let addObj = null,
            addValue = null,
            delObj= [],
            delValue =[]

        if(isMultiple){
            if(index !== -1){
                store.splice(index,1)
                storeObj.splice(index,1)
                if(store.length === 0){
                    store = [this.defaultValue]
                    storeObj = [this.defaultObj]
                }
                if(v !== this.defaultObj ){
                    delObj.push(v)
                    delValue.push(value) 
                }
            }else {
                if(v === this.defaultObj){
                    delObj.push(...storeObj)
                    delValue.push(...store)
                    store = []
                    storeObj = []
                }
                if(storeObj.length === 1 && storeObj[0] === this.defaultObj){
                    store = []
                    storeObj = []

                }
                store.push(value)
                storeObj.push(v)

                if(v !== this.defaultObj ){
                    addObj = [v]
                    addValue = [value]
                }
            }
        }else {
            if(index !== -1){
                store = [this.defaultValue]
                storeObj = [this.defaultObj]

                delObj.push(v)
                delValue.push(value) 
                
            }else {
                if(store[0] !== "" && store[0] !== "全部" ){
                    delValue.push(store[0])
                    delObj.push(storeObj[0])
                }

                store = [value]
                storeObj = [v]

                if(v !== this.defaultObj ){

                    addObj = [v]
                    addValue = [value]
                }
                
            }
            
        }
        const newStore = [...store]
        const newStoreObj = [...storeObj]
        this.setState({
            store:newStore,
            storeObj:newStoreObj,
        })
        if(this.props.onChange){
            this.props.onChange(addValue,addObj,delValue,delObj,showField,valueField,type,isMultiple)
        }
    }
    isSelected = (value)=>{
        const store = this.state.store
        return store.indexOf(value)
    }
    flexHandle = ()=>{
        this.setState({
            oneLine:!this.state.oneLine
        })
    }
    render(){
        const flex = this.state.oneLine
        const data = this.props.data;
        let {oneLine,setEntire} = data;

        setEntire===undefined?setEntire=true:setEntire=!!setEntire;

        const list = this.props.data.list?setEntire?[this.defaultObj,...this.props.data.list]:[...this.props.data.list]:[this.defaultObj]
        const ulClass = flex?"list-filter-item-ul one-line":"list-filter-item-ul"
        return (  
            <div className="list-filter-item">
                <div className="list-filter-item-title">{data.title}：</div>
                <ul className={ulClass}>
                    {
                        list.map((v,k)=>{
                            const value = data.valueField?v[data.valueField] : v
                            const index = this.isSelected(value);
                            return <li 
                                    onClick={()=>this.onClick(v,value,index)}
                                    className={index !== -1 ?"active":""} 
                                    key={k}>
                                    {
                                        data.showField?v[data.showField]:v
                                    }
                                    </li>
                        })
                    }
                    {
                        
                        oneLine? 
                        <span onClick={this.flexHandle} className="list-filter-item-ul-flex-btn">
                        {
                            flex?
                            <span>展开<Icon type="down" /></span>
                            :
                            <span>收缩<Icon type="up" /></span>
                        }
                        </span>
                        :null
                    }
                </ul>
            </div>
        )
    }

}

export default Filteritem