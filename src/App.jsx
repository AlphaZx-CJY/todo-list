import { useState } from 'react'
import InputArea from './components/InputArea'
import Slogan from './components/Slogan'
import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  const addTodo = () => {
    if (!todoText) {
      return
    }
    setTodos([
      { timestamp: Date.now(), content: todoText, isFinish: false },
      ...todos,
    ])
    setTodoText('')
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-start items-center gap-4 overflow-hidden">
      <Slogan content="TODO TASK" />
      <InputArea
        value={todoText}
        onValueChanged={setTodoText}
        onSubmit={addTodo}
      />
      <TodoList items={todos} updateTodos={setTodos} />
    </div>
  )
}

export default App
