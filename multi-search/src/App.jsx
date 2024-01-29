import { useEffect, useState, useRef } from "react";
import "./App.css";
import Capsule from "./components/Capsule";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef();

  useEffect(() => {
    const fetchUsers = () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
      }

      fetch(`http://dummyjson.com/users/search?q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.log(err));
    };
    fetchUsers();
  }, [searchQuery]);

  const handleSelectedUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchQuery("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUser.filter((sUser) => sUser.id !== user.id);
    setSelectedUser(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(-1); // Reset highlighted index when input changes
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move down the list
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.users.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      // Move up the list
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      // Select user on pressing enter
      handleSelectedUser(suggestions.users[highlightedIndex]);
      setHighlightedIndex(-1); // Reset highlighted index after selection
    } else if (e.key === "Backspace" && searchQuery.length === 0) {
      handleRemoveLastUser();
    }
  };

  const handleRemoveLastUser = () => {
    if (selectedUser.length > 0) {
      const lastUser = selectedUser[selectedUser.length - 1];
      handleRemoveUser(lastUser);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-950 h-screen p-5 w-full relative">
      <p className="text-white text-2xl">Multi-select-Search</p>
      <div className="flex flex-wrap items-center w-auto gap-1 h-auto bg-white pl-8 m-2 p-2 rounded-[30px] border border-slate-600">
        {/* capsules */}
        {selectedUser.map((user) => {
          return (
            <Capsule
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        {/* input-Field */}
        <div>
          <input
            ref={inputRef}
            className="outline-none h-[20px] p-5"
            type="text"
            placeholder="Enter your query"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="">
        <ul className="flex flex-col p-2 gap-1 m-1 w-[400px] max-h-[405px]  bg-blue-300  rounded-md  overflow-y-scroll">
          {suggestions?.users?.map((user, index) => {
            return !selectedUserSet.has(user.email) ? (
              <li
                onClick={() => handleSelectedUser(user)}
                key={user.email}
                className={`${
                  highlightedIndex === index ? "bg-blue-200" : ""
                } bg-slate-100 flex items-center gap-2 p-1 pl-3 hover:bg-slate-200 cursor-pointer border border-slate-500 rounded-[20px]`}
              >
                <img
                  className="w-[30px]"
                  src={user.image}  
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </li>
            ) : (
              <></>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
