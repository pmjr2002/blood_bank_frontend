import React, {useContext} from 'react'
import { AppBar, Box, Button} from '@mui/material'
import { NavLink, Route, Routes } from 'react-router-dom'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'

import Request from './Request'
import Status from './Status'

import AuthContext from '../../context/AuthContext'

const style = {
  hospMain: {
    backgroundColor: '#e4e4e4',
    minHeight: '100vh',
  },
  appbar: {
    backgroundColor: 'pink',
    height: '3em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1em',
  },
  heading: {
    color: 'black',
    padding: '0 0.25em',
  },
  'left': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'row',
    listStyle: 'none',
    alignItems: 'center',
  },
  navLinksLi: {
    paddingRight: '1em',
    },
  navLinksA: {
    textDecoration: 'none',
    color: 'black',
  },
  navLinksAActive: {
    textDecoration: 'none',
    color: 'black',
    borderBottom: '3px solid purple',
    borderRadius: '1px',
    fontWeight: 'bold',
  },
  logoutBtn:{
    backgroundColor: 'purple', 
    color: 'white',
  }
}

function HospitalPages() {
  let {user} = useContext(AuthContext)
  let {logout} = useContext(AuthContext)

  
  return (
    <div style={style.hospMain}>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="sticky" style = {style.appbar}>
          <div style = {style.left}>
            <VolunteerActivismIcon fontSize = 'large' style = {{color: 'purple'}}/>
            <h1 style = {style.heading}>Blood Bank</h1>
          </div>
          <div style = {style.right}>
            <ul style = {style.navLinks}>
              <li style = {style.navLinksLi}><NavLink style = {({isActive}) => isActive ? style.navLinksAActive : style.navLinksA }  to = {`/hospital/${user.id}/`}>Request</NavLink></li>
              <li style = {style.navLinksLi}><NavLink style = {({isActive}) => isActive ? style.navLinksAActive : style.navLinksA } to = {`/hospital/${user.id}/status/`}>Status</NavLink></li>
            </ul>
            <Button style = {style.logoutBtn} onClick = {logout}>Logout</Button>
          </div>
        </AppBar>
      </Box>
      <Routes>
        <Route path = '/' element = {<Request/>}/>
        <Route path = '/status' element = {<Status/>}/>
      </Routes>
    </div>
  )
}

export default HospitalPages