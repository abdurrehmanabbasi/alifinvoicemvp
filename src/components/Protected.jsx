import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Protected = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
  }
  return children;
};

export default Protected;
