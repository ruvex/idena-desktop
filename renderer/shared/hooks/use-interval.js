/* eslint-disable import/prefer-default-export */
import {useEffect, useRef} from 'react'

export function useInterval(callback, delay, useImmediately = false) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      if (useImmediately) {
        tick()
      }
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, useImmediately])
}

export function usePoll([state, fetch], delay) {
  const fetchRef = useRef(fetch)

  useEffect(() => {
    fetchRef.current = fetch
  }, [fetch])

  useInterval(fetchRef.current, delay)

  return [state, fetchRef.current]
}
