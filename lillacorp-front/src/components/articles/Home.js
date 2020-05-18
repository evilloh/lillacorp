import React,  { useState, useEffect } from 'react';
import Article from './Article';
import axios from 'axios';
import './../home.scss'
function Home()  {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    getAllArticles()
  }, []) 

  const getAllArticles = async () => {
    // request to the backend to retrieve all the articles 
    const apicall = await axios.get(`http://localhost:3001/articles/getAllArticles`)
    const articles = await apicall.data
    setArticles(articles)

  }

  const onDeleteClick = id => {
    axios.delete(`http://localhost:3001/articles/${id}`)
    .then(res => {
      getAllArticles()
      console.log("you have succesfully deleted an article")
    })
    .catch(res =>{
      console.log("There was some issue with the deleting process")
    })
    //// DELETE article ////
  };

    const topArticles = articles.slice(0, 2)
    const restArticles = articles.slice(2)

    return (
      <section className="articles__container">

        {articles ? topArticles.map((article, index) => (
          <Article isTop={true} key={article._id} index={index} article={article} onDeleteClick={onDeleteClick} getAllArticles={getAllArticles} />
        )) : null}
        {articles ? restArticles.map((article, index) => (
          <Article  key={article._id} index={index} article={article} onDeleteClick={onDeleteClick} getAllArticles={getAllArticles} />
        )) : null}
      </section>
    );
}

export default Home;
