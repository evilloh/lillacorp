import React, { useState, useEffect } from 'react';
// import TextInputGroup from '../layout/TextInputGroup';
import TextAreaInput from '../layout/TextAreaInput';
import Comment from './Comment';
import axios from 'axios';

function EditArticle (props) {

  const [article, setArticle] = useState({
    _id: '',
    title: '',
    body: '',
    description: '',
    tagList: '',
    author: '',
    imgUrl: '',
    errors: '',
    comments: []
  })
  const [commentField, setCommentField] = useState('')
  
  useEffect (() => {
    getArticle()
    // getComments()
  }, [])


  const getArticle = () => {
    const { id } = props.match.params
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/${id}`)
    .then(res => {
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
    .catch(res => {
      console.log('We couldnt retrieve your Article')
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { _id } = article;
    // Check For Errorors
    //
    
    const comment = {
      body: commentField,
      article: _id,
      author: "5ed7712aea945194d469337a",
      createdAt: new Date
    };

    // Clear State
    setCommentField("")
    
    // FIX qua faccio una chiamata con tanto code per niente, in teoria dovrei passargli un 
    // metodo tipo "update all" che viene da redux
    axios.post(`http://localhost:3001/articles/comments/${_id}`, comment).then(res => getArticle())





  };

    return (
      <React.Fragment>
      <div className="container-medium article">
        <h1 className="article__title">{article.title}</h1>

 
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
        <article className="article__body">
          <p>{article.body}</p>
          <hr/>
        </article> 

        <article className="article__comments">
        <h3>Comments:</h3>
        {article.comments ? article.comments.map(comment => (
          <Comment {...comment}></Comment>
        )) : null}
        </article> 
        <div className="article__comments__new-comment__container">
        <div className="article__comments__new-comment__input-container">
          <form onSubmit={onSubmit}>
            <TextAreaInput
              label="Comment"
              name="comment"
              placeholder="Enter your Comment"
              value={commentField}
              onChange={e => setCommentField(e.target.value)}
              error={article.errors}

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
