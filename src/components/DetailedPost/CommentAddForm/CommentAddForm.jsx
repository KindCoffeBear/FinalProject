import {
  Button, Paper, TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addNewCommentQuery } from '../../../redux/actionCreators/commentsPostActionCreator'

function CommentAddForm() {
  const { idPost } = useParams() // получение id поста
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const ChangeText = (e) => {
    setText(e.target.value)
  }

  const submitHandler = () => {
    const preparedComment = { text }

    dispatch(addNewCommentQuery(idPost, preparedComment))

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
      <Button onClick={submitHandler}>Отправить</Button>
    </Paper>

  )
}
export default CommentAddForm
