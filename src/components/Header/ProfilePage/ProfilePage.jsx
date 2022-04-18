import Avatar from '@mui/material/Avatar'
import LinkMUI from '@mui/material/Link'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { editProfileQuery } from '../../../redux/actionCreators/userActionCreators'

const theme = createTheme()

export default function ProfilePAge() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const editProfileHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const about = data.get('about')
    dispatch(editProfileQuery(name, about))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LinkMUI component={Link} to="/avatarPage">
            <Avatar
              sx={{
                width: 128, height: 128, m: 1, bgcolor: 'secondary.main',
              }}
              src={`${user.avatar}`}
            />
          </LinkMUI>
          <Typography component="h1" variant="h5">
            {`Welcome, ${user.name}!`}
          </Typography>
          <Box component="form" noValidate onSubmit={editProfileHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={user.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="about"
                  id="about"
                  autoComplete="about"
                  value={user.about}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
