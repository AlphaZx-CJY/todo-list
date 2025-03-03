import { useEffect, useState } from 'react'
import InputArea from './components/InputArea'
import Slogan from './components/Slogan'
import TodoList from './components/TodoList'
import useIndexedDB from './hooks/useIndexedDB'

const App = () => {
  const { db, err, addItem, getAllItems } = useIndexedDB(
    'MyTodoList',
    'TodoListStore'
  )
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    if (db) {
      getAllItems().then((data) => setTodos(data))
    }
  }, [db, getAllItems])

  const handleAddItem = async () => {
    if (!todoText) {
      return
    }
    await addItem({ timestamp: Date.now(), content: todoText, isFinish: false })
    setTodoText('')
    const data = await getAllItems()
    setTodos(data)
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-start items-center gap-4 overflow-hidden">
      <Slogan content={err ? err : 'TODO TASK'} />
      <InputArea
        value={todoText}
        onValueChanged={setTodoText}
        onSubmit={handleAddItem}
      />
      <TodoList items={todos} updateTodos={setTodos} />
    </div>
  )
}

export default App
