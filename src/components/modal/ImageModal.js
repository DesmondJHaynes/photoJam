import { useEffect, useState } from "react";
import "./ImageModal.css";
import { Image } from "cloudinary-react";

export const ImageModal = ({toggleModal, photoId}) => {
  
  const [display, setDisplay] = useState()
  
  useEffect(()=>{
    fetch(`http://localhost:8088/photos/${photoId}`)
    .then(res=> res.json())
    .then((obj) => setDisplay(obj.publicId)) 
    
    console.log(photoId)
  },[])

    return(
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <Image
            className="display-image"
            cloudName="photojam-nss"
            publicId={display} />

          <button className="close-modal" onClick={toggleModal}>
            CLOSE
          </button>
        </div>
      </div> 
    )
    


}