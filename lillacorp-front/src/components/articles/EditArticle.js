import React, { Component, useEffect, useState } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

function EditArticle (props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const [errors, setErrors] = useState({})
  const [articles, setArticles] = useState({})
  const state = {
    title: '',
    body: '',
    errors: {}
  };

  useEffect(() => {
    getArticle()
  }, [])

  const getArticle = () => {
    const { id } =props.match.params
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/${id}`)
    .then(res => {
      const articles = res.data;
      setTitle(articles.title);
      setBody(articles.body);
    })
    .catch(res => {
      console.log('We couldnt retrieve your Article')
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // Check For Errorors
    if (title == '') {
    setErrors({ title: 'Title is required' });
    console.log(errors)
    return;
  }

    if (body == '') {
      setErrors({ body: 'Body is required' });
      return;
    }

    //

    const updArticle = {
      title,
      body,
    };

    const { id } = props.match.params;

    //// UPDATE Article ////

    axios.put(`http://localhost:3001/articles/update/${id}`, updArticle)
    .then(res => {
      console.log('vediamo se e passato qualkcosa', res.data)
    })
    .catch(res => {
      console.log('We couldnt UPDATE your Article')
    })

    // Clear State
    setTitle('')
    setBody('')
    setErrors({})
    
    // FIX qua faccio una chiamata con tanto code per niente, in teoria dovrei passargli un 
    // metodo tipo "update all" che viene da redux
    axios.get(`http://localhost:3001/articles/getAllArticles`)
    .then(res => {
      console.log('youcalledme')
      const articles = res.data;
      setArticles({ articles });
      props.history.push('/');
    })

  };

    console.log(props)
    return (
      <div className="card mb-3">
        <div className="card-header">Edit Article</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <TextInputGroup
              label="Title"
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              error={errors.title}
            />
            <TextInputGroup
              label="Body"
              name="body"
              placeholder="Enter Body"
              value={body}
              onChange={e => setBody(e.target.value)}
              error={errors.body}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }


export default EditArticle;
