import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./comonents/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Conditional rendering
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-800">
      <div className="w-full block">
        <Header />
        <main>
          {/* Outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
