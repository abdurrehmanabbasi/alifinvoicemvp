import { Outlet } from "react-router-dom";
const Auth = () => {
    return ( 
        <div className="w-screen h-screen flex flex-col lg:flex-row">
            <div className="w-1/2 hidden lg:flex bg-orange-600"></div>
            <div className="w-full h-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-center text-4xl text-orange-600 font-bold">Alif Invoice</h2>
                <Outlet/>
            </div>
        </div>
     );
}
 
export default Auth;