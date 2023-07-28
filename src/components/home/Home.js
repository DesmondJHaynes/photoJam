import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Home = () => {
    const user = JSON.parse(localStorage.getItem("photoUser"))
    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    
    const [search, setSearch] = useState("")
    const [collections, setCollections] = useState([])
    const [filtered, setfiltered] = useState([])
    
    
    useEffect(()=>{
        fetchUser()
        fetchCollections()
        .then(() => setfiltered(collections))
    },[])

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


    //use this for possibly single collection id?
    // const fetchMyCollections = () => {
    //     return fetch(`http://localhost:8088/collections/?_embed=photos&_embed=userCollections&hostId=${user.id}`)
    //     .then(res=> res.json())
    //     .then(data => setMycollection(data))
    // }

        
    const handleMyCollection = (collection) => {
        if (collection.collection.hostId === user.id)
        {
            const thumb = collection.collection.thumbnail
            return(
                <Link className="home--collection-Link" key={collection.collectionId}>
                <div className="collection-card" >
                    <Image
                        className="collection-image"
                        cloudName="photojam-nss"
                        publicId={thumb} />
    
                    <div className="collection-controls">
                        <h4>{collection.collection?.name}</h4>
                        <button className="collection-card--button">Edit</button>
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
                <Link className="home--collection-Link" key={collection.collectionId}>
                <div className="collection-card" >
                    <Image
                        className="collection-image"
                        cloudName="photojam-nss"
                        publicId={thumb} />
    
                    <div className="collection-controls">
                        <h4>{collection.collection?.name}</h4>
                        <button className="collection-card--button">Edit</button>
                    </div>
                </div>
                </Link>
            )
        }
    }
    
    if (collections.length < 1) {
        return (
            <div className="home--container">
            <div className="user-preview">
                <div className="preview-Img-container">
                    {
                        icon ?
                            <Image className="image border" cloudName="photojam-nss" publicId={icon} />
                            :
                            <img className="image border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" />
                    }
                </div>
                <h2 className="home--username">{username}</h2>
                <h4 className="home--username">{name}</h4>
            </div>
            <div>Nothing here</div>
            </div>
        )
    } else {
        return (
            <div className="home--container">
                <div className="user-preview">
                    <div className="preview-Img-container">
                        {
                            icon ?
                                <Image className="image border" cloudName="photojam-nss" publicId={icon} />
                                :
                                <img className="image border" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" />
                        }
                    </div>
                    <h2 className="home--username">{username}</h2>
                    <h4 className="home--username">{name}</h4>
                </div>
    
                <div className="home--divider"></div>
                <input type="text"
                    className="home--search-bar"
                    name="searchbar"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)} />
    
                <h3 className="home--gallery-Title">My Collections</h3>
                <section className="home--collection-cards">
                    {
                        filtered[0] ?
                        filtered.map((collection) => handleMyCollection(collection))
                        :
                        collections.map((collection) => handleMyCollection(collection))
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
                <div className="home--gallery">
                </div>
            </div>
        )
    }    
}

