import { useEffect } from 'react'

const RESIZE: keyof WindowEventMap = 'resize'

type Deps = null | any[] | []

const useResizeEvent = (callback: () => any, deps?: Deps): void =>
  useEffect(
    (): (() => void) => {
      addEventListener(RESIZE, callback)
      return () => removeEventListener(RESIZE, callback)
    },
    deps !== undefined ? deps : [],
  )

export default useResizeEvent
