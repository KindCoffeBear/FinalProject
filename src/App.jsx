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
import CreateNewPostForm from './components/CreateNewPostForm/CreateNewPostForm'
import SignUpForm from './components/Header/SignUpForm/SignUpForm'
import SignInForm from './components/Header/SignInForm/SignInForm'
import ProtectedComponent from './components/Authentication/ProtectedComponent'
import MainForNotAuth from './components/MainForNotAuth/MainForNotAuth'
import ProfilePage from './components/Header/ProfilePage/ProfilePage'
import AvatarPAge from './components/Header/ProfilePage/AvatarPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainForNotAuth />} />
          <Route
            path="/content"
            element={(
              <ProtectedComponent>
                <Main />
              </ProtectedComponent>
            )}
          />
          <Route path="/post/:idPost" element={<DetailedPost />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/createNewPostForm"
            element={(
              <ProtectedComponent>
                <CreateNewPostForm />
              </ProtectedComponent>
              )}
          />
          <Route
            path="/profilePage"
            element={(
              <ProtectedComponent>
                <ProfilePage />
              </ProtectedComponent>
              )}
          />
          <Route path="/signUpForm" element={<SignUpForm />} />
          <Route path="/signInForm" element={<SignInForm />} />
          <Route path="/avatarPage" element={<AvatarPAge />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
