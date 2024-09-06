import { createContext,useState} from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import Loader from '../utils/SpinLoader'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()

    let login = async (e) => {
        
        e.preventDefault()
        setisLoading(true)
        let response = await fetch('https://blood-bank-back.onrender.com/auth/',{
            method: 'POST',
            body: new URLSearchParams(
                {
                    'username': e.target.id.value,
                    'password': e.target.password.value
                }
            )
        });
        setisLoading(false)
        
        let data = await response.json()

        if(response.status === 200){
            const decode = jwt_decode(data.access_token)
            setAuthTokens(data)
            setUser(decode)
            localStorage.setItem('authTokens', JSON.stringify(data))
            if(decode.id[0] === 'H')
                navigate(`/hospital/${decode.id}/`)
            else
                navigate(`/staff/${decode.id}/`)
        }else{
            alert(`Error: ${response.status}`)
        }
        
    }
    
    let logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        login:login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isLoading? <Loader/> : children}
        </AuthContext.Provider>
    )
}

