import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

const style = {
  loginCard: {
    borderRadius: '1.5rem',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '60%',
  },

  input: {
    width: '100%',
    padding: '0.75rem 1.25rem',
    margin: '0.5rem 0',
    boxSizing: 'border-box',
    border: '2px solid #ccc',
    WebkitTransition: '0.5s',
    transition: '0.5s',
    outline: 'none',
  },
  loginBtn: {
    backgroundColor: 'purple',
    color: 'white',
    padding: '0.75rem 1.25rem',
    margin: '0.5rem 0',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  }
}

function Login(props) {
  let { login } = useContext(AuthContext)


  const [oneFocus, setOneFocus] = useState(false)
  const [twoFocus, setTwoFocus] = useState(false)

  return (
    <div style={style.loginCard}>
      <div style={{ padding: '0.5rem 1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>{props.heading}</h1>
          <h3>{props.subHeading}</h3>
        </div>
        <hr style={{ margin: '0.5rem 0', borderTop: '1px solid #bbb' }} />
        <div>
          <form onSubmit={(e) => login(e)}>
            <label htmlFor="id"><b>ID</b></label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Enter your ID here"
              required
              style={oneFocus ? { ...(style.input), border: '2px solid pink' } : style.input}
              onFocus={() => setOneFocus(true)}
              onBlur={() => setOneFocus(false)}
            >
            </input>

            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password here"
              required
              style={twoFocus ? { ...(style.input), border: '2px solid pink' } : style.input}
              onFocus={() => setTwoFocus(true)}
              onBlur={() => setTwoFocus(false)}
            >
            </input>
            <button type="submit" style={style.loginBtn}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login