import React from 'react';
import {
    Row,
    Col,
} from 'antd'
import "./btnwrap.css"
class Supplier extends React.Component {
    render(){
        return (
            <div className={"npd-btns-float"}>
                <div className="npd-btns-float-warp">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Supplier