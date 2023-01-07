import { AppBar, Box } from '@mui/material'
import React from 'react'

function HospitalPages() {
  const style = {
    appbar: {
      backgroundColor: 'pink',
      height: '3em',
    },
    container:{
      padding: '0.25em 1em',
    }
  }
  
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style = {style.appbar}>
        <div style = {style.container}>
          <h1>Blood Bank</h1>
        </div>
      </AppBar>
    </Box>
  )
}

export default HospitalPages