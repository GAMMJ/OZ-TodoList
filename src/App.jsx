import { useState } from "react"
import "./App.css"

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ])

  return (
    <div className="todo-main">
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  )
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <input className="input-add" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue }
          const newTodoList = [...todoList, newTodo]
          setTodoList(newTodoList)
          setInputValue("")
        }}
      >
        추가하기
      </button>
    </>
  )
}

function TodoHeader() {
  return (
    <>
      <h1 className="todo-header">GAMMJ의 Todo 리스트!</h1>
    </>
  )
}

function TodoList({ todoList, setTodoList }) {
  return (
    <>
      <TodoHeader />
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))}
      </ul>
    </>
  )
}

// 완료 체크박스
function CheckBox({ todo, setTodoList }) {
  return (
    <>
      <input
        type="checkbox"
        onChange={() => {
          setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, completed: !el.completed } : el)))
        }}
      ></input>
    </>
  )
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("")
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      <li>
        {/* 완료 체크박스 표시 */}
        <CheckBox todo={todo} setTodoList={setTodoList} />

        {/* 완료 되었으면 del태그로 감싸주기 */}
        {todo.completed ? <del>{todo.content}</del> : <span>{todo.content}</span>}

        {/* isEdit이 true일 때만 input창 보여주기 */}
        {isEdit && (
          <input className="input-edit" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        )}

        {/* 수정버튼 */}
        <button
          onClick={() => {
            if (isEdit) {
              setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, content: inputValue } : el)))
              setIsEdit(false)
              setInputValue("")
            } else {
              setIsEdit(true)
            }
          }}
        >
          수정
        </button>

        {/* 삭제버튼 */}
        <button
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id)
            })
          }}
        >
          삭제
        </button>
      </li>
    </>
  )
}

export default App
