import React, { Component } from 'react';
// import TextInputGroup from '../layout/TextInputGroup';
import TextAreaInput from '../layout/TextAreaInput';
import Comment from './Comment';
import axios from 'axios';

class EditArticle extends Component {
  state = {
    title: '',
    body: '',
    description: '',
    comments: '',
    tagList: '',
    author: '',
    imgUrl: '',
    errors: {}
  };

  componentDidMount() {
    this.getArticle()
    // this.getComments()
  }

  getArticle = () => {
    const { id } = this.props.match.params
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/${id}`)
    .then(res => {
      const articles = res.data;
      console.log(res.data)
      this.setState({ 
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
      title: '',
      body: '',
      description: '',
      comments: '',
      tagList: '',
      author: '',
      imgUrl: '',
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
    const { title, body, errors, comment, imgUrl } = this.state;
    return (
      <React.Fragment>
      <div className="container-medium article">
        <h1 className="article__title">{title}</h1>

 
      </div>
      <section className="article__image-container">
        <article className="container-medium">
          <img src={imgUrl}></img>
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
          <p>{body}</p>
          <hr/>
        </article> 

        <article className="article__comments">
        <h3>Comments:</h3>
        <Comment comment={comment}></Comment>
        <Comment comment={comment}></Comment>
        {comment ? comment.map(comment => (
          <p>{comment.body}</p>
        )) : null}
        </article> 
        <div className="article__comments__new-comment__container">
        <div className="article__comments__new-comment__input-container">
          <form onSubmit={this.onSubmit}>
            <TextAreaInput
              label="Comment"
              name="comment"
              placeholder="Enter your Comment"
              value={comment}
              onChange={this.onChange}
              error={errors.body}

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
}

export default EditArticle;
