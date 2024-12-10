import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const apiBase = "http://localhost:5000/api";

  const handleApiRequest = useCallback(
    async (endpoint, method, data = null) => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const config = { method, url: `${apiBase}/${endpoint}`, headers, data };
        return await axios(config);
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    [apiBase]
  );

  const login = async (username, password) => {
    try {
      const response = await handleApiRequest("login", "POST", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Login failed!");
    }
  };

  const register = async (username, password) => {
    try {
      await handleApiRequest("register", "POST", { username, password });
      alert("Registration successful! You can now log in.");
      setIsRegistering(false);
    } catch (error) {
      alert("Registration failed!");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await handleApiRequest("data", "GET");
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [handleApiRequest]);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, fetchData]);

  const createNote = async (note) => {
    try {
      const response = await handleApiRequest("data", "POST", note);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await handleApiRequest(`data/${id}`, "DELETE");
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setNotes([]); // Clear notes when logged out
  };

  return (
    <div>
      <Header logout={logout}/>
      {isAuthenticated ? (
        <div>
          
          <CreateArea onAdd={createNote} />
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              deleteNote={() => deleteNote(note.id)}
            />
          ))}
        </div>
      ) : isRegistering ? (
        <Register
          onRegister={register}
          onSwitch={() => setIsRegistering(false)}
        />
      ) : (
        <Login onLogin={login} onSwitch={() => setIsRegistering(true)} />
      )}
      <Footer />
    </div>
  );
}

export default App;
