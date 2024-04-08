import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api/api";
import { destroyToken, isAuthenticated, setToken } from "../../api/authCookies";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  authenticating: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  loginError: { error: boolean; message: string };
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  creatingAccount: boolean;
  setCreatingAccount: (newState: boolean) => void;
  setName: (name: string) => void;
  handleRegister: () => void;
  checkAuthentication: () => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  authenticating: false,
  handleLogin: () => {},
  handleLogout: () => {},
  loginError: { error: false, message: "" },
  setEmail: () => {},
  setPassword: () => {},
  creatingAccount: false,
  setCreatingAccount: () => {},
  setName: () => {},
  handleRegister: () => {},
  checkAuthentication: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginError, setLoginError] = useState({ error: false, message: "" });
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (loginError.error) {
      setTimeout(() => {
        setLoginError({ error: false, message: "" });
      }, 3000);
    }
  }, [loginError.error]);

  const checkAuthentication = () => {
    const result = isAuthenticated();
    setAuthenticated(result);
    if (result) return navigate("/");
  };

  const handleLogin = async () => {
    setAuthenticating(true);
    const { data } = await Api.login(email, password);

    if (data.error) {
      setLoginError({ error: true, message: data.error });
      console.error("Failed to login", data.error);
    } else {
      setToken(data.token);
      window.location.href = "/";
    }
    setAuthenticating(false);
  };

  const handleRegister = async () => {
    setAuthenticating(true);

    const { data } = await Api.register(email, password, name);

    if (data.error) {
      setLoginError({ error: true, message: data.error });
    } else {
      setToken(data.token);
      window.location.href = "/";
    }

    setAuthenticating(false);
  };

  const handleLogout = () => {
    destroyToken();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        handleLogin,
        handleRegister,
        authenticating,
        loginError,
        handleLogout,
        setEmail,
        setPassword,
        setName,
        creatingAccount,
        setCreatingAccount,
        checkAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
