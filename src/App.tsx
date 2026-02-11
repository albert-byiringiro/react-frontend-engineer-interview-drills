import React, { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function addNewTodo() {
    if (!inputValue.trim()) return

    const newTodo: Todo = {
      id: todos.length + 1,
      text: inputValue,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-area">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
      <div className="display-area">
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <input
                type="checkbox"
                name="completed"
                id="completed"
                checked={todo.completed}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
