import { useState, useEffect } from "react";
import axios from "axios";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
