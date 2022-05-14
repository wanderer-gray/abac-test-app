import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import { Grid } from '@mui/material'

export default function ContainerTable ({
  columns,
  rows
}) {
  return (
    <Grid
      item={true}
      xs={12}
    >
      <Table
        columns={columns}
        rows={rows}
      />
    </Grid>
  )
}

ContainerTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
}
