import React,{useContext, useState, useEffect} from 'react'
import AuthContext from '../../context/AuthContext'
import {Paper, List, ListItem, ListItemText,Autocomplete,TextField, Button,Box, Modal} from '@mui/material'
import {toast} from 'react-toastify'
import Loader from '../../utils/SpinLoader'

const items = [
	{text: 'Case Type', options: ['Accident', 'Surgery','Malaria','Anaemia']},
	{text: 'Blood Group', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']},
	{text:'Blood Component',options:['Platelets','Plasma','Power Red','Whole Blood']},
	{text:'Quantity',options:['1','2','3','4','5']}
]

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
	},
	billModal:{
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
		item:{
			textAlign: 'center',
			padding: '1em 0'
		}
	}
}

function Request() {

  const {user} = useContext(AuthContext)
  const {authTokens} = useContext(AuthContext)
  
	const [params, setParams] = useState([])
	const [hospital, setHospital] = useState([])
	const [isLoading, setisLoading] = useState(false)

	useEffect(() =>{
    async function fetchData(){
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hospital/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${authTokens.access_token}`  
      }})
      if(response.status === 200){
        const data = await response.json()
        setHospital(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [user.id, authTokens.access_token])

	const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

	const [prices, setPrices] = useState([])
	useEffect(() =>{
    async function fetchData(){
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/requests/blood_rate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      if(response.status === 200){
        const data = await response.json()
        setPrices(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

	const handleSubmit = async() => {
		setisLoading(true)
		let response = await fetch(`${process.env.REACT_APP_BASE_URL}/requests/`, {
			method: 'POST',
			headers: {
			'content-type': 'application/json',
			Authentication: `Bearer ${authTokens.token}`
			},
			body:JSON.stringify({
				'hospital_id': user.id,
				'patient_case': params[0],
				'blood_group': params[1],
				'blood_component': params[2],
				'quantity': params[3]
			})
		})
		setisLoading(false)
		if(response.status === 201){
			toast.success('Request generated successfully',{
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			})
		handleClose()
	}
	
		if(response.status === 400){
			toast.error(response.statusText,{
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			})
		}

}

	const handleBillGeneration = (e) => {
		e.preventDefault()

		let data1 = document.getElementsByTagName('input')[0].value
		let data2 = document.getElementsByTagName('input')[1].value
		let data3 = document.getElementsByTagName('input')[2].value
		let data4 = document.getElementsByTagName('input')[3].value

		if(data1 === '' || data2 === '' || data3 === '' || data4 === ''){
			alert('Please fill all the fields')
			return
		}
		let data5 = 0
		if(data3 == 'Platelets')
			data5 = prices.platelets * parseInt(data4)
		else if(data3 == 'Plasma')
			data5 = prices.plasma *parseInt(data4)
		else if(data3 == 'Power Red')
			data5 = prices.RBC *parseInt(data4)
		else
			data5 = prices.whole_blood * parseInt(data4)
		setParams([data1,data2,data3,data4,data5])
		handleOpen()
	}

		

    return (
		isLoading? <Loader/> :
    <div style = {style.main}>
        <h1 style={style.heading}>Welcome {hospital.name} #{hospital.hospital_id}</h1>
        <Paper elevation = {12} style = {style.paper}>
				<form onSubmit={(e) => handleBillGeneration(e)}>
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
				<Modal
				open={open}
  			onClose={handleClose}
			>
			<Paper style = {style.billModal.main}>
				<h1 style = {style.billModal.heading}>Bill</h1>
				<div style={style.billModal.item}>
					<h2>Case Type: {params[0]}</h2>
					<h2>Blood Group: {params[1]}</h2>
					<h2>Blood Component: {params[2]}</h2>
					<h2>Quantity: {params[3]}</h2>
					<h1>Price: {params[4]}</h1>
				</div>
				<Box textAlign = 'center'>
					<Button
						variant = 'outlined'
						type = 'submit'
						style = {style.submitBtn}
						onClick ={() => handleSubmit()}
					>Submit</Button>
				</Box>
			</Paper>
			</Modal>
				<Box textAlign = 'center'>
					<Button 
						variant = "contained" 
						style = {style.submitBtn}
						onClick = {(e) => handleBillGeneration(e)}
					>Generate Bill</Button>
				</Box>
			</form>
        </Paper>
    </div>
  )
}

export default Request