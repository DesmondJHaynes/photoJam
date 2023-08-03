import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { postCloudinaryImg } from "../cloudinary/cloudinary.js"
import { Image } from "cloudinary-react"
import "./Collection.css"
import "../modal/ImageModal.css";
import { ImageModal } from "../modal/ImageModal.js"

export const Collection = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("photoUser"))
    
    
    const [modal, setModal] = useState(false)
    const [collection, setCollection] = useState({})
    const [collectionUsers, setCollectionUsers] = useState([])
    const [users, setUsers] = useState([])
    const [memberSelect,setMemberSelect] = useState('')
    const [addMember, setAddMember] = useState("")
    const [image, setImage] = useState('')
    const [photos, setPhotos] = useState([])
    const [photoId, setPhotoId] = useState('')
    const [filtered, setFiltered] = useState(photos)


    useEffect(()=> {
        handleCollectionData()
        fetchPhotos()
    },[])

    useEffect(()=> {
        handleUsersList()
    }, [collectionUsers])
    
    useEffect(()=>{
        memberSelect === ''?
        setFiltered(photos)
        :
        setFiltered(
             photos.filter(photo=>
                photo.userId === parseInt(memberSelect)
            )
        )
    },[photos, memberSelect])


    const handleCollectionData = () => {
        fetch(`http://localhost:8088/collections/${id}?_embed=userCollections`)
        .then(res => res.json())
        .then((collection) => {
            setCollection(collection)
            setCollectionUsers(collection.userCollections)
        })
    }
    
    const handleCollectionDelete = (id) => {
        fetch(`http://localhost:8088/collections/${id}`, 
        { method: 'DELETE' })
        .then(()=> navigate("/"))
    }

    const fetchPhotos = () => {
        fetch(`http://localhost:8088/photos/?collectionId=${id}`)
        .then(res => res.json())
        .then((photoArr) => setPhotos(photoArr))
    }
    
    const toggleModal = () => {
        setModal(!modal);
      };

    useEffect(()=> {
        if(modal) {
            document.body.classList.add('active-modal')
            } else {
            document.body.classList.remove('active-modal')
            }
    },[modal]) 
   

    const handlePhotoGallery = (photo) => {
        return(
            <div className="image-card" key={photo.id} >
                    <div id={photo.id} className="collection--image" 
                        onClick={() => {
                            setPhotoId(photo.id)
                            photoId && toggleModal()
                        }}>
                    <Image
                        className="gallery-image"
                        cloudName="photojam-nss"
                        publicId={photo.publicId} />
                    </div>
                    {
                    (collection.hostId === user.id || photo.userId === user.id) &&
                    <button id={`delete--${photo.id}`} className="delete-image--button"
                        onClick={(event) => {
                            event.preventDefault();
                            const [,imageId] = event.target.id.split("--")
                            handlePhotoDelete(imageId)
                        }}
                    >x</button>
                    }
                </div>
        )
    }

    const handlePhotoPost = (publicId) => {
        const imgObj = {
            "userId": user.id,
            "collectionId": id,
            "publicId": publicId,
        }
        
        fetch(`http://localhost:8088/photos`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(imgObj)
        }).then(res => res.json())
        .then(()=> {
            fetchPhotos();
            
        })
    }
    
    const handlePhotoDelete = (imageId) => {
        fetch(`http://localhost:8088/photos/${imageId}`, 
        { method: 'DELETE' })
        .then(() => fetchPhotos())
    }

    const handleUsersList = () => {
        let userObjArr = []
        fetch('http://localhost:8088/users/')
        .then(res=> res.json())
        .then(userArr => {
            for (const collectionUser of collectionUsers) {
                // collectionUser.userId !== user.id &&
                userObjArr.push(
                    userArr.find(user => user.id === collectionUser.userId)
                    )  
                }
            setUsers(userObjArr)
            })
    }

    const handleMemberOptions = () => {
        if (users) {
            return(users.map((user) => {
                return <option key={user.id} value={user.id}>{user.username}</option>
            }))
        }else{
            return <option value={"nope"}>No Users</option>
        }
    }
    
    const handleMemberAdd = (username) => {
        username ?
        fetch(`http://localhost:8088/users/?username=${username}`)
        .then(res => res.json())
        .then(data => {
            handleMemberPost(data[0].id)
            window.alert(`${username} added successfully!`)})
        .catch(() => {
            window.alert("User doesn't exist");
            setAddMember('')
        })
        :
        window.alert("Please type a username first")
    }
    
    const handleMemberDelete = () => {
        const member = collectionUsers.find((collectionUser) => collectionUser.userId === parseInt(memberSelect))

        fetch(`http://localhost:8088/userCollections/${member.id}`, 
        { method: 'DELETE' })
        .then(() => {
            setMemberSelect('');
            handleCollectionData();
        })
    }

    const handleLeaveCollection = () => {
        const member = collectionUsers.find((collectionUser) => collectionUser.userId === parseInt(user.id))

        fetch(`http://localhost:8088/userCollections/${member.id}`, 
        { method: 'DELETE' })
        .then(() => {
            navigate("/")
        })
    }


    const handleMemberPost = (memberId) => {
        const userCollectionObj = 
            {
                userId: memberId,
                collectionId: parseInt(id)
            }
        
        userCollectionObj.userId &&
        fetch(`http://localhost:8088/userCollections`,
        {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(userCollectionObj)
        }).then(res => res.json)
        .then(() => {
            setMemberSelect('');
            setAddMember('');
            handleCollectionData();
        })
    }

    if (!collection) {
        return null
    }
    return(
        <div className="collection--container">
            <div className="member-controls--container">
            <section className="collection--member-container">
                <h1 className="collection--title heading">{collection.name}</h1>
                <p className="colllection--description">{collection.description}</p>
                <div className="h-divider"></div>

                <div className="collection--add-image">
                    <h3 className="Large-label heading">Add to the collection</h3>
                    <div className="custom-upload-container"> 
                    <button className="collection--button" onClick={
                        (event) => {
                            if (image) {
                                event.preventDefault(); 
                                postCloudinaryImg(image, handlePhotoPost)
                            }else{
                                window.alert('Please select an image file first')
                            }
                        }
                    }>Upload</button>
                    <input type='file' className="collection--file-upload"
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }} />
                    </div>
                    
                </div>

                {
                collection.hostId === user.id &&
                    <div className="collection--addMember">
                        <label className="Small-label heading" htmlFor="addMember-input">Invite Users</label><br/>
                    <div>
                        <input type="text"
                            className="collection--addMember-input"
                            name="addMember"
                            placeholder="Search Username"
                            value={addMember}
                            onChange={(event) => setAddMember(event.target.value)} />
                        <button className="addMember-button" 
                        onClick={(event) => {
                            event.preventDefault();
                            handleMemberAdd(addMember)
                        }
                        }>Add</button>
                    </div>
                    </div>
                }

                <div className="member-list">
                    <label className="Small-label heading" htmlFor="member-select">Filter by User</label><br/>
                    <select name="member-select" id="member-select"
                        onChange={(event) => setMemberSelect(event.target.value)}>
                        <option value={''}>Collection Members</option>
                        {
                            handleMemberOptions()
                        }
                    </select>

                    {
                        collection.hostId === user.id &&
                        parseInt(memberSelect) !== user.id &&
                        memberSelect &&
                        <button className="host-view remove-member"
                        onClick={(event) => {
                            event.preventDefault();
                            handleMemberDelete()
                        }
                        }>Remove Member</button>
                     }   
                </div>
            </section>

            {
                collection.hostId === user.id ?
                <div className="collection--button-container">
                    <button className="button--delete-collection"
                        onClick={(event) => {
                            event.preventDefault()
                            handleCollectionDelete(id)
                        }}>Delete Collection</button>
                </div>
                :
                <div className="collection--button-container">
                    <button className="button--leave-collection"
                        onClick={(event) => {
                            event.preventDefault()
                            handleLeaveCollection()
                        }}>Leave Collection</button>
                </div>
            }
            </div>

            <div className="divider"></div>

            <section className="collection--gallery-container">
                {
                    filtered.map((photo) => handlePhotoGallery(photo))
                }
            </section>
            {
                modal && <ImageModal photoId={photoId} toggleModal={toggleModal} />
            }
        </div>
    )
}