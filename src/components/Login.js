import React, {useState} from 'react'
import Events from './Events';

function Login() {
    const masterUsername = "Emily"
    const masterPassword = "hi"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState(true)

    return (
        <div className='home-page'>
            <div className='events'>
                <Events login= {loggedIn} />
            </div>
            <div className='login'>
                <input
                    type = "text" 
                    placeholder = "Username" 
                    onChange = {(event) => {
                    setUsername(event.target.value);
                    }}
                />
                <br></br>
                <input
                    type = "text" 
                    placeholder = "Password" 
                    onChange = {(event) => {
                    setPassword(event.target.value);
                    }}
                />
                <br></br>
                <button onClick={()=>{
                    if (username === masterUsername && password === masterPassword){
                        setLoggedIn(false)
                        console.log(loggedIn)
                    }
                    }}>
                    login
                </button>

            </div>
        </div>
    )
}

export default Login