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
                name:[],
                list:[],
            }
        ]
    }
    componentWillMount(){
        var {option} = this.props
        var data = option.map((v,k)=>{
            return {
                key:k,
                name:v.n,
                namespace:v.v,
                value:undefined,
                search:v.search || this.empty,
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
    changeName = (v,key,index)=>{
        var {data} = this.state ;
        var {option} = this.props
        for(var k =0;k<option.length;k++){
            if(option[k].v === v) {
                data[index].namespace = v
                data[index].selected = option[k]

                option[k].search? 
                (data[index].search = option[k].search)
                :(data[index].search = this.empty)

                data[index].list = []
                data[index].value = ""
                data = this.getName()
                this.setState({data})
            } 
        }
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
    // changeValue = (v,key,index)=>{
    //     var {getData} = this.props
    //     var {data} = this.state
    //     data[index].value = v
    //     getData && getData(this.getdata())
    //     this.setState({data})
    // }
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
        var {changeName,insideSearch} = this
        var {option,className,form} = this.props
        var {data} = this.state
        var choiceItems =  data.map((v,index)=>{
            return <ChoiceItem 
                    key={v.key} 
                    index={index} 
                    data={v} 
                    placeholder={v.placeholder}
                    changeName={changeName} 
                    form = {form}
                    // changeValue={changeValue} 
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