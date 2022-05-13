import React, {
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material'

export default function LogIn ({ OnLogin }) {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const logIn = useCallback(async () => {
    try {
      await AuthAPI.logIn(nickname, password)
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось войти в систему'
      })
    }

    OnLogin()
  })

  return (
    <Paper
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        mx: 'auto',
        maxWidth: 480
      }}
    >
      <Typography
        sx={{ mb: 2 }}
        variant={'h5'}
      >
        Войти в систему
      </Typography>

      <TextField
        sx={{ mb: 1 }}
        type={'email'}
        size={'small'}
        fullWidth={true}
        placeholder={'Nickname'}
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
      <TextField
        sx={{ mb: 2 }}
        type={'password'}
        size={'small'}
        fullWidth={true}
        placeholder={'Password'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button
        sx={{ mb: 2 }}
        variant={'outlined'}
        fullWidth={true}
        onClick={logIn}
      >
        Войти
      </Button>
    </Paper>
  )
}

LogIn.propTypes = {
  OnLogin: PropTypes.func.isRequired
}
