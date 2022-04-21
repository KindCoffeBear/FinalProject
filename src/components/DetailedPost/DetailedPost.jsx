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
  Stack, Box, Tooltip, Grid, Collapse, Avatar,
} from '@mui/material'
import LinkMUI from '@mui/material/Link'
import {
  useLayoutEffect, useRef, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCommentsPostFromServerQuery } from '../../redux/actionCreators/commentsPostActionCreator'
import withLoader from '../hocs/withLoader'
import Modal from '../Modal/Modal'
import CommentAddForm from './CommentAddForm/CommentAddForm'
import CommentsPost from './CommentsPost/CommentsPost'
import EditPost from './EditPost/EditPost'
import { getPostQuery } from '../../redux/actionCreators/detailPostActionCreator'
import { deletePostQuery } from '../../redux/actionCreators/postsActionCreators'
// import { addLikeQuery, deleteLikeQuery } from '../../redux/actionCreators/likesActionCreator'

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
  const { idPost } = useParams() // получение id поста

  const token = useSelector((store) => store.user.token) // получение токена из редакса
  const commentsPost = useSelector((store) => store.commentsPost) // получение комментариев к посту
  const detailPost = useSelector((store) => store.post) // получение дательного поста из редакса

  const dispatch = useDispatch() // достаем dispatch

  const postDate = detailPost?.updated_at // получение даты из текущего поста
  const avatarPost = detailPost?.author?.avatar // получение аватара из текущего поста

  const likesPost = detailPost.likes // получение всех лайков поста
  // const authorId = detailPost?.author?._id // получение id автора
  const authorName = detailPost?.author?.name // получение имени автора
  const tagsPost = detailPost.tags?.length ? `#${detailPost.tags.join(' #')}` : null

  const updatedDate = new Date(postDate).toLocaleString() // приводим дату в привычный вид

  const [loading, setLoading] = useState(false) // состояние загрузки (реакт)

  const controller = useRef(new AbortController()) // состояние controller для обрыва соединения с сервером
  const [viewModal, setViewModal] = useState(false) // состояние модалки (закрыта/открыта)

  // Монтируем объект до рендера компонента
  useLayoutEffect(() => {
    setLoading(true) // ставим флаг, что страница загружается, пока данные из сервера получаются

    dispatch(getCommentsPostFromServerQuery(idPost))
    dispatch(getPostQuery(idPost, setLoading, controller)) // получаем конкретный пост и передаем часть параметров

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

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => { // скрытие/открытие списка комментариев
    setExpanded(!expanded)
  }

  const DetailedPostwithLoader = withLoader(() => (
    <Stack
      component="div"
      direction="column"
      alignItems="center"
      sx={{ backgroundColor: '#ede7f6' }}
    >
      <Grid>
        <Card
          sx={{
            minWidth: 500,
            maxWidth: 500,
            minHeight: 500,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardHeader
            avatar={(
              <Avatar src={avatarPost} aria-label="post" />
            )}
            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            title={detailPost.title}
            subheader={updatedDate}
          />
          {/* <Typography variant="overline">{detailPost.author}</Typography> */}
          <CardMedia
            component="img"
            height="500"
            image={detailPost.image}
            alt={detailPost.title}
          />
          <Grid container>
            <Grid item xs={12} mt={1.5} ml={1}>
              <Typography variant="overline" color="text.secondary" sx={{ textAlign: 'left', fontFamily: '"Segoe UI"' }}>
                {authorName}
              </Typography>
            </Grid>
            <CardContent>
              <Typography variant="body1" sx={{ textAlign: 'left', fontFamily: '"Segoe UI"' }}>
                {detailPost.text}
              </Typography>
            </CardContent>
          </Grid>
          <Box sx={{
            mt: 'auto',
            ml: 1,
          }}
          >
            <CardActions disableSpacing>
              <Typography variant="overline" color="text.secondary" component="div" gutterBottom position="left" mt={1}>
                {tagsPost}
              </Typography>
            </CardActions>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Tooltip title="Вернуться">
                <LinkMUI component={Link} to="/content">
                  <ArrowBackIcon />
                </LinkMUI>
              </Tooltip>
              <Tooltip title="Лайк">
                <IconButton
                  aria-label="like"
                // onClick={likeHandler}
                >
                  <FavoriteBorderIcon
                    sx={{
                      color: '#c62828',
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      textAlign: 'left',
                      p: 0.5,
                    }}
                  >
                    {likesPost?.length}
                  </Typography>
                </IconButton>
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
        <EditPost closeModal={closeModal} {...detailPost} />
      </Modal>
    </>

  )
}
export default DetailedPost
