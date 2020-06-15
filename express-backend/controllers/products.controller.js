const Articles = require("../models/Article1");
const mongoose = require('mongoose')

class ArticlesController {
  constructor() {
    
  }
  
   getAllArticles = async (req, res, next) => {
    try {
      await Articles.find()
      .then(data => {
        return res.json(data)
      })
    } catch(e) {
      console.log( e.message)
      res.sendStatus(500)
    }
  }
   
  postArticle = async (req, res) => {
    try {
    await Articles.create(req.body)
      .then(data => res.json(data))
      .catch(err => console.log("Error in posting a new Movie!! ", err));
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500)
    }
  }

  deleteArticle = async (req, res) => {
    try {
      await Articles.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the article.");
      res.status(200).send("Article: "+ Articles.title +" was deleted.");
    });
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) 
    }
  }

  updateArticle = async (req, res) => {
    mongoose.set('useFindAndModify', false);
    let { id } = req.params;
    const body  = {...req.body}
    try {
      await Articles.findOneAndUpdate({_id: id}, body, {upsert: true}, function(err, res) {
        if (err) return `Error during the update`
        return `Article with ${res.title} updated`
        // FIX HERE, SHOULD RETURN SOMETHING USEFUL, in both cases the return doesn't return shit
      });
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) 
    }
  }

  getArticle = async (req, res) => {
    let { id } = req.params;
    try {
    const response = await Articles.findOne({_id: id})
    .populate({path: 'comments', model: "Comments",
     populate: {path: 'author', model: "User"}})
    res.json(response)
    } catch(e) {
    console.log(e.message)
    res.sendStatus(500)
    }
  }
}


module.exports = {
  ArticlesController
}
 


