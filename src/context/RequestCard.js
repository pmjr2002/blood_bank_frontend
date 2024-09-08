import {Box, Card, CardContent, Button } from '@mui/material'
import React from 'react'

import {toast} from 'react-toastify'

const style = {
  container: {
    width: 350,
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  innerContainer: {
    margin: 0,
    padding: 0,
  },
  heading: {
    color: 'white',
    backgroundColor: 'purple',
    padding:'0.25em 0.75em',
    textAlign: 'center',
  },
  item:{
    textAlign: 'center',
    padding: '0.25em 0.75em',
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingTop: '0.75em',
  }
}

function RequestCard(props) {
  let handlePendingClick = async() => {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/requests/pending_request_process/${props.request_id}`)
    
    if(response.status === 200){
      toast.success('Blood request #' + props.request_id + ' successful!',{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })}
    else if(response.status === 400){
      toast.error('Blood request #' + props.request_id + ' failed!',{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })}
    else if(response.status === 404){
      toast.error('Blood group not found',{
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
    else{
      toast.error('Error ' + response.status + ' : ' + response.statusText,{
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
    <Card style = {style.container} elevation = {10}>
      <CardContent style = {style.innerContainer}>
        <h2 style = {style.heading}>Request ID: {props.request_id} </h2>
        <div style = {style.itemContainer}>
          <p style = {style.item}>Hospital ID: {props.hospital_id}</p>
          <p style = {style.item}>Patient Case: {props.case_type}</p>
          <p style = {style.item}>Blood Group: {props.blood_group}</p>
          <p style = {style.item}>Blood Component: {props.blood_component}</p>
          <p style = {style.item}>Quantity: {props.quantity}</p>
        </div>
        <Box textAlign = 'center' sx = {{marginTop: 2}}>
          {props.status === 'Success' ? 
          <h2 
            style = {
              {textAlign:'center', 
              color: 'green',
              textTransform: 'uppercase'}}
            >Successful</h2> 
          : <Button
              variant = 'outlined'
              onClick = {() => handlePendingClick()}>
            Pending
            </Button>}
        </Box>
      </CardContent>
    </Card>
  )
}

export default RequestCard