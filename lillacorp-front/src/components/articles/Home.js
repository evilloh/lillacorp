import React, { useState, useEffect } from "react";
import Article from "./Article";
import axios from "axios";
import AuthService from "../../services/auth.service";
import "./../home.scss";

const DEV_API = process.env.REACT_APP_DEV_API;

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles();
  }, []);

  const getAllArticles = async () => {
    // request to the backend to retrieve all the articles
    const apicall = await axios.get(DEV_API + `/articles/`);
    const articles = await apicall.data;
    setArticles(articles);
  };

  const onDeleteClick = (id) => {
    axios
      .delete(DEV_API + `/articles/${id}`, AuthService.config)
      .then((res) => {
        getAllArticles();
        console.log("you have succesfully deleted an article");
      })
      .catch((res) => {
        console.log("There was some issue with the deleting process");
      });
    //// DELETE article ////
  };

  const topArticles = articles.slice(0, 2);
  const restArticles = articles.slice(2);

  return (
    <section className="articles__container">
      {articles
        ? topArticles.map((article, index) => (
            <Article
              currentUser={AuthService.getCurrentUser().username}
              isTop={true}
              key={article._id}
              index={index}
              article={article}
              onDeleteClick={onDeleteClick}
              getAllArticles={getAllArticles}
            />
          ))
        : null}
      {articles
        ? restArticles.map((article, index) => (
            <Article
              currentUser={AuthService.getCurrentUser().username}
              key={article._id}
              index={index}
              article={article}
              onDeleteClick={onDeleteClick}
              getAllArticles={getAllArticles}
            />
          ))
        : null}
    </section>
  );
}

export default Home;
