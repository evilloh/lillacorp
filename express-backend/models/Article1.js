const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: String,
    description: String,
    body: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: String,
  },
  {
    timestamps: true
  }
);

const Articles = mongoose.model("Articles", articleSchema);
module.exports = Articles;
