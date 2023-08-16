
export const postCloudinaryImg = (image, publicIdHandler) => {

    if (image) {
        const imageObj = new FormData()
        imageObj.append("file", image)
        imageObj.append("upload_preset", "photoapp")

        return fetch("https://api.cloudinary.com/v1_1/photojam-nss/image/upload",
            {
                method: "POST",
                body: imageObj
            })
            .then((res) => res.json())
            .then((data) => {
                publicIdHandler(data.public_id, data.secure_url)
            })
    }

}
