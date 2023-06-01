import ProductsTable from "./ProductsTable";
import NewProduct from "./NewProduct";
import Categories from "./Categories";
import { useState } from "react";
const Products = () => {
  const [activeTab, setActiveTab] = useState("products");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl ">Product Managment </h2>
      <div className="tab-navigation flex gap-3 mt-5">
        <button
          className={
            activeTab === "products"
              ? "bg-black rounded-t-md text-white p-3"
              : ""
          }
          onClick={() => handleTabChange("products")}
        >
          Products
        </button>

        <button
          className={
            activeTab === "addproduct"
              ? "bg-black rounded-t-md text-white p-3"
              : ""
          }
          onClick={() => handleTabChange("addproduct")}
        >
          Add Product
        </button>

        <button
          className={
            activeTab === "productCategories"
              ? "bg-black rounded-t-md text-white p-3"
              : ""
          }
          onClick={() => handleTabChange("productCategories")}
        >
          Product Categories
        </button>
      </div>
      <hr />
      <div className="tab-content">
        {activeTab === "products" && (
          <div className="mt-2">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <ProductsTable />
          </div>
        )}
        {activeTab === "addproduct" && (
          <div className="mt-2">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <NewProduct/>
          </div>
        )}
        {activeTab === "productCategories" && (
          <div className="mt-2">
            <h2 className="text-2xl font-bol mb-4">Product Categories</h2>
            <Categories />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
