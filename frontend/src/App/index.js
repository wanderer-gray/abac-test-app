import React, {
  useMemo
} from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useAuth } from '../Auth'
import Offices from './Offices'
import Positions from './Positions'
import Users from './Users'
import Roles from './Roles'
import Statuses from './Statuses'
import Tasks from './Tasks'
import {
  Container,
  Grid,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material'

const pages = [
  {
    path: '/office',
    title: 'Офисы',
    element: <Offices />
  },
  {
    path: '/position',
    title: 'Должности',
    element: <Positions />
  },
  {
    path: '/user',
    title: 'Пользователи',
    element: <Users />
  },
  {
    path: '/role',
    title: 'Роли',
    element: <Roles />
  },
  {
    path: '/status',
    title: 'Статусы',
    element: <Statuses />
  },
  {
    path: '/task',
    title: 'Задачи',
    element: <Tasks />
  }
]

export default function App () {
  const location = useLocation()
  const navigate = useNavigate()

  const auth = useAuth()

  const currentPath = useMemo(() => location.pathname, [location.pathname])

  return (
    <Container maxWidth={'md'}>
      <Grid
        container={true}
        spacing={4}
      >
        <Grid
          item={true}
          xs={3}
        >
          <List
            component={'nav'}
            subheader={
              <ListSubheader>
                Abac Test App
              </ListSubheader>
            }
          >
            {pages.map(({ path, title }) => {
              return (
                <ListItemButton
                  key={path}
                  selected={path === currentPath}
                  onClick={() => {
                    navigate(path)
                  }}
                >
                  <ListItemText primary={title} />
                </ListItemButton>
              )
            })}
          </List>

          <Divider />

          <List component={'nav'}>
            <ListItemButton onClick={auth.logOut} >
              <ListItemText secondary={'Выйти'} />
            </ListItemButton>
          </List>
        </Grid>

        <Grid
          item={true}
          xs={9}
        >
          <Routes>
            {pages.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={element}
              />
            ))}

            <Route path={'*'} element={<Navigate to={'/task'} />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  )
}
