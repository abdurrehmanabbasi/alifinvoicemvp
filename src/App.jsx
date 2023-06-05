import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing/index";

import Auth from "@/pages/Auth/index";
import SignupForm from "@/pages/Auth/SignupForm";
import SigninForm from "@/pages/Auth/SigninForm";
import ForgotPasswordForm from "@/pages/Auth/ForgotPasswordForm";

import Layout from "@/components/Layout";

import Dashboard from "@/pages/Dashboard/index";
import Products from "@/pages/Products/index";
import Invoices from "@/pages/Invoices/index";
import Settings from "@/pages/Settings";
import Product from "@/pages/Products/Product";
import NewProduct from "@/pages/Products/NewProduct";
import ProductsTable from "@/pages/Products/ProductsTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />}>
          <Route index element={<ProductsTable/>}/>
          <Route path=":id" element={<Product />} />
          <Route path="new" element={<NewProduct />} />
        </Route>
        <Route path="invoices" element={<Invoices />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/auth" element={<Auth />}>
        <Route index element={<SigninForm />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
      </Route>
    </Routes>
  );
}

export default App;
