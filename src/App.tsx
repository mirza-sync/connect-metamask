import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>You are not connected to Metamask</h2>
      <div className="card">
        <button className='btn' onClick={() => null}>
          <img src='/metamask-icon.svg' />
          <span>Connect</span>
        </button>
      </div>
    </div>
  )
}

export default App
