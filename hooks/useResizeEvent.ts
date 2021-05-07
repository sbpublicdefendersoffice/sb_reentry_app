import { useEffect } from 'react'

const RESIZE: keyof WindowEventMap = 'resize'

const useResizeEvent = (callback: () => any): void =>
  useEffect((): (() => void) => {
    addEventListener(RESIZE, callback)
    return () => removeEventListener(RESIZE, callback)
  }, [])

export default useResizeEvent
