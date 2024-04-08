import { LogoIcon } from "../../assets/icons/icons";
import "../../styles/components/Login.scss";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";

const RegisterComponent = () => {
  const {
    authenticating,
    loginError,
    setEmail,
    setPassword,
    setCreatingAccount,
    setName,
    handleRegister,
  } = useContext(AuthContext);

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="login">
      <div className="logo-container">
        <LogoIcon className="logo" />
        <span>CoreNotes</span>
      </div>
      <form onSubmit={createAccount}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Seu nome"
            required
            disabled={authenticating}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <button type="submit">Criar conta</button>
        </div>
      </form>

      <div className="footer">
        <span>
          Já possui conta?{" "}
          <a onClick={() => setCreatingAccount(false)}>Login</a>
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

export default RegisterComponent;
