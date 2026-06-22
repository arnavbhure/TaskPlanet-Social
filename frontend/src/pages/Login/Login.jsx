import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="login-page" aria-labelledby="login-heading">
      <p className="login-page__brand">TaskPlanet Social</p>

      <div className="login-card">
        <header className="login-card__header">
          <h1 id="login-heading">Welcome back</h1>
          <p>Login to continue</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>

          <button className="login-submit" type="submit">
            Login
          </button>

          <button className="login-forgot" type="button">
            Forgot password?
          </button>
        </form>

        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <Link className="login-footer__link" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
