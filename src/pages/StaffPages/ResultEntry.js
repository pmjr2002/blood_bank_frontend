import React, {useState, useContext, useEffect} from 'react'

import {Autocomplete, 
  Paper, Box,TextField,Button, ListItemText, List, ListItem } from '@mui/material'

import AuthContext from '../../context/AuthContext'

import {toast} from 'react-toastify'

const style = {
  main: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 15,
  },
  paper: {
    width: '80%',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1em',
  },
  formHeading: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'purple',
    color: 'white',
    padding: '0.25em 0'
  },
  submitBtn: {
    backgroundColor: 'purple', 
    color: 'white',
    width: 200,
    marginBottom: 30,
  }}

function ResultEntry() {
  const {user} = useContext(AuthContext)
  const {authTokens} = useContext(AuthContext)

  const [donors, setDonors] = useState([])

  useEffect(() =>{
    async function fetchData(){
      const response = await fetch('http://localhost:8000/donors/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      if(response.status === 200){
        const data = await response.json()
        setDonors(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

  let donor_id_list = donors.map((donor) => (donor.donor_id))
  const items = [
    {text:'Donor ID',options: donor_id_list},
    {text: 'Blood Group', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']},
    {text: 'Occasion', options: ['Normal', 'Emergency']},
    {text:'Result',options:['Positive','Negative']}
  ]

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    let data1 = document.getElementsByTagName('input')[0].value
    let data2 = document.getElementsByTagName('input')[1].value
    let data3 = document.getElementsByTagName('input')[2].value
    let data4 = document.getElementsByTagName('input')[3].value

    if(data1 === '' || data2 === '' || data3 === '',data4 === ''){
      toast.warn('Please enter all the fields', {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				})
      return
    }


    let response = await fetch('http://localhost:8000/donations/', {
      method: 'POST',
      headers: {
      'content-type': 'application/json',
      Authentication: `Bearer ${authTokens.access_token}`
      },
      body:JSON.stringify({
        'staff_id': user.id,
        'donor_id': data1,
        'blood_group': data2,
        'donation_occasion': data3,
        'result': data4
      })
    })

    if(response.status === 201){
      toast.success('Result added successfully', {
        position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
      })}
    if(response.status === 400){
      toast.error('Blood group entered does not match donor blood group',{
        position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
      })
    }
  }

  return (
    <div style = {style.main}>
      <h1>Staff ID: {user.id}</h1>
      <Paper elevation = {12} style = {style.paper}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 style = {style.formHeading}>Result Entry</h1>
          <div>
            <List>
              {items.map((item) => (
                <ListItem key = {item.text}>
                  <ListItemText primary = {item.text} primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}} />
                  <Autocomplete
                    id = {String(item.text).trim()}
                    options = {item.options}
                    sx = {{width: 300}}
                    renderInput = {(params) =>
                      <TextField {...params}
                      label = {item.text}
                      id = {item.text.trim()}
                      sx = {
                        {"& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "pink",
                          }
                        }}}/>}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <Box textAlign = 'center'>
              <Button variant = "contained" type = 'submit' style = {style.submitBtn}>Submit</Button>
          </Box>
        </form>
      </Paper>
    </div>
  )
}

export default ResultEntry