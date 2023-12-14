import React, { useState } from 'react'

export const Todo = ({ todo, deleteTodo, updateTodo, onEdit, isEditing, stopEditing }) => {
  const { id, state } = todo
  const [editedTodo, setEditedTodo] = useState({ ...todo }) // editedTodo inicializa con una copia del todo actual

  const editTodo = () => {
    onEdit(id)
  }

  const handleUpdate = () => { // Es llamada al clickar en el botón guardar cambios.
    updateTodo(editedTodo)
    stopEditing()
  }

  const handleInputChange = (e) => {
    // Es llamada cuando hay cambios
    const { name, type, checked, value } = e.target // Almacena los cambios de cada campo
    setEditedTodo((prevTodo) => {
      console.log(prevTodo)
      // Copia superficial (shallow copy) del estado anterior para mantener inmutabilidad
      return {
        ...prevTodo,
        [name]: type === 'checkbox' ? checked : value, 
        state: name === 'state' ? value === 'true' : prevTodo.state,
      }
    })
  }

  return (
    <li className={`list-group-item ${state ? 'completada' : ''}`}>
      <div className='d-flex justify-content-between align-items-start'>
        {isEditing ? ( //Si está editándose se muestran los campos como inputs y el botón de guardado
          <div>
            <input name='title' type='text' className='form-control mb-2' value={editedTodo.title} onChange={handleInputChange} />
            <textarea name='description' className='form-control mb-2' value={editedTodo.description} onChange={handleInputChange} />
            <select name='state' className='form-control mb-2' value={editedTodo.state} onChange={handleInputChange} >
            <option value={false}>Pendiente</option>
            <option value={true}>Completada</option>
            </select>
            <div className='form-checked mb-2'>
              <input className='form-checked-input' type='checkbox' name='priority' id='inputchecked' checked={editedTodo.priority} onChange={handleInputChange} />
              <label htmlFor='inputchecked' className='form-checked-label'>Prioridad</label>
            </div>
            <button onClick={handleUpdate} className='btn btn-sm btn-primary'>Guardar cambios</button>
          </div>
        ) : ( // Si no está editándose se muestra la vista normal, con los botones de eliminar, editar y actualizar estado.
          <div>
            <h5 className={state ? 'completada text-decoration-line-through' : ''}>{editedTodo.title}</h5>
            <p className={state ? 'completada text-decoration-line-through' : ''}>{editedTodo.description}</p>
            <div className='d-flex'>
              <button onClick={() => deleteTodo(id)} className='btn btn-sm btn-danger mr-2'>Eliminar</button>
              <button onClick={() => editTodo(id)} className='btn btn-sm btn-warning mr-2'>Editar</button>
              <button onClick={() => updateTodo(id)} className='btn btn-sm btn-primary'>Actualizar Estado</button>
            </div>
          </div>
        )}
        <span className='badge badge-primary'>{editedTodo.priority && 'prioridad'}</span>
      </div>
    </li>
  )
}