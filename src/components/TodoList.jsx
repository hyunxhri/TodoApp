import React, { useState } from 'react'
import { Todo } from './Todo'

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  const [editing, setEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const startEditing = (id) => {
    setEditing(true)
    setEditingId(id)
  }

  const stopEditing = () => {
    setEditing(false)
    setEditingId(null)
  }

  const sortTodos = (tasks) => {
    const pendingPriority = tasks.filter((task) => !task.state && task.priority) // Si no están completos y tienen prioridad
    const pendingNoPriority = tasks.filter((task) => !task.state && !task.priority) //Si no están completos y no tienen prioridad
    const completed = tasks.filter((task) => task.state) // Si están completos

    return [...pendingPriority, ...pendingNoPriority, ...completed] // Los devuelve en orden, primero los no completos con prioridad, luego los no completos sin prioridad y luego los completos.
  }

  const updateAndSortTodo = (updatedTodo) => {
    updateTodo(updatedTodo)
    stopEditing()
  }

  return (
    <div className='mt-2'>
      <h1 className='text-center'>Lista de tareas</h1>
      <ul>
        {sortTodos(todos).map((todo) => ( //mapea los ToDo ya ordenados por la función sortTodos
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateAndSortTodo}
            onEdit={startEditing}
            isEditing={editing && editingId === todo.id}
            stopEditing={stopEditing}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList