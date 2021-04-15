import Article from "../models/Article.js";
import fs from "fs"
import cloudinary from "cloudinary"
import asyncHandler from "express-async-handler"
const createArticle = asyncHandler(async (req, res) => {

  const {
    text,
    title,
    description
  } = req.body;
  let imageUrl="";
     
  if (req.files.imgSrc) {
     
  await cloudinary.uploader.upload(
      req.files.imgSrc.path,
      (result) => {
     imageUrl = result.url
      }, {
        resource_type: "image",
        eager: [{
          effect: "sepia"
        }],
      }
    );
 
       const article = new Article({
         text,
         title,
         image: imageUrl,
         description:description,
         author: req.user._id,
       });
     const savedArticle = await article.save();
     if (savedArticle) {
       res.status(200);
       res.json({
         message: "article added successfully",
         savedArticle,
       });
     } else {
       res.status(404);
       throw new Error("article not saved");
     }
  } else {
       const article = new Article({
         text,
         title,
         description: description,
         image: imageUrl,
         author: req.user._id,
       });
    
  const savedArticle = await article.save();
  if (savedArticle) {
    res.status(200);
    res.json({
      message: "article added successfully",
      savedArticle,
    });
  } else {
    res.status(404);
    throw new Error("article not saved");
  }
  }
})

const getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId).populate("author","name _id").populate("comments.author","name").populate("comments")
     const commentsarticle = await Article.findById(req.params.articleId)
       .populate("comments")
       .populate("author");
  if (article) {
    res.status(200)
    res.json({article,message:"fetched article successfully",commentsarticle})
  } else {
    res.status(404)
    throw new Error("article not found");
  }
})


/**
 * article_id
 */
const likeArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId).populate("comments").populate("author");

  await article.like(req.user._id);
  res.json({message:"liked",article})

})



const commentArticle = asyncHandler(async (req, res) => {
console.log(req.body.comment)
      const article =await Article.findById(req.params.articleId).populate("comments.author").populate("author")
   
      const saveComment = {
        author: req.user._id,
        text: req.body.comment,
      };
      
  await article.comment(saveComment,req.user._id);
 
  res.json({ message: "comment added successfully",article });
    }
    )

    /**
     * article_id
     */
    const getAllArticles =asyncHandler(async (req, res) => {
        const articles = await Article.find({}).populate("author").populate("comments.author")
        if (articles) {
          res.status(200)
          res.json(articles)
        } else {
          res.status(404)
          throw new Error("articles not found");
        }
      })
        const getAllArticlesOfAuthor =asyncHandler(async (req, res) => {
        const articles = await Article.find({author:req.user._id}).populate("author").populate("comments.author")
        if (articles) {
          res.status(200)
          res.json(articles)
        } else {
          res.status(404)
          throw new Error("articles not found");
        }
      })
      
      export {
        getArticle,
        getAllArticles,
        likeArticle,
        commentArticle,
        createArticle,
        getAllArticlesOfAuthor
      }