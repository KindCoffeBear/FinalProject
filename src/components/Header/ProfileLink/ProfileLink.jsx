import LinkMUI from '@mui/material/Link'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProfileLink() {
  const user = useSelector((store) => store.user)
  return (
    <LinkMUI component={Link} to="/profilePage" underline="hover">
      <Button key="Sign up" sx={{ mx: 1, mt: 2, color: 'white' }}>
        <p>
          {`${user.name}`}
        </p>
      </Button>
    </LinkMUI>
  )
}
export default ProfileLink
