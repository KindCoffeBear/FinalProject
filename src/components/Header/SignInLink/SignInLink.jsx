import LinkMUI from '@mui/material/Link'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

function SignInLink() {
  return (
    <LinkMUI component={Link} to="/signInForm">
      <Button key="Sign up" sx={{ my: 2, color: 'white', display: 'block' }}>
        SignIn
      </Button>
    </LinkMUI>
  )
}
export default SignInLink
