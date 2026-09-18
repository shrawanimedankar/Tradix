import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");

        if (urlToken) {
          localStorage.setItem("token", urlToken);

          // Remove token from URL
          window.history.replaceState({}, document.title, "/");
        }

        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "https://tradix-platform.onrender.com/login";
          return;
        }

        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          setUser(result.data);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("fullName");

          window.location.href =
            "https://tradix-platform.onrender.com/login";
        }
      } catch (error) {
        console.log("AUTH ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Wait until user authentication is completed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <TopBar user={user} />
      <Dashboard user={user} />
    </>
  );
};

export default Home;