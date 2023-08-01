import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../navbar/NavBar.js"
import { NewCollection } from "../new-collection/NewCollection.js"
import { Home } from "../home/Home.js"
import "./UserRoutes.css"
import { Collection } from "../collection/Collection.js"
import { EditProfile } from "../edit-profile/EditProfile.js"
import { EditCollection } from "../edit-collection/EditCollection.js"

export const UserRoutes = () => {

    return(
    
        <div className="application--container">
            <NavBar />
            <Outlet />
            <Routes>
                <Route path="/" index element={<Home/>} />
                <Route path="/collection/:id" element={<Collection/>} />
                <Route path="/new-collection" element={<NewCollection/>} />
                <Route path="/edit-collection/:id" element={<EditCollection/>} />
                <Route path="/edit-profile" element={<EditProfile/>} />
            </Routes>
        </div>

    )
}