"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import "./styles/forgot-password.css";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login-page");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    router.push("/login-page");
  };

  return (
    <div className="forgot-password-page">
      <div className="component-flex">
        <div id="title-component">
          <h2>LUMINARY</h2>
          <div className="p-tags">
            <p>Reset your</p>
            <p>password.</p>
          </div>
        </div>

        <form onSubmit={handleSendResetEmail}>
          <div id="forgot-password-component">
            <h2>Forgot Password?</h2>
            
            {success ? (
              <div className="success-message">
                <p>Password reset email sent!</p>
                <p className="subtitle">Check your email for further instructions.</p>
                <p className="redirect-text">Redirecting to login...</p>
              </div>
            ) : (
              <>
                <p className="instruction-text">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                {error && <div className="error-message">{error}</div>}

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="E-Mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />

                <button
                  type="submit"
                  className="send-reset-email"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="back-to-login">
                  <button type="button" onClick={goBack} className="back-button">
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
