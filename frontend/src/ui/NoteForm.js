import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

const NoteForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const noteSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "The title must have a minimum of 3 letters. ")
            .max(50, "The title can have a maximum of 50 letters. ")
            .required("Title is required. "),
        content: Yup.string()
            .max(500, "Content can have a maximum of 500 letters. ")
            .required("Content is required. "),
    });

    const [init, setInit] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = (values) => {
        params.id
            ? axios
                  .put("/api/notes/editNote", values)
                  .then((res) => {
                      if (res.status === 200) navigate(-1);
                  })
                  .catch((err) => console.log(err))
            : axios
                  .post("/api/notes/addNote", values)
                  .then((res) => {
                      if (res.status === 200) navigate(-1);
                  })
                  .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (params.id) {
            axios
                .get(`/api/notes/${params.id}`)
                .then((res) => {
                    setInit({
                        _id: params.id,
                        title: res.data.title,
                        content: res.data.content,
                    });
                });
        }
    }, []);

    return (
        <div className={"note noteform"}>
            {params._id ? <h3>Edit note</h3> : <h3>Add note</h3>}
            <button onClick={() => navigate(-1)}>Back</button>
            <Formik
                initialValues={init}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={noteSchema}
            >
                <Form>
                    <div>
                        <Field placeholder={"Title"} name={"title"} />
                    </div>

                    <div>
                        <Field
                            placeholder={"Note"}
                            as={"textarea"}
                            name={"content"}
                        />
                    </div>
                    <ErrorMessage name={"title"} component={"p"} />
                    <ErrorMessage name={"content"} component={"p"} />

                    {params.id ? (
                        <button type={"submit"}>Edit note</button>
                    ) : (
                        <button type={"submit"}>Add note</button>
                    )}
                </Form>
            </Formik>
        </div>
    );
};

export default NoteForm;
