

import { Navigate, Outlet } from "react-router-dom"
// import { useSelector } from "react-redux";

export default function ProtectedRoutes() {


    // const isAuthorized = useSelector(state => state.auth.token);
    // const isUserPresent = useSelector(state => state.auth.user);
    const token = localStorage.getItem("token")
    // return isAuthorized ? <Outlet/> : <Navigate to="/login"/>
    if(token){
        return <Outlet/>
    }
    else{
        return <Navigate to="/login"/>
    }

}