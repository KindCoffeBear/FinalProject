/* eslint-disable react/no-unescaped-entities */
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

export default function RefreshPasswordForm() {
  const navigate = useNavigate()
  const refreshPasswordHandler = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const response = await fetch(
      'https://api.react-learning.ru/password-reset',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      },
    )
    const responseFromServer = await response.json()
    alert(responseFromServer.message)
    navigate('/changePasswordForm')
  }
  return (
    <Container maxWidth="sm" sx={{ mt: 20 }}>
      <Typography component="h1" variant="h5">
        Восстановление пароля
      </Typography>
      <Box component="form" noValidate onSubmit={refreshPasswordHandler} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Адрес электронной почты"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить токен на электронную почту
        </Button>
      </Box>
    </Container>

  )
}
