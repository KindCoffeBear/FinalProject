import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedComponent({ children }) {
  const token = useSelector((store) => store.person.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="signInForm" state={{ from: location }} replace />
  }
  return children
}
