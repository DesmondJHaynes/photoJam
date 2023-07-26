import { useEffect, useState } from "react"
import "./NewCollection.css"

export const NewCollection = () => {
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    
    useEffect(()=>{
        image && setUrl(URL.createObjectURL(image))    
    },[image])

    return (
        <div className="new-collection--container">
            <img className="new-collection--image"/>
            <div className="new-collection--form">
                <h2>Start a New Collection</h2>
                <input />
                <textarea />
                <h3>Upload a Photo to get your<br/> Collection Started</h3>
                <input type='file' className="file-upload"
                    onChange={(event) => {
                        setImage(event.target.files[0])
                    }} />
                <button className="new-collection--button">Finished</button>
        

            </div>

        </div>
    )
}