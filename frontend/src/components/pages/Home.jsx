import React,{useState,useEffect,useContext} from "react";
import AuthContext from "../context/Auth/AuthContext"
import {Jumbotron,Spinner,Container,Card,Row,Col,Button} from "react-bootstrap"
import ArticleContext from "../context/Article/ArticleContext";
import Main from "./Main"

const Home = (props) => {
const {userInfo}=useContext(AuthContext);
const {getAllArticles,articleLoading,articles}=useContext(ArticleContext)
useEffect(() =>{
  getAllArticles()
//eslint-disable-next-line
},[])
const handleClick=(id) =>{
  console.log(id)
  props.history.push(`/article/${id}`)
}
  return (
    <>
      {userInfo && userInfo.length > 0 ? <></> : <Main />}
      {articleLoading ? (
        <></>
      ) : (
        <Row style={{margin:"3vh 10vw 0 10vw"}}>
          {articles.length > 0 &&
            articles.map((c) => {
              const id=c._id;
              return (
                <Col md={4}>
                  <Card style={{ width: "18rem" }}>
                    {c.image ? <Card.Img variant="top" src={c.image} /> : <></>}
                    <Card.Body>
                      <Card.Title>
                        <h3 style={{ fontWeight: "600", fontSize: "20px" }}>
                          {c.title}
                        </h3>
                      </Card.Title>
                      <Card.Text
                        style={{ fontSize: "16px" }}
                      >
                        {c.description.substring(0, 50)}....
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={() => {
                          handleClick(c._id);
                        }}
                      >
                        Read Article
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}{" "}
        </Row>
      )}
    </>
  );

};

export default Home;
 
