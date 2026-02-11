import { useEffect, useRef, useState } from "react"
import "./App.css"
import useFetch from "./hook/useFetch"
import CheckBox from "./components/CheckBox"
// import Clock from "./components/Clock"
import RandomQuote from "./components/RandomQuote"
import StopWatch from "./components/StopWatch"
// import Timer from "./components/Timer"

const App = () => {
  const [, data] = useFetch("http://localhost:3000/todo")
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    if (data) setTodoList(data)
  }, [data])
  return (
    <div className="todo-main">
      <TodoHeader />
      <RandomQuote />
      <TodoInput setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />

      <div className="widget-area">
        {/* <Clock /> */}
        <StopWatch />
        {/* <Timer /> */}
      </div>
    </div>
  )
}

// Todo input 추가 기능
const TodoInput = ({ setTodoList }) => {
  const inputRef = useRef(null)
  const addTodo = () => {
    const newTodo = {
      content: inputRef.current.value,
      completed: false,
    }
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodoList((prev) => [...prev, res]))

    inputRef.current.value = ""
  }
  return (
    <>
      <input className="input-add" ref={inputRef} onKeyDown={(e) => e.key === "Enter" && addTodo()} />
      <button onClick={addTodo}>추가</button>
    </>
  )
}

// Todo Header 제목 태그
const TodoHeader = () => {
  return (
    <div className="todo-header">
      <h1>GAMMJ의 Todo 리스트!</h1>
    </div>
  )
}

// Todo 리스트 ul 태그
const TodoList = ({ todoList, setTodoList }) => {
  return (
    <>
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))}
      </ul>
    </>
  )
}

// Todo ul 태그 속 li태그
const Todo = ({ todo, setTodoList }) => {
  const [inputValue, setInputValue] = useState("")
  const [isEdit, setIsEdit] = useState(false)

  const editTodo = () => {
    if (isEdit) {
      // 수정 완료 - 서버에 저장
      fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue }),
      })
        .then((res) => res.json())
        .then(() => {
          // 로컬 상태 업데이트
          setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, content: inputValue } : el)))
          setIsEdit(false)
        })
        .catch((error) => {
          console.error("수정 실패:", error)
          // 에러 처리
        })
    } else {
      // 수정 모드 진입

      setIsEdit(true)
    }
  }

  return (
    <>
      <li>
        {/* 완료 체크박스 표시 */}
        <CheckBox todo={todo} setTodoList={setTodoList} />
        {/* 완료 되었으면 del태그로 감싸주기 */}
        {todo.completed ? <del>{todo.content}</del> : <span>{todo.content}</span>}
        {/* isEdit이 true일 때만 input창 보여주기 */}
        {isEdit && (
          <input
            className="input-edit"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(e) => e.key === "Enter" && editTodo()}
          />
        )}
        {/* 수정버튼 */}
        <button onClick={editTodo}>{isEdit ? "저장" : "수정"}</button>
        {/* ❌ 삭제 버튼 */}
        <button
          onClick={() => {
            fetch(`http://localhost:3000/todo/${todo.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (res.ok)
                  // 응답 성공 확인
                  setTodoList((prev) => prev.filter((el) => el.id !== todo.id))
              })
              .catch((error) => {
                console.error("삭제 실패:", error)
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
