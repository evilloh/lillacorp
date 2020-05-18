import React, { useState } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

function AddArticle(props) {
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({errors : {}})
  const [title, setTitle] = useState('')
  
  const onSubmit = (e) => {
    e.preventDefault();


    // Check For Errors
    if (title === '') {
      setErrors({ title: 'Title is required' });
      console.log(errors)
      return;
    }

    if (body === '') {
      setErrors({ body: 'Body is required' });
      return;
    }

    const newArticle = {
      title,
      body,
    };

    //// SUBMIT Article ////
    axios.post('http://localhost:3001/articles/newArticle', newArticle)
    .then(function (response) {
      redirectToHome()
    })
    .catch(function (error) {
      console.log(error);
    });
    
    let redirectToHome = () => {
      props.history.push('/');
    }


    // Clear State
    setTitle('')
    setBody('')
    setErrors({})
  };

    return (
      <div className="card mb-3">
        <div className="card-header">Add Article</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <TextInputGroup
              label="Title"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              error={errors.title}
            />
            <TextInputGroup
              label="Body"
              name="body"
              type="body"
              placeholder="Enter Body"
              value={body}
              onChange={e => setBody(e.target.value)}
              error={errors.body}
            />
            <input
              type="submit"
              value="Add Article"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }

export default AddArticle;
