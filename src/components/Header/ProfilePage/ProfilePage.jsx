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
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { editProfileQuery } from '../../../redux/actionCreators/userActionCreators'
import Post from '../../Main/Posts/Post/Post'
import { getPostsFromServerQuery } from '../../../redux/actionCreators/postsActionCreators'

const theme = createTheme()

export default function ProfilePAge() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPostsFromServerQuery()) // получаем посты с сервера
  }, [])
  const user = useSelector((store) => store.user) // получаем пользователя из Redux
  const [name, setName] = useState(user.name)
  const [about, setAbout] = useState(user.about)
  const posts = useSelector((store) => store.paginatePost.posts)

  const userPosts = posts.filter((post) => post?.author?.email === user.email) // отсеиваем посты, опубликованные не пользователем

  const editProfileHandler = (event) => { // пишем хэндлер для редактирования профиля
    event.preventDefault()
    if (name.length > 2 && about.length > 2) {
      dispatch(editProfileQuery(name, about))
    } else alert('Некорректно заполнены поля формы')
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            height="65vh"
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
              {`Привет, ${user.name}!`}
            </Typography>
            <Box component="form" noValidate onSubmit={editProfileHandler} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={name?.length < 3}
                    helperText={name?.length < 3 && 'Минимум 3 символа'}
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={about?.length < 3}
                    helperText={about?.length < 3 && 'Минимум 3 символа'}
                    name="about"
                    id="about"
                    autoComplete="about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Редактировать
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <hr />
      <h2>
        Ваши посты
      </h2>
      <Container>
        <Grid container spacing={2} sx={{ mt: 10 }}>
          {userPosts.map((post) => (
            // eslint-disable-next-line no-underscore-dangle
            <Post key={post._id} {...post} />
          ))}
        </Grid>
      </Container>

    </>

  )
}
