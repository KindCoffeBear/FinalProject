import {
  Button, Paper, TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addNewCommentQuery } from '../../../redux/actionCreators/commentsPostActionCreator'

function CommentAddForm() {
  const { idPost } = useParams() // получение id поста
  const [text, setText] = useState('')
  const token = useSelector((store) => store.user.token)

  const dispatch = useDispatch()

  const ChangeText = (e) => {
    setText(e.target.value)
  }

  const submitHandler = () => {
    const preparedComment = { text }

    dispatch(addNewCommentQuery(idPost, preparedComment, token))

    setText('')
  }

  return (
    <Paper sx={{ padding: '10px 10px' }}>
      <TextField
        id="addNewComment"
        label="Добавить комментарий"
        placeholder="Добавить комментарий"
        multiline
        fullWidth
        value={text}
        onChange={ChangeText}
      />
      <Button onClick={submitHandler}>Добавить комментарий</Button>
    </Paper>

  )
}
export default CommentAddForm
