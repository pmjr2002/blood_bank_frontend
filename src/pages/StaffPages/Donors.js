import React, {useState, useEffect, useContext} from 'react'
import {Autocomplete, 
  Paper, Box,TextField,Button, Modal, ListItemText, List, ListItem } from '@mui/material'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchIcon from '@mui/icons-material/Search'

import AuthContext from '../../context/AuthContext'

function Donors() {
  const {user} = useContext(AuthContext)
  const {authTokens} = useContext(AuthContext)

  const [addresses, setAddresses] = useState([])
  const [donors, setDonors] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  const [value, setValue] = useState(dayjs('2023-01-09'))

  const handleChange = (newValue) => setValue(newValue)

  useEffect(() =>{
    async function fetchData(){
      const response = await fetch('http://localhost:8000/donors/addresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      if(response.status === 200){
        const data = await response.json()
        setAddresses(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

  let handleSearch = async(e) => {
    e.preventDefault()
    
    let locality = document.getElementsByTagName('input')[0].value
    let blood_group = document.getElementsByTagName('input')[1].value 
    
    let response = await fetch(`http://127.0.0.1:8000/donors/?locality=${locality}&blood_group=${blood_group}`)

    
    if(response.status === 200){
      let data = response.json()
      console.log(data)
      setDonors(data)
    }
    else
      alert("Error " + response.status + " : " + response.statusText)
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    let name = document.getElementsByTagName('input')[2].value
    let gender = document.getElementsByTagName('input')[3].value
    let dob = document.getElementsByTagName('input')[4].value
    console.log(document.getElementsByTagName('input')[4].value.toString.length)
    let blood_group = document.getElementsByTagName('input')[5].value
    let phone = document.getElementsByTagName('input')[6].value
    let address = document.getElementsByTagName('input')[7].value

    if(name === '' || gender === '' || dob === '' || blood_group === '' || phone === '' || address === ''){
      alert("Please fill all the fields")
      return
    }

    fetch('http://localhost:8000/donors', {
      method: 'POST',
      headers: {
      'content-type': 'application/json',
      Authentication: `Bearer ${authTokens.access_token}`
      },
      body:JSON.stringify({
        'name': name,
        'gender': gender,
        'dob': dob,
        'blood_group': blood_group,
        'phone': phone,
        'address': address
      })
			})
  }

  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em',
      width: '100%',
    },
    searchContainer: {
      width: '80%',
    },
    paper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1em'
    },
    createBtn:{
      backgroundColor: 'purple',
      position: 'fixed',
      right: '3em',
      bottom: '3em',
    },
    donorModal: {
      main: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%'
      },
      heading:{
        textAlign: 'center',
				width: '100%',
				backgroundColor: 'purple',
				color: 'white',
				padding: '0.25em 0'
      },
      btnBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
      },
      submitBtn:{
        backgroundColor: 'purple',
        margin : '0 1 em'
      },
      cancelBtn:{
        backgroundColor: 'red',
        margin : '0 1 em'
      },
      inputBox: {
        width: 300,
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "pink",
        }},
      }
    },
  }

  return (

  <div style = {style.container}>
    <div style = {style.searchContainer}>
      <Paper elevation = {10} style = {style.paper}>
        <Autocomplete
          id = "locality"
          options = {addresses}
          sx = {style.donorModal.inputBox}
          renderInput = {(params) =>
            <TextField {...params}
            label = "Search Locality"
            id = "locality"
            sx = {
              {"& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "pink",
                }}}}/>}/>
        <Autocomplete
        id = "blood-group"
        options = {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
        sx = {style.donorModal.inputBox}
        renderInput = {(params) =>
          <TextField {...params}
          label = "Search Blood Group"
          id = "blood-group"
          sx = {
            {"& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "pink",
              }}}}/>}/>
          <Button 
            variant = "contained" 
            endIcon = {<SearchIcon />}
            onClick = {(e) => handleSearch(e)}
            size = 'large' 
            sx = {{backgroundColor: 'purple', '&:hover': {backgroundColor: 'purple'}}}
            >Search</Button>
      </Paper>
    </div>
    <div>
        <Button 
          variant = "contained" 
          style = {style.createBtn}
          onClick = {handleOpen}>
          <h2>+</h2>
        </Button>
        <Modal
          open = {open}
          onClose = {handleClose}
          aria-labelledby = 'modal-create-donor'
          aria-describedby = 'modal-create-donor'>
            <Paper elevation = {12} style = {style.donorModal.main}>
              <form onSubmit = {(e) => handleSubmit(e)}>
                <h1 style = {style.donorModal.heading}>Enter Details</h1>
                  <List>
                    <ListItem id = {1}>
                      <ListItemText
                        primary = 'Name'
                        primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}}
                        />
                      <TextField
                        id = 'name'
                        placeholder='Enter Name'
                        label = 'Name'
                        variant = 'outlined'
                        sx = {style.donorModal.inputBox}
                        />
                    </ListItem>
                  <ListItem id = {2}>
                    <ListItemText
                      primary = 'Gender'
                      primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}}
                    />
                    <Autocomplete
                      id = "gender"
                      options = {['Male','Female','Other']}
                      sx = {style.donorModal.inputBox}
                      renderInput = {(params) =>
                        <TextField {...params}
                        label = "Enter Gender"
                        id = "gender"
                        sx = {
                          {"& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "pink",
                            }}}}/>}/>
                  </ListItem>
                  <ListItem id = {3}>
                    <ListItemText
                      primary = 'Date of Birth'
                      primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}}
                    />
                      <LocalizationProvider dateAdapter = {AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date of Birth"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} type = 'date' sx = {style.donorModal.inputBox} />}
                        />
                      </LocalizationProvider>
                    </ListItem>
                  <ListItem id = {4}>
                    <ListItemText
                      primary = 'Blood Group'
                      primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}}
                      />
                    <Autocomplete
                        id = "blood-group"
                        options = {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                        sx = {style.donorModal.inputBox}
                        renderInput = {(params) =>
                        <TextField {...params}
                          label = "Search Blood Group"
                          sx = {
                            {"& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "pink",
                        }}}}/>}
                      />
                  </ListItem>
                  <ListItem id = {5}>
                    <ListItemText
                      primary = 'Phone'
                      primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}}
                    />
                    <TextField
                      id = 'phone'
                      label = 'Phone'
                      variant = 'outlined'
                      sx = {style.donorModal.inputBox}
                      />
                  </ListItem>
                  <ListItem id = {6}>
                    <ListItemText
                      primary = 'Address'
                      primaryTypographyProps={{fontWeight: 'bold',fontSize: '1.5em'}}
                      />
                    <Autocomplete
                          id = "locality"
                          options = {addresses}
                          sx = {style.donorModal.inputBox}
                          renderInput = {(params) =>
                            <TextField {...params}
                            label = "Search Address"
                            id = "address"
                            sx = {
                {"& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "pink",
                  }}}}/>}/>
                
                  </ListItem>
                </List>
                <Box
                  sx = {{display: 'flex',justifyContent: 'center',alignItems: 'center',gap:5,mb: 2}}>
                  <Button
                    variant = "contained"
                    type = 'submit'
                    style = {style.donorModal.submitBtn}>
                  Submit</Button>
                  <Button
                    variant = 'contained'
                    onClick = {handleClose}
                    style = {style.donorModal.cancelBtn}
                    >
                    Cancel
                  </Button>
                </Box>
              </form>
              </Paper>
          </Modal>
    </div>
  </div>
  )
}

export default Donors