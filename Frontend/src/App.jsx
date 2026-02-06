import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "@phosphor-icons/react";

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // Prevent page from reloading at the time of submitting the form

    const { title, description } = e.target.elements;

    // Creating note : after URI you passed the data in the form of object , this data goes to re.body
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleUpdateNote(noteId) {
    const newDescription = prompt("Enter new description");
    axios
      .patch(`http://localhost:3000/api/notes/${noteId}`, {
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  return (
    <main>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Enter Title" />
        <input type="text" name="description" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note.title}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="btn">
                <button
                  className="delete"
                  onClick={() => {
                    handleDeleteNote(note._id);
                  }}
                >
                  <Trash size={32} color="#ffffff" weight="bold" />
                </button>
                <button
                  className="update"
                  onClick={() => {
                    handleUpdateNote(note._id);
                  }}
                >
                  <Pencil size={32} color="#ffffff" weight="bold" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;
