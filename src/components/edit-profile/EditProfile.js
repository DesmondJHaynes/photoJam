import { useEffect, useState } from "react";
import { postCloudinaryImg } from "../cloudinary/cloudinary.js";
import { Image } from "cloudinary-react";

export const EditProfile = () => {
    const photoUser = JSON.parse(localStorage.getItem("photoUser"))
    const [image, setImage] = useState('')
    const [icon, setIcon] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    
    useEffect(()=>{
        fetchUser()
    },[])

    const fetchUser = () => {
        return fetch(`http://localhost:8088/users/${photoUser.id}`)
        .then(res=>res.json())
        .then((userObj)=> {
            setIcon(userObj.iconPublicId)
            setUsername(userObj.username)
            setName(userObj.name)
        })
    }

    const handleIconUpload = (publicId) => {
        const obj = {iconPublicId: publicId}

        fetch(`http://localhost:8088/users/${photoUser.id}`, 
        {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(obj)
        }).then(res => res.json())
        .then(()=> fetchUser())

    }
        if (!icon) {
            return null
        }
        return(
            <>
            <div className="user-preview">
                <div className="preview-Img-container">
                    {
                        icon ?
                            <Image className="image border" cloudName="photojam-nss" publicId={icon} />
                            :
                            // <img className="image border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" />
                            null
                    }
                </div>
                <h2 className="home--username">{username}</h2>
                <h4 className="home--username">{name}</h4>
            </div>
            <div>
                <h3 className="edit-profile--heading">Change Profile Photo</h3>
                <div>
                    <label className="upload-label">Upload image here</label>
                    <input type='file' className="file-upload" 
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }} />
                    <button className="new-collection--button" onClick={
                        (event) => {
                            event.preventDefault(); 
                            image && postCloudinaryImg(image, handleIconUpload);
                            return event.target.value = null
                        }
                    }>Finished</button>
                </div>
            </div>
            </>
        )
}
    