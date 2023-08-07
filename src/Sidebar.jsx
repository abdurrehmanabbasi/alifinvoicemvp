import { NavLink } from "react-router-dom";
import blankuser from "./assets/blankuser.jpg";
import {
  ChartBarIcon,
  Cog8ToothIcon,
  DocumentChartBarIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import useAuth from "./hooks/useAuth";
const Sidebar = ({openMenu,setOpenMenu}) => {
  const {user}=useAuth()
  return (
    <aside className={`shadow-lg flex-col ${openMenu?'flex':'hidden'}`}>
      <div className=" flex flex-col flex-1 p-2 mt-8">
        <div className="user  w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src={blankuser}
              className="w-44 border-2 rounded-full"
              alt=""
            />
            <p>{user.email}</p>
          </div>
        </div>

        <nav className="flex flex-col text-lg mt-10 ">
          <NavLink
            className="flex p-4 gap-x-2 items-center"
            to="/app"
          >
            <ChartBarIcon className="w-8" /> Dashboard
          </NavLink>
          <NavLink
            className="flex hover:bg-orange-200 p-4 gap-x-2 items-center"
            to="products"
          >
            <Squares2X2Icon className="w-8" /> Products
          </NavLink>
          <NavLink
            className="flex hover:bg-orange-200 p-4 gap-x-2 items-center"
            to="invoices"
          >
            <RectangleStackIcon className="w-8" /> Invoices
          </NavLink>
          <NavLink
            className="flex hover:bg-orange-200 p-4 gap-x-2 items-center"
            to="customers"
          >
            <UserGroupIcon className="w-8" /> Customers
          </NavLink>
          <NavLink
            className="flex hover:bg-orange-200 p-4 gap-x-2 items-center"
            to="invoices"
          >
            <DocumentChartBarIcon className="w-8" /> Reports
          </NavLink>
          <NavLink
            className="flex hover:bg-orange-200 p-4 gap-x-2 items-center"
            to="settings"
          >
            <Cog8ToothIcon className="w-8" /> Settings
          </NavLink>
        </nav>
      </div>
      <div className="company p-2">
        <p className="">Powered By</p>
        <h2 className="text-orange-600 text-4xl font-bold">Alif Invoice</h2>
      </div>
    </aside>
  );
};

export default Sidebar;
