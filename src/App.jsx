import './App.css'
import {
  BrowserRouter, // позволяет использовать Роуты
  Routes, // задает поле, где будут переходы без перезагрузки страницы
  Route, // указыет путь и какой компенент будет там рендериться
} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import PageNotFound from './components/404/404'
import DetailedPost from './components/DetailedPost/DetailedPost'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post/:idPost" element={<DetailedPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
