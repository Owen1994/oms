/**
 *作者: weijie
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Icon,DatePicker,Button } from 'antd';
import moment from "moment"
import {timestampFromat} from '../../../util/baseTool';
export default class EditableDate extends React.Component {

    state = {
        editable: false,
        value: null
    };
    handleClick = (value) => {
        if(value){
            this.setState({ editable: false });
            if (this.props.onChange) {
                this.props.onChange(this.props.columnKey,value.valueOf());
            }
        }
    };
    handleEdit = () => {
        this.setState({ editable: true });
    };
    clearDatePicker = ()=>{
        this.setState({
            editable:false
        })
    };
    footer = ()=>{
        return (
            <div style={{textAlign:"right"}}>
                {/*<Button onClick={this.handleClick}>确定</Button>*/}
                <Button style={{marginLeft:"10px"}} onClick={this.clearDatePicker}>取消</Button>
            </div>
        )
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: timestampFromat(nextProps.value, 1)
        })
    }
    render() {
        let {  editable, value } = this.state;
        const {  isRequired, isEditable, name } = this.props;
        if(value){
            value = value;
        }

        return (
            <div className="editable-cell">
                <div className={"editable-name"}>
                    <span className={isRequired?"tag-info":""}>{name || ' '}</span>
                    <i className={"normal"}>:</i>
                </div>
                <div className={"editable-content"}>
                    {
                        editable ?( <DatePicker
                                open={true}
                                showToday ={false}
                                defaultValue={moment(value,'YYYY-MM-DD')}
                                renderExtraFooter = {this.footer}
                                onChange={this.handleClick}
                            />) :
                            (<div className="showpanel">
                                { (value=value) }
                                {
                                    isEditable ? (
                                        <Icon
                                            type="edit"
                                            className="editable-cell-icon"
                                            onClick={this.handleEdit}
                                        />
                                    ):null
                                }
                            </div>)
                    }

                    {/*{*/}
                        {/*editable ? (*/}
                            {/*<DatePicker*/}
                            {/*open={true}*/}
                            {/*showToday ={false}*/}
                            {/*defaultValue={value}*/}
                            {/*renderExtraFooter = {this.footer}*/}
                            {/*onChange={this.handleClick} />*/}
                        {/*) : (*/}
                            {/*<div className="showpanel">*/}
                                {/*/!*{(value&&value.format('YYYY-MM-DD')) || ' '}*!/*/}
                                {/*{*/}
                                    {/*isEditable ? (*/}
                                        {/*<Icon*/}
                                            {/*type="edit"*/}
                                            {/*className="editable-cell-icon"*/}
                                            {/*onClick={this.handleEdit}*/}
                                        {/*/>*/}
                                    {/*):null*/}
                                {/*}*/}
                            {/*</div>*/}
                        {/*)*/}
                    {/*}*/}
                </div>
            </div>
        )
    }
}