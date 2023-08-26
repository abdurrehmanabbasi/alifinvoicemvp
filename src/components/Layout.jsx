import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../Sidebar";
import { useEffect} from "react";
const Layout = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Alif Invoices";
  }, []);
  return !user ? (
    <Navigate to={"/auth"} />
  ) : (
    <div className="app font-Inter flex w-screen h-screen overflow-hidden">
      
      <Sidebar/>
      <main className="min-w-full overflow-y-auto h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
