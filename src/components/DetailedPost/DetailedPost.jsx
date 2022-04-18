/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import {
  styled, createTheme, responsiveFontSizes,
} from '@mui/material/styles'
import { ThemeProvider } from 'styled-components'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EditIcon from '@mui/icons-material/Edit'
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Stack, Box, Tooltip, Grid, Collapse,
} from '@mui/material'
import LinkMUI from '@mui/material/Link'
import {
  useLayoutEffect, useRef, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCommentsPostFromServerQuery } from '../../redux/actionCreators/commentsPostActionCreator'
import { deletePostQuery, getPostQuery } from '../../redux/actionCreators/postsActionCreators'
import withLoader from '../hocs/withLoader'
import Modal from '../Modal/Modal'
import CommentAddForm from './CommentAddForm/CommentAddForm'
import CommentsPost from './CommentsPost/CommentsPost'
import EditPost from './EditPost/EditPost'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

let theme = createTheme()
theme = responsiveFontSizes(theme)

function DetailedPost() {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const { idPost } = useParams() // получение id поста

  const posts = useSelector((store) => store.posts) // получение состояния постов (массив) из редакса
  const token = useSelector((store) => store.user.token) // получение токена из редакса
  const commentsPost = useSelector((store) => store.commentsPost)

  // const updatedDate = new Date(postDate).toLocaleString()

  const dispatch = useDispatch() // достаем dispatch
  // eslint-disable-next-line no-underscore-dangle
  const indexPost = posts.findIndex((item) => item._id === idPost) // поиск индекса текущего поста в массиве
  const post = posts[indexPost] // получение текущего поста

  const [loading, setLoading] = useState(false) // состояние загрузки (реакт)

  const controller = useRef(new AbortController()) // состояние controller для обрыва соединения с сервером
  const [viewModal, setViewModal] = useState(false) // состояние модалки (закрыта/открыта)

  // Монтируем объект до рендера компонента
  useLayoutEffect(() => {
    setLoading(true) // ставим флаг, что страница загружается, пока данные из сервера получаются

    dispatch(getCommentsPostFromServerQuery(idPost, token))
    dispatch(getPostQuery(idPost, setLoading, controller, token)) // получаем конкретный пост и передаем часть параметров

    // при отмены загрузки данных с сервера выполняем обрыв соединения
    return () => {
      controller.current.abort()
    }
  }, [])

  const deleteHandler = () => {
    dispatch(deletePostQuery(idPost))
  }

  // задаем состояние открытой модалки
  const openModal = () => {
    setViewModal(true)
  }

  // задаем состояние закрытой модалки
  const closeModal = () => {
    setViewModal(false)
  }

  const DetailedPostwithLoader = withLoader(() => (
    <Stack
      component="div"
      direction="column"
      alignItems="center"
    >
      <Grid>
        <Card
          sx={{
            minWidth: 500,
            maxWidth: 500,
            minHeight: 500,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <CardHeader
            // avatar={(
            //   <Avatar src={avatar} aria-label="post" />
            // )}
            title={post.title}
          // subheader={updatedDate}
          />
          <CardMedia
            component="img"
            height="500"
            image={post.image}
            alt={post.title}
          />
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'left' }}>
              {post.text}
            </Typography>
          </CardContent>
          <Box sx={{
            mt: 'auto',
            ml: 1,
          }}
          >
            <CardActions disableSpacing>
              <Typography variant="overline" component="div" gutterBottom position="left">
                {post.tags}
              </Typography>
            </CardActions>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Вернуться">
                <LinkMUI component={Link} to="/content">
                  <ArrowBackIcon />
                </LinkMUI>
              </Tooltip>
              <Tooltip title="Лайк">
                {/* <IconButton aria-label="like"
              // onClick={likeHandler}
              > */}
                <FavoriteBorderIcon />
                {/* <p>{likesFromRedux.length}</p> */}
                {/* </IconButton> */}
              </Tooltip>
              <Tooltip title="Редактировать">
                <IconButton aria-label="edit" onClick={openModal}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton aria-label="delete" onClick={deleteHandler}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" gutterBottom>
            <ThemeProvider theme={theme}>
              <Typography variant="overline">Комментарии</Typography>
            </ThemeProvider>
            <ExpandMore
              expand={!expanded}
              onClick={handleExpandClick}
              aria-expanded={!expanded}
              aria-label="Комментарии"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Typography>

        </Card>
        <Collapse in={!expanded} timeout="auto" unmountOnExit>
          <Card
            sx={{
              minWidth: 500,
              maxWidth: 500,
            }}
          >
            <CommentAddForm />
            {commentsPost.map((comment) => (<CommentsPost key={comment._id} {...comment} idPost={idPost} idComment={comment._id} token={token} />))}
          </Card>
        </Collapse>
      </Grid>
    </Stack>
  ))
  return (
    <>
      <DetailedPostwithLoader loading={loading} />
      <Modal state={viewModal} closeModal={closeModal}>
        <EditPost closeModal={closeModal} {...post} />
      </Modal>
    </>

  )
}
export default DetailedPost
