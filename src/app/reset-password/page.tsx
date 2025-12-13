"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import "./styles/reset-password.css";


function PageToRender(){
     const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sessionValid, setSessionValid] = useState(false);

  useEffect(() => {
    // Check if user has a valid session (came from reset email link)
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSessionValid(true);
      } else {
        setError("Invalid or expired reset link. Please request a new one.");
        setTimeout(() => {
          router.push("/forgot-password");
        }, 3000);
      }
    };

    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login-page");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionValid) {
    return (
      <div className="reset-password-page">
        <div className="component-flex">
          <div id="title-component">
            <h2>LUMINARY</h2>
            <div className="p-tags">
              <p>Verifying</p>
              <p>your request...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="component-flex">
        <div id="title-component">
          <h2>LUMINARY</h2>
          <div className="p-tags">
            <p>Create your</p>
            <p>new password.</p>
          </div>
        </div>

        <form onSubmit={handleResetPassword}>
          <div id="reset-password-component">
            <h2>Reset Password</h2>

            {success ? (
              <div className="success-message">
                <p>Password updated successfully!</p>
                <p className="redirect-text">Redirecting to login...</p>
              </div>
            ) : (
              <>
                {error && <div className="error-message">{error}</div>}

                <input
                  id="new-password"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />

                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />

                <button
                  type="submit"
                  className="reset-button"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default function ResetPasswordPage() {
    return(
        <Suspense>
            <PageToRender></PageToRender>
        </Suspense>
    )
}
