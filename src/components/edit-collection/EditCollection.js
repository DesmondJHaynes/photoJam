import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EditCollection.css"

export const EditCollection = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("Collection Title")
    const [description, setDescription] = useState("Describe your collection here...")
    const [image, setImage] = useState('')

    useEffect(()=>{
        fetchCollection()
    },[])


    const fetchCollection = () => {
        fetch(`http://localhost:8088/collections/${id}`)
        .then(res => res.json())
        .then((collection) => {
            setTitle(collection.name)
            setDescription(collection.description)
            setImage(collection.thumbnail)
        })
    }
    
    const handleCollectionEdit = () => {
        const obj = {
            name : title,
            description : description
        }

        fetch(`http://localhost:8088/collections/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(obj)
        }).then(res => res.json())
        .then(()=> navigate('/'))   
    }

    const handleCollectionDelete = () => {
        fetch(`http://localhost:8088/collections/${id}`,
        { method: "DELETE" })
        .then(()=> navigate("/"))

        
    }

    return(
        <>
        <div className="edit-collection--container">
            {
                image ? 
                <Image className="edit-collection--image" cloudName="photojam-nss" publicId={image} />
                :
                // <img className="edit-collection--image" src="https://lpm.ulm.ac.id/image/desain/empty.jpg"/>
                null
            }

            <div className="edit-collection--form">
                <div className="edit-main-controls">
                <h2 className="edit--heading heading">Edit Collection</h2>
                <div>
                    <label className="edit--title-label heading" htmlFor="Collection-Title">Collection Title</label>
                </div>
                <input type="text"
                    className="edit-collection--title"
                    name="Collection-Title"
                    placeholder="Collection Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                
                <div>
                    <label htmlFor="Collection-Description" className="heading">Collection-Description</label>
                </div>
                <textarea 
                    className="edit-collection--description" 
                    name="Collection-Description" 
                    placeholder="Describe your collection here..."
                    value={description} 
                    onChange={(event) => setDescription(event.target.value)} />

                <div className="edit--button-container">
                <button className="edit-collection--button" 
                    onClick={(event)=>{
                        event.preventDefault(); 
                        title && description && handleCollectionEdit();
                    }}
                    >Update</button>
                </div>
                </div>
            
                <button className="edit-collection--delete" 
                    onClick={(event)=>{
                        event.preventDefault();
                        handleCollectionDelete()
                    }}
                    >Delete Collection</button>
            
            </div>
        </div>
        </>
    )
}