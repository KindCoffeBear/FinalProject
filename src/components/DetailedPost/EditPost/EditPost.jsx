import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updatePostQuery } from '../../../redux/actionCreators/detailPostActionCreator'

function EditPost({
  title, text, image, tags, closeModal,
}) {
  const { idPost } = useParams() // получение id поста

  const preparedTags = tags.join(',').trim() // получаем из массива строку

  // делаем управляемое состояние формы
  const [editTitle, setEditTitle] = useState(title)
  const [editText, setEditText] = useState(text)
  const [editImage, setEditImage] = useState(image)
  const [editTags, setEditTags] = useState(preparedTags)
  const dispatch = useDispatch() // достаем dispatch

  // меняем состояние формы
  const changeHead = (e) => {
    setEditTitle(e.target.value)
  }
  const changeDescription = (e) => {
    setEditText(e.target.value)
  }

  const changeLink = (e) => {
    setEditImage(e.target.value)
  }

  const changeTag = (e) => {
    setEditTags(e.target.value)
  }

  // отправляем форму для редактирования поста
  const submitHandler = (e) => {
    e.preventDefault()

    const editedPost = {
      title: editTitle,
      text: editText,
      image: editImage,
      tags: editTags.split(',').map((el) => el.trim()),
    }

    dispatch(updatePostQuery(idPost, editedPost, closeModal))
  }

  return (
    <Stack
      component="form"
      alignItems="center"
      spacing={2}
      noValidate
      sx={{
        m: 1,
        width: 350,
      }}
      autoComplete="off"
    >
      <TextField
        id="outlined-textarea"
        sx={{
          width: 300,
        }}
        label="Заголовок"
        placeholder="Заголовок поста"
        multiline
        onChange={changeHead}
        value={editTitle}
      />
      <TextField
        id="outlined-textarea"
        sx={{
          width: 300,
        }}
        label="Текст"
        placeholder="Текст поста"
        multiline
        onChange={changeDescription}
        value={editText}
      />
      <TextField
        id="outlined-textarea"
        sx={{
          width: 300,
        }}
        label="Ссылка на картинку"
        placeholder="Ссылка на картинку"
        multiline
        onChange={changeLink}
        value={editImage}
      />
      <TextField
        id="outlined-textarea"
        sx={{
          width: 300,
        }}
        label="Теги"
        placeholder="Введите теги через запятую"
        multiline
        onChange={changeTag}
        value={editTags}
      />
      <Button
        onClick={submitHandler}
        variant="text"
      >
        Отправить
      </Button>
    </Stack>
  )
}

export default EditPost
