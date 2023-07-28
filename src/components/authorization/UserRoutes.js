import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../navbar/NavBar.js"
import { NewCollection } from "../new-collection/NewCollection.js"
import { Home } from "../home/Home.js"
import "./UserRoutes.css"

export const UserRoutes = () => {

    return(
    
        <div className="application--container">
            <NavBar />
            <Outlet />
            <Routes>
                <Route path="/" index element={<Home/>} />
                <Route path="/collection/:id" element={"collection view"} />
                <Route path="/new-collection" element={<NewCollection/>} />
                <Route path="/edit-profile" element={"edit-profile view"} />
            </Routes>
        </div>

    )
}