// import { useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
// import TOKEN from '../../localStorageConsts'

export default function ProtectedComponent({ children }) {
  const token = useSelector((store) => store.user.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/signInForm" state={{ from: location }} replace />
  }
  return children
}
