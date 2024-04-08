import { LogoIcon } from "../../assets/icons/icons";
import "../../styles/components/Login.scss";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";

const LoginComponent = () => {
  const {
    handleLogin,
    authenticating,
    loginError,
    setEmail,
    setPassword,
    setCreatingAccount,
  } = useContext(AuthContext);

  const doLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login">
      <div className="logo-container">
        <LogoIcon className="logo" />
        <span>CoreNotes</span>
      </div>
      <form onSubmit={doLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Seu email"
            required
            disabled={authenticating}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Sua senha"
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={authenticating}
          />
        </div>

        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>

      <div className="footer">
        <span>
          Não possui conta?{" "}
          <a onClick={() => setCreatingAccount(true)}>Criar conta</a>
        </span>
      </div>

      <div>
        <span>
          {loginError.error && (
            <span className="error">{loginError.message}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default LoginComponent;
