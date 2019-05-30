import React from 'react';
import {
    Row,
    Col,
} from 'antd'
import "../css/btnwrap.css"
class Supplier extends React.Component {
    render(){
        return (
            <div className={"npd-project-btns"}>
                <div className="npd-project-btns-warp">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Supplier