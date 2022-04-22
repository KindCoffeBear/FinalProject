/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {
  Avatar, Button, Grid, Paper,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentQuery } from '../../../redux/actionCreators/commentsPostActionCreator'

function CommentsPost({
  updated_at, author, text, idPost, idComment,
}) {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const updatedDate = new Date(updated_at).toLocaleString()

  const deleteHandler = () => {
    dispatch(deleteCommentQuery(idPost, idComment))
  }
  return (
    <Paper sx={{ padding: '10px 10px', display: 'flex' }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={author.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs>
          <h4 style={{ margin: 0, textAlign: 'left' }}>{author.name}</h4>
          <p style={{ textAlign: 'left' }}>
            {text}
          </p>
          <p style={{ textAlign: 'left', color: 'gray' }}>
            {updatedDate}
          </p>
        </Grid>
      </Grid>
      {user._id === author._id ? (
        <Button
          variant="outlined"
          color="error"
          onClick={deleteHandler}
          sx={{
            width: 50,
            height: 30,
            fontSize: 10,
            padding: '10px 10px',
            alignSelf: 'flex-end',
          }}
        >
          Удалить
        </Button>
      ) : null}
    </Paper>

  )
}

export default CommentsPost
