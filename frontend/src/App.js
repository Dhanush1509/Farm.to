import logo from './logo.svg';
import {Switch,BrowserRouter as Router,Link,Route} from "react-router-dom"
import Appbar from "./components/layout/Appbar"
import Home from "./components/pages/Home"
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login";
import OtherUser from "./components/pages/OtherUser"
import Editor from "./components/pages/Editor";
import SingleArticle from "./components/pages/SingleArticle"
import Weather from "./components/pages/Weather"
import AuthState from "./components/context/Auth/AuthState"
import AlertState from "./components/context/Alert/AlertState"
import ArticleState from "./components/context/Article/ArticleState";
import Alerts from "./components/layout/Alerts"
function App() {
  return (
    <div className="App">
      <AuthState>
        <ArticleState>
          <AlertState>
            <Router>
              <Appbar />
              <Alerts />
              <Switch>
                <Route
                  exact
                  path="/article/:articleid"
                  component={SingleArticle}
                />
                <Route exact path="/user/:userid" component={OtherUser} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/editor" component={Editor} />
                <Route exact path="/weather" component={Weather} />
                <Route exact path="/" component={Home} />
              </Switch>
            </Router>
          </AlertState>
        </ArticleState>
      </AuthState>
    </div>
  );
}

export default App;
