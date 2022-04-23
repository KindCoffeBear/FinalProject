import './MainForNotAuth.css'

export default function MainForNotAuth() {
  return (
    <div className="container">
      <img src="https://www.meme-arsenal.com/memes/26efb6c54ccb4a564149027aeb61e233.jpg" alt="пингвин" />
      <h2 className="hellopage">
        Пожалуйста,
        {' '}
        <a href="/signInForm">войдите в систему</a>
        {' '}
        чтобы увидеть наш чудесный контент!
      </h2>
    </div>
  )
}
