import React, { useState } from 'react'
import Formulario from './components/Formulario'
import TodoList from './components/TodoList'

const initialState = [
  {
    id:1,
    title:"todo 01",
    description:"Descripcion 01",
    priority:false,
    state:false // Cambiamos a un booleano para manejarlo mejor.
  },
  {
    id:2,
    title:"todo 02",
    description:"Descripcion 02",
    priority:false,
    state:false
  }
]

const App = () => {

  // Estado - Lista de componentes
  const [todos, setTodos] = useState(initialState)

  // Funcion añadir tarea
  const addTodo = todo => {
    setTodos([...todos,todo])
  }

  // Función deleteTodo
  const deleteTodo = id => {
    const newArray = todos.filter(todo => todo.id !== id)
    setTodos(newArray)
  }

  // Función updateTodo
  const updateTodo = id => {
    const newArray = todos.map(todo => {
      if (todo.id == id) {
        todo.state = !todo.state
      }
      return todo
    })
    setTodos(newArray)
  }
  
  return (
    <div className='container'>
      <h1>Formularios</h1>
      < Formulario addTodo = {addTodo} />
      < TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
    </div>
  )
}

export default App