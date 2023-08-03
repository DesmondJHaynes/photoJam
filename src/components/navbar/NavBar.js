import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Image } from "cloudinary-react"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="navbar--container">
            <h1 className="navbar--title heading"> Photojam</h1>
            <div className="nav-sections">
            <ul className="navList">
                <li className="list item--1">
                    <Image className="nav-icon icon-1" 
                        cloudName="photojam-nss" 
                        publicId= "nativeSite/gallery_image_icon_llykdx"/>
                    <Link className="nav-link heading" to={"/"}>My Collections</Link>
                </li>
                <li className="list item--2">
                    <Image className="nav-icon icon-2" 
                        cloudName="photojam-nss" 
                        publicId= "nativeSite/image_add_icon_hcrhgh"/>
                    <Link className="nav-link heading" to={"/new-collection"}>New Collection</Link>
                </li>
                <li className="list item--3">
                    <Image className="nav-icon icon-3" 
                        cloudName="photojam-nss" 
                        publicId= "nativeSite/profile_edit_user_icon_itngou"/>
                    <Link className="nav-link heading" to={"/edit-profile"}>Edit Profile</Link>
                </li>
            </ul>
            <ul className="navList">
                <li className="list item--4">
                    <Image className="nav-icon icon-4" 
                        cloudName="photojam-nss" 
                        publicId= "nativeSite/logout_box_icon_xfdz54"/>
                    <Link to=""
                        className="nav-link heading" 
                        onClick={() => {
                        localStorage.removeItem("photoUser")
                        navigate("/", { replace: true })
                    }}
                    >Logout</Link>
                </li>
            </ul>
            </div>
        </div>
    )
}