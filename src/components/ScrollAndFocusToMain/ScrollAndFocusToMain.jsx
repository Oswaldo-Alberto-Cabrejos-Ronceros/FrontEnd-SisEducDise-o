import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollAndFocusToMain() {
  const location = useLocation()

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) {
      main.focus()
    }
  }, [location])

  return null
}