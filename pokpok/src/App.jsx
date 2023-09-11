import { useState } from 'react'
import './App.css'
import Pokidex from './Components/Pokidex/Pokidex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokidex/>
    </>
  )
}

export default App
