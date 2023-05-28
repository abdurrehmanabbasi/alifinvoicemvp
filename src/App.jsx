import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/index";

import Auth from "./components/Auth/index";
import SignupForm from "./components/Auth/SignupForm";
import SigninForm from "./components/Auth/SigninForm";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";

import Layout from "./components/Layout";

import Dashboard from "./components/Dashboard/index";
import Products from "./components/Products/index";
import Invoices from "./components/Invoices/index";
import NewProduct from "./components/Products/NewProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} >
          <Route path="new" element={<NewProduct/>} />
          <Route path="update/:id" element={<UpdateProduct/>} />

        </Route>
        <Route path="invoices" element={<Invoices />} />
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
