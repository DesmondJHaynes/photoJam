import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../navbar/NavBar.js"
import { NewCollection } from "../new-collection/NewCollection.js"
import "./UserRoutes.css"

export const UserRoutes = () => {

    return(
    
        <div className="application--container">
            <NavBar />
            <Outlet />
            <Routes>
                <Route index element={<NewCollection/>} />
                {/* <Route path="new-collection" element={"new collection view"} /> */}
            </Routes>
        </div>

    )
}