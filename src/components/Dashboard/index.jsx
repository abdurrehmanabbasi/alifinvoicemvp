import { auth } from "../../app/firebase";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
const Dashboard = () => {
    const {user}=useAuth()
    
    return ( <>
    {`You are Currently as ${user?.email} for sign out click there`}
    <button onClick={()=>signOut(auth)} className="bg-red-500">Sign out</button>
    </> );
}
 
export default Dashboard;