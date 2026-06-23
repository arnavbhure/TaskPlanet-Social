import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Signup.css";
import signupApi from "../../api/user/signupApi";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordsMatch =
    form.password.length > 0 && form.password === form.confirmPassword;

  const isFormValid =
    form.username.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    passwordsMatch;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting || !isFormValid) return;

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Creating account...");

    try {
      const data = {
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response = await signupApi(data);
      console.log("Signup response:", response);
      if (response?.success) {
        toast.success(response?.message || "Account created", {
          id: loadingToastId,
        });
        navigate("/login");
      } else {
        toast.error(response?.message || "Signup failed", {
          id: loadingToastId,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed", {
        id: loadingToastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="signup-page" aria-labelledby="signup-heading">
      <p className="signup-page__brand">TaskPlanet</p>

      <div className="signup-card">
        <header className="signup-card__header">
          <h1 id="signup-heading">Create Account</h1>
          <p>Join the community and start sharing</p>
        </header>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            className="signup-submit"
            type="submit"
            disabled={!isFormValid || isSubmitting}
          >
            Create Account
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link className="signup-footer__link" to="/login">
            Login
          </Link>
        </p>

        <p className="signup-legal">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </section>
  );
}

export default Signup;
