import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/index";
import SignupForm from "./components/Auth/SignupForm";
import SigninForm from "./components/Auth/SigninForm";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";
function App() {
  return (
    <Routes>
      <Route path="/" element={"ara"} />
      <Route path="/auth" element={<Auth />}>
        <Route index element={<SigninForm />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm/>}/>
      </Route>
    </Routes>
  );
}

export default App;
