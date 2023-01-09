import React,{useState} from 'react'

import {Paper, Table, TableBody,TableCell, TableContainer, TableHead,TableRow} from '@mui/material'

function RepositoryTable() {
	const [blood, setBlood] = useState([])

	useEffect(() =>{
    async function fetchData(){
      const response = await fetch('http://localhost:8000/repository/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      if(response.status === 200){
        const data = await response.json()
				console.log(data)
        setBlood(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

  return (
    <div>
        <Paper>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Blood Group</TableCell>
									<TableCell>Plasma</TableCell>
									<TableCell>Platelets</TableCell>
									<TableCell>Power Red</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				</Paper>
    </div>
  )
}

export default RepositoryTable