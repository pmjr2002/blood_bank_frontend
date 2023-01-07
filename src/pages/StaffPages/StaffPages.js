import { Drawer, List, ListItem,ListItemText, Box } from '@mui/material'
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
		}
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
    <>
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
							<ListItem
							key = {item.text}
							onClick = {() => navigate(item.path)}
							>
								<ListItemText primary = {item.text} style = {{textAlign: 'center'}}/>
							</ListItem>
						))}
					</List>
				</Drawer>
				<Routes>
					<Route path = '/' element = {<Donors/>}/>
					<Route path = '/result-entry' element = {<ResultEntry/>}/>
					<Route path = '/pending-requests' element = {<PendingRequests/>}/>
				</Routes>
			</Box>
    </>
  )
}

export default StaffPages