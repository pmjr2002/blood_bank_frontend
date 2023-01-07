import { createContext,useState} from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)
    
    const navigate = useNavigate()

    let login = async (e) => {
        
        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/auth/',{
            method: 'POST',
            body: new URLSearchParams(
                {
                    'username': e.target.id.value,
                    'password': e.target.password.value
                }
            )
        })

        
        let data = await response.json()

        if(response.status === 200){
            const decode = jwt_decode(data.access_token)
            setAuthTokens(data)
            setUser(decode)
            localStorage.setItem('authTokens', JSON.stringify(data))
            if(decode.id[0] === 'H')
                navigate(`/hospital/${decode.id}`)
            else
                navigate(`/staff/${decode.id}`)
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
            {children}
        </AuthContext.Provider>
    )
}

