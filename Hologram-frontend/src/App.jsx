import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs white">
        Click on the Vite and React logos to learn more
      </p>


      <div className="border border-white-500">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-2">Tailwind + Vite ✅</h1>
        <p className="text-sm text-slate-600 mb-4">If you see this, Tailwind is configured correctly.</p>
        <button className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition">
          Click me
        </button>
      </div>
    </div>
    </>
  )
}

export default App
