import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Authorization = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()

        if (localStorage.getItem("photoUser")){
            return children
        }else {
            return <Navigate
            to={`/sign-in/${location.search}`}
            replace
            state={{ location }} />
        }
        
            
 

}