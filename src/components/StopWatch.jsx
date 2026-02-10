import { useEffect, useRef, useState } from "react"
import formatTime from "../util/formatTime"

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
  }, [isRunning, elapsedTime])

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

export default StopWatch
