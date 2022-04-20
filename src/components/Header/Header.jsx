import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppTitle from './AppTitle/AppTitle'
import HeaderInscriptions from './HeaderInscriptions/HeaderInscriptions'
import SearchForm from './SearchForm/SearchForm'
import SignUpLink from './SignUpLink/SignUpLink'
import SignInLink from './SignInLink/SignInLink'
import { getUserFromApiQuery, signOut } from '../../redux/actionCreators/userActionCreators'
import ProfileLink from './ProfileLink/ProfileLink'
import TOKEN from '../../localStorageConsts'
import HelloPageLink from './HelloPageLink/HelloPageLink'

function Header() {
  const tokenFromLS = localStorage.getItem(TOKEN)
  const dispatch = useDispatch()
  useEffect(() => {
    if (tokenFromLS) {
      dispatch(getUserFromApiQuery(tokenFromLS))
    }
  }, [])
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const userToken = user.token
  const signOutHandler = () => {
    dispatch(signOut(user))
    localStorage.clear()
    navigate('/signInForm')
  }
  return (
    <AppBar position="relative" color="secondary">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <AppTitle />
          {!userToken ? <HelloPageLink /> : null}
          {userToken ? <HeaderInscriptions /> : null}
          <SearchForm />
          {userToken ? <ProfileLink /> : null}
          {!userToken ? <SignUpLink /> : null}
          {!userToken ? <SignInLink /> : null}
          {userToken ? (
            <Button type="button" variant="contained" color="secondary" onClick={signOutHandler}>
              Выйти
            </Button>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
