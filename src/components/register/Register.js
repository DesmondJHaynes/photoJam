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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        image && setUrl(URL.createObjectURL(image))

    }, [image])


    const createUser = (publicId, url) => {
        const userObj = {
            email: email,
            name: name,
            username: username,
            iconPublicId: publicId
        }

        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
            <h1 className="register--h1 heading">
                Create New Account
            </h1>
            <div className="userData">

                <section className="userImage--container">
                    {
                        image ?
                            <img className="register--icon border" src={url} />
                            :
                            <img className="register--icon border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" />
                    }

                    <label htmlFor="" className="register--label heading" >Upload Profile Photo</label>

                    <div>
                        <button className="register--fake-button">Add File</button>
                        <input type='file' className="register--file-input"
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
                            async (event) => {
                                event.preventDefault();
                                if (email && name && username && image) {
                                    setIsLoading(true)
                                    await postCloudinaryImg(image, createUser)
                                } else {
                                    window.alert("Please complete all input fields :)")
                                }
                            }
                        }
                    >{isLoading ? "Loading..." : "Create Account"}
                    </button>
                </section>
            </div>
            <div className="link">
                <Link to={"/sign-in"}>Return to Sign in</Link>
            </div>
        </div>
    )
}