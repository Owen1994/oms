import React from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Box from './Box'
import './css/css.css'

class RightDrag extends React.Component {

    
    render(){
        const { data, handleDel, move,imgHandleChecked  } = this.props;
        return (
            <div className={"custom_head_label_wrap"}>
                <Box
                    items={data}
                    move={move}
                    onDel={handleDel}
                    imgHandleChecked={imgHandleChecked}
                />
            </div>
        )
    }
}

RightDrag.propTypes = {
    data: PropTypes.array.isRequired
}

export default DragDropContext(HTML5Backend)(RightDrag);
