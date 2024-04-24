import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id || 'droppable',
    data:{
      index:  props.index
    }
  });
  
  return (
    <div ref={setNodeRef}>
      {props.children}
    </div>
  );
}