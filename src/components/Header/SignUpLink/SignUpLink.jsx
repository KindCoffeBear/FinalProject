import LinkMUI from '@mui/material/Link'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

function SignUpLink() {
  return (
    <LinkMUI component={Link} to="/signUpForm">
      <Button key="Sign up" sx={{ my: 2, color: 'white', display: 'block' }}>
        SignUp
      </Button>
    </LinkMUI>
  )
}
export default SignUpLink
