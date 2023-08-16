import { useEffect, useState } from "react";
import { postCloudinaryImg } from "../cloudinary/cloudinary.js";
import { Image } from "cloudinary-react";
import "./EditProfile.css"

export const EditProfile = () => {
    const photoUser = JSON.parse(localStorage.getItem("photoUser"))
    const [image, setImage] = useState('')
    const [icon, setIcon] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        return fetch(`http://localhost:8088/users/${photoUser.id}`)
            .then(res => res.json())
            .then((userObj) => {
                setIcon(userObj.iconPublicId)
                setUsername(userObj.username)
                setName(userObj.name)
            })
    }

    const handleIconUpload = (publicId, url) => {
        const obj = {
            iconPublicId: publicId,
            iconUrl: url
        }

        fetch(`http://localhost:8088/users/${photoUser.id}`,
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(obj)
            }).then(res => res.json())
            .then(() => fetchUser())

    }
    if (!icon) {
        return null
    }
    return (
        <>
            <div className="EP--container">
                <section className="EP--user-preview">
                    <Image className="EP--icon border" cloudName="photojam-nss" publicId={icon} />
                    <h2 className="home--username heading">{username}</h2>
                    <h4 className="home--username">{name}</h4>
                </section>
                <section className="EP--form">
                    <h3 className="EP--heading heading">Change Profile Photo</h3>
                    <div>
                        <label className="EP--upload heading">Upload image here</label>
                        <div>
                            <button className="EP--fake-button">Add File</button>
                            <input type='file' className="EP--upload-file-input"
                                onChange={(event) => {
                                    setImage(event.target.files[0])
                                }} />
                            <div>
                                <button className="EP--Update-button" onClick={
                                    (event) => {
                                        event.preventDefault();
                                        image && postCloudinaryImg(image, handleIconUpload);
                                        return event.target.value = null
                                    }
                                }>Update</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
