import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateCredentials = useMemo(() => {
    return (username, password) =>
      username === "user" && password === "password";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateCredentials(username, password);

    if (isValid) {
      setError("");
      setIsSubmitted(true);
    } else {
      setError("Invalid username or password");
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Login Error:", error);
      const timeout = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="container">
      <h1>Login Page</h1>
      {isSubmitted ? (
        <div>
          <p>Welcome, {username}!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Login;
