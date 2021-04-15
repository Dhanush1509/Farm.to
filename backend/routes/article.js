import express from "express";
const router = express.Router();
import protect from "../middlewares/setAuthToken.js"

import multipart from "connect-multiparty";
const multipartMiddleware =multipart();
import {
  getArticle,
  getAllArticles,
  likeArticle,
  commentArticle,
  createArticle,
  getAllArticlesOfAuthor,
} from "../controllers/article.js"; 


  /**
   * get all articles
   */
  router.route("/getarticles").get(getAllArticles);

  /**
   * add an article
   */
  router.route("/createarticle").post(protect,multipartMiddleware,createArticle);

  /**
   * clap on an article
   */
  router.route("/:articleId/like").post(protect,likeArticle);

  /**
   * comment on an article
   */
  router.route("/:articleId/comment").post(protect,commentArticle);

  /**
   * get a particlular article to view
   */
  router.route("/:articleId").get(getArticle);
   router.route("/getarticlesforauthor").get(getAllArticlesOfAuthor);
export default router;
