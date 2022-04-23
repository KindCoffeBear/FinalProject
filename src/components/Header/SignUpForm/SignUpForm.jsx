/* eslint-disable react/no-unescaped-entities */
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { signUpQuery } from '../../../redux/actionCreators/userActionCreators'

const theme = createTheme()

export default function SignUpForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    if (password.length > 4 && name.length > 2 && about.length > 2 && avatar) {
      dispatch(signUpQuery({
        email,
        password,
        name,
        about,
        avatar,
        cb: () => {
          navigate('/content')
        },
      }))
    } else alert('Пожалуйста, корректно заполните все формы')
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          height="80vh"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Заполните данные профиля
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  id="email"
                  label="Адрес электронной почты"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  error={password.length < 5}
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={password.length < 5 && 'Длина пароля должна быть не меньше 5 символов'}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  error={name.length < 3}
                  helperText={name.length < 3 && 'Длина имени должна быть не меньше 3 символов'}
                  required
                  fullWidth
                  id="name"
                  label="Ваше имя"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={about}
                  error={about.length < 3}
                  helperText={about.length < 3 && 'Длина названия профессии должна быть не меньше 3 символов'}
                  required
                  fullWidth
                  id="profession"
                  label="Ваша профессия"
                  name="profession"
                  autoComplete="profession"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!avatar}
                  helperText={!avatar && 'Установите аватар'}
                  required
                  fullWidth
                  id="avatar"
                  label="Ваш аватар"
                  name="avatar"
                  autoComplete="avatar"
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Создать аккаунт
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signInForm" variant="body2">
                  Уже есть аккаунт? Войдите в систему
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
