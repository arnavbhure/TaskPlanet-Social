import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
import loginApi from "../../api/user/loginApi";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Logging in...");

    try {
      const data = {
        email: form.email,
        password: form.password,
      };

      const response = await loginApi(data);

      if (response?.success) {
        toast.success(response?.message || "Login successful", {
          id: loadingToastId,
        });
        navigate("/feed");
      } else {
        toast.error(response?.message || "Login failed", {
          id: loadingToastId,
        });
      }
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      toast.error(serverMessage || "Login failed", { id: loadingToastId });
    } finally {
      setIsSubmitting(false);
    }
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
              value={form.email}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="login-submit"
            type="submit"
            disabled={isSubmitting}
          >
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
