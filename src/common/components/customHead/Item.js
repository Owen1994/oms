import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon } from 'antd';


class _Item extends Component {

  render() {
    const {
      connectDropTarget,
      connectDragPreview,
      connectDragSource,
      value,
      onDel,
      index
    } = this.props;

    return connectDragPreview(
        connectDropTarget(
            connectDragSource(
              <div
                style={{
                  display: 'flex',
                  height: 28,
                  background: 'skyblue',
                  border: '1px solid #fff',
                  alignItems: 'center',
                  padding: '0 10px'
                }}
              >
                <span style={{ flex: '1', color: '#fff'}}>
                  {this.props.label}
                </span>
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
