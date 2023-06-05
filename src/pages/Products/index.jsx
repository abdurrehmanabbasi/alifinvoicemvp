import { Outlet, Link } from "react-router-dom";
const Products = () => {
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl ">Product Managment </h2>
      <div className="flex gap-2">
        <Link to="/app/products" className="p-2 bg-black text-white rounded-t-md">Products</Link>
        <Link to="new" className="p-2 bg-black text-white rounded-t-md">Add Product</Link>
        <Link to="categories" className="p-2 bg-black text-white rounded-t-md">Categories</Link>
      </div>
      <hr />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
