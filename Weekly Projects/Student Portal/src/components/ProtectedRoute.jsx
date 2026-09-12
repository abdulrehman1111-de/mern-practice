import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../Backend/users";

export default function ProtectedRoute({children}){

    const user = getCurrentUser;
    
    if(user === null){
        return <Navigate replace to={"/login"}/>
    }

    else{
        return children
    }
}









