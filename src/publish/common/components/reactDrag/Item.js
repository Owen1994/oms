import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon,Checkbox } from 'antd';


class _Item extends Component {

    onChange=(e,value)=> {
        let arr = [];
        if(e.target.checked){
            arr.push(value)
        }else{
            arr.filter(v=>{
                return v !== value;
            })
        }
    };
  render() {
    const {
      connectDropTarget,
      connectDragPreview,
      connectDragSource,
      value,
      onDel,
      index,
      imgHandleChecked,
    } = this.props;

    return connectDragPreview(
        connectDropTarget(
            connectDragSource(
              <div className="img-drag-box">
                    <span className="item">
                        <img src={this.props.url} width={106} height={92} />
                    </span>
                      <Checkbox onChange={(e)=>imgHandleChecked(e,value)} ></Checkbox>
                    <Icon type="close" onClick={() => onDel(index)}/>
              </div>
            )
        )
    );
  }
}

const source = {
  beginDrag(props) {
    return {
      value: props.value
    };
  },

  isDragging(props, monitor) {
    return props.value == monitor.getItem().value;
  }
};

const target = {
  canDrop(props, monitor) {
    const { value: draggedId } = monitor.getItem();
    const { value: dropId, contains } = props;

    if (draggedId === dropId) return false;
    if (!monitor.isOver({ shallow: true })) return false;

    // prevent dropping ancestor into child and dropping direct child into it's parent
    // if (contains(draggedId, dropId) || contains(dropId, draggedId, true)) return false;

    return true;
  },

  drop(props, monitor, component) {
    const { value: draggedId } = monitor.getItem();
    const { value: dropId, contains } = props;

    props.move(draggedId, dropId);
  }
};

const TYPE = 'ITEM';
const Item = DropTarget(TYPE, target, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(TYPE, source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(_Item)
);

export default Item;
