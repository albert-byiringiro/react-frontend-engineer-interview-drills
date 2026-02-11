import React, { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleKeydown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      addNewTodo()
    }
    return
  }

  function addNewTodo() {
    if (!inputValue.trim()) return

    let nextId = 0

    const newTodo: Todo = {
      id: ++nextId,
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
    if (!editingText.trim()) {
      cancelEdit()
      return
    }

    setTodos(prevTodos =>
      prevTodos.map(todo => {
        return todo.id === id ? { ...todo, text: editingText } : todo
      })
    )
    setEditingId(null)
  }

  function deleteTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id === id))
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="heading">Todo List</h1>
        <div className="input-area">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeydown}
            placeholder="What needs to be done?"
            aria-label="New todo"
          />
          <button onClick={addNewTodo}>Add Todo</button>
        </div>
        <div className="display-area">
          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                editingText={editingText}
                onToggle={toggleTodoComplete}
                onStartEdit={startEditing}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onDelete={deleteTodo}
                onEditTextChange={setEditingText}
                isAnyEditing={editingId !== null}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface TodoItemProps {
  todo: Todo
  isEditing: boolean
  editingText: string
  onToggle: (id: number) => void
  onStartEdit: (todo: Todo) => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
  onDelete: (id: number) => void
  onEditTextChange: (text: string) => void
  isAnyEditing: boolean
}

function TodoItem({
  todo,
  isEditing,
  editingText,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditTextChange,
  isAnyEditing,
}: TodoItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSaveEdit(todo.id)
    } else if (e.key === 'Escape') {
      onCancelEdit()
    }
  }

  return (
    <li key={todo.id} className="todo-list-item">
      <input
        type="checkbox"
        name="completed"
        id={`todo-checkbox-${todo.id}`}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isAnyEditing}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={e => onEditTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => onSaveEdit(todo.id)}>Save Edit</button>
          <button onClick={() => onCancelEdit()}>Cancel</button>
        </>
      ) : (
        <>
          <span
            id={`todo-text-${todo.id}`}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
          </span>
          <button onClick={() => onStartEdit(todo)} disabled={isAnyEditing}>
            Update
          </button>
          <button onClick={() => onDelete(todo.id)} disabled={isAnyEditing}>
            Delete🗑️
          </button>
        </>
      )}
    </li>
  )
}

export default App
