import { Link, useNavigate } from "react-router-dom"
import "./SignIn.css"
import { useState } from "react"

export const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")    
    

    const verifyEmail = (event) => {
        event.preventDefault()
        
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(users => validateUser(users))   
    }
    

    const validateUser = (users) => {
        const currentUser = users.find((user)=> user.email === email)

        if (currentUser) {
            console.log("congrats")
            localStorage.setItem("photoUser", JSON.stringify({
                id: currentUser.id,
                email: currentUser.email,
                username: currentUser.username
            }))
            navigate("/")
        } else {
            window.alert("Invalid User \n Please sign in with a valid email address or Create an account")
        }
    }

    return(
        <div className="container">

            <h1 className="signIn--h1">photojam</h1>

            <div className="signIn-controls">
                <input type='email' name='email' className="user-input" placeholder="User Email" value={email}
                    onChange={
                        (event) => (setEmail(event.target.value))
                    } />
                <button className="login button"
                    onClick={(event)=> {verifyEmail(event)}}
                    >Login</button>
            </div>

            <div className="link">
            <Link to={"/register"}>Not a member yet?</Link>
            </div>
        </div>
    )
}