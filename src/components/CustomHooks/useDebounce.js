import { useEffect, useState } from 'react'

const useDebounce = (value, ms = 0) => {
  const [debouncedState, setDebouncedState] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedState(value)
    }, ms)
    return () => clearTimeout(id)
  }, [value])
  return debouncedState
}
export default useDebounce
