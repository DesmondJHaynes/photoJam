import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
    <div className="navbar--container">
        <h1 className="navbar--title"> PhotoJam</h1>
      
        <ul className="navList">
            <li className="list-item--1">
                <img src="#"/>
                <Link>My Collections</Link> 
            </li>
            <li className="list-item--2">
                <img src="#"/>
                <Link>New Collection</Link>
            </li>
            <li className="list-item--3">
                <img src="#"/>
                <Link>Edit Profile</Link>
            </li>
            <li className="list-item--4">
                <img src="#"/>
                <Link>Logout</Link>
            </li>
        </ul>
        
        
    </div>
    )
}