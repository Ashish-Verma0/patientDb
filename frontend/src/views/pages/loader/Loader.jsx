import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Loader() {
  return (
    <Box
      style={{
        width: '100%',
        height: '20vh',
        lineHeight: '20vh',
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: '10px',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
