import React,{useContext, useState, useEffect} from 'react'
import AuthContext from '../../context/AuthContext'
import {Paper, List, ListItem, ListItemText,Autocomplete,TextField, Button,Box} from '@mui/material'

function Request() {

  const {user} = useContext(AuthContext)
  const {authTokens} = useContext(AuthContext)
  const [data, setData] = useState([])


	useEffect(() =>{
    async function fetchData(){
      const response = await fetch(`http://localhost:8000/hospital/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${authTokens.access_token}`  
      }})
      if(response.status === 200){
        const data = await response.json()
        setData(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [user.id, authTokens.access_token])



		const items = [
			{text: 'Case Type', options: ['Accident', 'Surgery','Malaria','Anaemia']},
			{text: 'Blood Group', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']},
			{text:'Blood Component',options:['Platelets','Plasma','Power Red','Whole Blood']},
			{text:'Quantity',options:['1','2','3','4','5','6','7','8','9','10']}
		]

		const handleSubmit = (e) => {
			e.preventDefault()
			
			let data1 = document.getElementsByTagName('input')[0].value
			let data2 = document.getElementsByTagName('input')[1].value
			let data3 = document.getElementsByTagName('input')[2].value
			let data4 = document.getElementsByTagName('input')[3].value

			if(data1 === '' || data2 === '' || data3 === '' || data4 === ''){
				alert('Please fill all the fields')
				return
			}


			fetch('http://localhost:8000/requests', {
				method: 'POST',
				headers: {
				'content-type': 'application/json',
				Authentication: `Bearer ${authTokens.access_token}`
				},
				body:JSON.stringify({
					'hospital_id': data.hospital_id,
					'patient_case': data1,
					'blood_group': data2,
					'blood_component': data3,
					'quantity': data4
				})
			})
			
		}

		const style = {
			main: {
				padding: '3em 0'
			},
			paper: {
				width: '70%',
				margin: '0 auto',
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
		

    return (
    <div style = {style.main}>
        <h1 style={style.heading}>Welcome {data.name} #{data.hospital_id}</h1>
        <Paper elevation = {12} style = {style.paper}>
				<form onSubmit={(e) => handleSubmit(e)}>
				<h1 style = {style.formHeading}>Request details</h1>
				<div>
					<List>
						{items.map((item) => (
							<ListItem key = {item.text}>
								<ListItemText primary = {item.text} />
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

export default Request