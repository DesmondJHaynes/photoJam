import { useNavigate } from "react-router-dom"
import { UserRoutes } from "../UserRoutes.js"

export const Authorization = () => {
    const navigate = useNavigate()
    
    if (!true){
        return (
        <>
        <UserRoutes />
        </>
        )
    }else{
        return navigate("/sign-in")
    }


}