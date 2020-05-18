import React, { useEffect } from 'react';
import Article from './Article';
import Sheet from './SheetTest';
import axios from 'axios';

function Articles() {

  useEffect(() => {
    console.log('casa')
    this.getAllArticles()
  })

 const getAllArticles = () => {
    // request to the backend to retrieve all the articles 
    axios.get(`http://localhost:3001/articles/getAllArticles`)
    .then(res => {
      console.log('youcalledme')
      const articles = res.data;
      this.setState({ articles });
    })
  }

  const onDeleteClick = id => {
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


    const { articles } = this.state;
    
    return (
      <section className="articles__container">
        <Sheet></Sheet>
        {articles ? articles.map((article, index) => (
          <Article key={article._id} index={index} article={article} onDeleteClick={onDeleteClick} getAllArticles={getAllArticles} />
        )) : null}
      </section>
    );
  
}

export default Articles;
