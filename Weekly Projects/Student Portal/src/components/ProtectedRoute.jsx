import { Navigate } from "react-router-dom";
import { getUser } from "../Backend/auth";

export default function ProtectedRoute({children}){

    const user = getUser();
    
    if(user === null){
        return <Navigate replace to={"/login"}/>
    }

    else{
        return children
    }
}









