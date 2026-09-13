import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");

    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log(result);
        if (result.success) {
          setUser(result.data);
        } else if (result.status_code === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("fullName");

          window.location.href = "http://localhost:5173/login";
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getUser();
    } else {
      window.location.href = "http://localhost:5173/login";
    }
  }, []);

  return (
    <>
      <TopBar user={user} />
      <Dashboard user={user} />
    </>
  );
};

export default Home;
