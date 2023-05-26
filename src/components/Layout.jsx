import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import Sidebar from "../Sidebar";
import { useEffect } from "react";
const Layout = () => {
    const {user}=useAuth()
    useEffect(()=>{
        document.title="Alif Invoices"
    },[])
    return (
    !user?<Navigate to={"/auth"}/>:        
        <div className="app flex w-screen h-screen overflow-hidden">
            <Sidebar/>
        <main className="overflow-y-auto"><Outlet/></main>
    </div> );
}
 
export default Layout;