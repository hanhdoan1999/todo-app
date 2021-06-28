import  { useState } from 'react';

function Add({onAdd}) {
    const [task, setTask] = useState('');
    const [complete, setComplete] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault();
        if(!task){
            alert('Please add a text')
        }
        onAdd({task ,complete})
        setTask('')
        setComplete(false)

    }

    return (
        <div className="addTask">
            <form action="" onSubmit={onSubmit}>
                <input type="text" placeholder="Add task" value={task} onChange={(e) => setTask(e.target.value)}/>
                <input type="submit" value="Add" className="btn" />
            </form>
        </div>
    )
}

export default Add
