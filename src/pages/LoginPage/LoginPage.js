import React from 'react'
import bg_img from '../../assets/images/blood_donation_bg.png'
import Login from '../../components/Login'

function LoginPage() {

  const style = {
    main:{
      display: 'flex',
    },
    left:{
      width: '50%',
      height: '100vh',
      backgroundColor: 'pink',
    },
    img: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    right:{
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e4e4e4'
    },
    paper:{
      borderRadius: '1em',
    },
    text:{
      textAlign: 'center',
    },
    padding:{
      padding: '1em',
    },
    input:{
      width: '100%',
      padding: '0.75rem 1.25rem',
      margin: '0.5rem 0',
      border: '2px solid #ccc',
      boxSizing: 'border-box',
      webkitTransition: '0.5s',
      outline: 'none',
    }
  }

	return (
    <div style = {style.main}>
      <div style = {style.left}>
      <img src={bg_img} alt = 'donate blood' style={style.img}></img>
      </div>
      <div style = {style.right}>
        <Login heading = "Blood Bank" subHeading = "Blood Bank Login"/>
      </div>
    </div>
  )
}

export default LoginPage