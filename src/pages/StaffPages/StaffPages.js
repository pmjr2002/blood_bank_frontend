import React, {useContext} from 'react'
import { Drawer, List, ListItemButton,ListItemText, Box, Button } from '@mui/material'
import { useNavigate,Route, Routes } from 'react-router-dom'

import Donors from './Donors'
import PendingRequests from './PendingRequests'
import ResultEntry from './ResultEntry'
import RepositoryTable from './RepositoryTable'

import AuthContext from '../../context/AuthContext'


const style = {
	drawer: {
		backgroundColor: 'pink',
	},
	heading: {
		textAlign: 'center',
		padding: '0.5em 0',
	},
	listItem: {
		textAlign: 'center',
	},
	listItemActive: {
		color: 'black',
		backgroundColor: 'white',
	},
}

function StaffPages() {

  let {user} = useContext(AuthContext)
	let {logout} = useContext(AuthContext)

	let items = [
		{
			text: 'Donors',
			path: `/staff/${user.id}`,
		},
		{
			text: 'Result Entry',
			path: `/staff/${user.id}/result-entry/`,
		},
		{
			text: 'Pending Requests',
			path: `/staff/${user.id}/pending-requests/`,
		},
		{
			text: 'Repository',
			path: `/staff/${user.id}/repository/`
		}
	]

	const drawerWidth = 240
	
	const navigate = useNavigate()

	return (
    <div style = {{backgroundColor: '#e4e4e4',minHeight: '100vh'}}>
			<Box sx = {{display: 'flex'}}>
				<Drawer
					sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				backgroundColor: 'pink',
				border: 'none'
					}}}
					variant="permanent"
					anchor="left"
				>
					<h1 style = {style.heading}>Staff Panel</h1>
					<List>
						{items.map((item) => (
							<ListItemButton
							key = {item.text}
							selected = {window.location.pathname === item.path}
							onClick = {() => navigate(item.path)}
							>
								<ListItemText primary = {item.text} style = {style.listItem	}/>
							</ListItemButton>
						))}
					</List>
				<Box textAlign = 'center'>
					<Button 
						variant = 'contained' 
						sx = {{minWidth: 50,backgroundColor: 'purple', '&:hover': {backgroundColor: 'purple'}}}
						onClick = {logout}
						>Logout</Button>
				</Box>
				</Drawer>
				<Routes>
					<Route path = '/' element = {<Donors/>}/>
					<Route path = '/result-entry' element = {<ResultEntry/>}/>
					<Route path = '/pending-requests' element = {<PendingRequests/>}/>
					<Route path = '/repository' element = {<RepositoryTable/>}/>
				</Routes>
			</Box>
    </div>
  )
}

export default StaffPages