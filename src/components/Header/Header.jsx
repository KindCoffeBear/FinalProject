import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-white">Главная</Link></li>
          </ul>

          <div className="text-end">
            <Link to="/" className="btn btn-info me-2">Выйти</Link>
            <Link to="/" className="btn btn-outline-light me-2">Войти</Link>
            <Link to="/" className="btn btn-warning">Регистарция</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
