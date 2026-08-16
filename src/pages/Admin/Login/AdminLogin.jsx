import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminLogin.module.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(
        "Invalid email or password. Please try again."
      );
      return;
    }

    navigate("/admin");
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>

        <div className={styles.brand}>
          <span>HIGH GATE</span>
          <small>INTERNATIONAL ACADEMY</small>
        </div>

        <div className={styles.header}>
          <span>ADMINISTRATION</span>

          <h1>
            Welcome Back
          </h1>

          <p>
            Sign in to manage the High Gate website.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >

          <div className={styles.field}>
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

      </section>
    </main>
  );
}

export default AdminLogin;