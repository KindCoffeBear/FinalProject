import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import AppTitle from './AppTitle/AppTitle'
import HeaderInscriptions from './HeaderInscriptions/HeaderInscriptions'
import SearchForm from './SearchForm/SearchForm'
import SignUpLink from './SignUpLink/SignUpLink'
import SignInLink from './SignInLink/SignInLink'

function Header() {
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppTitle />
          <HeaderInscriptions />
          <SearchForm />
          <SignUpLink />
          <SignInLink />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
