import Typography from '@mui/material/Typography'
import LinkMUI from '@mui/material/Link'
import { Link } from 'react-router-dom'

function AppTitle() {
  return (
    <LinkMUI component={Link} to="/" variant="body1" underline="none">
      <Typography
        variant="h4"
        color="white"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        SuperCoolApp
      </Typography>
    </LinkMUI>

  )
}

export default AppTitle
