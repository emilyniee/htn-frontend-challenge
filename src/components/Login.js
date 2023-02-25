import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css';

const Login = () => {
    // hardcoded login details
    const masterUsername = "JENNIFER"
    const masterPassword = "ily"

    // constants for username and password that the user enter
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // keeps track of whether or not the user is logged in
    const [wrongPasswordMessage, setwrongPasswordMessage] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    // functions used to navigate to different pages based on login status
    const navigate = useNavigate()

    const navigateToEvents = () => {
        navigate('/events')
    }

    const navigateToGuestEvents = () => {
        navigate('/guest-events')
    }

    // returning displays based on login status (first one for if logged in)
    return (
        <div className='home'>
            {loggedIn ? (
                <div>
                    {/*welcome page for hacker*/}
                    <h1>WELCOME {masterUsername}!</h1>
                    <button onClick={navigateToEvents}>Go to events</button>
                </div>
            ) : (
                <div className='login'>
                    {/*login page*/}
                    <h1>WELCOME HACKERS!</h1>
                    <div>
                    <input
                        type = "text" 
                        placeholder = "Username" 
                        onChange = {(event) => {
                        setUsername(event.target.value);
                        }}
                    />
                    </div>
                    
                    <div>
                    <input
                        type = "text" 
                        placeholder = "Password" 
                        onChange = {(event) => {
                        setPassword(event.target.value);
                        }}
                    />
                    </div>
                    
                    {/*checking if user input matches correct username and password*/}
                    <div>
                        <button onClick={()=>{
                            if (username === masterUsername && password === masterPassword){
                                setLoggedIn(true)
                            } else {
                                setwrongPasswordMessage(true)
                            }
                            }}>
                            Login
                        </button>
                    </div>

                    {/*option to continue to events as a guest*/}
                    <div>
                        <button onClick={navigateToGuestEvents}>Continue as Guest</button>
                    </div>

                    {/*displaying error message if credentials are wrong*/}
                    {wrongPasswordMessage && <div className='password-message'>wrong password, please try again</div>}
                </div>
            )
            }    
     </div>   
    ) 
}

export default Login