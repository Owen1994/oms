import React from 'react';
import {
    Row,
    Col,
} from 'antd'
import "../css/btnwrap.css"
class Supplier extends React.Component {
    render(){
        return (
            <div className={"npd-fapply-btns"}>
                <div className="npd-fapply-btns-warp">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Supplier