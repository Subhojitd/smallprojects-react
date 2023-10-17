import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "./debounce/useDebounce";

function App() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedUsername = useDebounce(username, 300);

  useEffect(() => {
    if (debouncedUsername) {
      setLoading(true);

      axios
        .get(`https://api.github.com/users/${debouncedUsername}`)
        .then((response) => {
          setAvatarUrl(response.data.avatar_url);
        })
        .catch((error) => {
          console.error("Error fetching avatar:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedUsername]);

  return (
    <div className="App">
      <h1>GitHub Avatar Fetcher</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : avatarUrl ? (
        <img src={avatarUrl} width={200} height={200} alt="GitHub Avatar" />
      ) : null}
    </div>
  );
}

export default App;
