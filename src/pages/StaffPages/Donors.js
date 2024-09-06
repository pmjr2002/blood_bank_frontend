import React, {useState, useEffect} from 'react'
import {Autocomplete, Paper, TextField,Button, Accordion,AccordionSummary, AccordionDetails} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Loader from '../../utils/SpinLoader'
import DonorModal from './DonorModal'

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
  accordion:{
    container: {
      padding: '3em',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1.5em'
    },
    item:{
      width: '40%',
      padding: '0.5em',
    }
  }
}


function Donors() {
  const [addresses, setAddresses] = useState([])
  const [donors, setDonors] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() =>{
    async function fetchData(){
      const response = await fetch('https://blood-bank-back.onrender.com/donors/addresses', {
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
    
    if(blood_group.slice(-1) === '+')
      blood_group = blood_group.replace('+','P')
    setisLoading(true)
    let response = await fetch(`https://blood-bank-back.onrender.com/donors/?locality=${locality}&blood_group=${blood_group}&name=${name}`)

    setisLoading(false)
    
    if(response.status === 200){
      setName('')
      let data = await response.json()
      setDonors(data)
    }
    else
      alert("Error " + response.status + " : " + response.statusText)
  }

  return (
    isLoading? <Loader/> :
  <div style = {style.container}>
    <div style = {style.searchContainer}>
      <Paper elevation = {10} style = {style.paper}>
        <Autocomplete
          id = "locality"
          options = {addresses}
          sx = {{width: 300}}
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
        sx = {{width:300}}
        renderInput = {(params) =>
          <TextField {...params}
          label = "Search Blood Group"
          id = "blood-group"
          sx = {
            {"& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "pink",
              }}}}/>}/>
        <TextField 
          id = "name"
          label = "Name of the donor"
          value = {name}
          sx = {{width : 300}}
          onChange = {(e)=> setName(e.target.value)}
        />
          <Button 
            variant = "contained" 
            endIcon = {<SearchIcon />}
            onClick = {(e) => handleSearch(e)}
            size = 'large' 
            sx = {{backgroundColor: 'purple', '&:hover': {backgroundColor: 'purple'}}}
            >Search</Button>
      </Paper>
    </div>
    <div style = {style.accordion.container} >
      {donors.length !== 0 && donors.map((donor) =>  (
            <Accordion key={donor.donor_id} style = {style.accordion.item}>
              <AccordionSummary
                expandIcon = {<ExpandMoreIcon />}
                id = {donor.donor_id}>
                <h2>{donor.name} <span style = {{color: 'grey'}}>#{donor.donor_id}</span></h2>
              </AccordionSummary>
              <AccordionDetails>
                <h4>Phone Number: {donor.phone}</h4>
                <h4>Date of Birth: {donor.dob}</h4>
                <h4>Blood Group: {donor.blood_group}</h4>
                <h4>Address: {donor.address}</h4>
              </AccordionDetails>
            </Accordion>
        ))}

    </div>
    <DonorModal/>
  </div>
  )
}

export default Donors