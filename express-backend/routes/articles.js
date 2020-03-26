const express = require("express");
const router = express.Router();
const Articles = require("../models/Article1");
const Comments = require("../models/Comment");
const Users = require("../models/User1");
const mongoose = require('mongoose')

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


router.get('/lillachoice', function (req, response) {

  
  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
  const TOKEN_PATH = 'token.json';
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), listMajors);
  });
  
  function authorize(credentials, callback) {
    
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  const carlo = []
  const pezzo = []
  const visinoskij = []
  const natalia = []
  const misovic = []
  const evilloh = []
  const matteo = []
  

  
  function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1c-Rcks_3BTNpCMeJnUWPI3W4PvSfO9u00WjHUt2Zskg',
      range: 'B:H',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        
        rows.map((row) => {
          carlo.push(row[0])
          pezzo.push(row[1])
          visinoskij.push(row[2])
          natalia.push(row[3])
          misovic.push(row[4])
          evilloh.push(row[5])
          matteo.push(row[6])
          // console.log(`${row[0]}`);
          // console.log(row[1])
        });
        const choices = {carlo, pezzo, visinoskij, natalia, misovic, evilloh, matteo}
        response.json(choices)
      } else {
        console.log('No data found.');
      }
    });
  }

});



// Route to post a new article

router.post("/newArticle", (req, res) => {
  Articles.create(req.body)
    .then(data => res.json(data))
    .catch(err => console.log("Error in posting a new Movie!! ", err));
});

// Route to get all articles 

router.get("/getAllArticles", (req, res) => {
  Articles.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log("Error in retrieving data from DB:", err));
});

// Route to delete an article 

router.delete('/:id', function (req, res) {
  Articles.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the article.");
    res.status(200).send("Article: "+ Articles.title +" was deleted.");
  });
});


// Update a single article 

router.put('/update/:id', function (req, res) {
  mongoose.set('useFindAndModify', false);
  let { id } = req.params;
  const body  = {...req.body}
  console.log("pota questo e' il json", body)
  Articles.findOneAndUpdate({_id: id}, body, {upsert: true}, function(err, res) {
    if (err) return `Error during the update`
    return `Article with ${res.title} updated`
    // FIX HERE, SHOULD RETURN SOMETHING USEFUL, in both cases the return doesn't return shit
  });

});

// Retrieve a single article 

router.get('/:id', function (req, res) {
  let { id } = req.params;
  Articles.findOne({_id: id}, function(error, doc) {
    if (error) return console.log('Error in retrieving your single Article', doc);
    res.json(doc);
  })
});

// Post Comment

router.post('/:id/comments', function(req, res, next) {
  let { id } = req.params;
  Articles.findOne({_id: id}, function(err, article){
    if (err){
      console.log(err, "couldn't find the article to enchufar your comment")
    } else {
      const comment = new Comments(req.body.comment);
      comment.article = article;
      // comment.author = "evilloh";
      return comment.save().then(function(){
        article.comments.push(comment);
  
        return article.save().then(function(article) {
          res.json({comment: comment.toJSONFor(user)});
        });
      });
    }
    // } else {
    //   console.log(article, "vediamo sto article")
    //   Comments.create(req.body.create, function(err, comment){
    //     if (err) {
    //       console.log("couldn't Create a comment in the database!", err)
    //     } else {
    //       article.comments.push(comment)
    //       article.save()
    //     }
    //   })
    //   console.log(req.body.comment)
    // }
  })
});





module.exports = router;