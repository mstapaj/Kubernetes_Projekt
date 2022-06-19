import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NoteList = () => {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        axios
            .get("/api/notes/")
            .then((res) => setNotes(res.data));
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this note?")) {
            axios
                .delete(`/api/notes/deleteNote/${id}`)
                .then(() => getNotes());
        }
    };

    return (
        <div className={"note"}>
            <h3> Note list</h3>
            <button className='fl' onClick={() => navigate("/addNote")}>Add note</button>
            <div className={"notes"}>
                {notes.map((n) => (
                    <div>
                        <h4>{n.title}</h4>
                        <div className={"content"}>{n.content}</div>
                        <div className={"buttons"}>
                            <button
                                onClick={() => navigate(`/editNote/${n._id}`)}
                            >
                                Edit note
                            </button>
                            <button
                                className={"buttondel"}
                                onClick={() => handleDelete(n._id)}
                            >
                                Delete note
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteList;
