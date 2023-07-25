import { useEffect, useState } from "react"
import "./Register.css"
import { useNavigate } from "react-router-dom"


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
    }


    const createAccount = (event) => {
        event.preventDefault()
    
        if (email && name && username && image) {

            const imageObj = new FormData()
            imageObj.append("file", image)
            imageObj.append("upload_preset", "photoapp" )
        
            return fetch("https://api.cloudinary.com/v1_1/photojam-nss/image/upload", 
            {
                method: "POST",
                body: imageObj 
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.public_id);
                createUser(data.public_id)
            })
            // .then(navigate("/somewhere"))
        }
    }


    return (
        <>
            <div className="Container">
                <h1>Register Account</h1>
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
                                (event) => createAccount(event)
                            }
                            >Create Account</button>
                    </section>
                </div>
            </div>
        </>
    )
}