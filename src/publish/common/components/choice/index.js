import React, { Component } from 'react';
import { Form } from 'antd';
import ChoiceItem from "./choiceItem"
import "./css.css"
class Choice extends Component {
    constructor(props) {
        super(props);
    }
    empty = ()=>{return Promise.resolve()}
    state = {
        key:1,
        data:[
            {
                key:0,
                namespace:"",
                value:"",
                search:this.empty,
                onSelect:this.empty,
                multiple:false,
                name:"",
                list:[],
            }
        ]
    }
    componentWillMount(){
        this.setData(this.props)
    }
    componentWillReceiveProps(next){
        console.log(next === this.props)
        this.setData(next)
    }
    // shouldComponentUpdate(next,pre){
        // console.log(next)
        // console.log(pre)
        // console.log(next === pre)
        // return true
    // }
    setData = (props)=>{
        var {option} = props
        var data = option.map((v,k)=>{
            return {
                key:v.v,
                name:v.n,
                namespace:v.v,
                value:undefined,
                search:v.search || this.empty,
                // onSelect:v.onSelect || this.empty,
                // multiple:v.multiple || false,
                list:[],
            }
        })
        this.setState({
            data
        })
    }
    componentWillUnmount(){
        var {getData} = this.props
        getData && getData({})
        this.state.data = []
    }
    timerId = null
    insideSearch = (v,key,index)=>{
        clearTimeout(this.timerId)
        this.timerId = setTimeout(()=>{
            var {data} = this.state
            for(var k=0;k<data.length;k++){
                if(data[k].key === key){
                    data[k].search(v)
                    .then(result=>{
                        data[k].list = result
                        this.setState({
                            data
                        })
                    })
                    break;
                }
            }
        },1000)
    }
    getdata = ()=>{
        var {data} = this.state 
        var obj = {}
        data.forEach(v=>{
            if(v.value){
                obj[v.namespace] = v.value
            }
        })
        return obj
    }
    render() {
        var {insideSearch} = this
        var {className,form} = this.props
        var {data} = this.state
        var choiceItems =  data.map((v,index)=>{
            return <ChoiceItem 
                    key={v.key} 
                    index={index}
                    data={v}
                    multiple={!!v.multiple}
                    placeholder={v.placeholder}
                    form = {form}
                    insideSearch={insideSearch} >
                    </ChoiceItem>
        })
        className += " tweb-choice-list"
        return (
            <div className={className}>
                {choiceItems}
            </div>
        );
    }
}

export default Choice;