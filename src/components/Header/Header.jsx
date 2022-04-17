import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import AppTitle from './AppTitle/AppTitle'
import HeaderInscriptions from './HeaderInscriptions/HeaderInscriptions'
import SearchForm from './SearchForm/SearchForm'
import SignUpLink from './SignUpLink/SignUpLink'
import SignInLink from './SignInLink/SignInLink'
import { signOut } from '../../redux/actionCreators/userActionCreators'
import ProfileLink from './ProfileLink/ProfileLink'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const userToken = user.token
  console.log(user, userToken)
  const signOutHandler = () => {
    dispatch(signOut(user))
    localStorage.clear()
  }
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppTitle />
          <HeaderInscriptions />
          <SearchForm />
          {userToken ? <ProfileLink /> : null}
          {!userToken ? <SignUpLink /> : null}
          {!userToken ? <SignInLink /> : null}
          {userToken ? (
            <Button type="button" variant="contained" onClick={signOutHandler}>
              Sign Out
            </Button>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
