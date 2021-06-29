import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Add from './components/Add'



function App() {

  // const [ toDoList, setToDoList ] = useState([{
  //   "id": 1,
  //   "task": "Give dog a bath",
  //   "complete": true
  // }, {
  //   "id": 2,
  //   "task": "Do laundry",
  //   "complete": false
  // }, {
  //   "id": 3,
  //   "task": "Vacuum floor",
  //   "complete": false
  // }]);
  const [ toDoList, setToDoList ] = useState([]);


  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('https://60d8a43aeec56d001747740d.mockapi.io/todos')
      response = await response.json()
      setToDoList(response);
      // console.log(response);
    }

    fetchMyAPI()
  }, [])


  // const handleToggle = (item) => {
  //   let mapped = toDoList.map(todo => {
  //     return todo.id === item.id ? { ...todo, complete: !todo.complete } : { ...todo};
  //   });
  //   setToDoList(mapped);
  // }

  const fetchTask = async (id)=>{
    const res= await fetch(`https://60d8a43aeec56d001747740d.mockapi.io/todos/${id}`)
    const data = await res.json()
    return data;
  }

  const handleToggle= async(t) =>{
    const taskToToggle = await fetchTask(t.id)
    const upTask ={...taskToToggle,complete : !taskToToggle.complete}

    const res = await fetch(`https://60d8a43aeec56d001747740d.mockapi.io/todos/${t.id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(upTask),
    })

    const data = await res.json()
    setToDoList(
     toDoList.map((doto)=>doto.id===t.id ? {...doto,complete:data.complete} : doto)
   )
  };

  // const addTodo = (todo) => {
  //   const id = Math.floor(Math.random() * 10000) +1;
  //   const newTodo = {id,...todo};
  //   console.log(newTodo);
  //   setToDoList([...toDoList,newTodo]);
    //Cach 2
    // const copy = [ ...toDoList];
    // copy.push(newTodo);
    // setToDoList(copy)

  // }

   
   const addTodo = async (todo) =>{
    const res = await fetch('https://60d8a43aeec56d001747740d.mockapi.io/todos',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(todo)
    })

    const data = await res.json() 

    setToDoList([...toDoList,data])
  }


  // const handleDelete = (item) => {
  //   console.log(item)
  //   // let filtered = toDoList.filter(todo => {
  //   //   return  todo.id !== item.id;
  //   // });
  //   // setToDoList(filtered);
  // };

  const handleDelete = async (todo) => {
    await fetch(`https://60d8a43aeec56d001747740d.mockapi.io/todos/${todo.id}`,{
      method:'DELETE'
    })
    setToDoList(toDoList.filter(t=>t.id !== todo.id)) 

  };

  const handelEdit = async (t,nameTodo) => {
    const todoUpdate = await fetchTask(t.id)
    const upTask ={...todoUpdate,task : nameTodo};

    const res = await fetch(`https://60d8a43aeec56d001747740d.mockapi.io/todos/${t.id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(upTask),
    })

    const data = await res.json()
    setToDoList(
     toDoList.map((doto)=>doto.id===t.id ? {...doto,task:data.task} : doto)
   )
    
  }

  // const handelEdit = (todo,task,complete) => {
  //   let editTodos = toDoList.map((t) => {
  //     if (t.id === todo.id) {
  //       t.task=task;
  //       t.complete=complete;
  //     }
  //     return t;
  //   });
  //   setToDoList(editTodos);
    
  // }

  return (
   <div className="container">
     <div className="todo-app">
      <Header/>  
      <Add onAdd={addTodo}/>
      <div className="content">
      {toDoList.length >0 ?  <TodoList TodoList={toDoList} handleToggle={handleToggle} handleDelete={handleDelete} handelEdit={handelEdit}/> : 'No task'}
      </div>
      <Footer/>
     </div>
   </div>
  );
}

export default App;
