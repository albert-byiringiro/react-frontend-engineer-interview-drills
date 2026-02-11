import React, { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(Number)
  const [editingText, setEditingText] = useState('')

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function addNewTodo() {
    if (!inputValue.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  function toggleTodoComplete(id: number) {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo
      })
    )
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingText('')
  }

  function saveEdit(id: number) {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        return todo.id === id ? { ...todo, text: editingText } : todo
      })
    )
    setEditingId(null)
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="heading">Todo List</h1>
        <div className="input-area">
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={addNewTodo}>Add Todo</button>
        </div>
        <div className="display-area">
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-list-item">
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  checked={todo.completed}
                  onClick={() => toggleTodoComplete(todo.id)}
                  disabled={editingId ? true : false}
                />
                {editingId == todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                    />
                    <button onClick={() => saveEdit(todo.id)}>Save Edit</button>
                    <button onClick={() => cancelEdit()}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span
                      id="todo-text"
                      className={todo.completed ? 'completed' : ''}
                    >
                      {todo.text}
                    </span>
                    <button onClick={() => startEditing(todo)}>Update</button>
                    <button onClick={() => deleteTodo(todo.id)}>
                      Delete🗑️
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
