import { MutableRefObject, useEffect } from 'react'

function useClickOutside<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  isOpen: boolean,
  callback: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isOpen
      ) {
        callback()
      }
    }

    console.log(ref)
    if (isOpen) {
      window.addEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [ref, isOpen, callback])
}

export default useClickOutside
