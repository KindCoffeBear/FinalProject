import Avatar from '@mui/material/Avatar'
import LinkMUI from '@mui/material/Link'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { editAvatarQuery } from '../../../redux/actionCreators/userActionCreators'

const theme = createTheme()

export default function AvatarPAge() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const token = useSelector((store) => store.user.token)
  const editAvatarHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const avatar = data.get('avatar')
    dispatch(editAvatarQuery(avatar, token))
    navigate('/profilePAge')
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
          <Box component="form" noValidate onSubmit={editAvatarHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <TextField
                required
                fullWidth
                id="avatar"
                label="Choose new avatar"
                name="avatar"
                autoComplete="avatar"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit avatar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
