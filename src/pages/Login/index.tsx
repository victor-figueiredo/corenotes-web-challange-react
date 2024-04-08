import "../../styles/components/Login.scss";
import { AuthContext } from "../../context/auth";
import { useContext, useEffect } from "react";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

const Login = () => {
  const { creatingAccount, checkAuthentication } = useContext(AuthContext);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <div className="container">
      <div className="background"></div>
      {creatingAccount ? <RegisterComponent /> : <LoginComponent />}
    </div>
  );
};

export default Login;
