import { useState } from 'react'
import Gate from './Gate'
import Hearthlands from './Hearthlands'

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)

  if (!authenticated) {
    return <Gate onSuccess={() => setAuthenticated(true)} />
  }

  return <Hearthlands />
}
