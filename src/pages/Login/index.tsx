import "../../styles/components/Login.scss";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

const Login = () => {
  const { creatingAccount } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="background"></div>
      {creatingAccount ? <RegisterComponent /> : <LoginComponent />}
    </div>
  );
};

export default Login;
