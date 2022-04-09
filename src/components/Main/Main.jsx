import CreateForm from './CreateForm/CreateForm'
import Posts from './Posts/Posts'
import SearchPost from './SearchPost/SearchPost'

function Main() {
  return (
    <section className="container">
      <CreateForm />
      <hr />
      <SearchPost />
      <Posts />
    </section>
  )
}

export default Main
