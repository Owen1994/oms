import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import Item from './Item'

class _Box extends Component {
  render() {
    const { 
      connectDropTarget, 
      connectDragPreview, 
      connectDragSource, 
      items, 
      move, 
      onDel,
      imgHandleChecked,
    } = this.props;

    return connectDragPreview(
      connectDropTarget(
        connectDragSource(
          <div className="img-drag-container">
            {items.map((child, index) => {
              return <Item
                        key={child.value}
                        {...child}
                        move={move}
                        onDel={onDel}
                        index={index}
                        imgHandleChecked = {imgHandleChecked}
                      />
            })}
          </div>
        )
      )
    )
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
}

const TYPE = 'ITEM';
const Box = DropTarget(TYPE, target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource(TYPE, source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(_Box));

export default Box;
