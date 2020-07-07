import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { Editor } from "@tinymce/tinymce-react";
const TINY_API = process.env.REACT_APP_TINY_API;
const DEV_API = process.env.REACT_APP_DEV_API;

function EditArticle(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [errors, setErrors] = useState({});
  const [articles, setArticles] = useState({});
  const state = {
    title: "",
    body: "",
    errors: {},
  };

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = () => {
    const { id } = props.match.params;
    // request to the backend to retrieve all the articles
    axios
      .get(DEV_API + `/articles/${id}`)
      .then((res) => {
        const articles = res.data;
        setTitle(articles.title);
        setBody(articles.body);
      })
      .catch((res) => {
        console.log("We couldnt retrieve your Article");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Check For Errorors
    if (title == "") {
      setErrors({ title: "Title is required" });
      console.log(errors);
      return;
    }

    if (body == "") {
      setErrors({ body: "Body is required" });
      return;
    }

    //

    const updArticle = {
      title,
      body,
    };

    const { id } = props.match.params;

    //// UPDATE Article ////

    console.log("updated", updArticle);
    axios
      .put(DEV_API + `/articles/update/${id}`, updArticle, AuthService.config)
      .then((res) => {
        console.log("vediamo se e passato qualkcosa", res.data);
      })
      .catch((res) => {
        console.log("We couldnt UPDATE your Article");
      });

    // Clear State
    setTitle("");
    setBody("");
    setErrors({});

    axios.get(DEV_API + `/articles/`).then((res) => {
      console.log("youcalledme");
      const articles = res.data;
      setArticles({ articles });
      props.history.push("/");
    });
  };

  const handleEditorChange = (content, editor) => {
    setBody(content);
  };
  const handleTitleChange = (content, editor) => {
    setTitle(content);
  };

  console.log(title, body);

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
              value={title}
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
            value={body}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo |fontsizeselect formatselect  fontselect| bold italic backcolor forecolor | \
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

export default EditArticle;
