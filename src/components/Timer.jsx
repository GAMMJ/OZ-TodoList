import { useEffect, useRef, useState } from "react"

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

export default Timer
