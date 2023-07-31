import { useEffect, useState } from "react"
import "./NewCollection.css"
import { postCloudinaryImg } from "../cloudinary/cloudinary.js"
import { useNavigate } from "react-router-dom"

export const NewCollection = () => {
    const photoUser = JSON.parse(localStorage.getItem("photoUser"))
    const navigate = useNavigate()

    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    useEffect(()=>{
        image && setUrl(URL.createObjectURL(image))    
    },[image])


    const createCollection = (public_id) => {
        const collectionObj= 
        {
            "name": title,
            "description": description,
            "hostId": photoUser.id,
            "thumbnail": public_id
        }

        return fetch("http://localhost:8088/collections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collectionObj)
        })
        .then(res=>res.json())
        .then((data) => {
            createUserCollection(data.id);
            createPhoto(public_id, data.id);
        })
    }


    const createUserCollection = (collectionId) => {
        const userCollectionObj= 
        {
            "userId": photoUser.id,
            "collectionId": collectionId
        }

        fetch("http://localhost:8088/userCollections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCollectionObj)
        }).then(res => res.json())
    }

    
    const createPhoto = (public_id, collectionId) => {
        const photoObj = 
        {
            "userId": photoUser.id,
            "collectionId": collectionId,
            "publicId": public_id
        }

        fetch("http://localhost:8088/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photoObj)
        }).then(res => res.json())
        .then(()=> navigate(`/collection/${collectionId}`))
    }

    return (
        <div className="new-collection--container">
            {
                image ? 
                <img className="new-collection--image" src={url} />
                :
                <img className="new-collection--image" src="https://lpm.ulm.ac.id/image/desain/empty.jpg"/>
            }

            <div className="new-collection--form">
                <h2>Start a New Collection</h2>

                <input type="text"
                    className="new-collection--text-area"
                    name="Collection-Tile"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                
                <textarea 
                    className="new-collection--text-area" 
                    name="Collection-Description" 
                    placeholder="Describe your collection here..."
                    value={description} 
                    onChange={(event) => setDescription(event.target.value)} />
                
                <h3>Upload a Photo to get your<br/> Collection Started</h3>
                
                <input type='file' className="new-collection--file-upload"
                    onChange={(event) => {
                        setImage(event.target.files[0])
                    }} />
                
                <button className="new-collection--button" onClick={
                    (event) => {
                        event.preventDefault(); 
                        postCloudinaryImg(image, createCollection);
                        setImage("")
                        setTitle("")
                        setDescription("")
                    }
                    
                }>Finished</button>
            </div>
        </div>
    )
}