import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import Sidebar from "../Sidebar";
const Layout = () => {
    const {user}=useAuth()

    return (
    !user?<Navigate to={"/auth"}/>:        
        <div className="app flex w-screen h-screen overflow-hidden">
            <Sidebar/>
        <main className="overflow-y-auto"><Outlet/></main>
    </div> );
}
 
export default Layout;