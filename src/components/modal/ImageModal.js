import { useEffect, useState } from "react";
import "./ImageModal.css";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

export const ImageModal = ({ toggleModal, photoId }) => {

  const [display, setDisplay] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    fetch(`http://localhost:8088/photos/${photoId}`)
      .then(res => res.json())
      .then((obj) => {
        setDisplay(obj.publicId)
        setImgUrl(obj.url)
      })
  }, [])

  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <Image
          className="display-image"
          cloudName="photojam-nss"
          publicId={display} />
        <br />
      </div>
    </div>
  )
}