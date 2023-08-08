import { Outlet, Link } from "react-router-dom";
const Invoices = () => {
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl ">Invoicing Managment </h2>
      <div className="flex gap-2">
        <Link to="/app/invoices" className="p-2 bg-black text-white rounded-t-md">Invoices</Link>
        <Link to="new" className="p-2 bg-black text-white rounded-t-md">New Invoice</Link>
      </div>
      <hr />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Invoices;
