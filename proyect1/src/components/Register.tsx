"use client"
import { useState } from "react";
//import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [agreement, setAgreement] = useState(false);
 // const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    //router.push("/dashboard");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="text-primary-500">Register</h2>
        <div className="flex gap-4">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="agreement"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          />
          <label htmlFor="agreement">
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" disabled={!agreement}>
          Register
        </button>
      </form>
    </div>
  );
};

const Wrapper = () => (
  <div id="__next">
    <Register />
  </div>
);

export default Wrapper;