import Typography from '@mui/material/Typography'
import LinkMUI from '@mui/material/Link'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../../redux/actionCreators/filterActionCreator'

function AppTitle() {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(setFilter(''))
  }

  return (
    <LinkMUI component={Link} to="/" variant="body1" underline="none">
      <Typography
        variant="h5"
        color="white"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        onClick={clickHandler}
      >
        SuperCoolApp
      </Typography>
    </LinkMUI>

  )
}

export default AppTitle
