import React, { useState, useEffect } from "react";
// import TextInputGroup from '../layout/TextInputGroup';
import TextAreaInput from "../layout/TextAreaInput";
import Comment from "./Comment";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import AuthService from "../../services/auth.service";
const TINY_API = process.env.REACT_APP_TINY_API;
const DEV_API = process.env.REACT_APP_DEV_API;

function EditArticle(props) {
  const [article, setArticle] = useState({
    _id: "",
    title: "",
    body: "",
    description: "",
    tagList: "",
    author: "",
    imgUrl: "",
    errors: "",
    comments: [],
  });
  const [commentField, setCommentField] = useState("");

  useEffect(() => {
    getArticle();
    // getComments()
  }, []);

  const currentUser = AuthService.getCurrentUser().username;

  const getArticle = () => {
    const { id } = props.match.params;
    // request to the backend to retrieve all the articles
    axios
      .get(DEV_API + `/articles/${id}`)
      .then((res) => {
        const articles = res.data;
        setArticle({
          _id: articles._id,
          title: articles.title,
          body: articles.body,
          description: articles.description,
          comments: articles.comments,
          tagList: articles.tagList,
          author: articles.author,
          imgUrl: articles.imgUrl,
        });
      })
      .catch((res) => {
        console.log("We couldnt retrieve your Article");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { _id } = article;
    // Check For Errorors
    //

    const comment = {
      body: commentField,
      article: _id,
      author: currentUser,
      createdAt: new Date(),
    };

    // Clear State
    setCommentField("");

    // FIX qua faccio una chiamata con tanto code per niente, in teoria dovrei passargli un
    // metodo tipo "update all" che viene da redux
    axios
      .post(DEV_API + `/articles/comments/${_id}`, comment)
      .then((res) => getArticle());
  };

  const handleEditorChange = (content, editor) => {
    setCommentField(content);
    console.log("Content was updated:", commentField);
  };

  console.log(article.body);
  return (
    <React.Fragment>
      <div className="container-medium article">
        <h1
          dangerouslySetInnerHTML={{ __html: article.title }}
          className="article__title"
        />
      </div>
      <section className="article__image-container">
        <article className="container-medium">
          <img src={article.imgUrl}></img>
          <div className="article__infos">
            <p className="article__infos__title">Published by:</p>
            <p>Federaico</p>
            <p className="article__infos__title">On date:</p>
            <p>21 jan 2019</p>
          </div>
        </article>
      </section>
      <section className="container-medium article">
        <article
          dangerouslySetInnerHTML={{ __html: article.body }}
          className="article__body"
        />
        <hr />
        <br></br>
        <br></br>
        <article className="article__comments">
          <h3>Comments:</h3>
          {article.comments
            ? article.comments.map((comment) => (
                <Comment {...comment}></Comment>
              ))
            : null}
        </article>
        <div className="article__comments__new-comment__container">
          <div className="article__comments__new-comment__input-container">
            <form onSubmit={onSubmit}>
              <Editor
                apiKey={TINY_API}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount emoticons",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic forecolor | \
                alignleft aligncenter alignright alignjustify | emoticons \
                bullist | removeformat ",
                }}
                onEditorChange={handleEditorChange}
                outputFormat="html"
              />
              <input
                type="submit"
                value="Add Comment"
                className="article__comments__new-comment__button"
              />
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default EditArticle;
