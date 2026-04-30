import AuthProvider, { useAuth } from './AuthProvider'
import Gate from './Gate'
import Hearthlands from './Hearthlands'

function AppContent() {
  const user = useAuth()

  if (!user) return <Gate />
  return <Hearthlands />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
