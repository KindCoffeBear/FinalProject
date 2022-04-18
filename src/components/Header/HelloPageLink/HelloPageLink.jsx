import LinkMUI from '@mui/material/Link'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

function HelloPageLink() {
  return (
    <LinkMUI component={Link} to="/">
      <Button key="Sign up" sx={{ mx: 1, mt: 2, color: 'white' }}>
        <p>
          Добро пожаловать!
        </p>
      </Button>
    </LinkMUI>
  )
}
export default HelloPageLink
