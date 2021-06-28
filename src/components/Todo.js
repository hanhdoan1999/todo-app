
import { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
// import Edit from './Edit';


function Todo({ todo, onDelete, onToggle, onEdit, }) {
  const [textChange, setTextChange] = useState(todo.task);
  const [completeChange] = useState(todo.complete);
  const [editText, setEditText] = useState(true);


  const getTextLine = () => {
    let text = "text";
    text += (todo.complete) ? " strike" : ""
    return text;
  }


 

  // text-decoration: line-through;
  return (
    <div className="item">
      <input type="checkbox" name="status" value={todo.complete} onChange={() => { onToggle(todo) }} checked={todo.complete ? "checked" : ""} />
      {editText ? (<p onBlur={()=>{test()}} onDoubleClick={() => { setEditText(false) }} className={getTextLine()} >{todo.task}</p>) :
        (<input type="text" value={textChange} onChange={(e) => { setTextChange(e.target.value) }} />)}
      <div className="icon">
        {!editText ? (<div onClick={() => { onEdit(todo, textChange, completeChange); setEditText(true) }}><FaRegEdit /></div>) : (<div onClick={() => { onDelete(todo) }}><FaRegTrashAlt /></div>
        )}

      </div>
    </div>
  )
}

export default Todo

