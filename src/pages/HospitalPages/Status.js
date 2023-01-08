import React, { useEffect,useState,useContext } from 'react'
import RequestCard from '../../components/RequestCard'

import AuthContext from '../../context/AuthContext'

function Status() {
  const {user} = useContext(AuthContext)

  const [requests, setRequests] = useState([])

  useEffect(() => {
    console.log(user.id)
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/requests/${user.id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(response.status === 200){
        const data = await response.json()
        setRequests(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  },[user.id])
  
  const style = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '2em',
      gap: '1.5em',
  }}
  
  return (
    <div style = {style.container}>
      {requests.length !== 0 && 
        requests.map((request) =>(
          <RequestCard
            request_id = {request.request_id}
            hospital_id = {request.hospital_id}
            case_type = {request.patient_case}
            blood_group = {request.blood_group}
            blood_component = {request.blood_component}
            quantity = {request.quantity}
            status = {request.status}
          />
        ))}
    </div>
  )
}

export default Status