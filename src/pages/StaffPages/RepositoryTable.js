import React,{useState, useEffect} from 'react'

import {Paper, Table, TableBody,TableCell, TableContainer, TableHead,TableRow} from '@mui/material'
import Loader from '../../utils/SpinLoader'

const style = {
  main: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    width: '80%',
  },
  heading: {
    fontSize: '3em',
    padding: '0.2em 0',
    color: 'white',
    backgroundColor: 'purple',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
  },
  tableHeading: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  tableContent: {
    fontWeight: 'bold',
  }
}

function RepositoryTable() {
	const [blood, setBlood] = useState([])
  const [isLoading, setisLoading] = useState(false)

	useEffect(() =>{
    async function fetchData(){
      setisLoading(true)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/repository/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      setisLoading(false)
      if(response.status === 200){
        const data = await response.json()
        setBlood(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

  return (
    isLoading? <Loader/> :
    <div style = {style.main}>
        <Paper style = {style.paper}elevation = {12}>
        <h1 style = {style.heading}>Repository</h1>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell style = {style.tableHeading} align = 'center'>Blood Group</TableCell>
									<TableCell style = {style.tableHeading} align = 'center'>Plasma</TableCell>
									<TableCell style = {style.tableHeading} align = 'center'>Platelets</TableCell>
									<TableCell style = {style.tableHeading} align = 'center'>Power Red</TableCell>
								</TableRow>
							</TableHead>
              <TableBody>
                {blood.map((row) => (
                  <TableRow
                    key = {row.blood_group}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style = {style.tableContent}align = 'center'>{row.blood_group}</TableCell>
                    <TableCell style = {style.tableContent}align = 'center'>{row.plasma}</TableCell>
                    <TableCell style = {style.tableContent}align = 'center'>{row.platelets}</TableCell>
                    <TableCell style = {style.tableContent}align = 'center'>{row.rbc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
						</Table>
					</TableContainer>
				</Paper>
    </div>
  )
}

export default RepositoryTable