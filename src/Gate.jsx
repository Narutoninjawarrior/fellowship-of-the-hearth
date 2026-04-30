import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

export default function Gate() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError('The gate remains closed.')
      setLoading(false)
    }
  }

  return (
    <div className="gate">
      <div className="gate-content">
        <h1 className="gate-title">Fellowship of the Hearth</h1>
        <p className="gate-subtitle">The hearth is lit. Enter the Lodge.</p>
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="gate-input"
            autoFocus
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="gate-input"
            required
          />
          <button type="submit" className="gate-btn" disabled={loading}>
            {loading ? '...' : 'Enter'}
          </button>
        </form>
        {error && <p className="gate-error">{error}</p>}
      </div>
    </div>
  )
}
