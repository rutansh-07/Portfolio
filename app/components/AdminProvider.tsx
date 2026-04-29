"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";

interface AdminContextType {
  isAdmin: boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  logout: () => {},
});

export const useAdmin = () => useContext(AdminContext);

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Sync auth state from Firebase ────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsub();
  }, []);

  // ── Listen for Ctrl+Shift+A ───────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        if (isAdmin) {
          handleLogout();
        } else {
          setShowModal(true);
          setEmail("");
          setPassword("");
          setError("");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  const handleLogin = useCallback(async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowModal(false);
      setEmail("");
      setPassword("");
    } catch {
      setError("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, logout: handleLogout }}>
      {children}

      {/* Admin Login Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative glass border border-white/10 rounded-3xl p-8 w-full max-w-sm mx-4 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-accent1/10 border border-accent1/20 flex items-center justify-center text-accent1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-syne font-bold text-lg text-white">
                    Admin Access
                  </h3>
                  <p className="font-dm text-xs text-white/30">
                    Sign in with your Firebase account
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/30 hover:text-white/60 transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="admin@example.com"
                autoFocus
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className={`w-full glass border rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none transition-all duration-300 bg-transparent ${
                  error
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-accent1/40"
                }`}
              />
              {error && (
                <p className="text-red-400 text-xs font-dm mt-2 ml-1">
                  {error}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="glow-btn w-full py-3 rounded-full text-sm font-syne disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      d="M12 3a9 9 0 010 18"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Unlock Admin →"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Admin mode indicator */}
      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-[150] flex items-center gap-3 glass border border-accent2/30 rounded-full px-5 py-2.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse" />
          <span className="font-dm text-xs text-white/50">Admin Mode</span>
          <button
            onClick={handleLogout}
            className="text-xs font-syne text-white/30 hover:text-white/60 transition-colors ml-1"
          >
            Exit
          </button>
        </div>
      )}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
