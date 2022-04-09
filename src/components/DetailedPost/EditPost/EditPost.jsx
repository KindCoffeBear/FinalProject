import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePostQuery } from '../../../redux/actionCreators/postsActionCreators'

function EditPost({
  idPost, head, description, link, tag, closeModal,
}) {
  // делаем управляемое состояние формы
  const [editHead, setEditHead] = useState(head)
  const [editDescription, setEditDescription] = useState(description)
  const [editLink, setEditLink] = useState(link)
  const [editTag, setEditTag] = useState(tag)

  const dispatch = useDispatch() // достаем dispatch

  // меняем состояние формы
  const changeHead = (e) => {
    setEditHead(e.target.value)
  }
  const changeDescription = (e) => {
    setEditDescription(e.target.value)
  }

  const changeLink = (e) => {
    setEditLink(e.target.value)
  }

  const changeTag = (e) => {
    setEditTag(e.target.value)
  }

  // отправляем форму для редактирования поста
  const submitHandler = (e) => {
    e.preventDefault()

    const editedPost = {
      head: editHead,
      description: editDescription,
      link: editLink,
      tag: editTag,
    }

    dispatch(updatePostQuery(idPost, editedPost, closeModal))
  }

  return (
    <form className="d-flex flex-column align-items-center" onSubmit={submitHandler}>
      <div className="mb-3">
        <input onChange={changeHead} name="head" placeholder="Заголовок поста" type="text" className="form-control" value={editHead} />
      </div>
      <div className="mb-3">
        <input onChange={changeDescription} name="description" placeholder="Текст поста" type="text" className="form-control" value={editDescription} />
      </div>
      <div className="mb-3">
        <input onChange={changeLink} name="link" placeholder="Ссылка на картинку" type="text" className="form-control" value={editLink} />
      </div>
      <div className="mb-3">
        <input onChange={changeTag} name="tag" placeholder="Тег" type="text" className="form-control" value={editTag} />
      </div>
      <button type="submit" className="btn btn-primary">Отправить</button>
    </form>
  )
}

export default EditPost
