import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../Sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
const Layout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Alif Invoices";
  }, []);
  return !user ? (
    <Navigate to={"/auth"} />
  ) : (
    <div className="app flex w-screen h-screen overflow-hidden flex-col md:flex-row">
      <button onClick={() => setOpenMenu(!openMenu)} className="p-3 absolute top-0 left-0 ">
        {!openMenu ? (
          <Bars3Icon className="w-8" />
        ) : (
          <XMarkIcon className="w-8" />
        )}{" "}
      </button>
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <main className="min-w-full ml-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
