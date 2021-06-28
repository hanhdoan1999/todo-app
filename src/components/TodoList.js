import React from 'react';
import Todo from './Todo'

function TodoList({TodoList,handleToggle,handleDelete,handelEdit}) {
    return (
        < >
        {TodoList.map(todo => (<Todo key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit = {handelEdit}/>))}
      </>
    )
}

export default TodoList
