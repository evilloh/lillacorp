import React, { Component } from 'react';
import Article from './Article';
import axios from 'axios';
import './../home.scss'
class Home extends Component {
  state = {
    articles : []
  };

  componentDidMount() {
    this.getAllArticles()
  }

  getAllArticles = () => {
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/getAllArticles`)
    .then(res => {
      const articles = res.data;
      this.setState({ articles });
    })
  }

  onDeleteClick = id => {
    axios.delete(`http://localhost:3001/articles/${id}`)
    .then(res => {
      this.getAllArticles()
      console.log("you have succesfully deleted an article")
    })
    .catch(res =>{
      console.log("There was some issue with the deleting process")
    })
    //// DELETE article ////
  };


  render() {
    console.log("state", this.state)
    const { articles } = this.state;
    const topArticles = articles.slice(0, 2)
    const restArticles = articles.slice(2)

    return (
      <section className="articles__container">

        {articles ? topArticles.map((article, index) => (
          <Article isTop={true} key={article._id} index={index} article={article} onDeleteClick={this.onDeleteClick} getAllArticles={this.getAllArticles} />
        )) : null}
        {articles ? restArticles.map((article, index) => (
          <Article key={article._id} index={index} article={article} onDeleteClick={this.onDeleteClick} getAllArticles={this.getAllArticles} />
        )) : null}
      </section>
    );
  }
}

export default Home;
