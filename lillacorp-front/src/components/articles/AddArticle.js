import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body } = this.state;

    // Check For Errors
    if (title === '') {
      this.setState({ errors: { title: 'Title is required' } });
      return;
    }

    if (body === '') {
      this.setState({ errors: { body: 'Body is required' } });
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
      this.props.history.push('/');
    }


    // Clear State
    // this.setState({
    //   title: '',
    //   body: '',
    //   errors: {}
    // });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, body, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Article</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Title"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={this.onChange}
              error={errors.title}
            />
            <TextInputGroup
              label="Body"
              name="body"
              type="body"
              placeholder="Enter Body"
              value={body}
              onChange={this.onChange}
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
}

export default AddArticle;
