import React, { Component } from 'react';
import Article from './Article';
import Sheet from './SheetTest';
import axios from 'axios';

class Articles extends Component {
  state = {
  };

  componentDidMount() {
    this.getAllArticles()
  }

  getAllArticles = () => {
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/getAllArticles`)
    .then(res => {
      console.log('youcalledme')
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
    const { articles } = this.state;
    
    return (
      <section className="articles__container">
        <Sheet></Sheet>
        {articles ? articles.map((article, index) => (
          <Article key={article._id} index={index} article={article} onDeleteClick={this.onDeleteClick} getAllArticles={this.getAllArticles} />
        )) : null}
      </section>
    );
  }
}

export default Articles;
