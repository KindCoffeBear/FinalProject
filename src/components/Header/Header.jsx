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

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const signOutHandler = () => {
    dispatch(signOut)
    localStorage.clear()
    window.location.reload()
  }
  console.log(user)
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppTitle />
          <HeaderInscriptions />
          <SearchForm />
          <SignUpLink />
          <SignInLink />
          <Button
            type="button"
            variant="contained"
            onClick={signOutHandler}
          >
            Sign Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
