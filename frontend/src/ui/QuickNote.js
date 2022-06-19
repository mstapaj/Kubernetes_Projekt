import { useEffect, useState } from "react";
import axios from "axios";

const QuickNote = () => {
    const [quickNote, setQuickNote] = useState(null);
    const [inputQuickNote, setInputQuickNote] = useState("");
    const [editMode, setEditMode] = useState("none");

    const getQuickNote = () => {
        axios
            .get("/api/quickNote")
            .then((res) => setQuickNote(res.data.quickNote));
    };

    useEffect(() => {
        getQuickNote();
    }, []);

    return (
        <div className={"quick"}>
            <h3>Quick note</h3>
            {quickNote ? (
                <div>
                    {editMode === "edit" ? (
                        <div>
                            <div className={"buttons"}>
                                <textarea
                                    defaultValue={quickNote}
                                    onChange={(event) =>
                                        setInputQuickNote(event.target.value)
                                    }
                                />{" "}
                                <button
                                    onClick={() =>
                                        axios
                                            .put(
                                                "/api/quickNote/editQuickNote",
                                                { content: inputQuickNote }
                                            )
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    setEditMode("none");
                                                    setQuickNote(
                                                        inputQuickNote
                                                    );
                                                }
                                            })
                                    }
                                >
                                    Edit quick note
                                </button>{" "}
                                <button onClick={() => setEditMode("none")}>
                                    Back
                                </button>
                            </div>{" "}
                        </div>
                    ) : (
                        <div>
                            <div className={"quickNote"}>{quickNote}</div>
                            <div className={"buttons"}>
                                <button onClick={() => setEditMode("edit")}>
                                    Edit quick note
                                </button>
                                <button className="buttondel"
                                    onClick={() => {
                                        if (
                                            window.confirm("Delete quick note?")
                                        )
                                            axios
                                                .delete(
                                                    "/api/quickNote/deleteQuickNote"
                                                )
                                                .then((res) => {
                                                    if (res.status === 200) {
                                                        setEditMode("none");
                                                        setQuickNote(null);
                                                    }
                                                });
                                    }}
                                >
                                    Delete quick note
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : editMode === "add" ? (
                <div>
                    <div className={"buttons"}>
                        <textarea
                            onChange={(event) =>
                                setInputQuickNote(event.target.value)
                            }
                        />{" "}
                        <button
                            onClick={() =>
                                axios
                                    .post(
                                        "/api/quickNote/addQuickNote",
                                        { content: inputQuickNote }
                                    )
                                    .then((res) =>
                                        res.status === 200
                                            ? setQuickNote(inputQuickNote)
                                            : null
                                    )
                            }
                        >
                            Add quick note
                        </button>{" "}
                        <button onClick={() => setEditMode("none")}>
                            Back
                        </button>
                    </div>{" "}
                </div>
            ) : (
                <div className={"buttons"}>
                    <button onClick={() => setEditMode("add")}>
                        Add quick note
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuickNote;
