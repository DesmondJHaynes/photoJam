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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        image && setUrl(URL.createObjectURL(image))
    }, [image])


    const createCollection = (public_id, url) => {
        const collectionObj =
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
            .then(res => res.json())
            .then((data) => {
                createUserCollection(data.id);
                createPhoto(public_id, data.id, url);
            })
    }


    const createUserCollection = (collectionId) => {
        const userCollectionObj =
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


    const createPhoto = (public_id, collectionId, url) => {
        const photoObj =
        {
            "userId": photoUser.id,
            "collectionId": collectionId,
            "publicId": public_id,
            "url": url
        }

        fetch("http://localhost:8088/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photoObj)
        }).then(res => res.json())
            .then(() => navigate(`/collection/${collectionId}`))
    }

    return (
        <div className="new-collection--container">
            {
                image ?
                    <img className="new-collection--image" src={url} />
                    :
                    <img className="new-collection--image" src="https://lpm.ulm.ac.id/image/desain/empty.jpg" />
            }

            <div className="new-collection--form">
                <h2 className="new--heading heading">Start a New Collection</h2>
                <div><label className="edit--title-label heading"
                    htmlFor="Collection-Title">Collection Title</label></div>
                <input type="text"
                    className="new-collection--input"
                    name="Collection-Title"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                <div><label htmlFor="Collection-Description" className="heading">Collection-Description</label></div>
                <textarea
                    className="new-collection--text-area"
                    name="Collection-Description"
                    placeholder="Describe your collection here..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />

                <h3 className="new-collection--upload-heading heading">Upload a Photo & <br />get your Collection Started</h3>

                <div className="uploader-div">
                    <button className="fake--button">Add File</button>
                    <input type='file' className="new-collection--file-upload"
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }} />
                </div>

                <button className="new-collection--button" onClick={
                    async (event) => {
                        event.preventDefault();
                        setIsLoading(true)
                        await postCloudinaryImg(image, createCollection);
                        setIsLoading(false)
                    }

                }>{isLoading ? "Loading..." : "Finished"}</button>
            </div>
        </div>
    )
}