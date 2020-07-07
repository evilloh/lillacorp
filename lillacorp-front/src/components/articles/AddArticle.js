import React, { useState } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import AuthService from "../../services/auth.service";
const TINY_API = process.env.REACT_APP_TINY_API;
const DEV_API = process.env.REACT_APP_DEV_API;

function AddArticle(props) {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({ errors: {} });
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // Check For Errors
    if (title === "") {
      setErrors({ title: "Title is required" });
      console.log(errors);
      return;
    }

    if (body === "") {
      setErrors({ body: "Body is required" });
      return;
    }
    const tokenino = JSON.parse(localStorage.getItem("user"));

    const newArticle = {
      title,
      body,
      author: AuthService.getCurrentUser().username,
    };

    //// SUBMIT Article ////
    let config = {
      headers: {
        Authorization: `Token ${
          AuthService.getCurrentUser().accessToken ? tokenino.accessToken : ""
        }`,
      },
    };
    axios
      .post(DEV_API + "/articles/newArticle", newArticle, config)
      .then(function (response) {
        redirectToHome();
      })
      .catch(function (error) {
        console.log(error);
      });

    let redirectToHome = () => {
      props.history.push("/");
    };

    // Clear State
    setTitle("");
    setBody("");
    setErrors({});
  };

  const handleEditorChange = (content, editor) => {
    console.log(content, editor);
    setBody(content);
  };
  const handleTitleChange = (content, editor) => {
    setTitle(content);
  };
  console.log(DEV_API);

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h1>Add Article</h1>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form__article-title">
            <Editor
              className="form__article-title"
              style={{ margin: "20px" }}
              apiKey={TINY_API}
              inline={true}
              initialValue="Your Title Here"
              init={{
                height: 220,
                menubar: false,
                plugins: [
                  // "advlist autolink lists link image charmap print preview anchor",
                  // "searchreplace visualblocks code fullscreen",
                  // "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | fontsizeselect  fontselect| bold italic  | \
              \
              |removeformat |",
              }}
              onEditorChange={handleTitleChange}
              outputFormat="html"
            />
          </div>

          <Editor
            apiKey={TINY_API}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | fontsizeselect formatselect  fontselect| bold italic backcolor forecolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat |  link image |",
            }}
            onEditorChange={handleEditorChange}
            outputFormat="html"
          />
          <input
            type="submit"
            value="Submit Article"
            className="article__comments__new-comment__button"
          />
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
