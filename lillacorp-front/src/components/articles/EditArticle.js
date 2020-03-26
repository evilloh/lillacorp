import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditArticle extends Component {
  state = {
    title: '',
    body: '',
    errors: {}
  };

  componentDidMount() {
    this.getArticle()
  }

  getArticle = () => {
    const { id } = this.props.match.params
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/${id}`)
    .then(res => {
      const articles = res.data;
      this.setState({ title: articles.title, body: articles.body });
    })
    .catch(res => {
      console.log('We couldnt retrieve your Article')
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body } = this.state;

    // Check For Errorors

    //




    const updArticle = {
      title,
      body,
    };

    const { id } = this.props.match.params;

    //// UPDATE Article ////

    axios.put(`http://localhost:3001/articles/update/${id}`, updArticle)
    .then(res => {
      console.log('vediamo se e passato qualkcosa', res.data)
    })
    .catch(res => {
      console.log('We couldnt UPDATE your Article')
    })

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });    
    
    // FIX qua faccio una chiamata con tanto code per niente, in teoria dovrei passargli un 
    // metodo tipo "update all" che viene da redux
    axios.get(`http://localhost:3001/articles/getAllArticles`)
    .then(res => {
      console.log('youcalledme')
      const articles = res.data;
      this.setState({ articles });
      this.props.history.push('/');
    })




  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, body, errors } = this.state;
    console.log(this.props)
    return (
      <div className="card mb-3">
        <div className="card-header">Edit Article</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Title"
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={this.onChange}
              error={errors.title}
            />
            <TextInputGroup
              label="Body"
              name="body"
              placeholder="Enter Body"
              value={body}
              onChange={this.onChange}
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
}

export default EditArticle;
