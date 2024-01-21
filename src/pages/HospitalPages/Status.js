import React, { useEffect,useState,useContext } from 'react'
import RequestCard from '../../components/RequestCard'

import AuthContext from '../../context/AuthContext'

const style = {
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '2em'
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '2em',
    gap: '1.5em',
}}

function Status() {
  const {user} = useContext(AuthContext)

  const [pendingRequests, setPendingRequests] = useState([])
  const [successfulRequests, setSuccessfulRequests] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://blood-bank-back18.onrender.com/requests/pending_request/${user.id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(response.status === 200){
        const data = await response.json()
        setPendingRequests(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  },[user.id])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://blood-bank-back18.onrender.com/requests/successful_request/${user.id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(response.status === 200){
        const data = await response.json()
        setSuccessfulRequests(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  },[user.id])
  
  return (
    <div style = {style.container}>
      <div>
        <h1 style = {{textAlign: 'center'}}>Pending Requests</h1>
        <div style = {style.subContainer}>
          {pendingRequests.length !== 0 &&
            pendingRequests.map((request) =>(
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
      </div>
      <div>
        <h1 style = {{textAlign: 'center'}}>Successful Requests</h1>
        <div style = {style.subContainer}>
          {successfulRequests.length !== 0 &&
            successfulRequests.map((request) =>(
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
      </div>
      
    </div>
  )
}

export default Status