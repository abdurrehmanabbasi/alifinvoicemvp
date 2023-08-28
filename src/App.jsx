import { Routes, Route } from "react-router-dom";

import Auth from "@/pages/Auth/index";
import SignupForm from "@/pages/Auth/SignupForm";
import SigninForm from "@/pages/Auth/SigninForm";
import ForgotPasswordForm from "@/pages/Auth/ForgotPasswordForm";

import Layout from "@/components/Layout";
import NotFound from "@/components/NotFound";


import Dashboard from "@/pages/Dashboard/index";
import Products from "@/pages/Products/index";
import Invoices from "@/pages/Invoices/index";
import Customers from "@/pages/Customer/index";
import Reports from "@/pages/Reports/index";
import Settings from "@/pages/Settings";

import Product from "@/pages/Products/Product";
import NewProduct from "@/pages/Products/NewProduct";
import ProductsTable from "@/pages/Products/ProductsTable";


import CustomerTable from "@/pages/Customer/CustomerTable"
import Customer from "@/pages/Customer/Customer"
import NewCustomer from "@/pages/Customer/NewCustomer"

import InvoicesTable from "@/pages/Invoices/InvoicesTable"
import Invoice from "@/pages/Invoices/Invoice"
import NewInvoice from "@/pages/Invoices/NewInvoice"


function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="products" element={<Products />}>
          <Route index element={<ProductsTable />} />
          <Route path=":id" element={<Product />} />
          <Route path="new" element={<NewProduct />} />
        </Route>
        <Route path="customers" element={<Customers />}>
          <Route index element={<CustomerTable />} />
          <Route path=":id" element={<Customer />} />
          <Route path="new" element={<NewCustomer />} />
        </Route>

        <Route path="invoices" element={<Invoices />}>
          <Route index element={<InvoicesTable />} />
          <Route path=":id" element={<Invoice />} />
          <Route path="new" element={<NewInvoice />} />
        </Route>
        <Route path="reports" element={<Reports/>}/>

        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/auth" element={<Auth />}>
        <Route index element={<SigninForm />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
