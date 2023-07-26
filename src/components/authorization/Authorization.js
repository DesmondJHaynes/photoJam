import { Outlet, useNavigate } from "react-router-dom"
import { UserRoutes } from "./UserRoutes.js"
import { useEffect } from "react"

export const Authorization = () => {
    const navigate = useNavigate()
    
    useEffect(()=> {

        localStorage.getItem("photoUser") ?
            navigate("/")
        :
            navigate("/sign-in")
            
    },[])

    return < Outlet />



}