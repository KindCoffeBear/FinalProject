/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

export default function ChangePasswordForm() {
  const navigate = useNavigate()
  const refreshPasswordHandler = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-unused-vars
    const newPassword = data.get('newPass')
    const token = data.get('token')
    const email = data.get('email')
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
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
          email,
        }),
      },
    )
    const responseFromServer = await response.json()
    console.log(response)
    if (response.status === 200) {
      alert('Пароль успешно изменен')
      navigate('/signInForm')
    } else if (response.status === 401) {
      alert('Время действия кода истекло, отправьте запрос на восстановления паролья повторно')
      navigate('/refreshPasswordForm')
    }
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
          label="Повторите адрес электронной почты"
          name="email"
          autoComplete="email"
          autoFocus
        />
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
          label="Укажите секретное слово с электронной почты"
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
