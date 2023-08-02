import { useEffect, useState } from "react"
import "./Register.css"
import { Link, useNavigate } from "react-router-dom"
import { postCloudinaryImg } from "../cloudinary/cloudinary.js"


export const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(()=>{

        image && setUrl(URL.createObjectURL(image))
    
    },[image])

    
    const createUser = (respData) => {
        const userObj = {
            email: email,
            name: name,
            username: username,
            iconPublicId: respData
        }

        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userObj)
        }).then(res => res.json())
        .then((user) => {
            console.log(user)
            localStorage.setItem("photoUser", JSON.stringify({
                id: user.id,
                email: email,
                username: username
            }))
            navigate('/new-collection')
        })
    }


    return (
        <div className="Container">
            <h1 className="register--h1">
                Create New Account
            </h1>
            <div className="userData">

                <section className="userImage--container">
                    <div className="preview-Img-container">
                        {
                            image ? <img className="image border" src={url} />
                                :
                                <img className="image border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" />
                        }
                    </div>

                    <div>
                        <label className="upload-label">Upload Profile Photo</label>
                        <br />

                        <input type='file' className="file-upload"
                            onChange={(event) => {
                                setImage(event.target.files[0])
                            }} />
                    </div>
                </section>

                <section className="userInfo--container">
                    <input type='email' className="user-input" placeholder="User Email" value={email}
                        onChange={
                            (event) => (setEmail(event.target.value))
                        } />
                    <br />

                    <input type='text' className="user-input" placeholder="Full Name " value={name}
                        onChange={
                            (event) => (setName(event.target.value))
                        } />
                    <br />

                    <input type='text' className="user-input" placeholder="Username" value={username}
                        onChange={
                            (event) => (setUsername(event.target.value))
                        } />
                    <br />

                    <button className="createAccount button"
                        onClick={
                            (event) => {
                                event.preventDefault();
                                if (email && name && username && image) {
                                    postCloudinaryImg(image, createUser)
                                }else{
                                    window.alert("Please complete all input fields :)")
                                }
                            }
                        }
                        >Create Account
                    </button>
                </section>
            </div>
            <div className="link">
            <Link to={"/new-collection"}>Return to Sign in</Link>
            </div>
        </div>
    )
}