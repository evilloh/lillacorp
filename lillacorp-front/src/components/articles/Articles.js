// import React, { useEffect } from "react";
// import Article from "./Article";
// import Sheet from "./SheetTest";
// import axios from "axios";

// import AuthService from "../../services/auth.service";

// function Articles() {
//   const tokenino = JSON.parse(localStorage.getItem("user"));
//   let config = {
//     headers: {
//       Authorization: `Token ${tokenino ? tokenino.accessToken : ""}`,
//     },
//   };

//   useEffect(() => {
//     console.log("casa");
//     this.getAllArticles();
//   });

//   const getAllArticles = () => {
//     // request to the backend to retrieve all the articles
//     axios.get(`http://localhost:3001/articles/`).then((res) => {
//       console.log("youcalledme");
//       const articles = res.data;
//       this.setState({ articles });
//     });
//   };

//   const onDeleteClick = (id) => {
//     axios
//       .delete(`http://localhost:3001/articles/${id}`, AuthService.config)
//       .then((res) => {
//         getAllArticles();
//         console.log("you have succesfully deleted an article");
//       })
//       .catch((res) => {
//         console.log("There was some issue with the deleting process");
//       });
//     //// DELETE article ////
//   };

//   const { articles } = this.state;

//   return (
//     <section className="articles__container">
//       <Sheet></Sheet>
//       {articles
//         ? articles.map((article, index) => (
//             <Article
//               key={article._id}
//               index={index}
//               article={article}
//               onDeleteClick={onDeleteClick}
//               getAllArticles={getAllArticles}
//             />
//           ))
//         : null}
//     </section>
//   );
// }

// export default Articles;
