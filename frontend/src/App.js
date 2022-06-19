import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteList from "./ui/NoteList";
import NoteForm from "./ui/NoteForm";
import QuickNote from "./ui/QuickNote";

function App() {
    return (
        <Router>
            <div className={"header"}>
                <div>NoteJS</div>
            </div>
            <div className="App">
                <QuickNote />
                <Routes>
                    <Route exact path="/" element={<NoteList />} />
                    <Route exact path="/addNote" element={<NoteForm />} />\
                    <Route exact path="/editNote/:id" element={<NoteForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
