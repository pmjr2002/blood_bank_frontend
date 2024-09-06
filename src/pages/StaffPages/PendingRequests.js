import React, {useState, useEffect} from 'react'

import RequestCard from '../../components/RequestCard'
import Loader from '../../utils/SpinLoader'

const style = {
  container: {
    padding: '2em',
    width: '100%',
    minHeight: '100vh'
  },
  mainHeading:{
    fontSize: '3em',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: '1em',
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '2em',
    gap: '1.5em',
}
}

function PendingRequests() {
  
  const [hospitals,setHospitals] = useState([])
  const [pendingRequests,setPendingRequests] = useState([])
  const [isLoading, setisLoading] = useState(false)

  useEffect(() =>{
    async function fetchData(){
      const response = await fetch('https://blood-bank-back.onrender.com/hospital/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      if(response.status === 200){
        const data = await response.json()
        setHospitals(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

  useEffect(() =>{
    async function fetchData(){
      setisLoading(true)
      const response = await fetch('https://blood-bank-back.onrender.com/requests/pending_request/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
      setisLoading(false)
      if(response.status === 200){
        const data = await response.json()
        setPendingRequests(data)
      }
      else
        console.log("Error " + response.status + " : " + response.statusText)
    }
    fetchData()
  }, [])

  return(
    
    <div style = {style.container}>
      <h1 style = {style.mainHeading}>Pending Requests</h1>
          {isLoading? <Loader/> : hospitals.map((hospital) => (
          <div style = {style.outerContainer}>
              <h1 style = {{textAlign: 'center'}}>{hospital.name}</h1>
              <div style = {style.subContainer}>
                {pendingRequests.map((request) => {
                  if(request.hospital_id === hospital.hospital_id){
                    return(
                      <RequestCard
                        request_id = {request.request_id}
                        hospital_id = {request.hospital_id}
                        case_type = {request.patient_case}
                        blood_group = {request.blood_group}
                        blood_component = {request.blood_component}
                        quantity = {request.quantity}
                        status = {request.status}
                      />
                    )
                  }
                })}
              </div>
          </div>
            ))}
    </div>
  )
}

export default PendingRequests