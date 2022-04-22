import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Paper, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewPostQuery } from '../../redux/actionCreators/postsActionCreators'

function CreateNewPostForm() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitHandler = () => {
    if (title.length > 2 && text.length > 2 && image && tags.length > 2) {
      const preparedPostQuery = {
        title,
        text,
        image,
        tags: tags.split(',').map((el) => el.trim()),
      }
      dispatch(addNewPostQuery(preparedPostQuery))
      navigate('/content')
    } else alert('Все поля должны быть заполнены корректно')
  }
  return (
    <Stack
      height="87vh"
      component="div"
      direction="column"
      alignItems="center"
      sx={{ backgroundColor: '#ede7f6' }}
    >
      <Paper elevation={3} sx={{ width: 400 }}>
        <Stack
          component="form"
          alignItems="center"
          spacing={2}
          noValidate
          sx={{ py: 5, px: 2 }}
          autoComplete="off"
        >
          <TextField
            error={title.length < 3}
            helperText={title.length < 3 && 'Минимум три символа'}
            multiline
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            error={text.length < 3}
            helperText={text.length < 3 && 'Минимум три символа'}
            multiline
            id="filled-basic"
            label="Text"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextField
            error={!image}
            helperText={!image && 'Укажите URL фотографии'}
            multiline
            id="standard-basic"
            label="Image"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            error={tags.length < 3}
            helperText={tags.length < 3 && 'Минимум три символа'}
            multiline
            id="standard-basic"
            label="Tags"
            variant="outlined"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Button onClick={submitHandler} variant="outlined">
            Добавить пост
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default CreateNewPostForm
