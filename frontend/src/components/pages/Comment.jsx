import React,{useState,useContext, useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import ArticleContext from "../context/Article/ArticleContext"
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AuthContext from "../context/Auth/AuthContext";
import moment from "moment"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inlineBlock",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Comment = (props) => {
       const classes = useStyles();
    const [comment,setComment]=useState("")
    const {postComment,singleArticle}=useContext(ArticleContext)
    const { userInfo } = useContext(AuthContext);
    const handleSubmit=(e)=>{
        postComment(props.articleid,{comment:comment})
    }
      console.log(singleArticle)
    return (
      <>
        <h1
          style={{ fontSize: "24px", fontWeight: "500", letterSpacing: "0px" }}
        >
          Comments
        </h1>
        {singleArticle &&
        singleArticle.commentedAuthors.indexOf(userInfo[0]._id) ? (
          <div className="comment-card">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicText">
                <Form.Control
                  type="text"
                  placeholder="Add Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <></>
        )}
        <>
          {singleArticle.comments.length > 0 &&
            singleArticle.comments.map((c) => (
              <div className="comment-card">
                {c.text}
                <br />
                <span style={{ fontSize:"1rem"}}>
                
                  Commented by {c.author.name} at{" "}
                  {moment(c.commentAt).format("MMM D, YYYY")}
                </span>
              </div>
            ))}
        </>
      </>
    );
}

export default Comment
