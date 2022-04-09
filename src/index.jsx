import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension' // расширение для использования инструмента отладки
import thunk from 'redux-thunk' // позволяет использовать асинхронные функции в Redux
import App from './App'
import initState from './redux/store'
import rootReducer from './redux/reducers/rootReducer'

// создаем состояние Redux на корневом уровне
const store = createStore(rootReducer, initState, composeWithDevTools(
  applyMiddleware(thunk),
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
