
import { useCallback, useEffect, useState } from 'react';
import { FaRegTrashAlt, FaRegEdit, FaRegGrinBeam } from 'react-icons/fa';


function Todo({ todo, onDelete, onToggle, onEdit, }) {
  const [textChange, setTextChange] = useState(todo.task);
  const [editText, setEditText] = useState(true);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(todo.complete);
  }, [todo]);

  const getTextLine = useCallback(() => {
    let text = check? "text truncate strike" : "text truncate";
    return text;
  },[check]);

  const handleCheck = () => {
    setCheck(!check);
    handleToggle(todo, !check)
  }

  const handleToggle = async (t, check) => {
    // const taskToToggle = await fetchTask(t.id)

    const upTask = { ...t, complete: check }

    const res = await fetch(`https://60d8a43aeec56d001747740d.mockapi.io/todos/${t.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(upTask),
    });
    console.log(res);
    if (res.status !== 200) {
      setCheck(!check);
    }
  };

  const test = () => {
    setEditText(true);
    // textChange=todo.task;
  }

  return (
    <div className="item">
      <input type="checkbox" name="status" onChange={handleCheck} checked={check} disabled={!editText} />
      {editText
        ?
        (<p onDoubleClick={() => { setEditText(false); }} className={getTextLine()} >{todo.task}</p>)
        :
        (
          <input maxLength='100' onBlur={() => { test() }} autoFocus type="text" value={textChange} onChange={(e) => { setTextChange(e.target.value) }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                console.log('hhhhhhhhhhhhhh');
                if (textChange === "") {
                  alert("Please enter name ! ")
                } else {
                  onEdit(todo, textChange);
                  event.preventDefault()
                  event.stopPropagation()
                  setEditText(true);
                }
              }
            }}
          />)
      }

      <div className="icon">
        {!editText
          ?
          (<div onClick={() => { onEdit(todo, textChange); setEditText(true) }}><FaRegGrinBeam /></div>)
          :
          (<div onClick={() => { onDelete(todo) }}><FaRegTrashAlt /></div>)
        }

      </div>
    </div>
  )
}

export default Todo

