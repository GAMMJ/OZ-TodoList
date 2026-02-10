import { useEffect, useRef, useState } from "react"
import "./App.css"

const App = () => {
  const [todoList, setTodoList] = useState([{ id: Number(new Date()), content: "123", completed: false }])
  return (
    <>
      <TodoHeader />
      <TodoInput setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <RandomQuote />
      <Clock />
      <StopWatch />
      <Timer />
    </>
  )
}

// Todo input 추가 기능
const TodoInput = ({ setTodoList }) => {
  const inputRef = useRef(null)
  const addTodo = () => {
    const newTodo = {
      id: Number(new Date()),
      content: inputRef.current.value,
    }
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodoList((prev) => [...prev, res]))

    inputRef.current.value = ""
  }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={addTodo}>추가</button>
    </>
  )
}

// Todo Header 제목 태그
const TodoHeader = () => {
  return (
    <>
      <h1>GAMMJ의 Todo 리스트!</h1>
    </>
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
  return (
    <>
      <li>
        {/* 완료 체크박스 표시 */}
        <CheckBox todo={todo} setTodoList={setTodoList} />
        {/* 완료 되었으면 del태그로 감싸주기 */}
        {todo.completed ? <del>{todo.content}</del> : <>{todo.content}</>}
        {/* isEdit이 true일 때만 input창 보여주기 */}
        {isEdit && <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />}
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
        {/* ❌ 삭제 버튼 */}
        <button
          onClick={() => {
            setTodoList((prev) => prev.filter((el) => el.id !== todo.id))
          }}
        >
          삭제
        </button>
      </li>
    </>
  )
}

// 완료 체크박스
const CheckBox = ({ todo, setTodoList }) => {
  return (
    <>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, completed: !el.completed } : el)))
        }}
      />
    </>
  )
}

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
  }, [url])

  return [isLoading, data]
}

const RandomQuote = () => {
  const [isLoading, data] = useFetch("https://korean-advice-open-api.vercel.app/api/advice")

  return (
    <>
      {!isLoading && (
        <>
          <div>{data.message}</div>
          <div>{data.author}</div>
        </>
      )}
    </>
  )
}

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

const StopWatch = () => {
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

  const toggleRunning = () => {
    setIsRunning((prev) => !prev)
  }

  const resetStopWatch = () => {
    setIsRunning(false)
    setElapsedTime(0)
  }

  return (
    <>
      <div>{formatTime(elapsedTime)}</div>
      <button onClick={toggleRunning}>{isRunning ? "일시정지" : "시작"}</button>
      <button onClick={resetStopWatch}>초기화!</button>
    </>
  )
}

const Clock = () => {
  const [time, setTime] = useState(new Date())
  const clockRef = useRef(0)

  useEffect(() => {
    clockRef.current = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(clockRef.current)
    }
  }, [])

  return <div>{time.toLocaleTimeString()}</div>
}

const Timer = () => {
  // 남은시간 표현할 상태
  const [remainingTime, setRemainingTime] = useState(0)
  // 타이머가 작동중인지의 상태
  const [isRunning, setIsRunning] = useState(false)
  // 타이머 선택 시간 상태
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  // interval 클리어할 ID
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1)
      }, 1000)
    } else if (!isRunning || remainingTime === 0) {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, remainingTime])

  const startTimer = () => {
    const totalTime = minutes * 60 + seconds
    // remainingTime이 있으면 유지, 없으면 새로 설정
    setRemainingTime(remainingTime ? remainingTime : totalTime)
    setIsRunning(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setRemainingTime(0)
    setMinutes(0)
    setSeconds(0)
  }

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <>
      <div>{formatTime(remainingTime)}</div>
      {/* 분 */}
      <input
        type="number"
        value={minutes}
        onChange={(event) => {
          setMinutes(Number(event.target.value))
        }}
      />
      {/* 초 */}
      <input
        type="number"
        value={seconds}
        onChange={(event) => {
          setSeconds(Number(event.target.value))
        }}
      />
      <button onClick={startTimer}>시작</button>
      <button onClick={() => setIsRunning(false)}>멈춤</button>
      <button onClick={resetTimer}>초기화!</button>
    </>
  )
}

export default App
