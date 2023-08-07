import { Outlet, Link } from "react-router-dom";
const Customers = () => {
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl ">Customer Managment </h2>
      <div className="flex gap-2">
        <Link to="/app/customers" className="p-2 bg-black text-white rounded-t-md">Customers</Link>
        <Link to="new" className="p-2 bg-black text-white rounded-t-md">Add Customer</Link>
      </div>
      <hr />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Customers;
