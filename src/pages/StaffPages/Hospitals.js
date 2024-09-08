import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify'
import Loader from '../../utils/SpinLoader';
import {Card, CardContent} from '@mui/material'
import HospitalModal from './HospitalModal'

const style = {
    container: {
        padding: '2em',
        width: '100%',
        minHeight: '100vh'
    },
    mainHeading: {
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
        listStyleType : 'none',
        marginLeft : '52px'
    },
    item:{
        textAlign: 'center',
        padding: '0.25em 0.75em',
        fontWeight: 'bold',
        fontSize: '25px'
    },
    itemContainer: {
        paddingTop: '0.75em',
    },
    heading: {
        color: 'white',
        backgroundColor: 'purple',
        padding:'0.25em 0.75em',
        textAlign: 'center',
    },
    innerContainer: {
        margin: 0,
        padding: 0,
    },
    Cardcontainer: {
        width: 350,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        
    },
}

function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [newHospital, setNewHospital] = useState({
        name: '',
        address: '',
        phone: '',
        password: '',
    });
    const [isLoading, setisLoading] = useState(false)

    let { authTokens } = useContext(AuthContext);

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        setisLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hospital/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            setisLoading(false)
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            setisLoading(false)
            toast.error(
                "Error fetching hospitals",
                {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            )
            console.error('Error fetching hospitals:', error);
        }
    };


    return (
        isLoading ? <Loader /> :
            <div style={style.outerContainer}>
                <h2 style={style.mainHeading}>Hospitals</h2>

                {/* Display list of hospitals */}
                <ul style={style.subContainer}>
                    {hospitals.map((hospital) => (
                        <li key={hospital.hospital_id}>
                            <Card style={style.Cardcontainer} elevation={10}>
                                <CardContent style={style.innerContainer}>
                                    <h2 style={style.heading}>{hospital.name} </h2>
                                    <div style={style.itemContainer}>
                                        <p style={style.item}>Hospital ID: {hospital.hospital_id}</p>
                                        <p style={style.item}>Address: {hospital.address}</p>
                                        <p style={style.item}>Phone no: {hospital.phone}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
                <HospitalModal/>
            </div>
    );
}

export default Hospitals;
