import { useContext, useRef, useState } from "react"
import "./Login.css"
import { AuthContext } from "../../context/authContext/AuthContext"
import { login } from "../../context/authContext/apiCall"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()
        login({email,password}, dispatch)
    }
    return (
        <div className='login'>

            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                </div>
            </div>

            <div className="login-container">
                 <form>
                    <h1>Sign In</h1>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        onChange={(e)=>setEmail(e.target.value)} 
                    /> 
                    <input 
                    className="inp"
                        type="password" 
                        placeholder="Password" 
                        onChange={(e)=>setPassword(e.target.value)}
                    /> 
                    <button className="signIn" onClick={handleLogin} disabled={isFetching}>Enter</button>
                    <span className="reg">New to Netflix? <b>Sign Up</b></span>  
                </form>               
            </div>
        </div>
    )
}

export default Login