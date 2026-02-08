import { useState } from "react"
import "./App.css"

function App() {
  // todo 배열
  const [todoList, setTodoList] = useState([
    { id: 0, content: "밥 먹기" },
    { id: 1, content: "코딩공부하기" },
  ])

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  )
}

// todoList 추가하는 input 함수
function TodoInput({ todoList, setTodoList }) {
  // input 값에 대한 추가 todo
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <button
        onClick={() => {
          {
            /* id는 고유한 값인 시간을 넣었음 */
          }
          const newTodo = { id: Number(new Date()), content: inputValue }
          {
            /* 참조 자료형은 늘 복사하고 */
          }
          setTodoList([...todoList, newTodo])
          setInputValue("")
        }}
      >
        추가하기
      </button>
    </>
  )
}

// todoList li태그 생성하는 함수
function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  )
}

// todoList li태그 내용채우는 함수
// todoLIst li태그 삭제버튼
function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("")

  return (
    <li>
      {/* toto 내용 */}
      {todo.content}

      {/* 수정input과 버튼 */}
      <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <button
        onClick={() => {
          setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, content: inputValue } : el)))
          setInputValue("")
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
  )
}

export default App
