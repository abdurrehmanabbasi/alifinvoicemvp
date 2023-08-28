import { NavLink } from "react-router-dom";
import blankuser from "./assets/blankuser.jpg";
import {
  ArrowLeftOnRectangleIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  DocumentChartBarIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../src/app/firebase";
import { Bars3Icon, Bars3BottomRightIcon } from "@heroicons/react/24/outline";

// import useAuth from "./hooks/useAuth";
import { useState } from "react";
const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(true);
  // const {user}=useAuth()
  return (
    <aside className={`shadow-lg flex flex-col `}>
      <div className=" flex flex-col flex-1 p-2 ">
        <div className="user  w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <button
              className={`${openMenu ? "self-end" : ""}`}
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <Bars3BottomRightIcon className="w-6" />
              ) : (
                <Bars3Icon className="w-6" />
              )}
            </button>

            <img
              src={blankuser}
              className={`mt-8 w-44 border-2 rounded-full `}
              alt=""
            />

            {openMenu ? <p>AQ khajoor Shop</p> : <p>AQ </p>}
            <button
              onClick={() => {
                signOut(auth);
              }}
            >
              <ArrowLeftOnRectangleIcon className="w-4 hover:text-red-500" />
            </button>
          </div>
        </div>

        <nav className="flex flex-col text-lg mt-10 ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 text-white flex p-4 gap-x-2 items-center hover:bg-orange-200 "
                : "flex p-4 gap-x-2 items-center hover:bg-orange-200 "
            }
            to="/"
          >
            <ChartBarIcon className="w-6" />
            <p className={`${openMenu ? "hidden md:block" : " hidden"}`}>
              Dashboard
            </p>
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 text-white flex p-4 gap-x-2 items-center hover:bg-orange-200 "
                : "flex p-4 gap-x-2 items-center hover:bg-orange-200 "
            }
          >
            <Squares2X2Icon className="w-6" />
            <p className={`${openMenu ? "hidden md:block" : " hidden"}`}>
              Products
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 text-white flex p-4 gap-x-2 items-center hover:bg-orange-200 "
                : "flex p-4 gap-x-2 items-center hover:bg-orange-200 "
            }
            to="invoices"
          >
            <RectangleStackIcon className="w-6" />
            <p className={`${openMenu ? "hidden md:block" : " hidden"}`}>
              Invoices
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 text-white flex p-4 gap-x-2 items-center hover:bg-orange-200 "
                : "flex p-4 gap-x-2 items-center hover:bg-orange-200 "
            }
            to="customers"
          >
            <UserGroupIcon className="w-6" />
            <p className={`${openMenu ? "hidden md:block" : " hidden"}`}>
              Customers
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 text-white flex p-4 gap-x-2 items-center hover:bg-orange-200 "
                : "flex p-4 gap-x-2 items-center hover:bg-orange-200 "
            }
            to="reports"
          >
            <DocumentChartBarIcon className="w-6" />
            <p className={`${openMenu ? "hidden md:block" : " hidden"}`}>
              Reports
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 text-white flex p-4 gap-x-2 items-center hover:bg-orange-200 "
                : "flex p-4 gap-x-2 items-center hover:bg-orange-200 "
            }
            to="settings"
          >
            <Cog8ToothIcon className="w-6" />
            <p className={`${openMenu ? "hidden md:block" : " hidden"}`}>
              Settings
            </p>
          </NavLink>
        </nav>
      </div>
      {openMenu ? (
        <div className="hidden md:block company p-4">
          <p className="">Powered By</p>
          <h2 className="text-orange-600 text-4xl font-bold">Alif Invoice</h2>
        </div>
      ) : (
        ""
      )}
    </aside>
  );
};

export default Sidebar;
