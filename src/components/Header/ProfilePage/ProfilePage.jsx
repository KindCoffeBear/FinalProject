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
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { editProfileQuery } from '../../../redux/actionCreators/userActionCreators'
import Post from '../../Main/Posts/Post/Post'
import useDebounce from '../../CustomHooks/useDebounce'
import TOKEN from '../../../localStorageConsts'
import { getPostsFromServerQuery } from '../../../redux/actionCreators/postsActionCreators'

const theme = createTheme()

export default function ProfilePAge() {
  // const navigate = useNavigate()
  const filter = useSelector((store) => store.filter)
  const dispatch = useDispatch()
  const debouncedFilter = useDebounce(filter, 300)
  let token = useSelector((store) => store.user.token)
  if (!token) {
    token = localStorage.getItem(TOKEN)
  }
  const user = useSelector((store) => store.user)
  useEffect(() => {
    dispatch(getPostsFromServerQuery(debouncedFilter))
  }, [debouncedFilter])
  const posts = useSelector((store) => store.paginatePost.posts)
  console.log(user, posts)
  const newPosts = posts.filter((post) => post?.author?.email === user.email)
  const editProfileHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const about = data.get('about')
    dispatch(editProfileQuery(name, about))
  }

  return (
    <>
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
              {`Привет, ${user.name}!`}
            </Typography>
            <Box component="form" noValidate onSubmit={editProfileHandler} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    autoComplete="name"
                    defaultValue={user.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="about"
                    id="about"
                    autoComplete="about"
                    defaultValue={user.about}
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
          {newPosts.map((post) => (
          // eslint-disable-next-line no-underscore-dangle
            <Post key={post._id} {...post} />
          ))}
        </Grid>
      </Container>

    </>

  )
}
