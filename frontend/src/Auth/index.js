import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import LogIn from './LogIn'

const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export default function Auth ({ children }) {
  const [isAuth, setIsAuth] = useState(null)

  const check = useCallback(async () => {
    try {
      const isAuth = await AuthAPI.check()

      setIsAuth(isAuth)
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось проверить состояние аутентификации'
      })

      setIsAuth(null)
    }
  })

  const logOut = useCallback(async () => {
    try {
      await AuthAPI.logOut()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось выйти из системы'
      })
    }

    check()
  })

  useEffect(() => {
    check()

    const checker = setInterval(check, 30 * 1000)

    return () => clearInterval(checker)
  }, [])

  if (isAuth === null) {
    return 'Загрузка...'
  }

  if (!isAuth) {
    return (
      <Router>
        <Routes>
          <Route path={'/logIn'} element={<LogIn OnLogin={check} />} />
          <Route path={'*'} element={<Navigate to={'/logIn'}/>} />
        </Routes>
      </Router>
    )
  }

  return (
    <AuthContext.Provider value={{ check, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

Auth.propTypes = {
  children: PropTypes.node
}
