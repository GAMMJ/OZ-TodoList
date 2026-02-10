import { useEffect, useRef, useState } from "react"

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

export default Clock
