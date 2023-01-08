import { Drawer, List, ListItemButton,ListItemText, Box } from '@mui/material'
import React from 'react'
import { useNavigate,Route, Routes } from 'react-router-dom'

import Donors from './Donors'
import PendingRequests from './PendingRequests'
import ResultEntry from './ResultEntry'

function StaffPages() {
  const drawerWidth = 240
	
	const navigate = useNavigate()

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

	let items = [
		{
			text: 'Donors',
			path: '/staff/',
		},
		{
			text: 'Result Entry',
			path: '/staff/result-entry/',
		},
		{
			text: 'Pending Requests',
			path: '/staff/pending-requests/',
		}
	]


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
				</Drawer>
				<Routes>
					<Route path = '/' element = {<Donors/>}/>
					<Route path = '/result-entry' element = {<ResultEntry/>}/>
					<Route path = '/pending-requests' element = {<PendingRequests/>}/>
				</Routes>
			</Box>
    </div>
  )
}

export default StaffPages