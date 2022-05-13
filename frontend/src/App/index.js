import React, {
  useState,
  useMemo
} from 'react'
import { useAuth } from '../Auth'
import { styled } from '@mui/material/styles'
import {
  Container,
  Grid,
  Stack,
  Paper
} from '@mui/material'

const Box = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

export default function MenuAppBar () {
  return (
    <Container maxWidth={'md'}>
      <Grid
        container={true}
        spacing={2}
      >
        <Grid
          item={true}
          xs={4}
        >
          <Stack spacing={2}>
            <Box>1</Box>
            <Box>2</Box>
          </Stack>
        </Grid>

        <Grid
          item={true}
          xs={8}
        >
          <Box>xs=8</Box>
        </Grid>
      </Grid>
    </Container>
  )
}
