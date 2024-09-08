import React, { useState, useEffect, useContext } from 'react'
import { Autocomplete, Paper, Box, TextField, Button, Modal, ListItemText, List, ListItem } from '@mui/material'
import dayjs from 'dayjs'
import Loader from '../../utils/SpinLoader'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'

const style = {
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
	},
	createBtn:{
		backgroundColor: 'purple',
		position: 'fixed',
		right: '3em',
		bottom: '3em',
	},
}

function HospitalModal() {
	const { authTokens } = useContext(AuthContext)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	// State variables for form inputs
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setisLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validation
		if (name === '' || address === '' || phone === '' || password === '') {
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

		setisLoading(true)

		let response = await fetch(`${process.env.REACT_APP_BASE_URL}/hospital/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authentication: `Bearer ${authTokens.access_token}`
			},
			body: JSON.stringify({
				'name': name,
				'address': address,
				'phone': phone,
				'password': password
			})
		})

		setisLoading(false)

		if (response.status === 201) {
			toast.success("New Hospital Added Successfully", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
			handleClose()
		} else if (response.status === 400) {
			toast.warn('Invalid phone number or hospital already exists', {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
		} else {
			toast.error("Error " + response.status + " : " + response.statusText, {
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
		isLoading ? <Loader /> : (
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-create-hospital'
					aria-describedby='modal-create-hospital'>
					<Paper elevation={12} style={style.main}>
						<form onSubmit={(e) => handleSubmit(e)}>
							<h1 style={style.heading}>Enter Details</h1>
							<List style={{ padding: '0.5em 1.5em' }}>
								<ListItem id={1}>
									<ListItemText
										primary='Hospital Name'
										primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.5em' }}
									/>
									<TextField
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder='Enter Hospital Name'
										label='Name'
										variant='outlined'
										sx={style.inputBox}
									/>
								</ListItem>
								<ListItem id={2}>
									<ListItemText
										primary='Hospital Address'
										primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.5em' }}
									/>
									<TextField
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										placeholder='Enter Hospital Address'
										label='Address'
										variant='outlined'
										sx={style.inputBox}
									/>
								</ListItem>
								<ListItem id={3}>
									<ListItemText
										primary='Hospital Phone no'
										primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.5em' }}
									/>
									<TextField
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										placeholder='Enter Hospital Phone number'
										label='Phone number'
										variant='outlined'
										sx={style.inputBox}
									/>
								</ListItem>
								<ListItem id={4}>
									<ListItemText
										primary='Hospital Password'
										primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.5em' }}
									/>
									<TextField
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='Set Hospital password'
										label='Password'
										variant='outlined'
										sx={style.inputBox}
										type='password'
									/>
								</ListItem>
							</List>
							<Box
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, mb: 2 }}>
								<Button
									variant="contained"
									type='submit'
									style={style.submitBtn}>
									Submit
								</Button>
								<Button
									variant='contained'
									onClick={handleClose}
									style={style.cancelBtn}>
									Cancel
								</Button>
							</Box>
						</form>
					</Paper>
				</Modal>
				<div>
					<Button
						variant="contained"
						style={style.createBtn}
						onClick={handleOpen}>
						<h2>+</h2>
					</Button>
				</div>
			</div>
		)
	)
}

export default HospitalModal
