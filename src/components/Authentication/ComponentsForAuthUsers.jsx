import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import TOKEN from '../../localStorageConsts'

export default function ComponentsForAuthUsers({ children }) {
  let token = useSelector((store) => store.user.token)
  if (!token) {
    token = localStorage.getItem(TOKEN)
  }
  const location = useLocation()

  if (token) {
    return <Navigate to="/content" state={{ from: location }} replace />
  }
  return children
}
