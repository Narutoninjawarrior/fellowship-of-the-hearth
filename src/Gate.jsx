import { useState } from 'react'

export default function Gate({ onSuccess }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (input.toLowerCase().trim() === 'fellows') {
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="gate">
      <div className="gate-content">
        <h1 className="gate-title">Fellowship of the Hearth</h1>
        <p className="gate-subtitle">The hearth is lit. Enter the village.</p>
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak, friend, and enter"
            className="gate-input"
            autoFocus
          />
          <button type="submit" className="gate-btn">Enter</button>
        </form>
        {error && <p className="gate-error">The gate remains closed.</p>}
      </div>
    </div>
  )
}
