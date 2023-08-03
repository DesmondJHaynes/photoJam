import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Home.css"

export const Home = () => {
    const user = JSON.parse(localStorage.getItem("photoUser"))
    const navigate = useNavigate()

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [search, setSearch] = useState("")
    const [collections, setCollections] = useState([])
    const [filtered, setfiltered] = useState([])
 
    
    useEffect(()=>{
        fetchUser()
        fetchCollections()
    },[])

    useEffect(()=>{
        setfiltered(collections)
    },[collections])

    useEffect(()=>{
        search === '' && setfiltered(collections)

        if (search.length > 0){
        setfiltered(
            collections.filter(collectionObj => collectionObj.collection.name.toUpperCase().includes(search.toUpperCase()))
        )
    }
    },[search])
    
    const fetchUser = () => {
        return fetch(`http://localhost:8088/users/${user.id}`)
        .then(res=>res.json())
        .then((userObj)=> {
            setIcon(userObj.iconPublicId)
            setUsername(userObj.username)
            setName(userObj.name)
        })
    }

    const fetchCollections = () => {
        return fetch(`http://localhost:8088/userCollections?_expand=collection&userId=${user.id}`)
        .then(res=> res.json())
        .then(collectionArr=> setCollections(collectionArr))
    }
        
    const handleMyCollection = (collection) => {
        if (collection.collection.hostId === user.id)
        {
            const thumb = collection.collection.thumbnail
            return(
                <Link to={`/collection/${collection.collectionId}`}
                className="home--collection-Link" key={collection.collectionId}>
                <div className="collection-card">
                    <Image
                        className="collection-image"
                        cloudName="photojam-nss"
                        publicId={thumb}/>
                    <div className="collection-controls">
                        <h4>{collection.collection?.name}</h4>
                        <button className="collection-card--button"
                        onClick={(event)=> {
                            event.preventDefault();
                            navigate(`/edit-collection/${collection.collectionId}`)
                            }}>Edit</button>
                    </div>
                </div>
                </Link>
            )
        }
    }

    const handleShared = (collection) => {
        if (collection.collection.hostId !== user.id)
        {
            const thumb = collection.collection.thumbnail

            return(
                <Link to={`/collection/${collection.collectionId}`} 
                className="home--collection-Link" key={collection.collectionId}>
                <div className="collection-card" >
                    <Image
                        className="collection-image"
                        cloudName="photojam-nss"
                        publicId={thumb} />
    
                    <div className="collection-controls">
                        <h4>{collection.collection?.name}</h4>
                    </div>
                </div>
                </Link>
            )
        }
    }


    if (!collections[0]) {
        return (
            <div className="home--container">
                <div className="user-preview">
                    <div className="preview-Img-container">
                        {
                            icon &&
                                <Image className="image link border" cloudName="photojam-nss" publicId={icon} 
                                onClick={()=> navigate("/edit-profile")}/>
                                
                        }
                    </div>
                    <h2 className="home--username">{username}</h2>
                    <h4 className="home--username">{name}</h4>
                </div>
    
                <div className="divider"></div>
                
                <div className="home--gallery-container">
                </div>
            </div>
        )
    } else {
        return (
            <div className="home--container">
                <div className="user-preview">
                    <div className="preview-Img-container">
                        {
                            icon &&
                                <Image className="image link border" cloudName="photojam-nss" publicId={icon} 
                                onClick={()=> navigate("/edit-profile")}/>
                        }
                    </div>
                    <h2 className="home--username">{username}</h2>
                    <h4 className="home--username">{name}</h4>
                </div>
    
                <div className="divider"></div>

                <div className="home--gallery-container">

                <div className="home--search-bar-container"> 
                <label htmlFor="searchbar">Search</label>
                <input type="text"
                    className="home--search-bar"
                    name="searchbar"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)} />
                </div>
    
                <h3 className="home--gallery-Title">My Collections</h3>
                <section className="home--collection-cards">
                    {
                        filtered[0] &&
                        filtered.map((collection) => handleMyCollection(collection))
                        
                    }
                </section>
                <h3 className="home--gallery-Title">Shared With Me</h3>

                <section className="home--collection-cards">
                    { 
                        filtered[0] ?
                        filtered.map((collection) => handleShared(collection))
                        :
                        collections.map((collection) => handleShared(collection))
                    }
                </section>
                </div>
            </div>
        )
    }    
}

