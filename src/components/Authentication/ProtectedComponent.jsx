// import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import TOKEN from '../../localStorageConsts'

export default function ProtectedComponent({ children }) {
  const token = localStorage.getItem(TOKEN)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/signInForm" state={{ from: location }} replace />
  }
  return children
}
