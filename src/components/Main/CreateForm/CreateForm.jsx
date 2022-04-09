import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPostQuery } from '../../../redux/actionCreators/postsActionCreators'

function AddedForm() {
  const dispatch = useDispatch() // достаем dispatch

  // делаем управляемую форму
  const [head, setHead] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [tag, setTag] = useState('')

  // меняем состояние инпутов в форме
  const changeHead = (e) => {
    setHead(e.target.value)
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
  }

  const changeLink = (e) => {
    setLink(e.target.value)
  }

  const changeTag = (e) => {
    setTag(e.target.value)
  }

  // отправляем форму на сервер для добавление поста
  const submitHandler = (e) => {
    e.preventDefault()

    const newPost = {
      head, description, link, tag,
    }

    dispatch(addNewPostQuery(newPost))

    // обнуляем состояние инпутов в форме
    setHead('')
    setDescription('')
    setLink('')
    setTag('')
  }

  return (
    <>
      <h1 className="text-center my-3">My Instagram</h1>
      <section className="d-flex justify-content-center">
        <form onSubmit={submitHandler} className="d-flex flex-column align-items-center" method="POST">
          <div className="mb-3">
            <input onChange={changeHead} name="head" placeholder="Заголовок поста" type="text" className="form-control" value={head} />
          </div>
          <div className="mb-3">
            <input onChange={changeDescription} name="description" placeholder="Текст поста" type="text" className="form-control" value={description} />
          </div>
          <div className="mb-3">
            <input onChange={changeLink} name="link" placeholder="Ссылка на картинку" type="text" className="form-control" value={link} />
          </div>
          <div className="mb-3">
            <input onChange={changeTag} name="tag" placeholder="Тег" type="text" className="form-control" value={tag} />
          </div>
          <button type="submit" className="btn btn-primary">Отправить</button>
        </form>
      </section>
    </>
  )
}

export default AddedForm
