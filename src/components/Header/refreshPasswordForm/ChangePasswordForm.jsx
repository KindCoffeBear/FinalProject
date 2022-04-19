/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function ChangePasswordForm() {
  const refreshPasswordHandler = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-unused-vars
    const newPassword = data.get('newPass')
    const token = data.get('token')
    const getID = await fetch(
      'https://api.react-learning.ru/users/me',
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    const IdFromServer = await getID.json()
    // eslint-disable-next-line no-underscore-dangle
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-underscore-dangle
    const userId = IdFromServer._id
    console.log(userId)
    const response = await fetch(
      `https://api.react-learning.ru/password-reset/${userId}/${token}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      },
    )
    const responseFromServer = await response.json()
    console.log(responseFromServer)
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
          id="newPass"
          label="Введите новый пароль"
          name="newPass"
          autoComplete="newPass"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="token"
          label="Укажите токен с электронной почты"
          name="token"
          autoComplete="token"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Сменить пароль
        </Button>
      </Box>
    </Container>

  )
}
