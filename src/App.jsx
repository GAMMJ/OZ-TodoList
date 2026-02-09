import { useEffect, useRef, useState } from "react"
import "./App.css"
import quotes from "./data/quotes"

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
      <RandomQuote />
      <StopWatch />
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

function RandomQuote() {
  const [quote, setQuote] = useState(quotes[0].text)
  const [author, setAuthor] = useState(quotes[0].author)

  const changeQuote = () => {
    const random = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[random].text)
    setAuthor(quotes[random].author)
  }

  return (
    <div className="random-quote">
      <blockquote>
        <p className="quote-text">"{quote}"</p>
        <footer className="quote-author">— {author}</footer>
      </blockquote>
      <button onClick={changeQuote}>명언 교체</button>
    </div>
  )
}

function StopWatch() {
  // 경과시간 표현할 상태
  const [elapsedTime, setElapsedTime] = useState(0)
  // 스톱워치가 작동중인지의 상태
  const [isRunning, setIsRunning] = useState(false)
  // interval 클리어할 ID
  const intervalRef = useRef(null)
  // 스톱워치 시작할 당시의 시간
  const startTimeRef = useRef(0)

  useEffect(() => {
    if (isRunning) {
      // 시작당시시간 = 현재시간 - 경과시간
      // 타이머 멈추면 멈춘시간만큼 현재시간 보다 -가 되어 다시 시작 눌렀을 때 그대로 다시 시작되는 것처럼 보임
      startTimeRef.current = Date.now() - elapsedTime

      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const startStopWatch = () => {
    setIsRunning(true)
  }

  const pauseStopWatch = () => {
    setIsRunning(false)
  }

  const resetStopWatch = () => {
    setIsRunning(false)
    setElapsedTime(0)
  }

  return (
    <>
      <div>{formatTime(elapsedTime)}</div>
      <button onClick={startStopWatch}>시작!</button>
      <button onClick={pauseStopWatch}>멈추기</button>
      <button onClick={resetStopWatch}>초기화!</button>
    </>
  )
}

export default App
